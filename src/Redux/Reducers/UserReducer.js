const stateDefault = {
    isLogin: false,
    userData: {},
    thongTinTaiKhoan: {}
  };
  
  export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
      
        case "IS_LOGIN":{
            state.isLogin = true;
            state.userData = action.content
            return {...state}
        }
        
        case "GET_THONG_TIN_TAI_KHOAN":{
          state.thongTinTaiKhoan = action.content;
          return {...state}
        }
      default:
        return { ...state };
    }
  };
  