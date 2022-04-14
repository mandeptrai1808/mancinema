import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LayThongTinTaiKhoan } from "../Redux/Actions/UserActions";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

export default function ThongTinDatVe() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);
  let { thongTinTaiKhoan } = useSelector((state) => state.UserReducer);
  console.log(thongTinTaiKhoan);

  let dispatch = useDispatch();
    let navigate =useNavigate();
  useEffect(() => {
    dispatch(LayThongTinTaiKhoan());
  }, []);

  return (
    <div>
      <div className="px-5 bg-black bg-opacity-70 flex justify-between align-middle pt-5">
        <Button onClick={()=>{
            navigate("/home")
        }}>
          <HomeOutlined className="xl" />
        </Button>
        <h1 className="text-3xl text-center text-white">
          THÔNG TIN VÉ ĐÃ ĐẶT CỦA KHÁCH HÀNG
        </h1>
        <div className="flex text-white">
          <UserOutlined className="text-2xl" />
          <p className="pt-1 ml-3">{userData.hoTen}</p>
        </div>
      </div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 mx-auto">
          {/* Chay ơ day / */}
          {thongTinTaiKhoan.thongTinDatVe?.map((thongTin, indexThongTin) => {
            return (
              <div key={indexThongTin} className="my-8 divide-y-2 divide-gray-100 border-b-2 border-violet">
                <div className="py-4 flex flex-wrap md:flex-nowrap ">
                  <div className="md:w-64 md:mb-0 mb-5 flex-shrink-0 flex justify-center ">
                    <div
                      style={{
                        backgroundImage: `url(${thongTin.hinhAnh})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="w-1/2 h-full bg-purple"
                    ></div>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                      {thongTin.tenPhim}
                    </h2>
                    <p>Thời lượng: {thongTin.thoiLuongPhim} phút</p>
                    <p className="leading-relaxed">
                      Ngày đặt:{" "}
                      {moment(thongTin.ngayDat).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </p>
                    <p>Địa điểm: {_.head(thongTin.danhSachGhe).tenHeThongRap}</p>
                    <p>Số ghế: </p>
                    <div className="w-2/3 grid grid-cols-10 gap-2">
                        {thongTin.danhSachGhe?.map((ghe, indexGhe) => {
                          return <Button>{ghe.tenGhe}</Button>
                        })}

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
