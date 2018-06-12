import React, {Component} from 'react';
import { AlertList } from 'react-bs-notifier';

class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 'bottom-right',
            alerts: [],
            timeout: 2000,
            lastId: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        const notif = nextProps.notification;

        if (notif && notif.id && this.state.lastId !== notif.id) {
            this.generate(notif);
        }
    }

    generate({ message, type, id }) {
        const newAlert = {
            type,
            message,
            id,
        };

        this.setState({
            alerts: [...this.state.alerts, newAlert],
            lastId: newAlert.id
        });
    }

    onAlertDismissed(alert) {
        const alerts = this.state.alerts;

        // find the index of the alert that was dismissed
        const idx = alerts.indexOf(alert);

        if (idx >= 0) {
            this.setState({
                // remove the alert from the array
                alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
            });
        }
    }

    clearAlerts() {
        this.setState({ alerts: [] });
    }

    onTimeoutChange({ target: { value } }) {
        this.setState({ timeout: (+value) * 1000 });
    }

    onNewMessageChange({ target: { value } }) {
        this.setState({ newMessage: value });
    }

    onPositionChange({ target: { value } }) {
        this.setState({ position: value });
    }

    render() {
        return (
            <div>
                <AlertList position={this.state.position}
                    alerts={this.state.alerts}
                    timeout={this.state.timeout}
                    onDismiss={this.onAlertDismissed.bind(this)}
                />
            </div>
        );
    }
}

export default Notifications;
