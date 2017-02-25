import React, {Component} from 'react';
import SearchBox from './components/search-box';

function Hello(props) {
    return  <p>Hello {props.name}!</p>
}

class App extends Component {
    render() {
        return (
            <div className="App" id="app">
                <SearchBox />
            </div>
        )
    }
}

export default App