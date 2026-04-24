const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const { upload } = require('../middlewares/file.middleware');

const interviewRouter = express.Router();


/**
 * @route POST /api/interview/
 * @desc  Generate an interview preparation report based on the candidate's resume, self-description, and job description
 * @access Private
 * @body { resume: String, SelfDescription: String, JobDescription: String }
 */

interviewRouter.post('/', authMiddleware.authUser, upload.single('resume'), interviewController.generateInterviewReportController)


/**
 * @route GET /api/interview/interviewId
 * @desc  Get the interview preparation report by interviewId
 * @access Private
 */
interviewRouter.get('/Report/:interviewId', authMiddleware.authUser, interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @desc  Get all interview preparation reports for the authenticated user
 * @access Private
 */
interviewRouter.get('/', authMiddleware.authUser, interviewController.getAllInterviewReportsController)

/**
 * @route POST /api/interview/resume/pdf
 * @desc  Generate a resume pdf from the authenticated user's profile based on the slefDescription, Resume and job description
 * @access Private
 * @body { interviewReportId: String }
 */
interviewRouter.post('/resume/pdf/:interviewReportId', authMiddleware.authUser, interviewController.generateResumePdfController)

module.exports = interviewRouter;