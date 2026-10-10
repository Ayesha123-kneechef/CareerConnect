import { Link } from "react-router-dom";

export default function JobCard({ job, saved, onToggleSave }) {
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-logo">
          {job.company.charAt(0)}
        </div>

        <button
          className={`bookmark ${saved ? "bookmarked" : ""}`}
          onClick={() => onToggleSave(job.id)}
          aria-label={saved ? "Remove saved job" : "Save job"}
          title={saved ? "Remove saved job" : "Save job"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <p className="company-name">{job.company}</p>
      <h3>{job.role}</h3>

      <div className="job-meta">
        <span>📍 {job.location}</span>
        <span>💼 {job.type}</span>
        <span>🎓 {job.experience}</span>
      </div>

      <p className="salary">{job.salary}</p>

      <Link to={`/jobs/${job.id}`} className="primary-btn">
        View Details
      </Link>
    </article>
  );
}