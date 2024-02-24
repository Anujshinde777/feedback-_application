// Admin.js
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Textdata } from "./FirebaseConnection";

const Admin = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(Textdata, "Feedback"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setFeedbackData(data);
    };
    fetchData();
  }, []);

  const handlePermissionUpdate = async (id, permission) => {
    const docRef = doc(Textdata, "Feedback", id);
    if (permission) {
      await updateDoc(docRef, { permission: true });
    } else {
      await deleteDoc(docRef);
      setFeedbackData(feedbackData.filter((item) => item.id !== id)); // Remove the deleted document from the local state
    }
  };

  return (
    <div>
      {feedbackData.map((item) => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <p>Role: {item.role}</p>
          <p>Message: {item.message}</p>
          <p>Permission: {item.permission ? "Accepted" : "Pending/Rejected"}</p>
          <button onClick={() => handlePermissionUpdate(item.id, true)}>
            Accept
          </button>
          <button onClick={() => handlePermissionUpdate(item.id, false)}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
