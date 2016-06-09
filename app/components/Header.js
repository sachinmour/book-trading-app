import React from "react";

class Header extends React.Component{
  
  render() {
    return (
      <div id="top">
          <div id="header">
              <div id="name"><a href="/">booktrade</a></div>
              <div id="authenticated">
                  <a href="/">Login</a>
                  <a href="/">Login</a>
                  <a href="/">Login</a>
                  <a href="/">Login</a>
              </div>
          </div>
      </div>
    );
  }
  
}

export default Header;