import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from './components/SideBar';
import Header from './components/Header';
import Body from './components/Body';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
  constructor(props){ //need to have super(props) for constructor
    super(props); //super just calls React.Component

    this.state = { artItems: null};
  }

  componentDidMount(){  //get info from Database
    const url = 'http://localhost:5000/items';
    axios.get(url).then(response => {
          this.articleItems = response.data.items;
          console.log(this.articleItems); // this.articleItems is Array of dictionary
          for (var i = 0; i < this.articleItems.length; ++i){
            console.log(this.articleItems[i].name + " ...");
          }
    })
  }
  /* state={
    articleItems:[]
  };
  componentDidMount(){  //get info from Database
    const url = 'http://localhost:5000/items';
    axios.get(url).then(res=>{
      console.log(res);
      //console.log(res.data + "∆");
      this.setState({ articleItems: res.data});
      for (var i = 0; i < this.articleItems.length; ++i){
        console.log(this.articleItems[i].name + " ...");
      }
    })
  } */
  render(){
    //const articleItems = this.props.articleItems;
    return (
      <Container fluid style={{minHeight:"100%"}}>
         <Row style={{minHeight:"100%"}}>
          <SideBar />
          <Col md="10">
            <Header />
            <br/>
            <Body />
          </Col>
         </Row>
      </Container>
    );
  }
  /*render(){
    //const articleItems = this.props.articleItems;
    return (
      <ul>
      { this.state.articleItems.map (articleItem => <li>{articleItem.name}</li>)}
      </ul>
    } */
}


export default App;
