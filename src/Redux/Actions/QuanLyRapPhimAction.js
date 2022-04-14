import { QuanLyRapPhimService } from "../../Services/QuanLyRapPhimService";

export const GetDataRapPhim = () => {
  return async(dispatch) => {
    try{
        let {data, status} = await QuanLyRapPhimService.layThongTinHeThongRap();
        dispatch({
            type: "GET_DATA_RAP_PHIM",
            content: data.content
        })
    }catch(err){
        console.log(err);
    }
  }
}