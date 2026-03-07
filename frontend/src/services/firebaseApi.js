// Rewritten to use the backend API instead of Firebase client SDK
import API from './api';

/* ---------------- PARTICIPANTS ---------------- */

export const getParticipants = async () => {
    const res = await API.get('/participants');
    return res.data;
};

export const getParticipantByUce = async (uce) => {
    try {
        const res = await API.get(`/participants/${uce}`);
        return res.data;
    } catch (err) {
        if (err.response?.status === 404) return null;
        throw err;
    }
};

/* ---------------- SUBMISSIONS ---------------- */

export const createSubmission = async (data) => {
    const res = await API.post('/submissions', data);
    return res.data;
};

export const getSubmissionsByRoom = async (roomId) => {
    const res = await API.get(`/submissions/room/${roomId}`);
    return res.data;
};

export const updateSubmissionStatus = async (id, data) => {
    const res = await API.put(`/submissions/${id}/status`, data);
    return res.data;
};

export const deleteSubmission = async (id) => {
    const res = await API.delete(`/submissions/${id}`);
    return res.data;
};

export const removeExtraPoints = async (id, index) => {
    const res = await API.delete(`/submissions/${id}/extra/${index}`);
    return res.data;
};
