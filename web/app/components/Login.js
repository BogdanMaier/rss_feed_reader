import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Label, Col, Row, FormGroup, Input, Button, Jumbotron} from 'reactstrap';
import imgPlant from '../assests/images/web_plant.png';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { BounceLoader } from 'react-spinners';
import {
    logout,
    login,
    resetPassword,
} from '../actions';
import '../styles/login.scss';


export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false,
        };

        // reset login status
        this.props.logout();
    }

    onLogin = (e) => {
        e.preventDefault();
        const {
            email,
            password
        } = this.state;

        this.setState({ loading: true });

        const interval = setTimeout(()=> {
            if (!this.props.auth.authenticating && this.state.loading) {
                this.setState({ loading: false });
            }

            if (this.props.auth.authenticated) {
                this.props.history.replace({
                    pathname: '/',
                    state: {
                        nextPathname: this.props.location.pathname
                    }
                });
            }
            clearInterval(interval);
        }, 1500);

        this.props.login(email, password);
    };

    onResetPassword = () => {
        if (this.state.email) {
            this.props.resetPassword(this.state.email);
            confirmAlert({
                message: 'An email has been sent to you inbox!',
                buttons: [{
                    label: 'Ok',
                    onClick: () => {}
                }]
            });
        } else {
            confirmAlert({
                message: 'Please fill the email field, such that you can reset the password!',
                buttons: [{
                    label: 'Ok',
                }]
            });
        }
    };

    onUsernameChange = (e) => {
        this.setState({ email: e.target.value });
    };

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    alertError = () => {
        if (this.props.auth.error && !this.state.loading) {
            return (
                <div className="login-error">Authentication failed!</div>
            );
        }
        return null;
    };

    showSpinner = () => {
        if (this.state.loading) {
            return (
                <div className="spinner-container">
                    <BounceLoader
                        color={'#84cdfc'}
                        loading={this.state.loading}
                    />
                </div>
            );
        }
        return null;
    };

    render() {
        return (
            <div>
                <Container className="login-page">
                    <Row>
                        <Col xs={6}>
                            <Jumbotron>
                                <Container>
                                    <Row>
                                        <Col sm="4">
                                            <img src={imgPlant} className="img"/>
                                        </Col>
                                        <Col sm="1"/>
                                        <Col sm="7" className="form">

                                            { this.showSpinner() }

                                            <Form>
                                                <FormGroup>
                                                    <Label for="exampleEmail">Email</Label>
                                                    <Input type="email"
                                                           name="email"
                                                           id="email"
                                                           placeholder="Email..."
                                                           onChange={this.onUsernameChange}/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="examplePassword">Password</Label>
                                                    <Input type="password"
                                                           name="password"
                                                           id="password"
                                                           placeholder="Password..."
                                                           onChange={this.onPasswordChange}/>
                                                </FormGroup>

                                                { this.alertError() }

                                                <FormGroup className="space-between btns-group">
                                                    <div></div>
                                                    <Button color="primary"
                                                            onClick={this.onLogin}>
                                                        Login
                                                    </Button>
                                                </FormGroup>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Container>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
            </div>
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
        login: (email, pass) => dispatch(login(email, pass)),
        resetPassword: (email) => dispatch(resetPassword(email)),
    });
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
