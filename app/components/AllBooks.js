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

    render() {

        var _this = this;
        var bookHtml = _this.state.books.map(function(book) {

            var trade;
            if (book.user !== _this.state.user_id && book.traded === false) {
                trade = <p className="close" onClick={(e) => _this.handleDelete(e)}>x</p>
            }

            return <div className="book" key={book._id}>
                  <img src={book.image}/>
                  {trade}
                </div>;
        });

        return (
            <div id="allbooks">
              {bookHtml}
            </div>
        );
    }

}

export default AllBooks;
