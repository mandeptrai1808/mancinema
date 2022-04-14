
const stateDefault = {
    dataPhimHomePage: [],
    phimDetail: {},
    dangChieu: true,
    isShowDrawer: false
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
       case "GET_DANH_SACH_PHIM":{
           state.dataPhimHomePage = action.content;
           return {...state}
       }
       case "FILLTER_PHIM_DANGCHIEU":{
           state.dangChieu = action.value;
           return {...state}
       }
       case "GET_DETAIL_PHIM":{
           state.phimDetail =  action.content;
           return {...state}
       }

    
       case "OPEN_DRAWER":{
           state.isShowDrawer = true;
           return {...state}
       }
       case "CLOSE_DRAWER":{
        state.isShowDrawer = false;
        return {...state}
    }

      default:
        return { ...state };
    }
  };
  