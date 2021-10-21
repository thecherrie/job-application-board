import React, { useState, useEffect, useRef } from 'react'
import './Apply.styles.css';
import Button from '../components/Button/Button.component';
import DropArea from '../components/DropZone/FileDropZone.component';
import { GiSpawnNode } from 'react-icons/gi';

export default function Apply(props) {

    const [job, setJob] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (job == null) {
            fetch(`https://ac-job-board-api.herokuapp.com/jobs/${props.match.params.jobId}`)
                .then(resp => resp.json())
                .then(job => setJob(job));
        }
    })

    function validateForm() {

        var isValid = true
        setErrorMsg("")

        const inputs = [
            nameInput.current,
            emailInput.current,
            textAreaInput.current
        ]

        inputs.forEach(input => input.style.border = "none");
        inputs.forEach(input => {
            if (input.value.length < 3) {
                input.style.border = "#FF3C38 1px solid"; 
                isValid = false;
                setErrorMsg("Text field(s) are either empty or too short");
            }
        })

        if (!emailInput.current.value.match("@")) {
            emailInput.current.style.border = "#FF3C38 1px solid";
            isValid = false; 
            setErrorMsg("Bad email formatting.");
        }

        return isValid;
    }

    function onApplyclick(e) {
        if (validateForm()) alert("Application Submitted!")
    }

    const nameInput = useRef();
    const emailInput = useRef();
    const textAreaInput = useRef();

    return (
        <div>
            <div className="redTopBanner"></div>
            <section className="jobContentWrapper">
                {
                    job ?
                        <div>
                            <h1 id="jobTitle">{job.title}</h1>
                            {/* <h3 id="jobSubtitle">{job.location}</h3> */}
                            <h3 style={{ "font-weight": "normal" }}>{job.title} in {job.location}</h3>
                            <p id="jobBody">{job.description.substring(0, 200)}...</p>

                            <form className="jobApplicationForm">
                                <div>
                                    <input ref={nameInput} maxLength="40" className="formInput" placeholder="Full name" />
                                    <input ref={emailInput} maxLength="40" type="email" className="formInput" placeholder="Email" />
                                </div>
                                <textarea ref={textAreaInput} maxLength="500" className="formTextarea" placeholder="Why you are excited about this role."></textarea>
                            </form>
                            <DropArea />
                            <button onClick={onApplyclick} id="jobApplyBtn">Submit Application</button>
                            <span>{errorMsg}</span>

                        </div>
                        :
                        <div>Loading...</div>

                }
                <div>
                    {/* <Link to={`/jobs/1/apply`}><button id="jobApplyBtn">Apply</button></Link> */}
                </div>
            </section>
        </div>
    );
}
