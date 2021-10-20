import React, { useCallback, useEffect, useState } from "react";
import {
    withRouter,
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import '../App.css';
import './Search.styles.css';
import Card from "../components/Card/Card.component";
import { MdLocationOn } from 'react-icons/md';
import Button from "../components/Button/Button.component";

const Search = props => {

    const [jobs, setJobs] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);

    useEffect(() => {
        const url = "https://ac-job-board-api.herokuapp.com/jobs"
        if (jobs == null) {
            const sq = props.match.params.searchQuery
            if (sq === "null") {
                fetch(url).then(jobs => jobs.json()).then(response => setJobs(response.filter(job => job.location == props.match.params.location)))
            } else {
                fetch(url)
                    .then(jobs => jobs.json())
                    .then(response => setJobs(response.filter(job =>
                        job.title.toLowerCase().includes(props.match.params.searchQuery) && job.location == props.match.params.location ||
                        job.description.toLowerCase().includes(props.match.params.searchQuery) && job.location == props.match.params.location)))
            }
        }

        // console.log(jobs);
    })

    const resultsText = props.match.params.searchQuery !== "null" ? 
            `Results for "${props.match.params.searchQuery}" in ${props.match.params.location}` :
            `All jobs in ${props.match.params.location}`

    return (
        <div>
            <section style={{ "height": "40vh" }} className="hero">
                <h1 style={{ "color": "white" }} className="">{resultsText}</h1>
            </section>
            <section id="searchPageContent">
                <div className="searchPageSearchWrapper">
                    <input className="searchPageSearch" placeholder="Search jobs by keyword..." />
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/search/job=eve+location=Leicester`}><div>Search</div></Link>
                </div>
                <div className="searchPageContentWrapper">
                    <h1 id="matches">Matches ({jobs != null ? jobs.length : 0})</h1>
                    {
                        jobs != null ?
                            jobs.map(job => {
                                return (
                                    <Link style={{ textDecoration: 'none', color: "inherit" }} to={`/jobs/${job.id}`}>
                                        <SearchTile key={job.id} title={job.title} subtitle={job.location} salary={job.salary} description={job.description} />
                                    </Link>
                                );
                            }) : "Loading"
                    }
                </div>
            </section>
        </div>
    );
}

export default Search;

const SearchTile = props => {
    return (
        <div className="searchTile">
            <h1>{props.title}</h1>
            <div style={{ display: "flex" }}>
                <h3><MdLocationOn size="0.8em" /> {props.subtitle}</h3>
            </div>
            <p>${props.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} p/a</p>
            <p>{props.description.length > 60 ? props.description.substring(0, 128) + "..." : props.description}</p>
        </div>
    );
}