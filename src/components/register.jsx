import 'react-phone-input-2/lib/style.css'

import * as userService from "../services/userService";

import Form from "../common/form";
import Joi from "@hapi/joi";
import PhoneInput from 'react-phone-input-2'
import React from 'react'
import UserVerify from './userVrify';

class Register extends Form {
    state = {
        data: {
            first_name: "", last_name: "", value: "",
            cellphone_no: "", password: "", confirm_password: ""
        },
        errors: {}
    };

    schema = {
        first_name: Joi.string()
            .required()
            .label("cellphone_no"),
        last_name: Joi.string()
            .required()
            .label("phone"),
        phone: Joi.string()
            .required()
            .label("phone"),
        cellphone_no: Joi.string()
            .required()
            .label("Password"),
        password: Joi.string()
            .required()
            .label("cellphone_no"),
        confirm_password: Joi.string()
            .required()
            .label("phone")
    };

    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data, this.state.value);
            console.log(response);
            //auth.loginWithJwt(response.headers["x-auth-token"]);
            //window.location = "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors }; // clone an object
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div className="d-flex justify-content-around">
                        <div className="md-form form-sm">
                            {this.renderInput("first_name", "First Name", "name")}
                        </div>

                        <div className="md-form form-sm">
                            {this.renderInput("last_name", "Last Name", "name")}
                        </div>
                    </div>
                    <PhoneInput
                        country={'de'}
                        value={this.state.phone}
                        onChange={value => this.setState({ value })}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true
                        }}
                    />
                    <small className="mt-2">
                        We will send SMS  at the number above with a verification code.
                    </small>
                    <div className="md-form form-sm">
                        {this.renderInput("cellphone_no", "Phone", "number")}
                    </div>
                    <div className="md-form form-sm">
                        {this.renderInput("password", "Password", "password")}
                    </div>
                    <div className="md-form form-sm">
                        {this.renderInput("confirm_password", "Confirm Password", "password")}
                    </div>
                    <div className="mb-4">
                        <div className="form-check">
                            <input type="checkbox" id="checkbox" className="form-check-input" name="checkbox" />
                            <label htmlFor="terms">I agree with the <a title="You may read our terms and conditions by clicking on this link">terms and conditions</a> for Registration.
                                                </label>
                        </div>
                    </div>
                    <div className="text-center form-sm mt-2">
                        <button data-toggle="modal" data-target="#myModal2" className="btn btn-info">Sign up</button>
                    </div>
                </form>
                <UserVerify />
            </>
        );
    }
}

export default Register;