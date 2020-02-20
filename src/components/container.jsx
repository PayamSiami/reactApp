import '../css/container.css';

import * as auth from "../services/authService";

import { Route, Switch } from "react-router-dom";

import $ from 'jquery';
import BusinessProfile from './businessProfile';
import { Component } from 'react';
import CreateService from './createService';
import CustommerList from './custommerList';
import Expert from './experts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Invoice from './invoice';
import Joi from "@hapi/joi";
import { Link } from "react-router-dom";
import Login from './login';
import Logout from './logout';
import NotFound from './notFound';
import Profile from './profile';
import React from 'react';
import Scheduling from './scheduling';
import Services from './services';
import SessionList from './sessionList';
import androidIOS from './androidIOS';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { getServices } from '../services/expertServices'

class Container extends Component {

    state = {
        services: [],
        data: { cellphone_no: "", password: "", value: '' },
        currentUser: '',
        errors: {}
    };

    async componentDidMount() {
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });

        const currentUser = auth.getCurrentUser();
        this.setState({ currentUser });

        // const services = await getServices();
        // this.setState({ services });
    }

    schema = {
        cellphone_no: Joi.string()
            .required()
            .label("cellphone_no"),
        phone: Joi.string()
            .required()
            .label("phone"),
        password: Joi.string()
            .required()
            .label("Password")
    };

    doSubmit = async () => {
        try {
            const { data } = this.state;
            //console.log('phone', this.state.value);
            await auth.login(data.cellphone_no, data.password, this.state.value);
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
            <div className="d-flex" id="wrapper">
                <div className="borde" id="sidebar-wrapper">
                    <div className="sidebar-heading">Start Bootstrap </div>
                    <div className="list-group list-group-flush">
                        <Link className="list-group-item list-group-item-action" to="/">
                            Dashboard
                        </Link>
                        <Link className="list-group-item list-group-item-action" to="/expert">
                            Expert
                            </Link>
                        <Link className="list-group-item list-group-item-action" to="/services">
                            Services
                            </Link>
                        <Link className="list-group-item list-group-item-action" to="/custommerlist">
                            CustommerList
                            </Link>
                        <Link className="list-group-item list-group-item-action" to="/invoice">
                            Invoice
                            </Link>
                        <Link className="list-group-item list-group-item-action" to="/application">
                            AndroidIOS
                        </Link>
                        <Link className="list-group-item list-group-item-action" to="/businessprofile">
                            BusinessProfile
                            </Link>
                        <Link className="list-group-item list-group-item-action" to="/createservice">
                            CreateService
                            </Link>
                        <Link className="list-group-item list-group-item-action" to="/profile">
                            Profile
                            </Link>
                        <Link className="list-group-item list-group-item-action" to="/scheduling">
                            Scheduling
                            </Link>
                        <Link className="list-group-item list-group-item-action" to="/sessionlist">
                            SessionList
                            </Link>
                    </div>
                </div>
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg borde">
                        <button className="btn btn-primary" id="menu-toggle">
                            <FontAwesomeIcon icon={faAlignLeft} />
                        </button>
                        <button className="btn btn-primary ml-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                {/* modal */}
                                <Login />
                                {/* end modal */}
                                {this.state.currentUser && (
                                    <React.Fragment>
                                        <li className="dropdown">
                                            <a className="nav-link" href="#" data-toggle="dropdown" id="profileDropdown" aria-expanded="false">
                                                <div className="profile" alt="profile"></div>
                                            </a>
                                            <div className="color dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
                                                <a className="nav-link" href="">
                                                    <i className="mdi mdi-account-circle"></i>
                                                    {this.state.currentUser.fullname}
                                                    <br />
                                                </a>
                                                <a className="nav-link" id="linkLogout" href="">
                                                    <i className="mdi mdi-logout" id=""></i>
                                                    <Link className="nav-item nav-link" to="/logout">
                                                        Logout
                                                    </Link>
                                                </a>
                                            </div>
                                        </li>
                                    </React.Fragment>
                                )}
                                {!this.state.currentUser && (
                                    <React.Fragment>
                                        <a className="nav-link dropdown-toggle" data-toggle="modal" data-target="#myModal">
                                            LogIn/Register
                                        </a>
                                    </React.Fragment>
                                )}
                            </ul>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <Switch>
                                        <Route path="/application" component={androidIOS} />
                                        <Route path="/businessprofile" component={BusinessProfile} />
                                        <Route path="/createservice" component={CreateService} />
                                        <Route path="/custommerlist" component={CustommerList} />
                                        <Route path="/expert" component={Expert} />
                                        <Route path="/not-found" component={NotFound} />
                                        <Route path="/invoice" component={Invoice} />
                                        <Route path="/profile" component={Profile} />
                                        <Route path="/scheduling" component={Scheduling} />
                                        <Route path="/services" component={Services} />
                                        <Route path="/sessionlist" component={SessionList} />
                                        <Route path="/logout" component={Logout} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Container;
