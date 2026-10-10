import { Link } from "react-router-dom";

export default function AppliedJobs({ applications }) {
  return (
    <main className="main-content page-container">
      <p className="eyebrow">YOUR CAREER JOURNEY</p>
      <h1>My Applications</h1>
      <p className="form-subtitle">
        Track the jobs you've applied for.
      </p>

      {applications.length === 0 ? (
        <div className="empty-state">
          <h2>No applications yet</h2>
          <p>Start exploring and apply for a job that matches your skills.</p>
          <Link to="/" className="primary-btn">Find Jobs</Link>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((application) => (
            <article className="application-card" key={application.id}>
              <div className="company-logo">
                {application.company.charAt(0)}
              </div>

              <div className="application-info">
                <h3>{application.role}</h3>
                <p>{application.company}</p>
                <p className="field-hint">
                  Applied on {application.date}
                </p>
              </div>

              <span className="status-badge">{application.status}</span>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}