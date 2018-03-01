
import { Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./login/login.component";
import { Main } from "./main/main.component";
import { HashRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

const LayoutInner = (ownProps) => (
    <Router>
        <Switch>
            <Route path="/login" render={ () => !ownProps.isAuthorized ? <Login/> : <Redirect to={"/"}/> } />
            <Route path="/" component={Main}/>
        </Switch>
    </Router>
);

export const Layout = connect(state => ({isAuthorized: state.loginState.isAuthorized}))(LayoutInner);