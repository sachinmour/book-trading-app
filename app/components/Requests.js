import React from 'react';
import axios from 'axios';

class Requests extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            requestsMade: [],
            needApproval: [],
            requestsMadeApproved: [],
            needApprovalApproved: []
        }
    }

    componentWillMount() {
        var _this = this;
        axios.get('/getRequests')
            .then(function(response) {
                var requests = response.data.requests;
                if (requests) {
                    var made = requests.filter(function(request) {
                        return request.from === _this.props.user._id
                    });
                    var approval = requests.filter(function(request) {
                        return request.to === _this.props.user._id
                    });
                    _this.setState({
                        requestsMade: made.filter(function(request) {
                            return !request.approved
                        }),
                        requestsMadeApproved: made.filter(function(request) {
                            return request.approved === true
                        }),
                        needApproval: approval.filter(function(request) {
                            return !request.approved
                        }),
                        needApprovalApproved: approval.filter(function(request) {
                            return request.approved === true
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
        var _this = this;

        var oldRequests = this.state.needApproval;
        var newRequests = oldRequests.filter(function(oldRequest) {
            return oldRequest._id !== request._id;
        })
        this.setState({
            needApproval: newRequests
        });
        axios.post('/acceptApproval', { request_id: request._id })
            .then(function(response) {
                if (!response.data.approvalAccepted) {
                    _this.setState({
                        needApproval: oldRequests
                    });
                }
            })
            .catch(function(response) {
                console.log(response.data);
            });
    }

    deleteRequest(request, identifier) {
        var _this = this;

        var oldRequests = this.state[identifier];
        var newRequests = oldRequests.filter(function(oldRequest) {
            return oldRequest._id !== request._id;
        });

        var newState = {};
        newState[identifier] = newRequests;
        this.setState(newState);

        axios.post('/deleteRequest', { request_id: request._id })
            .then(function(response) {
                if (!response.data.requestDeleted) {
                    newState[identifier] = oldRequests;
                    _this.setState(newState);
                }
            })
            .catch(function(response) {
                console.log(response.data);
            });
    }

    render() {
        var _this = this;

        var requestsMade = this.state.requestsMade.map(function(request) {
            return <div className="request" key={request._id}>
                        <img src={request.book.image}/>
                        <div className="decision">
                            <i className="fa fa-times" onClick={() => _this.cancelRequest(request)} aria-hidden="true"></i>
                        </div>
                    </div>;
        });

        var requestsMadeHTML;
        if (requestsMade.length) {
            requestsMadeHTML = <div className="requestBox"><h2>Requests Made</h2>
                <div id="made" className="requests">
                    {requestsMade}
                </div></div>;
        }

        var needApproval = this.state.needApproval.map(function(request) {
            return <div className="request" key={request._id}>
                        <img src={request.book.image} />
                        <div className="decision">
                            <i className="fa fa-times" onClick={() => _this.rejectApproval(request)} aria-hidden="true"></i>
                            <i className="fa fa-check" onClick={() => _this.acceptApproval(request)} aria-hidden="true"></i>
                        </div>
                    </div>;
        });

        var needApprovalHTML;
        if (needApproval.length) {
            needApprovalHTML = <div className="requestBox"><h2>Requests from other users</h2>
                <div id="waiting" className="requests">
                    {needApproval}
                </div></div>;
        }

        var requestsMadeApproved = this.state.requestsMadeApproved.map(function(request) {
            return <div className="request" key={request._id}>
                        <img src={request.book.image}/>
                        <div className="decision">
                            <i className="fa fa-times" onClick={() => _this.deleteRequest(request, "requestsMadeApproved")} aria-hidden="true"></i>
                        </div>
                    </div>;
        });

        var requestsMadeApprovedHTML;
        if (requestsMadeApproved.length) {
            requestsMadeApprovedHTML = <div className="requestBox"><h2>Your trade request was approved</h2>
                <div id="approved" className="requests">
                    {requestsMadeApproved}
                </div></div>;
        }

        var needApprovalApproved = this.state.needApprovalApproved.map(function(request) {
            return <div className="request" key={request._id}>
                        <img src={request.book.image}/>
                        <div className="decision">
                            <i className="fa fa-times" onClick={() => _this.deleteRequest(request, "needApprovalApproved")} aria-hidden="true"></i>
                        </div>
                    </div>;
        });

        var needApprovalApprovedHTML;
        if (needApprovalApproved.length) {
            needApprovalApprovedHTML = <div className="requestBox"><h2>You approved these trade requests</h2>
                <div id="approved" className="requests">
                    {needApprovalApproved}
                </div></div>;
        }

        return (
            <div id="requestsContainer">
                {requestsMadeHTML}
                {needApprovalHTML}
                {requestsMadeApprovedHTML}
                {needApprovalApprovedHTML}
            </div>
        )
    }

}

export default Requests;
