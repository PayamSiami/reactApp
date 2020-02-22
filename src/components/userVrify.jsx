import 'react-phone-input-2/lib/style.css'

import * as VerifyRegisterService from "../services/verifyRegisterService";

import Form from "../common/form";
import Joi from "@hapi/joi";
import PhoneInput from 'react-phone-input-2'
import React from 'react'

class UserVerify extends Form {
    state = {
        data: { cellphone_no: "", token: "" },
        phone: "",
        errors: {}
    };

    schema = {
        cellphone_no: Joi.number()
            .required()
            .label("cellphone_no"),
        token: Joi.string()
            .required()
            .label("Token"),
    };

    doSubmit = async () => {
        try {
            const response = await VerifyRegisterService.verifyRegister(this.state.data, this.state.value);
            console.log(response);
            // this.props.history.push("/");
            //window.location = "/";
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
            <div className="modal fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">User Verify</h4>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <PhoneInput
                                    country={'de'}
                                    value={this.state.phone}
                                    onChange={value => this.setState({ value })}
                                />
                                <div className="md-form form-sm">
                                    {this.renderInput("cellphone_no", "Phone", "number")}
                                </div>
                                <div className="md-form form-sm">
                                    {this.renderInput("token", "Verify code", "token")}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Sign up</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserVerify;