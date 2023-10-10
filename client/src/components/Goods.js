import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as dayjs from "dayjs";

const Goods = () => {
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

  const loadData = async () => {
    await axios
      .get(process.env.REACT_APP_API + "/send/" + supid)
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

  const setSupId = (supid) => {
    setForm({ supid: supid });
  };
  console.log(form);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(process.env.REACT_APP_API + "/send", form)
      .then((res) => {
        loadData();
      })
      .catch((err) => {
        console.log(err);
        alert("No data");
      });
  };

  return (
    <>
      <div>Add goods</div>

      <form onSubmit={handleSubmit}>
        <input
          name="supid"
          placeholder="supid"
          value={supid}
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          name="goodsid"
          placeholder="goodsid"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          name="unitcost"
          placeholder="unitcost"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          name="unitsend"
          placeholder="unitsend"
          onChange={(e) => handleChange(e)}
        ></input>
        <input type="date" name="exp" onChange={(e) => handleChange(e)} />

        <button>Submit</button>
      </form>
      <button onClick={() => navigate("/")}>กลับ</button>
      {goods ? (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">รหัสสินค้า</th>
              <th scope="col">ราคาสินค้าต้นทุน</th>
              <th scope="col">วันที่ส่ง</th>
              <th scope="col">จำนวนที่ส่ง</th>
              <th scope="col">วันหมดอายุ</th>
            </tr>
          </thead>
          <tbody>
            {goods.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.goodsid}</td>
                <td>{item.unitcost}</td>
                <td>{dayjs(item.senddate).format("DD/MM/YYYY")}</td>
                <td>{item.unitsend}</td>
                <td>{dayjs(item.exp).format("DD/MM/YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
      {/* <tbody>
        {goods
          ? goods.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.goodsid}</td>
                <td>{item.unitcost}</td>
                <td>{dayjs(item.senddate).format('DD/MM/YYYY')}</td>
                <td>{item.unitsend}</td>
                <td>{dayjs(item.exp).format('DD/MM/YYYY')}</td>
              </tr>
            ))
          : null}
      </tbody> */}
  
    </>
  );
};

export default Goods;
