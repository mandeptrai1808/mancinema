import axios from "axios";


export const QuanLyPhimServices =  {

  layDanhSachBanner: () => {
    return axios({
        url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner',
        method: "GET"
    })
  },

  layDanhSachPhim: (_pagePhim) => {
    let gp;
    if (_pagePhim<10) gp =  "0"+_pagePhim;
     
    else gp = _pagePhim;
    
    return axios({
        url: `http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP${gp}`,
        method: 'GET'
    })
  },

  layDetailPhim: (_id) => {
    return axios({
      url: `http://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${_id}`,
      method: "GET"
    })
  },

  themPhim: (_formData) => {
    return axios({
      url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/ThemPhimUploadHinh',
      data: _formData,
      method: "POST"
    })
  },

  updatePhim: (_formData) => {
    return axios({
      url: "http://movieapi.cyberlearn.vn/api/QuanLyPhim/CapNhatPhimUpload",
      data: _formData,
      method: "POST",
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
    })
  }
}
