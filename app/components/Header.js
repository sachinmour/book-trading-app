import React from 'react';
import axios from 'axios';

class Header extends React.Component{
  
  constructor(props, context){
    super(props, context);
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    var _this = this;
    axios.get('/getUser')
    .then(function (response) {
      if (!response.data.redirect) {
        _this.setState({user: response.data});
      }
    });
  }

  render() {
    
    var links;

    if (this.state.user.displayName) {
      links =  <div><a href="/all">All Books</a>
                <a href="/my">My Books</a>
                <a href="/setting"><i class="fa fa-cog" aria-hidden="true"></i></a>
                <a href="/logout"><i class="fa fa-power-off" aria-hidden="true"></i></a></div>;
    } else {
      links = <a href="/auth/twitter">Login</a>;
    }

    return (
      <div id="top">
          <div id="header">
              <div id="name">
                <a href="/">booktrade</a>
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