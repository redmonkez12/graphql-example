import {getJob, getJobs} from "./db/jobs.js";
import {getCompany} from "./db/companies.js";

export const resolvers = {
    Query: {
        job: (_root, { id }) => {
            return getJob(id);
        },
        jobs: async () => {
            return getJobs();
        },
    },
    Job: {
        company: async (job) => {
            return getCompany(job.companyId);
        },
        date: (job) => toIsoDate(job.createdAt),
    },
};

function toIsoDate(value) {
    return value.slice(0, "yyyy-mm-dd".length);
}