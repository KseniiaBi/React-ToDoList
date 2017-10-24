import React, { Component } from 'react';
import './App.css';
import {Textbox, Btn, Tasklist } from './Components';


class App extends Component{

  render(){
    return(
      <div className="wrapper">
        <CategoryManager />
        <ToDoList />
      </div>
    );
  }

}

class ToDoList extends Component {

  constructor(props){
    super(props);

    this.onSaveTask = this.onSaveTask.bind(this);
    this.onTypeText = this.onTypeText.bind(this);
    this.state = {
      newtask: '',
      tasks: [ ]
    }
  }

  onSaveTask(){
    this.setState({
      tasks: [...this.state.tasks, this.state.newtask],
      newtask: '' 
    });
    this.taskInput.value = '';
  }


  onTypeText = (event) => {
    this.setState({ 
        newtask: this.taskInput.value
    });
  }


  render() {
    return (
        <div className="taskwrap">
          <h1 className="App-title">To Do List</h1>
          <Textbox onTextAdded = {this.onTypeText} value={this.state.newtask} inputRef={(input) => { this.taskInput = input; }} />
          <Btn onButtonClicked={this.onSaveTask} />
          
          <Tasklist tasks={this.state.tasks}  />
        </div>
    );
  }
}

class CategoryManager extends Component{

  constructor(props){
    super(props);

  
    this.onSaveCat = this.onSaveCat.bind(this);
    this.onCatDelete = this.onCatDelete.bind(this);
    this.onCatEdit = this.onCatEdit.bind(this);
    this.onSubcatAdd = this.onSubcatAdd.bind(this);
    this.onTypeText = this.onTypeText.bind(this);

    this.state = {
      els: 0,
      categories: [],
      newcat: {
        parent: null,
        id: 0,
        name: '',
        children: [],
        tasks: []
      }
    }
  }

  onSaveCat(){
    const count = this.state.els + 1;
    this.setState({
    els: count,
    newcat: {
      parent: undefined,
      id: count,
      name: this.catInput.value,
      children: [],
      tasks: []
    }
  });
    this.setState({
      categories: [...this.state.categories, this.state.newcat],
      newcat: {} ,
    });
    this.catInput.value = '';
  }

  onCatDelete(id){
    var list = this.state.categories.splice();
    list.slice(id, 1);
    this.setState({
      categories: list
    });
  }

  onCatEdit(){

  }

  onSubcatAdd(){

  }

  onTypeText() {
    this.setState({ 
        newcat: {
          name: this.catInput.value
        } 
    });
  }

  render() {
    return(
      <div className="categories">
        <Textbox onTextAdded = {this.onTypeText} value={this.state.newcat} inputRef={(input) => { this.catInput = input; }} />
        <Btn onButtonClicked={this.onSaveCat} />
        <CategoryList list={ this.state.categories } onCatDelete={  this.onCatDelete }/>
      </div>
    );
  }
}

const CategoryList = ({list, onCatDelete}) => (

    <ol className='catlist'>
        {
         list.map(data => <Category key={ data.id } { ...data } onCatDelete={() =>onCatDelete(data.id) }/>)
        }
    </ol>
);

const Category = ({ id, name, desc, onCatDelete }) => (

      <li key={id}>
        {name}
        <span className="controls"> 

          <i className="fa fa-plus" aria-hidden="true"></i>
          <i className="fa fa-pencil" aria-hidden="true"></i>
          <i className="fa fa-trash-o" aria-hidden="true" onClick={ () => onCatDelete(id)} ></i>

        </span> 
      </li>
  );
export default App;
