import { Link } from "react-router-dom";
import { jobs } from "../data/jobs";
import JobCard from "../components/JobCard";

export default function SavedJobs({ savedJobs, onToggleSave }) {
  const items = jobs.filter((job) => savedJobs.includes(job.id));

  return (
    <main className="main-content page-container">
      <p className="eyebrow">YOUR SHORTLIST</p>
      <h1>Saved Jobs</h1>
      <p className="form-subtitle">Keep track of opportunities you like.</p>

      {items.length ? (
        <div className="job-grid">
          {items.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              saved={true}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No saved jobs yet</h2>
          <p>Bookmark interesting jobs to find them here.</p>
          <Link to="/" className="primary-btn">Explore Jobs</Link>
        </div>
      )}
    </main>
  );
}