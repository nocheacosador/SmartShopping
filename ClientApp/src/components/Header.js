import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';
import { authenticationService } from '../auth/AuthenticationServce';
import { useNavigate } from 'react-router-dom';
import { NamedLogo } from './NamedLogo';
import { ProfileButton } from './ProfileButton';
import { authFetch } from '../auth/AuthFetch';

const withNavigate = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        return <Component navigate={navigate} {...props} />;
    };
};

class Header extends Component {
    static displayName = Header.name;

    constructor (props) {
        super(props);
        this.state = {user: props.user}
        this.toggleCallback = props.toggleCallback;
    }

    componentDidMount() {
        authFetch('api/auth/user')
            .then(response => response.json())
            .then(user => this.populateUser(user));
    }

    populateUser(user) {
        this.setState({ user: user });
    }

    render() {
        if (authenticationService.userIsLoggedIn()) {
            return (
                <Navbar className="navbar-expand bg-secondary navbar-dark sticky-top px-4 py-2">
                    <NavbarToggler className="sidebar-toggler flex-shrink-0" style={{color: "var(--primary)"}} tag="a" onClick={this.toggleCallback}>
                        <i className="fa fa-bars"></i>
                    </NavbarToggler>
                    <NavbarBrand className="navbar-brand d-flex d-lg-none me-4" tag={Link} to="/">
                        <h2 className="text-primary ms-4 mb-0"><NamedLogo/></h2>
                    </NavbarBrand>
                    <div className="navbar-nav allign-items-center ms-auto">
                        <ProfileButton userName={this.state.user.name}/>
                    </div>
                </Navbar>
            );
        }
        else {
            return (
                <Navbar className="navbar-expand bg-secondary navbar-dark sticky-top px-4 py-2">
                    <NavbarBrand className="navbar-brand d-flex me-4" tag={Link} to="/">
                        <h2 className="text-primary mb-0"><NamedLogo/></h2>
                    </NavbarBrand>
                    <div>
                        <Button color="primary" outline className="m-2" onClick={() => this.props.navigate("/register")}>
                            Register
                        </Button>
                        <Button color="primary" className="m-2" onClick={() => this.props.navigate("/login")}>
                            Log in
                        </Button>
                    </div>
                </Navbar>
            );
        }
    }
}

export default withNavigate(Header);