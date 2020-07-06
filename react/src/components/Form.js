import React from 'react'
import axios from 'axios'

export default class Form extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      name: '',
      info: '',
      category_id: '',
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    const postName = this.state.name
    console.log(postName)
    axios.post('http://localhost:5000/item/${postName}', this.state)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
    //TODO - https://www.youtube.com/watch?v=x9UEDRbLhJE - 4:30
  }

  render(){
    const {name, info, category_id} = this.state
    //POST needs a server - <form method="POST">
    return(
      <form onSubmit={this.submitHandler}>
        <input type="text" placeholder="name" name="name"
        value={name} onChange={this.changeHandler} />
        &nbsp;
        <input type="text" placeholder="info" name="info"
        value={info} onChange={this.changeHandler} />
        &nbsp;
        <input type="number" placeholder="category ID" name="category_id"
        value={category_id} onChange={this.changeHandler}/>
        &nbsp;
        <button type="submit"> Submit </button>
      </form>
    )
   }
}
