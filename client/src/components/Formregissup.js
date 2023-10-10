import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Formregissup = () => {
  const [form, setForm] = useState({});

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(process.env.REACT_APP_API + "/sup", form)
      .then(() => {
        alert("create sucess");
      })
      .catch((err) => {
        console.log(err);
        alert("Duplicate entry");
      });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="supid"
            onChange={(e) => handleChange(e)}
            placeholder="supid"
          ></input>
          <input
            type="text"
            name="fname"
            onChange={(e) => handleChange(e)}
            placeholder="fname"
          ></input>
          <input
            type="text"
            name="lname"
            onChange={(e) => handleChange(e)}
            placeholder="lname"
          ></input>
          <input
            type="text"
            name="tel"
            onChange={(e) => handleChange(e)}
            placeholder="tel"
          ></input>
          <input
            type="text"
            name="email"
            onChange={(e) => handleChange(e)}
            placeholder="email"
          ></input>
          <button>Submit</button>
        </form>
        <button onClick={() => navigate("/")}>กลับ</button>
      </div>
    </>
  );
};

export default Formregissup;
