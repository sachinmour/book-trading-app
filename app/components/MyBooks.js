import React from "react";
import axios from "axios";

class MyBooks extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            query: "",
            title: "",
            author: "",
            books: [],
            error: ""
        }
    }

    bookIsDuplicate(book) {
        var length = this.state.books.length;
        for (var i = 0; i < length; i++) {
            if (this.state.books[i]._id === book._id) {
                return true;
            }
        }
        return false;
    }

    handleSubmit(e) {
        if (e) e.preventDefault();
        var _this = this;
        _this.setState({
            error: ""
        });
        if (_this.state.query || _this.state.title || _this.state.author) {
            axios.get('/bookSearch', {
                    params: {
                        query: _this.state.query,
                        title: _this.state.title,
                        author: _this.state.author
                    }
                })
                .then(function(response) {
                    if (!response.data.redirect && response.data._id) {
                        var book = { _id: response.data._id, image: response.data.image, user: response.data.user }
                        var data = _this.state.books;
                        console.log(data);
                        if (!_this.bookIsDuplicate(book)) {
                            data.push(book);
                            _this.setState({
                                books: data
                            });
                        }
                    } else if (response.data.error) {
                        _this.setState({
                            error: response.data.error
                        });
                    }
                });
        }
    }

    handleChange(e) {
        var nextState = {};
        nextState[e.target.placeholder.toLowerCase()] = e.target.value;
        this.setState(nextState);
    }

    render() {

        var bookHtml = this.state.books.map(function(book) {
            return <img src={book.image} key={book._id}/>;
        });

        return (
            <div>
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
					<button type='submit'>Add</button>
				</div>
			</form>
			<p id="error">{ this.state.error }</p>
			{bookHtml}
			</div>
        );
    }

}

export default MyBooks;
