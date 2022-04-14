import {UserServices} from "../../Services/UserServices"
import { notification } from 'antd';

const successNotification = (_tittle, _content) => {
    notification["success"]({
      message: _tittle,
      description: _content,
    });
  };

const errorNotification = (_tittle, _content) => {
    notification["error"]({
      message: _tittle,
      description: _content,
    });
  };

export const UserActions = (_dataLogin) => {
  return async(dispatch) => {
      try{
        let {data, status} = await UserServices.dangNhap(_dataLogin);
        successNotification("Đăng nhập thành công", "Bạn đã đăng nhập thằng công!!")
        localStorage.setItem('login_user', JSON.stringify(data.content));
        localStorage.setItem('access_token', data.content.accessToken);
        dispatch({
          type: "IS_LOGIN",
          content: data.content
        })
      }catch(err){
          errorNotification("Đăng nhập thất bại", "Kiểm tra lại mật khẩu hoặc tên đăng nhập!")
      }
  }
}

export const LayThongTinTaiKhoan = () => {
  return async(dispatch) => {
    try{
      let {data} = await UserServices.layThongTinTaiKhoan();
      dispatch({
        type: "GET_THONG_TIN_TAI_KHOAN",
        content: data.content
      })
    } catch(err){
      console.log(err.response.content)
    }
  }
}

