import haversineFunction from "./haversine.js";

export function matchJobs(lat1, lon1, jobs, maxDistance) {
  return jobs.filter((job) => {
    const distance = haversineFunction(lat1, lon1, job.latitude, job.longitude);
    return distance <= maxDistance;
  });
}
