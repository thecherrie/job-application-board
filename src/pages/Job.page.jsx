import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Job.styles.css';

export const JobView = props => {

    const [job, setJob] = useState(null);

    const base_url = "https://ac-job-board-api.herokuapp.com"

    useEffect(() => {
        if (job == null) {
            fetch(base_url+`/jobs/${props.match.params.jobId}`)
                .then(resp => resp.json())
                .then(job => setJob(job));
        }
    })

    return (
        <div>
            <div className="redTopBanner"></div>
            <section className="jobContentWrapper">
                {
                    job != null ?

                        <div>
                            <h1 id="jobTitle">{job.title}</h1>
                            <h3 id="jobSubtitle">{job.location}</h3>
                            <p id="jobBody">{job.description}</p>
                            <h3 style={{ marginTop: "30px" }}>${job.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                            <p>with company benefits</p>
                        </div>

                        :
                        <h1>Loading</h1>
                }
                {/* <h1>{job.title}</h1>
                <p>{job.description}</p> */}
                <div>
                    <Link to={`/jobs/${props.match.params.jobId}/apply`}><button id="jobApplyBtn">Apply</button></Link>
                </div>
            </section>
        </div>
    );
}