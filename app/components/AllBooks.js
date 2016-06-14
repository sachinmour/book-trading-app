import React from "react";

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
        return (

        );
    }

}

export default AllBooks;
