 
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Textdata } from "./FirebaseConnection"; 

const Display = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  const filteredFeedbackData = feedbackData.filter(
    (item) => item.permission === true
  );

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === feedbackData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feedbackData.length - 1 : prevIndex - 1
    );
   };
   return (
     <>
       <div className="container relative flex   w-full py-2 flex-col justify-center flex-wrap">
         <div className="py-4 flex justify-center w-8/12  m-auto rounded-full m-4 py-4  bg-amber-900">
           <h1 className="text-justify uppercase text-5xl   text-white ">
             Display Message
           </h1>
         </div>

         <div className="flex justify-around items-end container w-11/12 h-[36rem] m-auto mt-8 bg-black">
           {filteredFeedbackData
             .slice(currentIndex, currentIndex + 6)
             .map((data, index) => (
               <div
                 key={index}
                 className="relative group shadow-xl transition-all delay-250 border-x-4 border-slate-400 hover:border-amber-300 p-4 w-4/12 h-full flex justify-center items-center flex-col flex-wrap"
               >
                 <div className="title w-8/12 flex justify-center items-center flex-col flex-wrap group-hover:-translate-y-48 transition-all delay-300 hover:text-amber-300">
                   <h2 className="text-center uppercase text-5xl mb-2 text-white group-hover:hover:text-amber-300 transition-all delay-300">
                     {data.name}
                   </h2>
                   <p className="text-center mb-2 text-white group-hover:hover:text-amber-300 transition-all delay-300">
                     {data.role}
                   </p>
                 </div>
                 <div className="absolute bottom-0 message w-full h-72 flex justify-center items-center flex-col flex-wrap border-none bg-red-500 group-hover:opacity-100 opacity-0 hover:opacity-100 transition-all delay-300">
                   <p className="text-center uppercase mb-2 text-amber-300 text-wrap">
                     {data.message}
                   </p>
                 </div>
               </div>
             ))}
         </div>
         <button
           className="absolute top-1/2 left-1 transform -translate-y-1/2 transition-all delay-300 bg-gray-500 text-white px-3 py-1 mr-2 rounded-full z-10"
           onClick={handlePrev}
         >
           Prev
         </button>
         <button
           className="absolute top-1/2 right-1 transform -translate-y-1/2 transition-all delay-300 bg-gray-500 text-white px-3 py-1 rounded-full z-10"
           onClick={handleNext}
         >
           Next
         </button>
       </div>
     </>
   );
};

export default Display;
