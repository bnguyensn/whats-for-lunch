import React, {Component} from 'react';
import '../css/header.css';

// Configure logo

const logoPath = 'assets/img/leo.jpg';

function Logo(props) {
    return (
        <div className="logo-container">
            <img src={logoPath} alt="Logo" />
            <label>What's for Lunch?</label>
        </div>
    )
}

// Configure nav bar

function Nav(props) {
    return (
        <nav id="nav-container">
            <ul>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
    )
}

// ***** The Header component

class Header extends Component {
    render() {
        return (
            <div id="header-container" className="wrapper">
                <Logo />
                <Nav />
            </div>
        )
    }
}

export default Header