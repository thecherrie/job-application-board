import '../App.css';
import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MainMenu from '../components/MainMenu/MainMenu.component';
import Dropdown from '../components/Dropdown/Dropdown.component';
import Button from '../components/Button/Button.component';
import { AiFillCaretDown } from 'react-icons/ai';
import Card from '../components/Card/Card.component';
import useOnclickOutside from "react-cool-onclickoutside";
import MobileSelector from '../components/MobileSelector/MobileSelector.component';

import personPNG1 from '../img/carousel_main_01.png';
import personPNG2 from '../img/carousel_main_03.png';
import { GiLockPicking } from 'react-icons/gi';


class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            locationDropdownOpen: false,
            mobileDropdownOpen: false,
            locations: {},
            filteredLocations: {},
            selectedLocation: "London",
            jobSearchQuery: null,
        }
    }

    componentDidMount() {
        // fetch('https://ac-job-board-api.herokuapp.com/locations')
        fetch('http://localhost:3001/jobsavailable')
            .then(locations => locations.json())
            .then(response => this.setState({
                locations: response,
                filteredLocations: response
            }))
    }

    toggleLocationDropdown = () => {
        if(window.innerWidth < 768) {
            this.setState({ mobileDropdownOpen: !this.state.mobileDropdownOpen })
            return;
        }
        //size is DESKTOP \/
        this.setState({ locationDropdownOpen: !this.state.locationDropdownOpen })
    }

    onSelectLocation = location => {
        this.setState({
            selectedLocation: location,
            locationDropdownOpen: !this.state.locationDropdownOpen
        }, () => console.log(location))
    }

    onSearchLocations = e => {
        var searchQuery = e.target.value;
        var _filteredLocations = Object.keys(this.state.locations).filter(location => {
            return location.toLowerCase().includes(searchQuery.toLowerCase());
        })
        this.setState({
            filteredLocations: _filteredLocations
        })
    }

    onJobSearch = e => this.setState({ jobSearchQuery: e.target.value })

    handleEnterKeyPress = e => e.keyCode == 13 ? window.location.href=`/search/job=${this.state.jobSearchQuery}+location=${this.state.selectedLocation}` : null

    render() {

        const { locationDropdownOpen, mobileDropdownOpen } = this.state;

        return (
            <div>
                { mobileDropdownOpen ? <MobileSelector /> : null }
                <section className="hero">
                    <div id="heroTextWrapper">
                        <h1 id="mainHeader">Ready to Attain Your Goals?</h1>
                        <div className="heroElementWrapper">
                            <input onKeyDown={this.handleEnterKeyPress} onChange={this.onJobSearch} contentEditable="true" className="mainSearch" placeholder="Try 'developer'..." />
                            <h2>in</h2>
                            <div onClick={this.toggleLocationDropdown} style={!locationDropdownOpen ? { "display": "flex" } : { "display": "none" }} className="locationDropdown">
                                <p>{this.state.selectedLocation}</p>
                                <p><AiFillCaretDown /></p>
                            </div>
                            <LocationDropdown toggleDropdown={this.toggleLocationDropdown} locations={this.state.filteredLocations} onSelectLocation={(location) => this.onSelectLocation(location)} onChange={this.onSearchLocations} locationDropdownOpen={this.state.locationDropdownOpen} />
                            <Link to={`/search/job=${this.state.jobSearchQuery}+location=${this.state.selectedLocation}`}>
                                <Button text="Search" onClick={console.log(true)} />
                            </Link>
                            {/* <Dropdown />  */}

                        </div>
                    </div>
                </section>


                {/* SECOND SECTION */}

                <section>

                    <div className="main">
                        <h1 id="heading">Let's start here</h1>
                        <div className="cardWrapper">
                            <Card titleText="We Think Big" image={personPNG1} bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam" />
                            <Card titleText="Empowering All" image={personPNG2} bodyText="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam." />
                        </div>
                    </div>

                </section>

            </div >
        );
    }

}

export default Home;

const LocationDropdown = props => {

    const ref = useOnclickOutside(() => {
        if (props.locationDropdownOpen) props.toggleDropdown()
    })

    return (
        <div ref={ref} style={props.locationDropdownOpen ? { "display": "block" } : { "display": "none" }} className="dropdown">
            <input onChange={props.onChange} placeholder="Search places..." />
            <ul>
                {
                    Object.entries(props.locations).map(([location, avblJobs], i) => {
                        return <li onClick={() => props.onSelectLocation(location)}>{location} ({avblJobs})</li>
                    })
                }
            </ul>
        </div>
    );
}
