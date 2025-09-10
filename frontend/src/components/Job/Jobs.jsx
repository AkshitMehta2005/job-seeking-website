import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const AllJobsPage = () => {
  const [jobList, setJobList] = useState([]); // ✅ Clearer name
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/job/getall", {
          withCredentials: true,
        });
        setJobList(res.data.jobs); // ✅ Set only the jobs array
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobList.map((job) => (
            <div className="card" key={job._id}>
              <p>{job.title}</p>
              <p>{job.category}</p>
              <p>{job.country}</p>
              <Link to={`/job/${job._id}`}>Job Details</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllJobsPage;
