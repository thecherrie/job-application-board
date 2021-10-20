import React, { Component } from 'react'
import Picker from 'react-mobile-picker';

export default class MobileSelector extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            valueGroups: {
                title: 'London',
            },
            optionGroups: {
                title: ['London', 'New York'],
            }
        };
    }

    componentDidMount() {
        fetch('http://localhost:3001/locations')
        .then(locations => locations.json())
        .then(response => this.setState({
            optionGroups: { title: response }
        }))
    }


    // Update the value in response to user picking event
    handleChange = (name, value) => {
        this.setState(({ valueGroups }) => ({
            valueGroups: {
                ...valueGroups,
                [name]: value
            }
        }));
    };
    

    render() {
        const { optionGroups, valueGroups } = this.state;

        const pickerStyle = {
            position: "fixed",
            zIndex: "4",
            bottom: "0",
            background: "white",
            width: "100%",
        }

        const blackPane = {
            position: "fixed",
            zIndex: "3",
            height: "100%",
            width: "100%",
            background: "rgba(0,0,0,0.5)",
        }

        return (
            <>
            <div style={pickerStyle}>
                
                <Picker
                    optionGroups={optionGroups}
                    valueGroups={valueGroups}
                    onChange={this.handleChange} />
            </div>
            <div style={blackPane}></div>
            </>
        );
    }
}
