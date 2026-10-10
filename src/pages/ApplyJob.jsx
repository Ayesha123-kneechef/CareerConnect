import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jobs } from "../data/jobs";

export default function ApplyJob({ applications, setApplications }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((item) => item.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
  });

  const [errors, setErrors] = useState({});

  if (!job) {
    return <main className="page-container"><h2>Job not found</h2><Link to="/">Back to Jobs</Link></main>;
  }

  const alreadyApplied = applications.some(
    (application) => application.jobId === job.id
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Please enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!form.resume.trim()) {
      newErrors.resume = "Please provide your resume link.";
    } else {
      try {
        const url = new URL(form.resume);
        if (!["http:", "https:"].includes(url.protocol)) {
          newErrors.resume = "Enter a valid HTTP or HTTPS link.";
        }
      } catch {
        newErrors.resume = "Enter a valid resume URL.";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const application = {
      id: Date.now(),
      jobId: job.id,
      company: job.company,
      role: job.role,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      resume: form.resume.trim(),
      coverLetter: form.coverLetter.trim(),
      status: "Applied",
      date: new Date().toLocaleDateString("en-IN"),
    };

    setApplications((previous) => [...previous, application]);
    navigate("/applied");
  }

  if (alreadyApplied) {
    return (
      <main className="page-container empty-state">
        <h2>You've already applied!</h2>
        <p>You can track your application from My Applications.</p>
        <Link to="/applied" className="primary-btn">View Applications</Link>
      </main>
    );
  }

  return (
    <main className="page-container">
      <Link to={`/jobs/${job.id}`} className="back-link">← Back to job details</Link>

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <p className="eyebrow">TAKE THE NEXT STEP</p>
        <h1>Apply for {job.role}</h1>
        <p className="form-subtitle">{job.company} · {job.location}</p>

        <label htmlFor="name">Full Name *</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />
        {errors.name && <p className="error">{errors.name}</p>}

        <label htmlFor="email">Email Address *</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="phone">Mobile Number *</label>
        <input id="phone" name="phone" inputMode="numeric" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label htmlFor="resume">Resume URL *</label>
        <input id="resume" name="resume" value={form.resume} onChange={handleChange} placeholder="https://drive.google.com/..." />
        {errors.resume && <p className="error">{errors.resume}</p>}
        <p className="field-hint">Paste a shareable link to your resume.</p>

        <label htmlFor="coverLetter">Cover Letter (Optional)</label>
        <textarea id="coverLetter" name="coverLetter" value={form.coverLetter} onChange={handleChange} rows="4" placeholder="Tell the employer why you're a good fit..." />

        <button type="submit" className="primary-btn submit-btn">
          Submit Application →
        </button>
      </form>
    </main>
  );
}