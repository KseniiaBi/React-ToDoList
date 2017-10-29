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
    this.onTypeText = this.onTypeText.bind(this);

    this.state = {
      categories: [],
      elCount: 0,
    }
  }

  onSaveCat(id){
    const newCount = this.state.elCount+ 1;
    this.setState({
      categories: [...this.state.categories, {
        parent: id,
        id: newCount,
        name: this.catInput.value,
        children: [],
        tasks: []
      }],
      elCount: newCount
    });
    this.catInput.value = '';
    this.catInput.focus();
  }

  onCatDelete(id){
    const list = this.state.categories.slice();
    for(let i=0; i< list.length; i++){
      if(list[i].id === id){
        list.splice(i, 1);
      }
    }
    this.setState({
      categories: list
    });
  }

  onCatEdit(){

  }


  onTypeText() {

  }

  render() {
    return(
      <div className="categories">
        <Textbox onTextAdded = {this.onTypeText} value={this.state.newcat} inputRef={(input) => { this.catInput = input; }} />
        <Btn onButtonClicked={()=>this.onSaveCat(0)} />
        <CategoryList parent={0} list={ this.state.categories } onCatDelete={  this.onCatDelete } onSubcatAdd={this.onSubcatAdd}/>
      </div>
    );
  }
}

const CategoryList = ({list, parent, onCatDelete, onSaveCat}) => (

    <ol className='catlist'>
        {
          //list.map(data => <Category key={ data.id } { ...data } onCatDelete={() => onCatDelete(data.id) } onSaveCat={() => onSaveCat(data.id) } />)
          list.map(function(list, parent){
            if(list.parent == 0){
              return <Category key={ list.id } { ...list } onCatDelete={() => onCatDelete(list.id) } onSaveCat={() => onSaveCat(list.id) } />
            }
            return false;
          })
        }
    </ol>
);



const Category = (props) => (

        <li key={props.id}>
        {props.name}
        <span className="controls"> 

          <i className="fa fa-plus" aria-hidden="true" onClick={()=> props.onSaveCat(props.id)}></i>
          <i className="fa fa-pencil" aria-hidden="true"></i>
          <i className="fa fa-trash-o" aria-hidden="true" onClick={ () => props.onCatDelete(props.id)} ></i>

        </span> 
        {
          props.children.length > 0 &&
          <CategoryList parent={props.id} list={ props.list} onCatDelete={() => props.onCatDelete(props.id) } onSubcatAdd={() =>props.onSaveCat(props.id)}/>
        }
       
      </li>
      
  );


export default App;
