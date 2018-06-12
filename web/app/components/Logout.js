import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions';


class Logout extends Component {

    onLogout = () => {
        this.props.logout();
        this._reactInternalInstance._context.router.history.push('/login'); // TODO improve
    };

    render() {
        return (
            <button type="button"
                    className=" btn-link logout-btn"
                    onClick={this.onLogout}>
                Logout
            </button>
        );
    }
}
const mapStateToProps = (state) => {
    return ({
        auth: state.auth.toJS(),
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        logout: () => { dispatch(logout()); },
    });
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout);

