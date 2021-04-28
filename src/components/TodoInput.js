import React, { Component } from 'react'
/* named export ( usage of {} while importing ) */
export default class TodoInput extends Component {
    render() {
        /* Destructuring the entire received props object as new varuable instances */
        const {item, handleChange, handleSubmit, editItem} = this.props  
        
        return (
            /* returning the whole UI as a card body */
            <div className="card card-body my-3">
            {/* binding the event listener to a destructured event handler function*/}
                <form onSubmit={handleSubmit}>
                {/* using bootstrap's input group component with an icon */}
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-info text-white">
                                <i className="fas fa-book" />
                            </div>
                        </div>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="New Todo"
                            value={item}  /* destructured item value */
                            onChange={handleChange} /* "" "" handlechange event function */
                        />
                    </div>
                    <button 
                        type="submit"
                        className={`btn btn-block mt-3 ${editItem ? 'btn-success' : 'btn-info'}`}
                    >
                        {editItem ? 'Edit task' : 'Add new task'}
                    </button>
                </form>
            </div>
        )
    }
}
