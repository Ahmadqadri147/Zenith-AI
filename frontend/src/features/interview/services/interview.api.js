import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

/**
 * @desc Generate an interview preparation report based on the candidate's resume, self-description, and job description
 */
export const generateInterviewReport = async ({ resumeFile, SelfDescription, JobDescription, model }) => {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('SelfDescription', SelfDescription);
    formData.append('JobDescription', JobDescription);
    formData.append('model', model);

    const response = await api.post('/api/interview/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;

}

/**
 * @desc Get the interview preparation report by interviewId
 */

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/Report/${interviewId}`);
    return response.data;
}

/**
 * @desc Get all interview preparation reports for the authenticated user
 */

export const getAllInterviewReports = async () => {
    const response = await api.get('/api/interview/');
    return response.data;
}

/**
 * @desc Generate a resume pdf from the authenticated user's profile based on the slefDescription, Resume and job description
 */

export const generateResumePdf = async (interviewReportId) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, {}, {
        responseType: 'blob'
    });
    return response.data;
}

