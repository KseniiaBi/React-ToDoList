import React, { Component } from 'react';
import './App.css';
import {Textbox, Btn, List }from './Components';


class App extends Component {

  constructor(props){
    super(props);

    this.onSaveTask = this.onSaveTask.bind(this);
    this.state = {
      isEmpty: true,
      newtask: '',
      tasks: [ ]
    }
  }

  onSaveTask(){
    console.log(this.state.newtask);
    this.setState({
      tasks: [...this.state.tasks, this.state.newtask],
      newtask: ' ' 
    });
  }


  render() {
    return (
        <div className="wrapper">
          <h1 className="App-title">To Do List</h1>
          <Textbox onTextAdded = {this.props.onTypeText} value={this.state.newtask} />
          <Btn onButtonClicked={this.onSaveTask} />
          <List tasks={this.state.tasks}  />
        </div>
    );
  }
}

export default App;
