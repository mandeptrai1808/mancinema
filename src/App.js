import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomeTemplate from "./Templates/HomeTemplate";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import News from "./Pages/News";
import DetailFilm from "./Pages/DetailFilm";
import CheckoutTemplate from "./Templates/CheckoutTemplate";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import ThongTinDatVe from "./Pages/ThongTinDatVe";
import AdminTemplate from "./Templates/AdminTemplate";
import AdminFilmTable from "./Pages/AdminFilmTable";
import AdminUsers from "./Pages/AdminUsers";
import AdminAddFilm from "./Pages/AdminAddFilm";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate component={<Home/>}/>}/>
        <Route path="/home" element={<HomeTemplate component={<Home/>}/>}/>
        <Route path="/contact" element={<HomeTemplate component={<Contact/>}/>}/>
        <Route path="/news" element={<HomeTemplate component={<News/>}/>}/>
        <Route path="/details/:maPhim" element={<HomeTemplate component={<DetailFilm/>}/>}/>
        <Route path="/checkout/:maLichChieu" element={<CheckoutTemplate component={<Checkout/>}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/thongtindatve" element={<ThongTinDatVe/>}/>
        <Route path="/admin/films" element = {<AdminTemplate component={<AdminFilmTable/>}/>}/>
        <Route path="/admin/addfilm" element = {<AdminTemplate component={<AdminAddFilm/>}/>}/>
        <Route path="/admin/users" element = {<AdminTemplate component={<AdminUsers/>}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
 
      
  );
}

export default App;
