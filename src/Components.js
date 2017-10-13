import React, { Component } from 'react';



export class Textbox extends Component{

    constructor(props){
        super(props);
        this.onTypeText = this.onTypeText.bind(this);
        this.state={
            content: ''
        }
    }

  onTypeText = (event) => {
    this.setState({ 
        content: event.target.value 
    });
  }
    render(){
    return(
        <input type="text" value={this.state.content} onChange={this.onTypeText} placeholder="Type your task here"  />
    );
    }
}
    
export class Btn extends Component{
    render(){
        return(
            <button onClick={this.props.onButtonClicked}>
            Save
            </button>
        );
    }
}


export const List = props => (

    <ul>
    {
        props.tasks.map((task, index) => <li key={index}>{task}</li>) 
    }
    </ul>
)
