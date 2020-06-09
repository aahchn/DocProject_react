import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default class SideBar extends React.Component{
  render(){
    return(
     <Row>
       <Col md="12" style={{backgroundColor:"#EFEFEF", height:"40px", padding:"15px 0px 50px 15px"}}>
         <h3>this is the header</h3>
       </Col>
     </Row>
    )
  }
}
