# GenAiDev - Secure Authentication System

Yeh ek robust aur secure Authentication System hai jo Node.js, Express aur MongoDB ka use karke banaya gaya hai. Isme JWT-based authentication aur token blacklisting ka feature shamil hai.

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** Bcrypt.js, Middleware Protection
- **Configuration:** Dotenv

---

## 🛡️ Security Features (High Priority)

Maine is project mein security ka khaas khayal rakha hai:

1.  **Password Hashing:** `bcryptjs` ka use karke passwords ko plain text ke bajaye hashed format (Salt rounds: 10) mein store kiya jata hai. Isse database leak hone par bhi passwords safe rehte hain.
2.  **JWT Authentication:** Users ko authenticate karne ke liye secure tokens use kiye gaye hain jo cookies mein store hote hain.
3.  **Token Blacklisting (Logout Security):** Logout hone ke baad token ko `blacklistTokenModel` mein daal diya jata hai. Isse agar koi purana token chura bhi le, toh woh dubara use nahi ho payega jab tak naya login na ho.
4.  **Protected Routes:** Middleware (`authUser`) ka use karke private routes ko secure kiya gaya hai. Sirf valid token waale logged-in users hi `/get-me` jaise data access kar sakte hain.
5.  **Environment Secrets:** `dotenv` ka use karke `JWT_SECRET` aur database credentials ko code se alag rakha gaya hai (Security best practice).
6.  **Input Validation:** Controllers mein basic validation checks hain taaki koi empty fields ya duplicate accounts na banna sakein.

---

## 🛠️ Installation & Setup

1.  **Clone the repo:**
    ```bash
    git clone <your-repo-link>
    cd GenAiDev
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Ek `.env` file banayein aur usme niche di gayi details bharein:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```

4.  **Run the Server:**
    ```bash
    npm start
    ```

---

## 📡 API Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Naya user create karta hai aur password hash karta hai. |
| `POST` | `/api/auth/login` | Public | Email/Password check karke JWT token generate karta hai. |
| `GET` | `/api/auth/logout` | Public | Token ko blacklist karta hai aur cookie clear karta hai. |
| `GET` | `/api/auth/get-me` | **Private** | Logged-in user ki details fetch karta hai (Middleware Protected). |

---

## 📂 Folder Structure

- `src/controllers`: Saari business logic (Login, Register, Logout).
- `src/models`: Database schemas (User aur Blacklist).
- `src/middlewares`: Security checks (JWT verification).
- `src/routes`: API endpoints definition.
- `src/config`: Database connection setup.

---

Developed with ❤️ by GenAiDev.
