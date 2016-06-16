import React from "react";
import axios from "axios";

class Setting extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: "",
            city: "",
            state: ""
        }
    }

    componentWillMount() {
        var _this = this;
        axios.get('/getUser')
            .then(function(response) {
                if (!response.data.redirect) {
                    var user = response.data;
                    _this.setState({
                        name: user.displayName,
                        city: user.city,
                        state: user.state
                    });
                }
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        var _this = this;
        axios.post('/setting', this.state)
            .then(function(response) {
                _this.setState({
                    name: response.data.user.displayName,
                    city: response.data.user.city,
                    state: response.data.user.state
                });
            });
    }

    handleChange(e) {
        var nextState = {};
        nextState[e.target.placeholder.toLowerCase()] = e.target.value;
        this.setState(nextState);
    }

    render() {
        var _this = this;
        return (
            <div id="settings">
        		<h2>Update Profile</h2>
	            <form onSubmit={(e) => _this.handleSubmit(e)}>
	                <div className="input">
	                    <input type="text" placeholder="Name" value={_this.state.name} onChange={(e) => _this.handleChange(e)}/>
	                </div>
	                <div className="input">
	                    <input type="text" placeholder="City" value={_this.state.city} onChange={(e) => _this.handleChange(e)}/>
	                </div>
	                <div className="input">
	                    <input type="text" placeholder="State" value={_this.state.state} onChange={(e) => _this.handleChange(e)}/>
	                </div>
	                <div id="search">
	                    <button type='submit'>Save</button>
	                </div>
	            </form>
            </div>
        );
    }

}

export default Setting;
