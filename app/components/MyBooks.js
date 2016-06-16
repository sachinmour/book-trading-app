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

    componentWillMount() {
        var _this = this;
        axios.get('/getmybooks')
            .then(function(response) {
                _this.setState({
                    books: response.data.books
                });
            });
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
            error: "",
            query: "",
            title: "",
            author: ""
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
                        if (!_this.bookIsDuplicate(response.data)) {
                            _this.setState({
                                books: [..._this.state.books, response.data]
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

    handleDelete(e) {
        var _this = this;

        var removeBook = this.state.books.filter(function(book) {
            return book.image === e.target.previousSibling.src;
        });

        if (removeBook[0] && removeBook[0]._id) {
            _this.setState({
                books: _this.state.books.filter(function(book) {
                    return book._id !== removeBook[0]._id;
                })
            });
            axios.post('/deleteBook', removeBook[0])
                .then(function(response) {});
        }
    }

    render() {
        var _this = this;
        var bookHtml = this.state.books.map(function(book) {
            return <div className="mybook" key={book._id}>
            			<img src={book.image}/>
                        <i className="fa fa-times" onClick={(e) => _this.handleDelete(e)} aria-hidden="true"></i>
            		</div>;
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
				<div id="mybooks">
					{bookHtml}
				</div>
			</div>
        );
    }

}

export default MyBooks;
