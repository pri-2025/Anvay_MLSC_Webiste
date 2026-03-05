import { db } from "../firebase";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    where
} from "firebase/firestore";

/* ---------------- PARTICIPANTS ---------------- */

export const getParticipants = async () => {
    const snapshot = await getDocs(collection(db, "participants"));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const getParticipantByUce = async (uce) => {
    const q = query(collection(db, "participants"), where("uce", "==", uce));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    return {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()
    };
};

/* ---------------- SUBMISSIONS ---------------- */

export const createSubmission = async (data) => {
    const docRef = await addDoc(collection(db, "submissions"), data);

    return {
        id: docRef.id,
        ...data
    };
};

export const getSubmissionsByRoom = async (roomId) => {
    const q = query(collection(db, "submissions"), where("roomId", "==", roomId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const updateSubmissionStatus = async (id, data) => {
    const ref = doc(db, "submissions", id);

    await updateDoc(ref, data);

    return { success: true };
};

export const deleteSubmission = async (id) => {
    await deleteDoc(doc(db, "submissions", id));

    return { success: true };
};

export const removeExtraPoints = async (id, index) => {
    const ref = doc(db, "submissions", id);

    const submission = await getDoc(ref);
    const data = submission.data();

    const updatedExtra = [...(data.extraPoints || [])];
    updatedExtra.splice(index, 1);

    await updateDoc(ref, {
        extraPoints: updatedExtra
    });

    return { success: true };
};