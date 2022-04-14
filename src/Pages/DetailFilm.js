import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetDetailPhim } from "../Redux/Actions/QuanLyPhimAction";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button, Tabs } from 'antd';
import moment from "moment";

const { TabPane } = Tabs;

export default function DetailFilm() {
  let { maPhim } = useParams();
  let { phimDetail } = useSelector((state) => state.QuanLyPhimReducer);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(GetDetailPhim(maPhim));
  }, []);

  console.log(phimDetail);

  console.log(maPhim);
  return (
    <div className="w-full relative">
      <div className="bg-black bg-opacity-50 w-full h-full relative z-10 flex justify-center py-40">
        <div className="w-2/3">
          <div className="flex justify-between mb-10">
            {/* Thong tin phim  */}
            <div className="flex">
              <div style={{
                backgroundImage: `url(${phimDetail.hinhAnh})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }} className="w-60 h-80"></div>
              {/* <img src={phimDetail.hinhAnh} alt="hey" className="w-60 h-80" /> */}
              <div className="text-violet w-2/5 ml-3">
                <h2 className="text-3xl text-violet">{phimDetail.tenPhim}</h2>
                <p>{phimDetail.moTa}</p>
                <p>Lịch chiếu: {moment(phimDetail.ngayKhoiChieu).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </div>
            </div>

            {/* rating circle  */}
            <div>
                <h1 className="text-center text-violet text-2xl">Đánh giá</h1>
              <CircularProgressbar
                value={(phimDetail.danhGia * 100) / 10}
                text={`${phimDetail.danhGia}/10`}
                styles={buildStyles({
                  textColor: "yellow",
                  pathColor: "gold",
                  trailColor: "turquoise",
                })}
              />
              ;
            </div>
          </div>
          <h1 className="text-violet text-2xl">Lịch chiếu</h1>
          <Tabs tabPosition="left" className="w-full bg-white">
              {phimDetail.heThongRapChieu?.map((rapChieu, indexRap) => {
                return   <TabPane tab={<img className="w-10 h-10 rounded-full" src={rapChieu.logo} alt="cc"></img>} key={indexRap}>
                {rapChieu.cumRapChieu.map((cumRap, indexCumRap) => {
                  return <div className="flex m-4">
                      <img className="w-28 h-36" src={cumRap.hinhAnh} alt="cc"></img>
                      <div className="ml-4">
                          <p>{cumRap.tenCumRap}</p>
                          <div>
                              {cumRap.lichChieuPhim.map((item, index) => {
                                return <Button onClick={()=>{
                                  navigate(`/checkout/${item.maLichChieu}`)
                                }}>{moment(item.ngayChieuGioChieu).format("hh:mm A")}</Button>
                              })}
                          </div>
                      </div>
                  </div>
                })}
              </TabPane>
              })}
        </Tabs>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${phimDetail.hinhAnh})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="blur-md w-full h-full z-0 absolute top-0"
      ></div>
    </div>
  );
}
