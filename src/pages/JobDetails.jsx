import { Link, useParams } from "react-router-dom";
import { jobs } from "../data/jobs";

export default function JobDetails({ savedJobs, onToggleSave }) {
  const { id } = useParams();
  const job = jobs.find((item) => item.id === Number(id));

  if (!job) {
    return (
      <main className="page-container empty-state">
        <h2>Job not found</h2>
        <Link to="/" className="primary-btn">Back to Jobs</Link>
      </main>
    );
  }

  const saved = savedJobs.includes(job.id);

  return (
    <main className="page-container">
      <Link to="/" className="back-link">← Back to jobs</Link>

      <section className="details-card">
        <div className="company-logo large-logo">
          {job.company.charAt(0)}
        </div>

        <p className="company-name">{job.company}</p>
        <h1>{job.role}</h1>

        <div className="job-meta">
          <span>📍 {job.location}</span>
          <span>💼 {job.type}</span>
          <span>🎓 {job.experience}</span>
        </div>

        <h3 className="salary">{job.salary}</h3>

        <div className="details-section">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        <div className="details-section">
          <h2>Required Skills</h2>
          <div className="skill-list">
            {job.skills.map((skill) => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div className="details-actions">
          <Link to={`/apply/${job.id}`} className="primary-btn">
            Apply Now →
          </Link>
          <button
            className="secondary-btn"
            onClick={() => onToggleSave(job.id)}
          >
            {saved ? "♥ Saved" : "♡ Save Job"}
          </button>
        </div>
      </section>
    </main>
  );
}