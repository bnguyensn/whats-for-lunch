import React, {Component} from 'react';

function Hello(props) {
    return  <p>Hello {props.name}!</p>
}

class App extends Component {
    render() {
        return (
            <div className="App" id="app">
                <Hello name="world" />
            </div>
        )
    }
}

export default App