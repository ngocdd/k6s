import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // A number specifying the number of VUs to run concurrently.
  // vus: 500,
  // A string specifying the total duration of the test run.
  // duration: "120s",

  stages: [
    { duration: "1m", target: 500 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: "10m", target: 500 }, // stay at 100 users for 30 minutes
    { duration: "1m", target: 0 }, // ramp-down to 0 users
  ],
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function () {
  http.get(
    "https://be.qablogs.io.vn/api/v1/top-sell-buy?startDate=2023-01-01&endDate=2023-01-10"
  );
  sleep(1);
}
export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
