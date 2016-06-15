import React from 'react';
import axios from 'axios';
import { Link } from 'react-router'
import Requests from './Requests';

class Header extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        var links;

        if (this.props.user.displayName) {
            links = <div>
                        <Link to="/all">All Books</Link>
                        <Link to="/my">My Books</Link>
                        <Link to="/settings"><i className="fa fa-cog" aria-hidden="true"></i></Link>
                        <a href="/logout"><i className="fa fa-power-off" aria-hidden="true"></i></a>
                    </div>;
        } else {
            links = <a href="/auth/twitter">Login</a>;
        }

        return (
            <div id="top">
                <div id="header">
                    <div id="name">
                        <Link to="/">booktrade</Link>
                    </div>
                    <div id="authenticated">
                        {links}
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;
