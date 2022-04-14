
const stateDefault = {
    dataRapPhim: [],

}

export const QuanLyRapPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
       case "GET_DATA_RAP_PHIM":{
           state.dataRapPhim = action.content;
           return {...state}
       }
       
      default:
        return { ...state };
    }
  };
  