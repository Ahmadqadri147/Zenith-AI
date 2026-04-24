# Zenith AI 🚀

**Zenith AI** is a premium, AI-powered career coaching platform designed to help professionals master their next interview and land their dream job. By leveraging advanced generative AI, Zenith AI analyzes your professional profile against target job descriptions to provide actionable insights and optimized assets.

---

## ✨ Key Features

-   **🔍 Intelligent Resume Analysis**: Analyzes your PDF resume and compares it with specific job descriptions to calculate a precise "Match Score".
-   **🤝 Personalized Interview Coaching**: Generates a tailored list of technical and behavioral questions based on your unique experience and the requirements of the role.
-   **🎯 ATS-Optimized Resume Generation**: Instantly builds a high-ATS-score, one-page resume in PDF format, strategically incorporating keywords and quantifiable achievements.
-   **📅 7-Day Preparation Plan**: Provides a structured, day-by-day roadmap to help you bridge skill gaps and prepare effectively for upcoming interviews.
-   **🕒 Report History**: Keep track of all your past analyses and reports with a sleek, easy-to-access history drawer.
-   **💎 Premium UI/UX**: A modern, column-based dashboard layout with smooth animations and a professional aesthetic.

---

## 🛠️ Technology Stack

### Frontend
-   **React.js**: Core library for building the user interface.
-   **Tailwind CSS**: For high-performance, modern styling.
-   **React Router**: For seamless, single-page application navigation.
-   **Axios**: For robust API communication.
-   **Lucide React**: For beautiful, consistent iconography.

### Backend
-   **Node.js & Express**: Scalable server-side architecture.
-   **MongoDB**: Flexible NoSQL database for storing user reports and profiles.
-   **Google Generative AI (Gemini 1.5 Flash)**: Powering the intelligent analysis and content generation.
-   **Puppeteer**: Used for high-quality, pixel-perfect PDF generation.
-   **pdf-parse**: For extracting and analyzing content from uploaded resumes.

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18 or higher)
-   MongoDB (Local or Atlas)
-   Google AI (Gemini) API Key

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/zenith-ai.git
    cd zenith-ai
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` folder:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    GOOGLE_GENAI_API_KEY=your_gemini_api_key
    ```

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start Backend Server**
    ```bash
    cd backend
    npm run dev
    ```

2.  **Start Frontend Development Server**
    ```bash
    cd frontend
    npm run dev
    ```

Visit `http://localhost:5173` to experience Zenith AI.

---

## 📸 Screenshots

*(Add your high-quality screenshots here to showcase the premium UI)*

---

## 🛡️ Security & Privacy

Zenith AI prioritizes your data security. Resumes are processed in real-time, and personal information is handled with industry-standard encryption. Generated reports are stored securely and are only accessible by the authenticated user.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Ahmad Qadri & Zenith Team**
