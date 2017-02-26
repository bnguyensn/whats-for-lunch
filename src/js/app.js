import React, {Component} from 'react';
import SearchBox from './components/search-box';
import MapArea from './components/map-area';

function Hello(props) {
    return  <p>Hello {props.name}!</p>
}

class HelloClass extends Component {
    constructor(props) {
        super(props);
        console.log(`Hello ${this.props.name}.`);
    }

    render() {
        console.log(`Hello again, ${this.props.name}.`);
        return (
            <span></span>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div className="App" id="app">
                <MapArea enableGeoLocation={true} />
                <SearchBox />
            </div>
        )
    }
}

export default App