import haversineFunction from "./haversine.js";

export function matchJobs(lat1, lon1, jobs, maxDistance = 50000) {
  return jobs.filter((job) => {
    const distance = haversineFunction(lat1, lon1, job.lat, job.lon);
    return distance <= maxDistance;
  });
}
