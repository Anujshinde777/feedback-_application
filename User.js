import React from "react";
import { useState, useEffect, useRef } from "react";
import { Textdata,Imagedata } from "./FirebaseConnection";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const User = () => {
    let name, value;
  const [data, setData] = useState({ name: "", role: "", message: "" });
  const [sendata, setSendata] = useState([]);
   const effectRan = useRef(false);

  const getData = (event) => {
     const { name, value } = event.target;
     setData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
  };

 
 const handleSubmit = (event) => {
   event.preventDefault();
    setSendata([data]);
   const valRef = collection(Textdata, "Feedback");
   const payload = {
     name: data.name,
     role: data.role,
     message: data.message,
      permission:"false"
   };
   addDoc(valRef, payload);
   console.log(payload);
   alert("Data has been submitted");

   
 };

  useEffect(() => {
    if (!effectRan.current) {
     
   
      console.log(sendata);
    }
}, [sendata]);
  return (
    <>
      <div className="container flex   w-full py-2 flex-col justify-center flex-wrap">
        <div className="py-4 flex justify-center w-8/12  m-auto rounded-full m-4 py-4  bg-amber-900">
          <h1 className="text-justify uppercase text-5xl   text-white ">
            Happy Birthday
          </h1>
        </div>
        <div className="flex w-full   m-4 px-2 justify-around">
          <div className="w-7/12  flex flex-col justify-center items-center">
            <div className=" w-9/12 p-6 m-4  ">
              <p className="text-center">
                {" "}
                Software Development, seeking employment as a mobile game
                developer. I am passionate about consistently advancing my
                knowledge and skills. I have attended multiple seminars and boot
                camps on coding and game development.
              </p>
            </div>
            <form
              className="flex flex-col   border-2 rounded-lg   w-8/12  shadow-xl shadow-slate-500  "
              onSubmit={handleSubmit}
            >
              <div className="   flex  w-11/12     ">
                <label className="text-center w-4/12   ">
                  <h1 className=" p-2 text-2xl m-2">NAME :</h1>
                </label>
                <input
                  type="text"
                  className=" w-8/12  border-2 border-gray-300  rounded-md  p-2 h-10 m-4 focus:outline-none focus:border-lime-950"
                  placeholder="Enter your name"
                  value={data.name}
                  onChange={getData}
                  name="name"
                  required
                />
              </div>
              <div className="   flex  w-11/12     ">
                <label className="text-center w-4/12   ">
                  <h1 className=" p-2 text-2xl m-2">Role :</h1>
                </label>
                <input
                  type="text"
                  className="w-8/12 border-2 border-gray-300 rounded-md p-2 h-10 m-4 focus:outline-none focus:border-lime-950"
                  placeholder="Enter your Role"
                  value={data.role}
                  onChange={getData}
                  name="role"
                  required
                />
              </div>
              <div className="   flex  w-11/12     ">
                <label className="text-center w-4/12   ">
                  <h1 className=" p-2 text-2xl m-2">Message :</h1>
                </label>
                <textarea
                  type="textbox"
                  pattern="[A-Za-z]"
                  className=" w-8/12  border-2  text-wrap   border-gray-300  rounded-md  p-2 h-24 m-4 focus:outline-none focus:border-lime-950"
                  placeholder="Enter your Message"
                  value={data.message}
                  onChange={getData}
                  name="message"
                  required
                />
              </div>
              <button className="w-4/12  m-auto p-2 mb-5 bg-amber-900 text-white rounded-lg">
                Submit
              </button>
            </form>
          </div>
          <div className="w-4/12 flex flex-col  h-96  ">
            <div className=" w-full flex  flex-col   ">
              <div className=" flex justify-end items-end w-full   ">
                <img className=" h-16" src="Images\asset (1).svg" />
              </div>
              <div className=" w-full flex justify-end h-80">
                <div className=" shadow-xl shadow-slate-500 w-5/12 bg-slate-950 h-64 -mr-20 z-10 "></div>
                <div className=" shadow-xl   shadow-amber-200  w-4/12 bg-amber-100 h-64 mr-16 mt-10 z-0"></div>
              </div>
              <div className=" flex justify-between   w-full  4 ">
                <img className=" h-16" src="Images\asset (1).svg" />
                <div className=" flex flex-col p-2 mb-4 text-center">
                  <h1 className=" text-5xl p-2 "> Anuj Shinde</h1>
                  <p className="p-2  ">React Devloper</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <button className="w-4/12 m-auto p-2 mb-5 bg-amber-900 text-white rounded-lg hover:bg-amber-400  transition duration-300 ease-in-out">
            Your message has been sent. Please wait for admin approval.
          </button>
        </div>
      </div>
    </>
  );
};

export default User;
