import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Formsearchsup = () => {
  const [supplier, setsupplier] = useState({});
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const findData = async () => {
    await axios
      .get(process.env.REACT_APP_API + "/sup/" + supplier.supid)
      .then((res) => {
        console.log(res.data[0]);
        setData(res.data[0]);
      })
      .catch((err) => {
        alert("No data");
        setData(null);
        console.log(err);
      });
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setsupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  console.log(supplier);
  return (
    <>
      <div>
        {/* <input type="date" name="date" onChange={(e) => handleChange(e)} /> */}
        <input
          type="text"
          name="supid"
          onChange={(e) => handleChange(e)}
          placeholder="supid"
        ></input>
        <button onClick={() => findData()}>ค้นหา</button>
      </div>
      {data !== null ? (
        <div>
          <p>supplier id : {data.supid}</p>
          <p>
            supplier name : {data.fname} {data.lname}
          </p>
          <p>supplier telephone : {data.tel}</p>
          <button
            onClick={() => navigate("/goods", { state: { supid: data.supid } })}
          >
            เพิ่มสินค้า
          </button>
          <button
            onClick={() =>
              navigate("/addgoods", { state: { supid: data.supid } })
            }
          >
            ลงทะเบียนสินค้า
          </button>
        </div>
      ) : (
        <></>
      )}
      <button onClick={() => navigate("/register")}>ลงทะเบียนผู้จัดหา</button>
      <button onClick={() => navigate("/sumgoods")}>สินค้าคงคลัง</button>
    </>
  );
};

export default Formsearchsup;
