import React, { useState, useEffect } from "react";
import { Button, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { GetDataRapPhim } from "../Redux/Actions/QuanLyRapPhimAction";
import moment from "moment";

const { TabPane } = Tabs;

export default function TabFilms() {
  let [tabPosition, setTabPosition] = useState("left");
  let { dataRapPhim } = useSelector((state) => state.QuanLyRapPhimReducer);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetDataRapPhim());
  }, []);


  return (
    <Tabs tabPosition={tabPosition} className="w-3/4 bg-violet rounded-sm">
      {dataRapPhim.map((item, index) => {
        return (
          <TabPane
            tab={
              <img
                className="w-10 h-10 rounded-full"
                src={item.logo}
                alt="he"
              ></img>
            }
            key={index}
          >
            <Tabs tabPosition="left" className="w-full h-full bg-violet">
              {item.lstCumRap.slice(0, 6).map((cumRap, indexCumRap) => {
                return (
                  <TabPane
                    tab={
                      <div className="flex justify-between">
                        <img
                          className="w-10 h-10"
                          src={cumRap.hinhAnh}
                          alt="he"
                        ></img>
                        <div className="text-left align-middle ml-4">
                          <p>{cumRap.tenCumRap}</p>
                        </div>
                      </div>
                    }
                    key={indexCumRap}
                  >
                    {cumRap.danhSachPhim.slice(0,5).map((phim, indexPhim) => {
                      return <div className="flex m-2 border-b-2 border-white">
                        <img className="w-28 h-36" src={phim.hinhAnh} alt={phim.tenPhim}></img>
                        <div className="m-2">
                          <p className="font-bold text-xl">{phim.tenPhim}</p>
                          <div>
                            {phim.lstLichChieuTheoPhim.slice(0,4).map((lichChieu, indexLichChieu) => {
                              return <Button>{moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}</Button>
                            })}
                          </div>
                        </div>
                      </div>
                    })}
                  </TabPane>
                );
              })}
            </Tabs>
          </TabPane>
        );
      })}
    </Tabs>
  );
}
