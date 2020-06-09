import React from 'react'
import { Col, Row } from 'react-bootstrap';

export default class Body extends React.Component{
  render(){
    return(
      <Row>
         <Col md="12" style={{backgroundColor:"#C5D246"}}>
           <p>this is the body</p>
         </Col>
      </Row>
    )
   }
}
