import React from 'react';
import { connect } from 'react-redux'
import { addTodo } from '../actions/index'

let AddTodo =  ({addTodo})=>{
    let inputEle;
    return (
        <div>
            <input ref={node=>{inputEle = node; }}/>
            <button onClick= {
                ()=>{
                    if(inputEle.value!=="")
                    {
                        addTodo(inputEle.value)
                        inputEle.value= "";
                    }
                }
            }>Add Todo</button>
        </div>
    );
};
AddTodo = connect(null,{addTodo})(AddTodo);

export default AddTodo;