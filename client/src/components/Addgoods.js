import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Addgoods = () => {
  const [goods, setGoods] = useState([]);
  const [form, setForm] = useState({});
  const { state } = useLocation();
  const { supid } = state;
  const navigate = useNavigate();
  useEffect(() => {
    loadData();
    setSupId(supid);
    console.log(goods);
  }, []);
  const setSupId = (supid) => {
    setForm({ supid: supid });
  };

  const loadData = async () => {
    await axios
      .get(process.env.REACT_APP_API + "/goods")
      .then((res) => {
        console.log(res.data);
        setGoods(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(process.env.REACT_APP_API + "/goods", form)
      .then((res) => {
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="position-static top-0 start-50">
        <h1>Register Goods</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input name="supid" placeholder="supid" value={supid}></input>
        <input
          name="goodsid"
          placeholder="goodsid"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          name="goodsname"
          placeholder="goodsname"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          name="allgoods"
          placeholder="allgoods"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          name="unitprice"
          placeholder="unitprice"
          onChange={(e) => handleChange(e)}
        ></input>
        <button>Submit</button>
      </form>
      <button onClick={() => navigate("/")}>กลับ</button>
      {/* <tbody>
        {goods
          ? goods.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.supid}</td>
                <td>{item.goodsid}</td>
                <td>{item.goodsname}</td>
                <td>{item.allgoods}</td>
                <td>{item.unitprice}</td>
              </tr>
            ))
          : null}
      </tbody> */}
      {goods ? (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">รหัสผู้จัดส่ง</th>
              <th scope="col">รหัสสินค้า</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">จำนวนที่รวม</th>
              <th scope="col">ราคาขายต่อชิ้น</th>
            </tr>
          </thead>
          <tbody>
            {goods.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.supid}</td>
                <td>{item.goodsid}</td>
                <td>{item.goodsname}</td>
                <td>{item.allgoods}</td>
                <td>{item.unitprice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </>
  );
};

export default Addgoods;
