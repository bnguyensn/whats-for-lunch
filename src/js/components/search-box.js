import React, {Component} from 'react';
import '../../css/components/search-box.css';

function SearchBox(props) {
    return (
        <div id="search-box-container">
            <i className="material-icons md-24 md-dark">&#xE8B6;</i>
            <form id="search-box-form">
                <input id="search-box-form-input" type="text" placeholder="What's for lunch?"/>
            </form>
        </div>
    )
}

export default SearchBox