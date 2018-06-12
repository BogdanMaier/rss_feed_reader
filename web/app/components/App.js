import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Notifications from './Notifications';
import Routes from '../routes';

class App extends Component {
    componentDidMount() {
        if (this.onUnload) {
            window.addEventListener('unload', this.onUnload);
        }
        if (this.onBeforeUnload) {
            window.addEventListener('beforeunload', this.onBeforeUnload);
        }
    }

    componentWillUnmount() {
        if (this.onUnload) {
            window.removeEventListener('unload', this.onUnload);
        }
        if (this.onBeforeUnload) {
            window.removeEventListener('beforeunload', this.onBeforeUnload);
        }
    }

    onUnload = () => {}; // TODO backup data if its the case

    render() {
        return (
            <div className="app stretchedToMargin">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Test</title>
                </Helmet>

                { Routes }

                <Notifications notification={this.props.notification} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        notification: state.notification.toJS(),
    });
};


export default connect(
    mapStateToProps,
    null
)(App);
