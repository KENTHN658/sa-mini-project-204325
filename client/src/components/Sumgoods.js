import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sumgoods = () => {
  const [goods, setGoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

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

  return (
    <>
      <div className="position-static top-0 start-50">
        <h1>Summary Goods</h1>
      </div>

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
      <button onClick={() => navigate("/")}>กลับ</button>
    </>
  );
};

export default Sumgoods;
