import React, { useState, useEffect } from "react";
import { Drawer, Button, Space } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import moment from "moment";
import { UpdatePhim } from "../Redux/Actions/QuanLyPhimAction";

export default function AdminEditDrawer() {
  let dispatch = useDispatch();
  let { isShowDrawer, phimDetail } = useSelector(
    (state) => state.QuanLyPhimReducer
  );


  let [filmData, setFilmData] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: null,
    maPhim: 0,
  });

  //lấy dữ liệu default
  if (filmData.maPhim !== phimDetail?.maPhim) {
    setFilmData({
      tenPhim: phimDetail.tenPhim,
      trailer: phimDetail.trailer,
      moTa: phimDetail.moTa,
      ngayKhoiChieu: phimDetail.ngayKhoiChieu,
      sapChieu: phimDetail.sapChieu,
      dangChieu: phimDetail.dangChieu,
      hot: phimDetail.hot,
      danhGia: phimDetail.danhGia,
      hinhAnh: null,
      maPhim: phimDetail.maPhim,
    });
  }

  let [imgSrc, setImgSrc] = useState("");

  const submitBtn = () => {
    filmData.maNhom = "GP00";
    let formData = new FormData();
    for (let item in filmData) {
      if (item !== "hinhAnh") {
        formData.append(item, filmData[item]);
      } else {
        if(imgSrc !== "") formData.append("File", filmData.hinhAnh, filmData.hinhAnh.name);
      }
    }

    dispatch(UpdatePhim(formData))

  };

  const handleInputText = (e) => {
    let { name, value } = e.target;
    setFilmData({
      ...filmData,
      [name]: value,
    });
  };

  const handleDatePicker = (value) => {
    setFilmData({
      ...filmData,
      ngayKhoiChieu: moment(value).format("DD/MM/YYYY"),
    });
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    setFilmData({
      ...filmData,
      hinhAnh: file,
    });
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result);
    };

  };

  const onClose = () => {
    setImgSrc("")
    dispatch({
      type: "CLOSE_DRAWER",
    });
  };
  return (
    <div>
      <Drawer
        title="EDIT PHIM"
        placement="right"
        onClose={onClose}
        visible={isShowDrawer}
        width={500}
        extra={
          <Space>
            <Button type="primary" onClick={() => {
              submitBtn();
            }}>
              Cập nhật
            </Button>
          </Space>
        }
      >
        <div>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Form.Item label="Tên phim">
              <Input
                value={filmData.tenPhim}
                name="tenPhim"
                onChange={(e) => {
                  handleInputText(e);
                }}
              />
            </Form.Item>
            <Form.Item label="Trailer">
              <Input
                name="trailer"
                value={filmData.trailer}
                onChange={(e) => {
                  handleInputText(e);
                }}
              />
            </Form.Item>
            <Form.Item label="Mô tả">
              <Input
                name="moTa"
                value={filmData.moTa}
                onChange={(e) => {
                  handleInputText(e);
                }}
              />
            </Form.Item>

            <Form.Item label="DatePicker">
              <DatePicker
                format={"DD/MM/YYYY"}
                onChange={(value) => { 
                  handleDatePicker(value);
                }}
              />
            </Form.Item>

            <Form.Item label="Đang chiếu" valuePropName="checked">
              <Switch
                checked={filmData.dangChieu}
                onChange={(value) => {
                  setFilmData({
                    ...filmData,
                    dangChieu: value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Sắp chiếu" valuePropName="checked">
              <Switch
                checked={filmData.sapChieu}
                onChange={(value) => {
                  setFilmData({
                    ...filmData,
                    sapChieu: value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Phim Hot" valuePropName="checked">
              <Switch
                checked={filmData.hot}
                onChange={(value) => {
                  setFilmData({
                    ...filmData,
                    hot: value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Điểm đánh giá">
              <InputNumber
                min={0}
                max={10}
                value={filmData.danhGia}
                onChange={(value) => {
                  setFilmData({
                    ...filmData,
                    danhGia: value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <input
                type={"file"}
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  handleChangeFile(e);
                }}
              ></input>
              <img
                className="mt-4"
                src={imgSrc !== "" ? imgSrc : phimDetail.hinhAnh}
                alt="cc"
                width={150}
                height={150}
              ></img>
            </Form.Item>
            <Form.Item label="Submit">
              <Button onClick={submitBtn} type="danger">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </div>
  );
}
