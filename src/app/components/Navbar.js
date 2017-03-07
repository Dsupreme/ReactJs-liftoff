import React from 'react';

export class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo center">
                        <i className="fa fa-meetup fa-lg"></i>
                        ReactJs LiftOff
                    </a>
                </div>
            </nav>
        );
    }
}