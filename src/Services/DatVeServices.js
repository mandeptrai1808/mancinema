import axios from "axios";

export const DatVeServices = {
  getDataDatVe: (_maLichChieu) => {
    return axios({
      url: `http://movieapi.cyberlearn.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${_maLichChieu}`,
      method: "GET",
    });
  },

  datVe: (_danhSachVeDat) => {
    return axios({
      url: 'http://movieapi.cyberlearn.vn/api/QuanLyDatVe/DatVe',
      data: _danhSachVeDat,
      method: "POST",
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
    })
  },

};
