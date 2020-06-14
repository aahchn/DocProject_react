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

    this.state = {
      articleItems:[], // Items from Database
      selectedItem: '' // Item that is selected from SideBar
    };
    this.onSelected = this.onSelected.bind(this);
  }


  onSelected(selectedItem){
    console.log(selectedItem)
    this.setState({selectedItem});
  }

  componentDidMount(){  //get info from Database
    const url = 'http://localhost:5000/items';
    axios.get(url).then(response => {
      const articleItems = response.data.items;
      this.setState({articleItems: articleItems})
      /*for (var i = 0; i < this.articleItems.length; ++i){
        console.log(this.articleItems[i].name + " ...");
      }*/
    })
    .catch(err => console.log(err))
  }

   render(){
    return (
      <Container fluid style={{minHeight:"100%"}}>
         <Row style={{minHeight:"100%"}}>
          <SideBar articleItems={this.state.articleItems} onSelect={this.onSelected}/>
          <Col md="10">
            <Header />
            <br/>
            <Body />
          </Col>
         </Row>
      </Container>
    );
  }
  /* componentDidMount(){  //get info from Database
    const url = 'http://localhost:5000/items';
    axios.get(url).then(response => {
          this.articleItems = response.data.items;
          console.log(this.articleItems); // this.articleItems is Array of dictionary
          for (var i = 0; i < this.articleItems.length; ++i){
            console.log(this.articleItems[i].name + " ...");
          }
    })
    console.log(this.articleItem + " sdoufhsdf");
  } */

  /* render(){
    //const articleItems = this.props.articleItems;
    //TODO - pass articleItems to Components
    return (
    <>
      <ul>
        { this.state.articleItems.map(articleItem => <li>{articleItem.name}</li>)}
      </ul>
    </>
    )
  } */
}


export default App;
