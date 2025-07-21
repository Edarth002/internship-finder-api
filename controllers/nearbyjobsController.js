import { matchJobs } from "../utils/matchJobs.js";
// import { getAllJobsFromAPI } from "../services/jobAPI.js"; // You’ll build this

export async function getNearbyJobs(req, res) {
  try {
    const user = req.user; // from middleware/auth
    const { lat, lon } = user;

    //   const jobs = await getAllJobsFromAPI(); // Must return jobs with lat/lon

    const nearbyJobs = matchJobs(lat, lon, jobs, 50000); // 50km max

    return res.status(200).json({ jobs: nearbyJobs });
  } catch (error) {
    console.log("Failed to get Nearbyjobs because: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
