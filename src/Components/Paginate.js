import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GetDanhSachPhimAction } from "../Redux/Actions/QuanLyPhimAction";
export default function Paginate(props) {
  let dispatch = useDispatch();
  const { minPage, maxPage, functionControl } = props;
  let [numPage, setNumPage] = useState(1);

  const nextPage = () => {
    if (numPage < maxPage) setNumPage(numPage + 1);
    dispatch(GetDanhSachPhimAction(numPage-1)); 
  };

  const prevPage = () => {
    if (numPage > minPage) setNumPage(numPage - 1);
    dispatch(GetDanhSachPhimAction(numPage-1)); 
  };
  return (
    <div className="flex">
      <Button onClick={prevPage}>Prev</Button>
      <p className="w-10 text-center text-violet">{numPage}</p>
      <Button onClick={nextPage}>Next</Button>
    </div>
  );
}
