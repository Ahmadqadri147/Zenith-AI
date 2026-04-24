const { PDFParse } = require('pdf-parse');
const { generateInterviewReport, generateResumePdf } = require('../service/ai.service')
const InterviewReportModel = require('../models/interviewReport.model')

/**
 * @desc Generate an interview preparation report based on the candidate's resume, self-description, and job description
 * @route POST /api/interview/
 * @access Private
 * @body { resume: String, SelfDescription: String, JobDescription: String }
 */
async function generateInterviewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Resume file is required' });
        }

        const parser = new PDFParse({ data: req.file.buffer });
        const data = await parser.getText();
        const resumeText = data.text;
        await parser.destroy();

        const { SelfDescription, JobDescription, model } = req.body;

        if (!SelfDescription || !JobDescription) {
            return res.status(400).json({ message: 'Self description and job description are required' });
        }

        const interviewReportAI = await generateInterviewReport({
            resume: resumeText,
            SelfDescription,
            JobDescription,
            model
        });

        const interviewReport = await InterviewReportModel.create({
            user: req.user.id,
            title: interviewReportAI.title || "Interview Preparation Report",
            JobDescription,
            Resume: resumeText,
            SelfDescription,
            MatchScore: interviewReportAI.matchScore,
            TechnicalQuestions: interviewReportAI.technicalQuestions,
            BehavioralQuestions: interviewReportAI.behavioralQuestions,
            SkillsGap: interviewReportAI.skillsGap,
            PreparationPlan: interviewReportAI.preparationPlan
        });

        res.status(201).json({
            message: 'Interview report generated successfully',
            interviewReport
        });
    } catch (error) {
        console.error('Error generating interview report:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

/**
 * @desc Get the interview preparation report by interviewId
 * @route GET /api/interview/Report/:interviewId
 * @access Private
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;
        const interviewReport = await InterviewReportModel.findOne({ _id: interviewId, user: req.user.id });
        if (!interviewReport) {
            return res.status(404).json({ message: 'Interview report not found' });
        }
        res.status(200).json({
            message: 'Interview report fetched successfully',
            interviewReport
        });
    } catch (error) {
        console.error('Error fetching interview report:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
 }

/**
 * @desc Get all interview preparation reports for the authenticated user
 * @route GET /api/interview/
 * @access Private
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await InterviewReportModel.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select('-Resume -SelfDescription -JobDescription -__v -TechnicalQuestions -BehavioralQuestions -SkillsGap -PreparationPlan');

        res.status(200).json({
            message: 'Interview reports fetched successfully',
            interviewReports
        });
    } catch (error) {
        console.error('Error fetching interview reports:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

/**
 * @desc Generate a resume pdf from the authenticated user's profile based on the slefDescription, Resume and job description
 * @route POST /api/interview/resume/pdf
 * @access Private
 */
async function generateResumePdfController(req, res) {
    try {
       const {interviewReportId} = req.params;

        if(!interviewReportId){
            return res.status(400).json({ message: 'Interview report id is required' });
        }
        const interviewReport = await InterviewReportModel.findOne({ _id: interviewReportId, user: req.user.id });
        if (!interviewReport) {
            return res.status(404).json({ message: 'Interview report not found' });
        }

        const resumePdf = await generateResumePdf({
            Resume  : interviewReport.Resume,
            SelfDescription : interviewReport.SelfDescription,
            JobDescription : interviewReport.JobDescription,
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
        res.status(200).send(resumePdf);
    } catch (error) {
        console.error('Error generating resume pdf:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}
