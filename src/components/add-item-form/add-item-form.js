import React, { Component } from 'react';

import './add-item-form.css';

export default class AddItemForm extends Component{
    constructor() {
        super();

        this.state = {
            label: '',
        }
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        this.props.onAddItem(this.state.label || 'Default task');
        this.setState({
            label: '',
        })
    }

    render() {
        return (
            <form className="add-item-form d-flex"
                onSubmit={ this.onSubmit }>
                <input type="text"
                    className="form-control"
                    onChange={ this.onLabelChange }
                    value={ this.state.label }
                    placeholder="What needs to be done?" />

                <button className="btn btn-outline-secondary">
                    Add item
                </button>
            </form>
        );
    }
}
