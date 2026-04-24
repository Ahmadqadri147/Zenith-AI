import { generateInterviewReport, getAllInterviewReports, getInterviewReportById, generateResumePdf as generateResumePdfApi } from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }
    const { report, setreport, loading, setloading, reports, setreports } = context;

    const generateReport = async ({ resumeFile, SelfDescription, JobDescription, model }) => {
        try {
            setloading(true);
            const data = await generateInterviewReport({ resumeFile, SelfDescription, JobDescription, model });
            setreport(data.interviewReport);
            return data.interviewReport;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    const getreportbyid = async (interviewId) => {
        try {
            setloading(true);
            const data = await getInterviewReportById(interviewId);
            setreport(data.interviewReport);
            return data.interviewReport;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    const getallreports = async () => {
        try {
            setloading(true);
            const data = await getAllInterviewReports();
            setreports(data.interviewReports);
            return data.interviewReports;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    const generateResumePdf = async (interviewReportId) => {
        try {
            setloading(true);
            const data = await generateResumePdfApi(interviewReportId);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    return { report, generateReport, loading, getreportbyid, getallreports, reports, generateResumePdf };
};