import { QuanLyPhimServices } from "../../Services/QuanLyPhimServices"

export const GetCarouselAction = () => {
  return async(dispatch) => {
    try{
        let {data, status} = await QuanLyPhimServices.layDanhSachBanner();
        dispatch({
            type: "GET_BANNER_DATA",
            content: data.content
        })
    }catch(err){
        console.log(err);
    }
  }
}