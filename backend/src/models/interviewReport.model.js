const mongoose = require("mongoose");


/**
 * Job Description Schema:
 * ----------------------
 * - Job Description : String
 * - Resume Text     : String
 * - Self Description: String
 *
 * - Match Score     : Number
 *
 * - Technical Questions : [
 *     {
 *       question  : String,
 *       intention : String,
 *       answer    : String
 *     }
 *   ]
 *
 * - Behavioral Questions : [
 *     {
 *       question  : String,
 *       intention : String,
 *       answer    : String
 *     }
 *   ]
 *
 * - Skills Gap : [
 *     {
 *       skill : String,
 *       severity : {
 *         type : String,
 *         enum : ["low", "medium", "high"]
 *       }
 *     }
 *   ]
 *
 * - Preparation Plan : [
 *     {
 *       day   : Number,
 *       focus : String,
 *       tasks : [String]
 *     }
 *   ]
 */


const technicalQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"]
  },

  intention: {
    type: String,
    required: [true, "Intention is required"]
  },

  answer: {
    type: String,
    required: [true, "Answer is required"]
  }

}, {
  _id: false
});



const behavioralQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"]
  },

  intention: {
    type: String,
    required: [true, "Intention is required"]
  },

  answer: {
    type: String,
    required: [true, "Answer is required"]
  }

}, {
  _id: false
});




const skillGapSchema = new mongoose.Schema({

  skill: {
    type: String,
    required: [true, "Skill is required"]
  },

  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    required: [true, "Severity is required"]
  }

}, {
  _id: false
});



const preparationPlanSchema = new mongoose.Schema({

  day: {
    type: Number,
    required: [true, "Day is required"]
  },

  focus: {
    type: String,
    required: [true, "Focus is required"]
  },

  tasks: [{
    type: String,
    required: true
  }]

}, {
  _id: false
});



const interviewReportSchema = new mongoose.Schema({

  JobDescription: {
    type: String,
    required: [true, "Job description is required"]
  },

  Resume: {
    type: String
  },

  SelfDescription: {
    type: String
  },

  MatchScore: {
    type: Number,
    min: 0,
    max: 100
  },

  TechnicalQuestions: [technicalQuestionSchema],

  BehavioralQuestions: [behavioralQuestionSchema],

  SkillsGap: [skillGapSchema],

  PreparationPlan: [preparationPlanSchema],

   user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

   title: {
    type: String,
    required: [true, "Title is required"]
   }

}, {
  timestamps: true
});



const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);

module.exports = interviewReportModel;