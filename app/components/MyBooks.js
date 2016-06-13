import React from "react";

class MyBooks extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            query: "",
            title: "",
            author: ""
        }
    }

    handleSubmit(e) {
        if (e) e.preventDefault();

    }

    handleChange(e) {
        var nextState = {};
        nextState[e.target.placeholder.toLowerCase()] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
				<div className="input">
					<input type="text" placeholder="Query" value={this.state.query} onChange={(e) => this.handleChange(e)}/>
				</div>
				<div className="input">
					<input type="text" placeholder="Title" value={this.state.title} onChange={(e) => this.handleChange(e)}/>
				</div>
				<div className="input">
					<input type="text" placeholder="Author" value={this.state.author} onChange={(e) => this.handleChange(e)}/>
				</div>
				<div id="search">
					<button type='submit'>Search</button>
				</div>
			</form>
        );
    }

}

export default MyBooks;
