import React from "react";
import axios from "axios";

class AllBooks extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user_id: "",
            books: []
        }
    }

    componentWillMount() {
        var _this = this;
        axios.get('/getallbooks')
            .then(function(response) {
                _this.setState({
                    books: response.data.books,
                    user_id: response.data.user_id
                });
            });
    }

    requestBook(book) {
        var _this = this;
        var booksNew = this.state.books;
        for (var b of booksNew) {
            if (b._id === book._id) {
                b.requested = true;
                console.log(b);
                break;
            }
        }
        console.log(booksNew);
        this.setState({
            books: booksNew
        });
        axios.post('/newRequest', { book_id: book._id })
            .then(function(response) {
                if (!response.data.requestMade) {
                    for (var b of booksNew) {
                        if (b._id === book._id) {
                            b[requested] = false;
                            break;
                        }
                    }
                    this.setState({
                        books: booksNew
                    });
                }
            })
            .catch(function(response) {
                console.log(response.data);
            });
    }

    render() {

        var _this = this;
        var bookHtml = _this.state.books.map(function(book) {
            var trade;
            if (book.user !== _this.state.user_id && book.requested === false) {
                trade = <div className="exchange" onClick={(e) => _this.requestBook(book)}><i className="fa fa-exchange" aria-hidden="true"></i></div>
            }

            return (
                <div className="book" key={book._id}>
                    <img src={book.image} />
                    {trade}
                </div>
            );
        });

        return (
            <div id="allbooks">
              {bookHtml}
            </div>
        );
    }

}

export default AllBooks;
