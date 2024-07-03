import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
import PropTypes from "prop-types";

function JobList({ jobs }) {
    return (
        <ul className="box">
            {jobs.map((job) => (
                <JobItem key={job.id} job={job} />
            ))}
        </ul>
    );
}

JobList.propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        title: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string
        }),
        date: PropTypes.string.isRequired
    })).isRequired
};

function JobItem({ job }) {
    const title = job.company
        ? `${job.title} at ${job.company.name}`
        : job.title;
    return (
        <li className="media">
            <div className="media-left has-text-grey">
                {formatDate(job.date)}
            </div>
            <div className="media-content">
                <Link to={`/jobs/${job.id}`}>
                    {title}
                </Link>
            </div>
        </li>
    );
}

JobItem.propTypes = {
    job: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        title: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string
        }),
        date: PropTypes.string.isRequired
    }).isRequired
};

export default JobList;