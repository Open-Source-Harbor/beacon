import React, { Component } from 'react';

class ToDo extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div className="todo">
                <form>
                    <div>
                    <input type="submit" value="+" />
                    <input type="text" placeholder="Add to do..."/>
                    
                    </div>
                </form>
			</div>
		);
	}
}

export default ToDo;
