import JobList from "../components/JobList";
import {getJobs} from "../lib/graphql/queries";
import {useEffect, useState} from "react";

function HomePage() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobs().then(jobs => setJobs(jobs));
    }, []);

    return (
        <div>
            <h1 className="title">Job Board</h1>
            <JobList jobs={jobs}></JobList>
        </div>
    );
}

export default HomePage;