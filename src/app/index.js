import React from 'react';
import ReactDOM from 'react-dom';

import { Navbar } from './components/Navbar';
import { Content } from './components/Content';

class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Content />
            </div>
        )
    }
}

ReactDOM.render(< AppComponent />, document.getElementById('app'))