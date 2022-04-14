import React, {useEffect} from 'react'
import { Carousel } from 'antd';
import {useSelector, useDispatch} from 'react-redux'
import { GetCarouselAction } from '../Redux/Actions/CarouselActions';

const contentStyle = {
  height: '70vh',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  background: '#364d79',
  overFlow: 'hidden',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};

export default function CarouselHome() {
  let {arrImg} = useSelector(state => state.CarouselReducer);
  let dispatch = useDispatch();

  useEffect(() => {
   dispatch(GetCarouselAction());

  }, [])
  
  return (
    <Carousel autoplay>
      {arrImg.map((item, index) => {
        return  <div>
        <h3 style={{...contentStyle, backgroundImage: `url(${item.hinhAnh})`}}>
           
        </h3>
      </div>
  
      })}
   
  </Carousel>
  )
}
