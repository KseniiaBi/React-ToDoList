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
      categories: [],
      elCount: 0
    }
  }

  onSaveCat(id){
    const newCount = this.state.elCount + 1;
    this.setState({
      categories: [...this.state.categories, {
        parent: undefined,
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

  onSubcatAdd(index, subcatName){
    const newCount = this.state.elCount + 1;
    const list = this.state.categories.slice();

    let parentId;

    for(let i=0;i<list.length;i++){
      if(list[i].id === index){
        parentId = i;
      }
    }
    
    const newCat = {
      parent: list[parentId].id,
      id: newCount,
      name: subcatName,
      children: [],
      tasks: []
    }
    list[parentId].children.push(newCat);
    this.setState({
      categories: list,
      elCount: newCount
    });
  }

  onTypeText() {
    // this.setState({ 
    //     newcat: {
    //       name: this.catInput.value
    //     } 
    // });
  }

  render() {
    return(
      <div className="categories">
        <Textbox onTextAdded = {this.onTypeText} value={this.state.newcat} inputRef={(input) => { this.catInput = input; }} />
        <Btn onButtonClicked={this.onSaveCat} />
        <CategoryList list={ this.state.categories } onCatDelete={  this.onCatDelete } onSubcatAdd={this.onSubcatAdd}/>
      </div>
    );
  }
}

const CategoryList = ({list, onCatDelete, onSubcatAdd}) => (

    <ol className='catlist'>
        {
         list.map(data => <Category key={ data.id } { ...data } onCatDelete={() =>onCatDelete(data.id) } onSubcatAdd={() =>onSubcatAdd(data.id) } />)
        }
    </ol>
);

class Category extends Component{
  constructor(props){
    super(props);

    this.onEditTurnedOn = this.onEditTurnedOn.bind(this);
    this.onEditTurnedOff = this.onEditTurnedOff.bind(this);

    this.state = {
      isEditing: false
    }
  }

  onEditTurnedOn(){
    this.setState({
      isEditing: true
    });
  }
  onEditTurnedOff( id){
    this.setState({
      isEditing: false
    });
    const subcatName = this.subcatInput.value; 
    debugger;
    this.props.onSubcatAdd(id, subcatName);
  }

  render(){
    return(
      <li key={this.props.id}>
        {this.props.name}
        <span className="controls"> 

          <i className="fa fa-plus" aria-hidden="true" onClick={this.onEditTurnedOn}></i>
          <i className="fa fa-pencil" aria-hidden="true"></i>
          <i className="fa fa-trash-o" aria-hidden="true" onClick={ () => this.props.onCatDelete(this.props.id)} ></i>

        </span> 
         {  this.props.children.length > 0 &&
          <CategoryList list={this.props.children} onCatDelete={() => this.props.onCatDelete(this.props.children.id)} onSubcatAdd={() => this.props.onSubcatAdd(this.props.children.id)} />  
        }              
       {
          this.state.isEditing &&
          <div>
            <input type="text" ref={(input) => { this.subcatInput = input; }} />
            <Btn onButtonClicked={()=> this.onEditTurnedOff( this.props.id)} />
          </div>
         }
      </li>
    )
  }


}

// const Category = ({ id, name, desc, children,inEditMode, onCatDelete, onSubcatAdd }) => (

//       <li key={id}>
//         {name}
//         <span className="controls"> 

//           <i className="fa fa-plus" aria-hidden="true" onClick={()=> inEditMode = !inEditMode}></i>
//           <i className="fa fa-pencil" aria-hidden="true"></i>
//           <i className="fa fa-trash-o" aria-hidden="true" onClick={ () => onCatDelete(id)} ></i>

//         </span> 
//         {
//           children.length > 0 &&
//           <CategoryList list={children} onCatDelete={() =>onCatDelete(children.id)} />  
//         }              
//         {
//           inEditMode &&
//           <form>
//             <Textbox onTextAdded = {this.onTypeText} value={this.state.newcat} inputRef={(input) => { this.catInput = input; }} />
//             <Btn onButtonClicked={() => onSubcatAdd(id)} />
//           </form>
//         }
//       </li>
//   );


export default App;
