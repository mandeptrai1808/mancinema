
import {DatVeServices} from "../../Services/DatVeServices"

import { notification } from 'antd';

const successNotification = (_tittle, _content) => {
    notification["success"]({
      message: _tittle,
      description: _content,
    });
  };


export const GetDataDatPhim = (_maLichChieu) => {
  return async(dispatch) => {
    try{
      let {data} = await DatVeServices.getDataDatVe(_maLichChieu);
        dispatch({
            type: "GET_DATA_DAT_VE",
            content: data.content
        })
        dispatch({
          type: "SET_LOADING_STATUS",
          value: false
        })
    } catch(err){
        console.log(err)
    }     
  }
}

export const tienHanhDatVe = (_danhSachVeDat) => {
  return async(dispatch) => {
    try{
      let {data} = await DatVeServices.datVe(_danhSachVeDat);
      successNotification("Đặt vé thành công!", "Bạn đã đặt vé thành công!")
      dispatch(GetDataDatPhim(_danhSachVeDat.maLichChieu))
    } catch(err){
      console.log(err.response.content)
    }
  }
} 