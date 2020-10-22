import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logoutRequest} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props} />
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});
const mapDispatchToProps = {logoutRequest};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);