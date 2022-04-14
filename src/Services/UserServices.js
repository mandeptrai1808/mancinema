import axios from "axios";

export const UserServices = {
  dangNhap: (_dataLogin) => {
    return axios({
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap",
      data: _dataLogin,
      method: "POST",
    });
  },

  layThongTinTaiKhoan: () => {
    return axios({
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
  },
};
