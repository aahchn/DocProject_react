import React from 'react'
import { Col } from 'react-bootstrap';

export default class SideBar extends React.Component{
  render(){
   //console.log(this.props + " hello");
   return (
    <Col md="2" style={{backgroundColor:"#3C3C3C", color:"#FFFFFF", height:"100vh"}}>
      <ul style={{marginTop:"10px"}}>
        <li> side bar here </li>
     </ul>
    </Col>
   )
  }
}
