import React, { Component } from 'react';



 export class Textbox extends Component{

    render(){
    return(

        <input type="text" value={this.props.newtask} onChange={this.props.onTextAdded} placeholder="Type your task here" ref={this.props.inputRef} />
    );
    }
}
    
export class Btn extends Component{
    render(){
        return(
            <button className="btn" onClick={this.props.onButtonClicked}>
            Save
            </button>
        );
    }
}


export const Tasklist = props => (

    <ol>
    {
        props.tasks.length > 0 ? props.tasks.map((task, index) => <li key={index}>{task}</li>) : <div align="center"> Any tasks yet. Type your first in input above. </div>
    }
    </ol>
)
