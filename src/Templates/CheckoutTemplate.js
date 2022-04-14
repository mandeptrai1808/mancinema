import { LoadingOutlined } from "@ant-design/icons";
import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

export default function CheckoutTemplate(props) {

  let {loadingPage} = useSelector(state => state.DatVeReducer);
  let dispatch = useDispatch();

  useEffect(() => {
   dispatch({
     type: "SET_LOADING_STATUS",
     value: true
   })
  }, [])
  
  let classLoading = "";
  if (!loadingPage) classLoading = "hidden"

  return (
    <div>
      <div className={`w-full h-screen fixed bg-black z-10 bg-opacity-90  pt-48 align-middle ${classLoading}`}>
        <div className="text-3xl text-white text-center">
          <p> <LoadingOutlined className="text-4xl"/>Loading...</p>
        </div>
      </div>
      {props.component}
    </div>
  );
}
