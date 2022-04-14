import { QuanLyPhimServices } from "../../Services/QuanLyPhimServices";

import { notification } from 'antd';

const successNotification = (_tittle, _content) => {
    notification["success"]({
      message: _tittle,
      description: _content,
    });
  };


export const GetDanhSachPhimAction = (_pagePhim) => {
  return async(dispatch) => {
      try{
        let {data, status} = await QuanLyPhimServices.layDanhSachPhim(_pagePhim);
        dispatch({
            type: "GET_DANH_SACH_PHIM",
            content: data.content
        })
      } catch(err){
          console.log(err);
      }
  }
}

export const GetDetailPhim = (_maPhim) => {
  return async(dispatch) => {
    try{
      let {data, status} = await QuanLyPhimServices.layDetailPhim(_maPhim);
      dispatch({
        type: "GET_DETAIL_PHIM",
        content: data.content
      })
    } catch(err){
      console.log(err)
    }
  }  
}

export const GetDetailPhimForEdit = (_maPhim) => {
  return async(dispatch) => {
    try{
      let {data, status} = await QuanLyPhimServices.layDetailPhim(_maPhim);
      dispatch({
        type: "GET_DETAIL_PHIM",
        content: data.content
      })
      dispatch({
        type: "OPEN_DRAWER"
      })
    } catch(err){
      console.log(err)
    }
  }  
}

export const AddPhim = (_formData) => {
  return async(dispatch) => {
    try{
      let {data} = await QuanLyPhimServices.themPhim(_formData);
      successNotification("Thêm phim thành công!", "Kiểm tra lại trong tab films list!")
    } catch(err){
      console.log(err.response?.data);
    }
  }
}

export const UpdatePhim = (_formData) => {
  return async(dispatch) => {
    try{
      let {data} = await QuanLyPhimServices.updatePhim(_formData);
      successNotification("Cập nhật phim thành công!", "Kiểm tra lại trong tab films list!")
      dispatch(GetDanhSachPhimAction(0))
    } catch(err){
      console.log(err.response?.data)
    }
  }
}