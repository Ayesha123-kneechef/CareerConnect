import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import SavedJobs from "./pages/SavedJobs";
import AppliedJobs from "./pages/AppliedJobs";
import "./index.css";

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function CareerConnect() {
  const [savedJobs, setSavedJobs] = useState(
    () => readStorage("careerconnect-saved", [])
  );

  const [applications, setApplications] = useState(
    () => readStorage("careerconnect-applications", [])
  );

  useEffect(() => {
    localStorage.setItem("careerconnect-saved", JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem(
      "careerconnect-applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  function onToggleSave(jobId) {
    setSavedJobs((previous) =>
      previous.includes(jobId)
        ? previous.filter((id) => id !== jobId)
        : [...previous, jobId]
    );
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              savedJobs={savedJobs}
              onToggleSave={onToggleSave}
            />
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <JobDetails
              savedJobs={savedJobs}
              onToggleSave={onToggleSave}
            />
          }
        />

        <Route
          path="/apply/:id"
          element={
            <ApplyJob
              applications={applications}
              setApplications={setApplications}
            />
          }
        />

        <Route
          path="/saved"
          element={
            <SavedJobs
              savedJobs={savedJobs}
              onToggleSave={onToggleSave}
            />
          }
        />

        <Route
          path="/applied"
          element={<AppliedJobs applications={applications} />}
        />

        <Route
          path="*"
          element={
            <main className="page-container empty-state">
              <h1>404 – Page Not Found</h1>
              <a href="/" className="primary-btn">Back to Home</a>
            </main>
          }
        />
      </Routes>

      <footer className="footer">
        <p>© 2026 CareerConnect. Find your next opportunity.</p>
      </footer>
    </BrowserRouter>
  );
}

export default CareerConnect;