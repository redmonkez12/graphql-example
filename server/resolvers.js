import {createJob, deleteJob, getJob, getJobs, getJobsByCompany, updateJob} from "./db/jobs";
import {getCompany} from "./db/companies";
import {GraphQLError} from "graphql/error/index";

export const resolvers = {
    Query: {
        company: async (_root, { id }) => {
            const company = await getCompany(id);

            if (!company) {
                throw notFoundError(`No company found with id ${id}.`);
            }

            return company;
        },
        job: async (_root, { id }) => {
            const job = await getJob(id);

            if (!job) {
                throw notFoundError(`No Job found with id ${id}.`);
            }

            return job;
        },
        jobs: async () => {
            return getJobs();
        },
    },
    Mutation: {
        createJob: (_root, { input: { title, description }}) => {
            createJob({ title, description });
        },
        deleteJob: (_root, { id }) => {
            deleteJob(id);
        },
        updateJob: (_root, { input: { id, title, description }}) => {
            return updateJob({ id, title, description });
        },
    },
    Company: {
        jobs: (company) => getJobsByCompany(company.id),
    },
    Job: {
        company: async (job) => {
            return getCompany(job.companyId);
        },
        date: (job) => toIsoDate(job.createdAt),
    },
};

function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: { code: "NOT_FOUND" },
    });
}

function toIsoDate(value) {
    return value.slice(0, "yyyy-mm-dd".length);
}