import axios from "axios";


export const QuanLyRapPhimService =  {
    layThongTinHeThongRap: () => {
      return axios({
          url: "http://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01",
          method: "GET"
      })
    }
  
}
