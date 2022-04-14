import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetDataDatPhim, tienHanhDatVe } from "../Redux/Actions/DatPhimActions";
import { Button } from "antd";
import _ from "lodash";
import {UserOutlined} from '@ant-design/icons'

export default function Checkout() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { maLichChieu } = useParams();
  let { datVeData } = useSelector((state) => state.DatVeReducer);
  let [gheDangDat, setGheDangDat] = useState([]);
  let [tongTien, setTongTien] = useState(0);

  const tinhTongTien = (arrTemp) => {
    arrTemp.map((itemGheDangDat, indexGheDangDat) => {
      let indexTemp = _.findIndex(datVeData.danhSachGhe, {
        tenGhe: itemGheDangDat,
      });
      let giaTien = datVeData.danhSachGhe[indexTemp].giaVe;
      setTongTien(tongTien + giaTien);
    });
  };

  const datVeBtn = () => {
    let arrDispath = [];
    gheDangDat.map((itemGheDangDat, indexGheDangDat) => {
      let indexTemp = _.findIndex(datVeData.danhSachGhe, {
        tenGhe: itemGheDangDat,
      });
      let _maGhe = datVeData.danhSachGhe[indexTemp].maGhe;
      let _giaVe = datVeData.danhSachGhe[indexTemp].giaVe;
      arrDispath = [...arrDispath, { maGhe: _maGhe, giaVe: _giaVe }];
    });

    arrDispath = {maLichChieu: maLichChieu, danhSachVe: [...arrDispath]}
    dispatch(tienHanhDatVe(arrDispath));
    navigate("/thongtindatve")
  };

  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  console.log(userData)

  useEffect(() => {
    if (!localStorage.getItem("login_user")) {
      navigate("/login");
    }

    dispatch(GetDataDatPhim(maLichChieu));
  }, []);

  return (
    <div className="w-full flex ">
      <div className="w-2/3 px-20 py-4">
        <h1 className="text-center">Màn hình</h1>
        <div className="w-full h-4 bg-black"></div>
        <div
          style={{
            borderBottom: "50px solid wheat",
            borderLeft: "25px solid transparent",
            borderRight: "25px solid transparent",
            height: 0,
            width: "100%",
          }}
          className="w-full blur-md"
        ></div>

        <div className="w-full grid grid-cols-12 gap-1">
          {datVeData.danhSachGhe?.map((item, index) => {
            let typeGhe = "bg-violet hover:bg-black cursor-pointer text-white";
            let contentGhe = item.tenGhe;
            typeGhe =
              item.loaiGhe === "Vip"
                ? "bg-gold hover:bg-black cursor-pointer text-white"
                : typeGhe;
            typeGhe = item.daDat
              ? "bg-light-dark hover:bg-light-dark cursor-default text-white"
              : typeGhe;

            if (gheDangDat.findIndex((ghe) => ghe === item.tenGhe) !== -1)
              typeGhe = "bg-red hover:bg-black cursor-pointer";
            if (item.taiKhoanNguoiDat === userData.taiKhoan){
              contentGhe = <UserOutlined />
              typeGhe= "bg-white border shadow-xl text-black"
              console.log("find");
            }
            return (
              <div
                className={`duration-200 w-full h-8 flex justify-center text-center pt-2  ${typeGhe}`}
                onClick={() => {
                  if (!item.daDat) {
                    if (
                      gheDangDat.findIndex((ghe) => ghe === item.tenGhe) === -1
                    ) {
                      tinhTongTien([...gheDangDat, item.tenGhe]);
                      setGheDangDat([...gheDangDat, item.tenGhe]);
                    } else {
                      let index = gheDangDat.findIndex(
                        (ghe) => ghe === item.tenGhe
                      );
                      let tempArr = gheDangDat;
                      tempArr.splice(index, 1);
                      tinhTongTien([...tempArr]);
                      setGheDangDat([...tempArr]);
                    }
                  }
                }}
              >
                {contentGhe}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-1/3 px-4 py-4">
        <h1 className=" text-2xl text-center text-red border-b-2 border-violet">
          {tongTien} VND
        </h1>
        <div className="border-b-2 border-violet">
          <h1 className="text-2xl">{datVeData.thongTinPhim?.tenPhim}</h1>
          <p>Địa điểm: {datVeData.thongTinPhim?.diaChi}</p>
          <p>
            {datVeData.thongTinPhim?.ngayChieu} -{" "}
            {datVeData.thongTinPhim?.gioChieu} -{" "}
            {datVeData.thongTinPhim?.tenRap}
          </p>
        </div>
        <div className=" py-4 border-b-2 border-violet">
          <div className="flex justify-between">
            <p className="font-bold text-xl text-red">Ghế: </p>
            <p className="text-xl">Giá tiền</p>
          </div>

          {gheDangDat.map((itemGheDangDat, indexGheDangDat) => {
            let indexTemp = _.findIndex(datVeData.danhSachGhe, {
              tenGhe: itemGheDangDat,
            });
            let giaTien = datVeData.danhSachGhe[indexTemp].giaVe;
            return (
              <div className="flex justify-between">
                <p className="font-bold text-md text-red">{itemGheDangDat} </p>
                <p className="text-md">{giaTien} VND</p>
              </div>
            );
          })}
        </div>
        <div className="py-2 border-b-2 border-violet">
          <p className="font-bold">Emai</p>
          <p>{userData?.email}</p>
        </div>
        <Button className="w-full" type="danger" onClick={datVeBtn}>
          ĐẶT VÉ
        </Button>
      </div>
    </div>
  );
}
