import React from 'react'
import { Col } from 'react-bootstrap';

export default class SideBar extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      selectedChoice: ''
    }
  }

  selectItem = (name) => {
    console.log(name)
    this.props.onSelect(name)
  }

  render(){
   return (
    <Col md="2" style={{backgroundColor:"#3C3C3C", color:"#FFFFFF", height:"100vh"}}>
    <h5>Sidebar</h5>
      <ul style={{marginTop:"10px"}}>
       { this.props.articleItems.map(articleItem => (
         <li onClick={() => this.selectItem(articleItem.name)}>
          {articleItem.name}
         </li>))}
    </ul>
    </Col>
   )
  }
}
