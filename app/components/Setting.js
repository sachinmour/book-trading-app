import React from "react";
import axios from "axios";

class AllBooks extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            city: this.props.user.city,
            state: this.props.user.state
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/setting', this.state)
            .then(fucntion(response) {

            });
    }

    handleChange(e) {
        var nextState = {};
        nextState[e.target.placeholder.toLowerCase()] = e.target.value;
        this.setState(nextState);
    }

    render() {

        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="input">
                    <input type="text" placeholder="State" value={this.state.state} onChange={(e) => this.handleChange(e)}/>
                </div>
                <div className="input">
                    <input type="text" placeholder="City" value={this.state.city} onChange={(e) => this.handleChange(e)}/>
                </div>
                <div id="search">
                    <button type='submit'>Save</button>
                </div>
            </form>
        );
    }

}

export default Setting;