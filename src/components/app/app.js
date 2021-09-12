import React, { Component } from 'react';

import TodoList from "../todo-list";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import AddItemForm from "../add-item-form";

import './app.css';

export default class App extends Component {
    constructor() {
        super();

        this.idx = 0;

        this.state = {
            todoData: [
                this.createTodoItem('Drink Coffee'),
                this.createTodoItem('Make Awesome App'),
                this.createTodoItem('Have a lunch'),
            ],
            term: '',
            filter: 'active',
        };
    }

    createTodoItem = (label) => {
        return {
            label,
            important: false,
            done: false,
            id: this.idx++,
        };
    }

    changeProperty = (todoData, id, propName) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const newData = [ ...todoData ];
        newData[idx][propName] = !newData[idx][propName];

        return newData;
    }


    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newData = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newData,
            };
        });
    }

    addItem = (text) => {
        this.setState(({ todoData }) => {
            return {
                todoData: [...todoData, this.createTodoItem(text)],
            };
        });
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
               todoData: this.changeProperty(todoData, id, 'important')
            };
        });
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.changeProperty(todoData, id, 'done')
            };
        });
    }

    searchItems = (items, term) => {
        if (term.label === '') {
            return items;
        }

        return items.filter((item) => item.label.toLowerCase().includes(term.toLowerCase()));
    }

    filterItems = (items, filter) => {
        switch (filter) {
            case 'done':
                return items.filter((item) => item.done);
            case 'active':
                return items.filter((item) => !item.done);
            case 'all':
            default:
                return items;
        }
    }

    onSearchChange = (term) => {
        this.setState({ term });
    }

    onFilterItems = (filter) => {
        this.setState({ filter });
    }

    render() {
        const { todoData, term, filter } = this.state;

        let visibleItems = this.searchItems(todoData, term);

        visibleItems = this.filterItems(visibleItems, filter);

        const doneCount = todoData.reduce((acc, { done }) => done === true ? acc + 1 : acc, 0);

        return (
            <div className="todo-app">
                <AppHeader toDo={ todoData.length - doneCount } done={ doneCount }/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                        onFilterItems={this.onFilterItems}/>
                </div>
                <TodoList
                    onDeleted={ this.deleteItem }
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                    todos={ visibleItems } />
                <AddItemForm
                    onAddItem={ this.addItem }/>
            </div>
        );
    }
}
