import React from 'react';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import SideBar from './components/SideBar';
import Header from './components/Header';
import Form from './components/Form';
import Body from './components/Body';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component{
  constructor(props){ //need to have super(props) for constructor
    super(props); //super just calls React.Component

    this.state = {
      articleItems: [], // Items from Database
      //need to append data to here after POST request from Form.js
      selectedArticle: null,
      formToShow: 'post'
    };
    this.onSelectedItem = this.onSelectedItem.bind(this);
  }


 onSelectedItem(selectedId){
   this.getArticleById(selectedId);
 }

 getArticleById (articleItemId){
   this.state.articleItems.filter(articleItem => articleItem.id)
   const info = this.state.articleItems.filter(articleItem => articleItemId === articleItem.id)
   console.log(info + ' this is from App.js')
   const result = info.length > 0 ? info[0] : null
   this.setState({selectedArticleItem: result})
 }

  componentDidMount(){  //get info from Database
    const url = 'http://localhost:5000/items';
    axios.get(url).then(response => {
      const articleItems = response.data.items;
      this.setState({articleItems: articleItems});
    })
    .catch(err => console.log(err + ' error'))
  }

  showComponent(value){
    this.setState({formToShow: value })
  }

   render(){
    return (
      <Container fluid style={{minHeight:"100%", backgroundColor:'#576166'}} >
         <Row style={{minHeight:"100%"}}>
          <SideBar
             articleItems={this.state.articleItems}
             onSelect={this.onSelectedItem}
          />
          <Col md="10">
            <Header selectedArticle = {this.state.selectedArticleItem} />
            <br/>
            <Dropdown>
             <Dropdown.Toggle variant="success" id="dropdown-basic">
               Select Request
             </Dropdown.Toggle>
             <Dropdown.Menu>
                <Dropdown.Item onClick={() => {this.showComponent('post')}}>POST</Dropdown.Item>
                <Dropdown.Item onClick={() => {this.showComponent('put')}}>PUT</Dropdown.Item>
                <Dropdown.Item onClick={() => {this.showComponent('delete')}}>DELETE</Dropdown.Item>
             </Dropdown.Menu>
            </Dropdown>
            <br/>
            <Form articleItems={this.state.articleItems} formToShow={this.state.formToShow} />
            <br/>
            <Body selectedArticle = {this.state.selectedArticleItem} />
          </Col>
         </Row>
      </Container>
    );
  }
}


export default App;
