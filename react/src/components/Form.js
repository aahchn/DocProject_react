import React from 'react'
import axios from 'axios'

export default class Form extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      name: '',
      //deleteName: '',
      info: '',
      category_id: '',
      artItems: this.props.articleItems
    }
  }

  postChangeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  putChangeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  deleteChangeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  postSubmitHandler = (e) => {
    e.preventDefault()
    console.log(this.state) // outputs the state of the computer
    const name = this.state.name
    return axios.post('http://localhost:5000/item/'+name, this.state)
     .then(response => {
        if(response.data != null){ alert("created successfully"); }
     })
      .catch(error => {
         console.log(error)
      })
  }

  putSubmitHandler = (e) => {
    e.preventDefault()
    const name = this.state.name
    axios.put('http://localhost:5000/item/'+name, this.state)
     .then(response => {
       if(response.data != null){ alert("updated successfully"); }
     })
     .catch(error => {
        console.log(error)
     })
  }

  //https://www.youtube.com/watch?v=UAJpKl5gg6A
  // this.state also need to delete info and category_id?
  deleteSubmitHandler = (e) => {
    e.preventDefault()
    const name = this.state.name
    axios.delete('http://localhost:5000/item/'+name)
      .then(response => {
        if(response.data != null){ alert("deleted successfully"); }
      })
      .catch(error => {
        throw error.response
      })
    }

  postForm(){
    const {name, info, category_id} = this.state
    return (
      <form onSubmit={this.postSubmitHandler}>
       <h5> POST </h5>
         <input type="text" placeholder="name" name="name"
          value={name} onChange={this.postChangeHandler} required />
         &nbsp;
         <input type="text" placeholder="info" name="info"
          value={info} onChange={this.postChangeHandler} />
         &nbsp;
         <input type="number" placeholder="category ID" name="category_id"
          value={category_id} onChange={this.postChangeHandler} required />
         &nbsp;
         <button type="submit"> Post </button>
      </form>
      )
  }

  putForm(){
   const {name, info, category_id} = this.state
   return(
     <form onSubmit={this.putSubmitHandler}>
     <h5> PUT </h5>
       <input type="text" placeholder="name" name="name"
       value={name} onChange={this.putChangeHandler} required />
       &nbsp;
       <input type="text" placeholder="info" name="info"
       value={info} onChange={this.putChangeHandler} />
       &nbsp;
       <input type="number" placeholder="category ID" name="category_id"
       value={category_id} onChange={this.putChangeHandler} />
       &nbsp;
       <button type="submit"> Put </button>
     </form>
   )
  }

  deleteForm(){
    const {name, info, category_id} = this.state
    return(<form onSubmit={this.deleteSubmitHandler}>
     <h5> DELETE </h5>
       <input type="text" placeholder="name" name="name"
       value={name} onChange={this.deleteChangeHandler} />
       &nbsp;
       <button type="submit"> Delete </button>
     </form>
   )
  }

  switchFormBody = () => {
    var formBody = null;
    switch (this.props.formToShow) {
      case "post":
        formBody = this.postForm()
        break;
      case "put":
        formBody = this.putForm()
        break;
      case "delete":
        formBody = this.deleteForm()
        break;
      default:
        return null;
    }
    return formBody;
  }

  render(){

    // console.log(this.artItems) //UNDEF
    return(
      <div>
      { this.switchFormBody() }
      </div>
    )
   }
}
