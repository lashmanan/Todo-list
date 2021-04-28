import React, { Component } from 'react'
/* uuid package */ 
import uuid from 'uuid'
/* importing * components */ 
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

class App extends Component {
	constructor(props) {
		super(props);
		/* lifting up the entire state to be shared upon other components */ 
		this.state={
			items: [],     /*todo array */
			itemsToShow: "all",  /*todo category */
			id: uuid(),  /* id */
			item: '',    /* todo input value */
			editItem: false,  /*bool to editItem check */
		};
	}
	/* handling out onChange event on the input element via event handler function */ 
	handleChange = event => {
		/* modifying the state's item value to the targeted element's value */ 
		this.setState({
			item: event.target.value
		})
	}
	/* handling submit event on the entire form (todoInput component) */ 
	handleSubmit = event => {
		event.preventDefault();
		/* creating new obj to be added in the items array of our managed state */ 
		const newItem = {
			/* 3 properties defining the added item (id,title,completed) */ 
			id: this.state.id,
			title: this.state.item,
			completed: false
		}
		/* merging the older state's items array with the newly created obj into the item's array */ 
		const updatedItems = [...this.state.items, newItem]
		/* updating the items array with the above created array */ 
		if (this.state.item.length > 0) {
			this.setState({
				items: updatedItems,  /* older items array with newly created array */
				id: uuid(),
				item: '',
				editItem: false
			})
		}
	}
	/* categorizing todo's in 3 categories */ 
	updateTodosToShow = string => {
		this.setState({
			itemsToShow: string   /* all || done || todo */
		});
	};

	handleDoneTask = (id, completed) => {
		const filteredItems = this.state.items.map(item => {
			item.id === id && (item.completed = !item.completed)
			return item
		})

		this.setState({
			items: filteredItems,
		})
	}
	/* deleting elements from the items array through their id property */
	handleDelete = id => {
		/* returning out only those elements which are not triggered with this function */
		const filteredItems = this.state.items.filter(item => item.id !== id)
		/* updating the items array */
		this.setState({
			items: filteredItems
		})
	}

	handleEdit = id => {
		/* similar to deleting the array (filtering only those elements not triggered by this handler) */
		const filteredItems = this.state.items.filter(item => item.id !== id)
		/* getting the selected item through find with a callback  function */
		const selectedItem = this.state.items.find(item => item.id === id)

		this.setState({
			items: filteredItems,
			id: id,
			item: selectedItem.title,
			editItem: true
		})
	}
	/* deleting the done todos */
	handleDeleteDoneTasks = () => {
		/* filtering the array as it has only those elements whose completed prop is true */
		const filteredItems = this.state.items.filter(item => item.completed === false)

		this.setState({
			items: filteredItems
		})
	}
	/* making the items array empty */
	clearList = () => {
		this.setState({
			items: []
		})
	}
	/* rendering the UI */
	render() {
		let items = []
		/* changing items array according to the category selection */
		if (this.state.itemsToShow === "all") {
			/* items array to be the entire array */
			items = this.state.items;
		} else if (this.state.itemsToShow === "todo") {
			/* items array to be those elements whose completed prop is false  */
			items = this.state.items.filter(item => item.completed === false);
		} else if (this.state.itemsToShow === "done") {
			/*items array to be those elements whose completed prop is true */
			items = this.state.items.filter(item => item.completed === true);			
		}

		return (
			/* parent container */
			<div className="container">
			{ /* row  */ }
				<div className="row">
				{ /* col layout which stacks in the smaller screen devices and equals to 8 col width from medium to extralg screen devices */ }
					<div className="col-12 col-md-8 mx-auto mt-4">
					{/* passing out the required props (eventhandler function, input value) */ }
						<h3 className="text-capitalize text-center">TodoInput</h3>
						<TodoInput
							item={this.state.item}
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
						/>
						{ /* passing every event handler function as props along with the items array */}
						<TodoList
							items={items}
							filterDoneTasks={this.filterDoneTasks}
							clearList={this.clearList}
							handleDelete={this.handleDelete}
							handleEdit={this.handleEdit}
							handleDoneTask={this.handleDoneTask}
							handleDeleteDoneTasks={this.handleDeleteDoneTasks}
							updateTodosToShow={this.updateTodosToShow}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
