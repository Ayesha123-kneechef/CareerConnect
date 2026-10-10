import { useMemo, useState } from "react";
import { jobs } from "../data/jobs";
import JobCard from "../components/JobCard";

export default function Home({ savedJobs, onToggleSave }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [type, setType] = useState("All Types");
  const [experience, setExperience] = useState("All Experience");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const query = search.toLowerCase();

      const matchesSearch =
        job.role.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some((skill) => skill.toLowerCase().includes(query));

      const matchesLocation =
        location === "All Locations" || job.location === location;

      const matchesType = type === "All Types" || job.type === type;

      const matchesExperience =
        experience === "All Experience" ||
        job.experience === experience;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesExperience
      );
    });
  }, [search, location, type, experience]);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">YOUR NEXT OPPORTUNITY STARTS HERE</p>
        <h1>Find a job that fits your <span>future.</span></h1>
        <p className="hero-subtitle">
          Explore opportunities, discover companies, and take the next
          step in your career.
        </p>

        <div className="search-box">
          <span>⌕</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Job title, company, or skill..."
            aria-label="Search jobs"
          />
          <button
            className="primary-btn search-button"
            onClick={() => document.getElementById("job-list")?.scrollIntoView({ behavior: "smooth" })}
          >
            Search Jobs
          </button>
        </div>
      </section>

      <main className="main-content" id="job-list">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPLORE OPPORTUNITIES</p>
            <h2>Featured Jobs</h2>
          </div>
          <span className="results-count">
            {filteredJobs.length} jobs found
          </span>
        </div>

        <div className="filters">
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option>All Locations</option>
            <option>Bangalore</option>
            <option>Hyderabad</option>
            <option>Pune</option>
            <option>Chennai</option>
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>All Types</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
          </select>

          <select value={experience} onChange={(e) => setExperience(e.target.value)}>
            <option>All Experience</option>
            <option>Fresher</option>
            <option>1–2 Years</option>
          </select>

          <button
            className="reset-btn"
            onClick={() => {
              setSearch("");
              setLocation("All Locations");
              setType("All Types");
              setExperience("All Experience");
            }}
          >
            Reset filters
          </button>
        </div>

        <div className="job-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              saved={savedJobs.includes(job.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="empty-state">
            <h3>No jobs found</h3>
            <p>Try another search term or change your filters.</p>
          </div>
        )}
      </main>
    </>
  );
}