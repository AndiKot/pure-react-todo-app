import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

    changeFilterStatus(elements, filter) {
        elements.forEach((element) => {
            return element.innerText === filter
                ? element.className = 'btn btn-info'
                : element.className = 'btn btn-outline-secondary'
        });
    }

    onFilterChange = (e) => {
        const filter = e.target.innerText;

        this.changeFilterStatus(e.currentTarget.childNodes, filter);
        this.props.onFilterItems(e.target.innerText.toLowerCase());
    }

    render () {
        return (
            <div className="btn-group"
                onClick={this.onFilterChange}>
                <button type="button"
                        className="btn btn-info">
                    All
                </button>
                <button type="button"
                        className="btn btn-outline-secondary">
                    Active
                </button>
                <button type="button"
                        className="btn btn-outline-secondary">
                    Done
                </button>
            </div>
        );
    }
}
