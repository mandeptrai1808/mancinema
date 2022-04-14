import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import moment from "moment";
import { AddPhim } from "../Redux/Actions/QuanLyPhimAction";


export default function AdminAddFilm() {

  let dispatch = useDispatch();

  let [filmData, setFilmData] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: {},
    
  });

  let [imgSrc, setImgSrc] = useState("");

  const submitBtn = () => {
    filmData.maNhom = "GP00";
    let formData = new FormData();
    for (let item in filmData) {
      if (item !== "hinhAnh") {
        formData.append(item, filmData[item]);
      } else {
        formData.append("File", filmData.hinhAnh, filmData.hinhAnh.name);
      }
    }
    dispatch(AddPhim(formData));
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

  return (
    <div>
      <h1>ADD FILM</h1>
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
            src={imgSrc}
            alt="cc"
            width={150}
            height={150}
          ></img>
        </Form.Item>
        <Form.Item label="Submit">
          <Button onClick={submitBtn}>Thêm</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
