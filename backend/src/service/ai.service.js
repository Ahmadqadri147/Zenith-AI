const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");


const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
});


const interviewReportSchema = z.object({

  matchScore: z.number().min(0).max(100).describe(
    "A percentage score representing how well the candidate's profile matches the job describe"
  ),

  technicalQuestions: z.array(
    z.object({

      question: z.string().describe(
        "The technical question to be asked to the candidate"
      ),

      intention: z.string().describe(
        "The intention of interviewer behind asking this question"
      ),

      answer: z.string().describe(
        "How to answer this question, What points to cover, What approch to take while answering , etc"
      )

    })
  ).describe(
    "A list of technical questions tailored to the candidate's background and the job role"
  ),


  behavioralQuestions: z.array(
    z.object({

      question: z.string().describe(
        "The behavioral question to be asked to the candidate"
      ),

      intention: z.string().describe(
        "The intention of interviewer behind asking this question"
      ),

      answer: z.string().describe(
        "How to answer this question using STAR method or similar professional approach"
      )

    })
  ).describe(
    "A list of behavioral questions tailored to the candidate's background and the job role"
  ),


  skillsGap: z.array(
    z.object({

      skill: z.string().describe(
        "The skill that is missing or needs improvement based on the job describe"
      ),

      severity: z.enum([
        "low",
        "medium",
        "high"
      ]).describe(
        "The importance of this skill for the specific role"
      )

    })
  ).describe(
    "A list of identified skill gaps between the candidate's profile and the job requirements"
  ),


  preparationPlan: z.array(
    z.object({

      day: z.number().describe(
        "The day number in the preparation schedule"
      ),

      focus: z.string().describe(
        "The main topic or area of focus for this day"
      ),

      tasks: z.array(
        z.string()
      ).describe(
        "Specific actionable tasks to complete on this day"
      )

    })
  ).describe(
    "A structured 7-day preparation plan to help the candidate bridge gaps and prepare for the interview"
  ),
  title: z.string().describe("The title of the interview report, usually the job title")


});



async function generateInterviewReport({
  resume,
  JobDescription,
  SelfDescription,
  model = "gemini-3-flash-preview"
}) {

  const prompt = `
You are an expert technical interviewer and career coach.

Your task is to analyze a candidate's Resume, Self-describe, and a specific Job describe to generate a comprehensive Interview Preparation Report.

Input Data:

1. Resume:
${JSON.stringify(resume)}

2. Self-describe:
${JSON.stringify(SelfDescription)}

3. Job describe:
${JSON.stringify(JobDescription)}

Instructions:

- Calculate a Match Score (0-100) based on how well the candidate’s skills and experience align with the Job describe.

- Generate 5-7 Technical Questions that bridge the candidate’s existing projects with the requirements of the new role.

- Generate 3-5 Behavioral Questions focused on soft skills and past experiences.

- Identify specific Skills Gaps where the candidate lacks requirements mentioned in the Job describe and categorize severity as:
"low", "medium", or "high"

- Create a detailed 7-day Preparation Plan with daily focus areas and actionable tasks.

IMPORTANT:
Return ONLY valid JSON.
Do not include explanations.
Do not wrap response in markdown.
Do not return text outside JSON.

Output Format:

{
  "title": "Senior Frontend Developer",
  "matchScore": 85,

  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],

  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],

  "skillsGap": [
    {
      "skill": "",
      "severity": "low"
    }
  ],

  "preparationPlan": [
    {
      "day": 1,
      "focus": "",
      "tasks": [
        ""
      ]
    }
  ]
}
`;


  const aiResponseSchema = {
    type: "object",
    properties: {
      title: { type: "string", description: "The title of the interview report, usually the job title" },
      matchScore: { type: "number", description: "A percentage score representing how well the candidate's profile matches the job describe" },
      technicalQuestions: {
        type: "array",
        description: "A list of technical questions tailored to the candidate's background and the job role",
        items: {
          type: "object",
          properties: {
            question: { type: "string", description: "The technical question to be asked to the candidate" },
            intention: { type: "string", description: "The intention of interviewer behind asking this question" },
            answer: { type: "string", description: "How to answer this question, What points to cover, What approch to take while answering , etc" }
          },
          required: ["question", "intention", "answer"]
        }
      },
      behavioralQuestions: {
        type: "array",
        description: "A list of behavioral questions tailored to the candidate's background and the job role",
        items: {
          type: "object",
          properties: {
            question: { type: "string", description: "The behavioral question to be asked to the candidate" },
            intention: { type: "string", description: "The intention of interviewer behind asking this question" },
            answer: { type: "string", description: "How to answer this question using STAR method or similar professional approach" }
          },
          required: ["question", "intention", "answer"]
        }
      },
      skillsGap: {
        type: "array",
        description: "A list of identified skill gaps between the candidate's profile and the job requirements",
        items: {
          type: "object",
          properties: {
            skill: { type: "string", description: "The skill that is missing or needs improvement based on the job describe" },
            severity: { type: "string", enum: ["low", "medium", "high"], description: "The importance of this skill for the specific role" }
          },
          required: ["skill", "severity"]
        }
      },
      preparationPlan: {
        type: "array",
        description: "A structured 7-day preparation plan to help the candidate bridge gaps and prepare for the interview",
        items: {
          type: "object",
          properties: {
            day: { type: "number", description: "The day number in the preparation schedule" },
            focus: { type: "string", description: "The main topic or area of focus for this day" },
            tasks: { type: "array", items: { type: "string" }, description: "Specific actionable tasks to complete on this day" }
          },
          required: ["day", "focus", "tasks"]
        }
      }
    },
    required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillsGap", "preparationPlan"]
  };

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: aiResponseSchema
    }
  });


  return JSON.parse(response.text);

}


async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu"
    ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle2" });
  const pdfBuffer = await page.pdf({ 
    format: "A4", 
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });
  await browser.close();

  return pdfBuffer;

}



async function generateResumePdf({ Resume, SelfDescription, JobDescription }) {
  const model = "gemini-3-flash-preview";

  const resumePdfSchema = {
    type: "object",
    properties: {
      html: {
        type: "string",
        description: "The html content of the resume which can be converted to pdf by using puppeteer. Include CSS for a professional look."
      }
    },
    required: ["html"]
  };

  const prompt = `
  You are an Expert Resume Writer and Career Coach specialized in ATS (Applicant Tracking System) optimization.
  
  Your task is to generate a professional, modern, and HIGH-ATS-SCORE resume in HTML format.

  CRITICAL REQUIREMENT: The resume MUST fit on EXACTLY ONE A4 page. 

  Details:
  Resume Data: ${Resume}
  Candidate Profile: ${SelfDescription}
  Target Job Description: ${JobDescription}

  ATS Optimization Instructions:
  1. Keyword Integration: Strategically incorporate hard skills and industry keywords from the Job Description into the candidate's experience and skills sections.
  2. Action-Oriented Language: Use strong action verbs (e.g., "Spearheaded", "Architected", "Optimized") to start bullet points.
  3. Quantifiable Results: Whenever possible, transform experience into measurable achievements (e.g., "Increased efficiency by 30%" or "Managed a budget of $50k").
  4. Standard Headings: Use conventional section titles like "Experience", "Skills", "Education", and "Projects" for easy parsing.
  5. Clean Hierarchy: Ensure a clear logical flow from most relevant to least relevant information.

  Layout & Style Instructions:
  - Use a clean, one-page layout with professional inline CSS.
  - Base font size: 10pt or 11pt.
  - Standard fonts: Arial, Helvetica, or sans-serif.
  - Ensure no complex tables or graphics that might confuse a basic parser (keep it semantic).
  - Return ONLY the HTML content wrapped in the specified JSON structure.
  `;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: resumePdfSchema
    }
  });

  const jsonContent = JSON.parse(response.text);
  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
  return pdfBuffer;

}


module.exports = { generateInterviewReport, generateResumePdf };