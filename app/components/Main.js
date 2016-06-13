import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import WelcomeBody from "./WelcomeBody";

class Main extends React.Component{
  
  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
   		<div>
			<Header />
			{this.props.children}
			<Footer />
      	</div>
    );
  }
  
}

export default Main;