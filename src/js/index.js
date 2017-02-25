import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Header from './header';
import Footer from './footer';
import '../css/main.css';

// Render the header
// ReactDOM.render(
//     <Header />,
//     document.getElementById('header')
// );

// Render the main app
ReactDOM.render(
    <App />,
    document.getElementById('content')
);

// Render the footer
// ReactDOM.render(
//     <Footer />,
//     document.getElementById('footer')
// );