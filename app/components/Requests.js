import React from 'react';
import axios from 'axios';

class Requests extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            requestsMade: [],
            needApproval: []
        }
    }

    componentWillMount() {
        var _this = this;
        axios.get('/getRequests')
            .then(function(response) {
                var requests = response.data.requests;
                if (requests) {
                    _this.setState({
                        requestsMade: requests.filter(function(request) {
                            return request.from === _this.props.user._id
                        }),
                        needApproval: requests.filter(function(request) {
                            return request.to === _this.props.user._id
                        })
                    });
                }
            });
    }

    cancelRequest(request) {

        var _this = this;

        var oldRequests = this.state.requestsMade;
        var newRequests = oldRequests.filter(function(oldRequest) {
            return oldRequest._id !== request._id;
        })

        this.setState({
            requestsMade: newRequests
        });

        axios.post('/cancelRequest', { request_id: request._id })
            .then(function(response) {
                if (!response.data.requestCancelled) {
                    _this.setState({
                        requestsMade: oldRequests
                    })
                }
            })
            .catch(function(response) {
                console.log(response.data);
            });
    }

    rejectApproval(request) {

        var _this = this;

        var oldRequests = this.state.needApproval;
        var newRequests = oldRequests.filter(function(oldRequest) {
            return oldRequest._id !== request._id;
        })

        this.setState({
            needApproval: newRequests
        });

        axios.post('/rejectApproval', { request_id: request._id })
            .then(function(response) {
                if (!response.data.approvalRejected) {
                    _this.setState({
                        needApproval: oldRequests
                    })
                }
            })
            .catch(function(response) {
                console.log(response.data);
            });

    }

    acceptApproval(request) {

    }

    render() {
        var _this = this;

        var requestsMadeHTML = this.state.requestsMade.map(function(request) {
            return <div className="request" key={request._id}>
                        <img src={request.book.image}/>
                        <div className="decision">
                            <i className="fa fa-times" onClick={() => _this.cancelRequest(request)} aria-hidden="true"></i>
                        </div>
                    </div>;
        });

        var needApprovalHTML = this.state.needApproval.map(function(request) {
            return <div className="request" key={request._id}>
                        <img src={request.book.image} />
                        <div className="decision">
                            <i className="fa fa-times" onClick={() => _this.rejectApproval(request)} aria-hidden="true"></i>
                            <i className="fa fa-check" onClick={() => _this.acceptApproval(request)} aria-hidden="true"></i>
                        </div>
                    </div>;
        });

        return (
            <div id="requestsContainer">
                <h2>Requests Made</h2>
                <div id="made" className="requests">
                    {requestsMadeHTML}
                </div>
                <h2>Requests from other users</h2>
                <div id="waiting" className="requests">
                    {needApprovalHTML}
                </div>
            </div>
        )
    }

}

export default Requests;
