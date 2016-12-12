import React from 'react';
import { connect } from 'react-redux'
import { addTodo } from '../actionCreator'

let AddTodo =  ({d})=>{
    let inputEle;
    return (
        <div>
            <input ref={node=>{inputEle = node; }}/>
            <button onClick= {
                ()=>{
                    if(inputEle.value!=="")
                    {
                        d(addTodo(inputEle.value))
                        inputEle.value= "";
                    }
                }
            }>Add Todo</button>
        </div>
    );
};
AddTodo = connect(null, (d) => {
    return { d };
})(AddTodo);

export default AddTodo;