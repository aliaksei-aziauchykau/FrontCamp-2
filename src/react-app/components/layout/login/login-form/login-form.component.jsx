import React from "react";
import "./login-form.component.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { BackLink } from "../../../common/back/back.component";
import { login, saveUserInfo } from "../../../../redux/modules/login";
import { ApiInvokerService } from "../../../../../core/api";
import { Endpoints } from "../../../../../core/endpoints";


const LoginFormPresentor = class extends React.Component {
    constructor(props) {
        super(props);
        this.defaultUser = { email: "a@a.com", password: "A" };
        this.state = {
            isCheckingCredentials: false,
            userInfo: {
                email: "",
                password: ""
            }
        };
    }

    onEmailChange(event) {
        this.setState({ ...this.state, userInfo: { ...this.state.userInfo, email: event.target.value } })
    }

    onPasswordChange(event) {
        this.setState({ ...this.state, userInfo: { ...this.state.userInfo, password: event.target.value } })
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ ...this.state, isCheckingCredentials: true })
        ApiInvokerService.invokePost(Endpoints.Auth(), { 
            email: this.state.userInfo.email,
            password: this.state.userInfo.password
        })
        .then(data => this.isAuth(data, this.props))
        .then(() => this.setState({ ...this.state, isCheckingCredentials: false }));
    }

    isAuth(data, { dispatch }) {
        if(data.isAuth) {
           dispatch(login());
           dispatch(saveUserInfo(this.state.userInfo));
        } else {
            console.log(data)
        }
    }

    render() {
        return (
            <div class="container">
                <div class="row justify-content-center cs-position-row">
                    <div class="col-4">
                        <form onSubmit={this.onSubmit.bind(this)} class="border border-dark rounded cs-form">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address {this.state.userInfo.email}</label>
                                <input type="email" value={this.state.userInfo.email} onChange={this.onEmailChange.bind(this)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" class="form-text text-muted">We will never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password {this.state.userInfo.password}</label>
                                <input type="password" value={this.state.userInfo.password} onChange={this.onPasswordChange.bind(this)} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <input type="submit" class="btn btn-primary" value="Submit" />
                        </form>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-4">
                        <span>{this.state.isCheckingCredentials ? "Loading..." : null}</span>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-4">
                    <div class="container">
                        <div class="row justify-content-between">
                            <div class="col">
                                <BackLink />
                            </div>
                            <div class="col">
                                <a class="nav-link" href="/#/registration">Registration</a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const LoginForm = withRouter(connect()(LoginFormPresentor));