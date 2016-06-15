import React from "react";

class Book extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        var trade;
        var _this = this;
        if (_this.props.book.user !== _this.props.user_id && _this.props.book.requested === false) {
            trade = <div className="exchange" onClick={(e) => _this.handleDelete(e)}><i className="fa fa-exchange" aria-hidden="true"></i></div>
        }

        return (
            <div className="book">
				<img src={_this.props.book.image} />
					{trade}
			</div>
        );
    }

}

export default Book;
