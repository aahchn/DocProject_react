import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default class Body extends React.Component{
  render(){
    return(
      <Row>
         <Col md="12" style={{backgroundColor:"#26A9F0"}}>
           <p>{this.props.selectedArticle ? this.props.selectedArticle.info : '' }</p>
         </Col>
      </Row>
    )
   }
}
