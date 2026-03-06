import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getParticipantByCitizenId } from '../services/participantService';
import { createSubmission } from '../services/firebaseApi';
import { ROOMS_META } from '../data/roomsData';

const ParticipantContext = createContext(null);

export const useParticipant = () => {
    const ctx = useContext(ParticipantContext);
    if (!ctx) throw new Error('useParticipant must be used within ParticipantProvider');
    return ctx;
};

export const ParticipantProvider = ({ children }) => {
    const [participant, setParticipant] = useState(null);
    const [citizenId, setCitizenId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // useCallback so the function reference is stable — safe to use in useEffect deps
    const loginByCitizenId = useCallback(async (id) => {
        setLoading(true);
        setError('');
        try {
            const data = await getParticipantByCitizenId(id);
            setParticipant(data);
            setCitizenId(data.citizenId || id);
            localStorage.setItem('bc_citizen_id', data.citizenId || id);
        } catch (err) {
            console.error(`Login failed for ${id}:`, err);
            setError(err.response?.data?.message || err.message || 'Citizen not found. Check your ID and try again.');
            setParticipant(null);
            setCitizenId(null);
            localStorage.removeItem('bc_citizen_id');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Restore session on page refresh
    useEffect(() => {
        const saved = localStorage.getItem('bc_citizen_id');
        if (saved) loginByCitizenId(saved);
    }, [loginByCitizenId]);

    const logout = () => {
        setParticipant(null);
        setCitizenId(null);
        localStorage.removeItem('bc_citizen_id');
    };

    // Complete a room:
    // 1. Call backend via submission API
    // 2. Optimistically update local participant state immediately (no re-fetch lag)
    // 3. Silently re-fetch in background to sync real score/tier
    const completeRoom = async (roomId) => {
        if (!citizenId) return;
        // Optimistic update — mark room as completed in local state right away
        setParticipant(prev => {
            if (!prev) return prev;
            const updatedRooms = (prev.rooms || []).map(r =>
                (r.id === roomId || r.roomId === roomId)
                    ? { ...r, completed: true, score: 10, earnedPoints: 10 }
                    : r
            );
            const newTotalScore = (prev.totalScore || 0) + 10;
            const newRoomsCompleted = updatedRooms.filter(r => r.completed).length;
            const newTier =
                newTotalScore >= 50 ? 'Architect' :
                    newTotalScore >= 25 ? 'Builder' : 'Explorer';
            return {
                ...prev,
                rooms: updatedRooms,
                totalScore: newTotalScore,
                currentTier: newTier,
                currentRoom: updatedRooms.find(r => !r.completed)?.name || 'All Complete',
                [`${roomId}`]: 10,
            };
        });
        // Background re-fetch to sync any admin bonus or server-side changes
        loginByCitizenId(citizenId).catch(() => { });
    };

    // Derived values with safe defaults
    const totalScore = participant?.totalScore ?? 0;
    const roomsCompleted = participant?.rooms?.filter(r => r.completed)?.length ?? 0;
    const currentTier = participant?.currentTier ?? '—';
    const currentRoom = participant?.currentRoom ?? '—';
    const role = participant?.role ?? '—';
    const badges = participant?.badges ?? [];
    const rooms = participant?.rooms ?? [];
    const name = participant?.name ?? '';
    const team = participant?.team ?? '';

    const roomProgress = rooms.reduce((acc, r) => {
        acc[r.id || r.roomId] = r.completed ? (r.tier || true) : null;
        return acc;
    }, {});

    return (
        <ParticipantContext.Provider value={{
            participant,
            citizenId,
            loading,
            error,
            loginByCitizenId,
            logout,
            completeRoom,
            ROOMS_META,
            roomProgress,
            totalScore,
            roomsCompleted,
            currentTier,
            currentRoom,
            role,
            badges,
            rooms,
            name,
            team,
        }}>
            {children}
        </ParticipantContext.Provider>
    );
};