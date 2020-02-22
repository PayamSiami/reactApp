import '../css/login.css';
import 'react-phone-input-2/lib/style.css'

import * as auth from "../services/authService";

import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from "../common/form";
import Joi from "@hapi/joi";
import PhoneInput from 'react-phone-input-2'
import React from "react";
import Register from './register';

class Login extends Form {
    state = {
        data: { cellphone_no: "", password: "" },
        phone: "",
        errors: {}
    };

    schema = {
        cellphone_no: Joi.number()
            .required()
            .label("cellphone_no"),
        password: Joi.number()
            .required()
            .label("Password"),
    };

    doSubmit = async () => {
        try {
            const { data } = this.state;
            //console.log('phone', this.state.value);
            await auth.login(data.cellphone_no, data.password, this.state.value);
            // this.props.history.push("/");
            window.location = "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        return (
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog cascading-modal" role="document">
                    <div className="modal-content">
                        <div className="modal-c-tabs">
                            <ul className="nav nav-tabs md-tabs tabs-2 light-blue darken-3" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#panel7" role="tab">
                                        <FontAwesomeIcon icon={faUser} />
                                        Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#panel8" role="tab">
                                        <FontAwesomeIcon icon={faUserPlus} />
                                        Register</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade in show active" id="panel7" role="tabpanel">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="modal-body mb-1">
                                            <PhoneInput
                                                country={'de'}
                                                value={this.state.phone}
                                                onChange={value => this.setState({ value })}
                                            />
                                            <div className="md-form form-sm">
                                                {this.renderInput("cellphone_no", "Phone", "number")}
                                            </div>
                                            <div className="md-form form-sm">
                                                {this.renderInput("password", "Password", "password")}
                                            </div>
                                            <div className="text-center mt-2">
                                                <button type="submit" className="btn btn-info">Log in</button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="modal-footer">
                                        <div className="options text-center text-md-right mt-1">
                                            <p>Forgot <a className="blue-text">Password?</a></p>
                                        </div>
                                        <button type="submit" className="btn btn-outline-info waves-effect ml-auto" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="panel8" role="tabpanel">
                                    <div className="modal-body">
                                        <h4 className="font-weight-light">New here?</h4>
                                        <h6 className="font-weight-light">Join us today! It takes only few steps</h6>
                                        <Register />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-info waves-effect ml-auto" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Login;