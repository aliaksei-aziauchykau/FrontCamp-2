import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"

import "./registration.component.scss";
import { BackLink } from "../../common/back/back.component";
import { ApiInvokerService } from "../../../../core/api";
import { Endpoints } from "../../../../core/endpoints";
import { InfoPopup } from "../../common/popups/info-popup.component";
import { deferredHide } from "../../../redux/modules/popup";
class RegistrationPagePresentor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSavingRegistration: false,
            userInfo: {
                nickName: "",
                email: "",
                enteredPassword: "",
                confirmPassword: ""
            }
        };
    }

    onFieldChange(propName, event) {
        this.setState({ ...this.state, userInfo: { ...this.state.userInfo, [propName]: event.target.value } })
    }

    onSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        this.setState({ ...this.state, isSavingRegistration: true });
        ApiInvokerService.invokePost(Endpoints.Users(), { 
            nickName: this.state.userInfo.nickName,
            email: this.state.userInfo.email,
            password: this.state.userInfo.confirmPassword
        })
        .then(data => data && data.error ? dispatch(deferredHide("registration", data.error, 2000)) : this.props.history.goBack())
        .then(() => this.setState({ ...this.state, isSavingRegistration: false }));
    }

    get isValidEnteredPassword() {
        const result = this.state.userInfo.enteredPassword.length >= 8
        return result;
    }

    get isValidConfirmedPassword() {
        const result = this.state.userInfo.enteredPassword === this.state.userInfo.confirmPassword
            && this.isValidEnteredPassword;
        return result;
    }

    render() {
        return (
            <div class="container">
                <div class="row justify-content-center cs-position-row">
                    <div class="col-4">
                        <form onSubmit={this.onSubmit.bind(this)} class="border border-dark rounded cs-form">
                            <div class="form-group">
                                <label for="nickName">Nick name</label>
                                <input type="text" value={this.state.userInfo.nickName} onChange={this.onFieldChange.bind(this, "nickName")} class="form-control" id="nickName" aria-describedby="nickNameHelp" placeholder="Enter nickname" />
                            </div>
                            <div class="form-group">
                                <label for="emailAddress">Email address</label>
                                <input type="email" value={this.state.userInfo.email} onChange={this.onFieldChange.bind(this, "email")} class="form-control" id="emailAddress" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div class="form-group">
                                <div class="row justify-content-between">
                                    <div class="col">
                                        <label for="passwordEntered">Enter password</label>
                                    </div>
                                    <div class="col-2">
                                        {this.isValidEnteredPassword ? <span class="oi oi-circle-check icon success-mark"></span> : null}
                                    </div>
                                </div>
                                <input type="password" value={this.state.userInfo.enteredPassword} onChange={this.onFieldChange.bind(this, "enteredPassword")} class="form-control" id="passwordEntered" placeholder="Enter password" />
                            </div>
                            <div class="form-group">
                                <div class="row justify-content-between">
                                    <div class="col">
                                        <label for="passwordConfirmed">Confirm password</label>
                                    </div>
                                    <div class="col-2">
                                        {this.isValidConfirmedPassword ? <span class="oi oi-circle-check icon success-mark"></span> : null}
                                    </div>
                                </div>
                                <input type="password" value={this.state.userInfo.confirmPassword} onChange={this.onFieldChange.bind(this, "confirmPassword")} class="form-control" id="passwordConfirmed" placeholder="Confirm password" />
                            </div>
                            <div>
                                <InfoPopup id="registration"/>
                            </div>
                            <input disabled={!(this.isValidConfirmedPassword && this.isValidEnteredPassword)} type="submit" class="btn btn-primary" value="Submit" />
                        </form>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-4">
                        <span>{this.state.isSavingRegistration ? "Loading..." : null}</span>
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
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const RegistrationPage = withRouter(connect()(RegistrationPagePresentor));