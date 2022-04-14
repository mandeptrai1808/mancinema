import { Button } from 'antd'
import React from 'react'
import Footer from '../Components/Footer'
import MenuHeader from '../Components/MenuHeader'
import LoadingPage from '../Pages/LoadingPage'

export default function HomeTemplate(props) {
  return (
    <div>
        <MenuHeader/>
        {props.component}
        <Footer/>
    </div>
  )
}
