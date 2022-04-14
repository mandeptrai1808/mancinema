import React,{useEffect} from 'react'
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { GetDanhSachPhimAction, GetDetailPhim, GetDetailPhimForEdit } from '../Redux/Actions/QuanLyPhimAction';
import { DeleteOutlined, EditOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
export default function AdminFilmTable() {
    let navigate = useNavigate();

    let dispatch = useDispatch();
    let {dataPhimHomePage} = useSelector(state => state.QuanLyPhimReducer);


    useEffect(() => {
      dispatch(GetDanhSachPhimAction(0));
    }, [])
    

    const columns = [
        {
          title: 'Mã phim',
          dataIndex: 'maPhim',
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          //onFilter: (value, record) => record.name.indexOf(value) === 0,
          sorter: (a, b) => a.maPhim - b.maPhim,
          sortDirections: ['descend'],
          width: 110
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            //onFilter: (value, record) => record.name.indexOf(value) === 0,
            render: (text, phim) => {
              return <div style={{
                  backgroundImage: `url(${phim.hinhAnh})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
              }} className="w-10 h-16 m-auto">
              </div>
            },
            width: 100
          },
          {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            width: 200
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            //onFilter: (value, record) => record.name.indexOf(value) === 0,
          },
          {
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (text, film) => {
              return <div>
                  {film.moTa.length > 50 ? film.moTa.substr(0,50) + '...' : film.moTa}
              </div>
            }
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            //onFilter: (value, record) => record.name.indexOf(value) === 0,
          },

          {
              title: "Hành động",
              render: (text, phim) => {
                return <div className='flex'>
                    <Button onClick={()=>{
                      dispatch(GetDetailPhimForEdit(phim.maPhim))
                    }}><EditOutlined /></Button>
                    <Button><DeleteOutlined /></Button>

                </div>
              }
          }
      ];

      const data = [...dataPhimHomePage];
  return (
    <div>
        <h1 className='text-3xl'>DANH SÁCH QUẢN LÝ PHIM</h1>
        <Button className='my-2' type='danger' onClick={()=>{
            navigate("/admin/addfilm");
        }}>Thêm phim <VideoCameraAddOutlined /></Button>
        <Table columns={columns} dataSource={data} />
    </div>
  )
}
