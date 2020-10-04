import React from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Form from "./components/Form";
import Body from "./components/Body";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    //need to have super(props) for constructor
    super(props); //super just calls React.Component

    this.state = {
      articleItems: [], // Items from Database
      //need to append data to here after POST request from Form.js
      selectedArticle: null,
      formToShow: "post",
      // state to pass from forms to sidebar
      name: "",
      info: "",
      category_id: "",
    };
    this.onSelectedItem = this.onSelectedItem.bind(this);
  }

  onSelectedItem(selectedId) {
    this.getArticleById(selectedId);
  }

  getArticleById(articleItemId) {
    this.state.articleItems.filter((articleItem) => articleItem.id);
    const info = this.state.articleItems.filter(
      (articleItem) => articleItemId === articleItem.id
    );
    const result = info.length > 0 ? info[0] : null;
    this.setState({ selectedArticleItem: result });
  }

  componentDidMount() {
    //get info from Database
    const url = "http://localhost:5000/items";
    axios
      .get(url)
      .then((response) => {
        const articleItems = response.data.items;
        this.setState({ articleItems: articleItems });
      })
      .catch((err) => console.log(err + " error"));
  }

  showComponent(value) {
    this.setState({ formToShow: value });
  }

  passCreateArticleItemDataToParent = (newArticleItem) => {
    // Cannot update state directly, create a copy and update it with setstate instead.
    const tempArticleItems = this.state.articleItems;
    tempArticleItems.push(newArticleItem);

    this.setState({
      articleItems: tempArticleItems,
    });
  };

  passDeleteArticleItemIdToParent = (article_id) => {
    // Cannot update state directly, create a copy and update it with setstate instead.
    const tempArticleItems = this.state.articleItems.filter(
        (eachArticleItem) => eachArticleItem.id != article_id
    );
    // remove the article item with id == article_id from the array, so any articleItem.id != article_id gets put in the temp array, which gets saved back to state thus not removed in the frontend
    // and only the article item with an article id matching the article_id that gets passed in gets omitted and deleted on the frontend to keep frontend in sync with the backend
    this.setState({
      articleItems: tempArticleItems,
    });
  };

  render() {
    return (
      <Container
        fluid
        style={{ minHeight: "100%", backgroundColor: "#576166" }}
      >
        <Row style={{ minHeight: "100%" }}>
          <SideBar
            articleItems={this.state.articleItems}
            onSelect={this.onSelectedItem}
          />
          <Col md="10">
            <Header selectedArticle={this.state.selectedArticleItem} />
            <br />
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select Request
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    this.showComponent("post");
                  }}
                >
                  POST
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    this.showComponent("put");
                  }}
                >
                  PUT
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    this.showComponent("delete");
                  }}
                >
                  DELETE
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <br />
            <Form
              articleItems={this.state.articleItems}
              formToShow={this.state.formToShow}
              passCreateArticleItemDataToParent={this.passCreateArticleItemDataToParent}
              passDeleteArticleItemIdToParent={this.passDeleteArticleItemIdToParent}
            />
            <br />
            <Body selectedArticle={this.state.selectedArticleItem} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
