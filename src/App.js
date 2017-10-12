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
    this.setState({
      tasks: [...this.state.tasks, this.state.newtask],
      newtask: ' ' 
    });
  }



  render() {
    return (
        <div className="wrapper">
          <h1 className="App-title">To Do List</h1>
          <Textbox />
          <input type="submit" value="Save" onClick={this.onSaveTask} />
          <List tasks={this.state.tasks}  />
        </div>
    );
  }
}

export default App;
