import { Button } from "antd";
import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../Redux/Actions/UserActions";
import { useNavigate } from "react-router-dom";

export default function Login() {

    let dispatch = useDispatch();
    let navigate = useNavigate();
    let {isLogin, navigatorAfterLogin} = useSelector(state => state.UserReducer)

    if (isLogin){
        navigate(-1);
    }

    let [userLogin, setUserLogin] = useState({
        taiKhoan: "",
        matKhau: ""
    })

    const handleChangeUserLogin = (e) => {
      let {name, value} = e.target;
      setUserLogin({
          ...userLogin,
          [name]: value
      })
    }

    const submitBtn = () => {
      dispatch(UserActions(userLogin))
    }
  return (
    <div>
      {/* component */}
      <div className="h-screen flex">
        <div
          style={{
            backgroundImage:
              "url(https://znews-photo.zadn.vn/w660/Uploaded/xbhunku/2019_03_15/okoyethumb.jpg)",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          className="flex w-2/3 bg-metal bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center"
        >
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              Mandeptrai
            </h1>
            <p className="text-white mt-1">
             Người đẹp trai nhất thế giới
            </p>
            <button
              type="submit"
              className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Read More
            </button>
          </div>
        </div>
        <div className="flex w-1/3 justify-center items-center bg-white">
          <div className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl text-center mb-10">
              Đăng nhập
            </h1>
            
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="taiKhoan"
                placeholder="Tên đăng nhập"
                value={userLogin.name}
                onChange = {(e) => {
                  handleChangeUserLogin(e);
                }}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="matKhau"
                placeholder="Password"
                onChange = {(e) => {
                    handleChangeUserLogin(e);
                  }}
              />
            </div>
            <Button
              type="primary"
              shape="round"
              className="w-full mt-2"
              onClick={submitBtn}
            >
              Login
            </Button>
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Forgot Password ?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
