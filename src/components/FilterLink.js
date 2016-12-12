import React from 'react';
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actionCreator'

const mapStateToFilterProps = (state, ownProps) => {
    return {
        active : ownProps.filter === state.visibilityFilter
    }
};
const mapDispatchToFilterProps = (dispatch, ownProps)=> {
    return {
        onClick : ()=>{
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    }
};

const Link = ({active, children, onClick}) =>{
    if(active) return (<span>{children}</span>);
    return (
        <a href ="#"
           onClick= { e=>{
               e.preventDefault();
               onClick();
           }} >
            {children}
        </a>
    );
}

const FilterLink = connect(mapStateToFilterProps, mapDispatchToFilterProps)(Link);

export default FilterLink;