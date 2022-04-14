import React, { useState, useEffect } from "react";
import CarouselHome from "../Components/CarouselHome";
import { Tabs, Radio, Space, Card, Button,Pagination  } from "antd";
import TabFilms from "../Components/TabFilms";
import { useSelector, useDispatch } from "react-redux";
import { GetDanhSachPhimAction } from "../Redux/Actions/QuanLyPhimAction";
import Paginate from "../Components/Paginate";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;
const { Meta } = Card;

export default function Home() {
  let [tabPosition, setTabPosition] = useState("left");
  let { dataPhimHomePage, dangChieu } = useSelector((state) => state.QuanLyPhimReducer);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  //fillter phim sap chieu
  let dataTemp = [];
  if (dangChieu) dataPhimHomePage.map((item, index) => {
    if (item.dangChieu) dataTemp.push(item);
  })
  else dataPhimHomePage.map((item, index) => {
   if (item.sapChieu) dataTemp.push(item);
 })
 dataPhimHomePage = dataTemp;

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  useEffect(() => {
    dispatch(GetDanhSachPhimAction(0));
  }, []);

  return (  
    <div className="bg-black pb-6">
      <CarouselHome />

      {/* GridFilms  */}
      <h1 className="text-center mt-10 text-3xl text-violet">PHIM NỔI BẬT</h1>
      <div className="flex justify-center">
        <Paginate minPage={1} maxPage={16} functionControl = {GetDanhSachPhimAction()}/>
      </div>
      <div className="flex justify-center my-5">
        <div className="grid grid-cols-4 w-3/4 gap-4">
          <div className="col-span-4">
          <Radio.Group onChange={e => {
            
            dispatch({
              type:"FILLTER_PHIM_DANGCHIEU",
              value: e.target.value
            })
          }}
          buttonStyle="solid">
          <Radio.Button value={true}>Đang Chiếu</Radio.Button>
          <Radio.Button value={false}>Sắp Chiếu</Radio.Button>
        </Radio.Group>
          </div>
          {dataPhimHomePage.map((item, index) => {
            return (
              <Card
                hoverable
                style={{ width: 240 , backgroundColor: "#d4d4d4"}}
                cover={
                  <div
                    className="w-full h-72"
                    style={{
                      backgroundImage:
                        `url(${item.hinhAnh})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="w-full duration-500 h-full p-3 bg-black opacity-0 hover:opacity-100 bg-opacity-0 hover:bg-opacity-70">
                      <p className="text-violet text-sx">
                        {item.moTa}
                      </p>
                      <div className="flex justify-between">
                        <Button>Xem Trailer</Button>
                        <p className="text-violet">Đánh giá: {item.danhGia}/10</p>
                      </div>
                    </div>
                  </div>
                }
              >
                <Meta
                
                  title={item.tenPhim}
                  description={item.ngayKhoiChieu}
                />
                <Button type="danger" className="mt-3" onClick={()=>{
                  navigate(`/details/${item.maPhim}`)
                }}>
                  Đặt vé
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <TabFilms />
      </div>
    </div>
  );
}
