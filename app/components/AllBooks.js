import React from "react";
import axios from "axios";
import Book from "./Book";

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

    render() {

        var _this = this;
        var bookHtml = _this.state.books.map(function(book) {
            return <Book key={book._id} book={book} user_id={_this.state.user_id}/>
        });

        return (
            <div id="allbooks">
              {bookHtml}
            </div>
        );
    }

}

export default AllBooks;
