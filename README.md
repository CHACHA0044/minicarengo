# 🏥 MiniCare NGO - Healthcare Support Web Application

**A Full-Stack Healthcare Support Platform with AI Integration**

MiniCare NGO is a comprehensive healthcare support web application built to connect patients, volunteers, and healthcare professionals. This project demonstrates modern web development practices, authentication flows, role-based access control, and AI-powered automation.

## 🔗 Live Deployment

### 🌐 Frontend (Vercel)
**URL:** [https://minicarengo.vercel.app](https://minicarengo.vercel.app)

> ⚠️ **Disclaimer:**  
> This is a **concept-level prototype** built for learning and demonstration purposes. It is not intended for production use without further security hardening and compliance measures.

---

## 📂 Project Structure
```
HEALTH/
│
├── frontendheal/                # Next.js Frontend
│   ├── app/                     # App router pages
│   │   ├── auth/               # Authentication page
│   │   ├── contact/            # Contact page
│   │   ├── doctor/             # Doctor dashboard
│   │   ├── info/               # Information & resources
│   │   ├── patient/            # Patient support page
│   │   ├── role/               # Role selection page
│   │   ├── volunteer/          # Volunteer registration
│   │   └── page.tsx            # Home page
│   ├── public/                  # Static assets
│   ├── .env.local              # Environment variables
│   ├── package.json            # Dependencies
│   └── README.md               # Frontend documentation
│
├── routes/                      # Backend Routes
│   ├── authRoutes.js           # Authentication endpoints
│   ├── userRoutes.js           # User management endpoints
│   └── aiRoutes.js             # AI integration endpoints
│
├── middleware/                  # Express middleware
│   └── auth.js                 # JWT authentication
│
├── models/                      # MongoDB schemas
│   └── User.js                 # User model
│
├── config/                      # Configuration files
│   └── db.js                   # Database connection
│
├── server.js                    # Express server entry point
├── package.json                 # Backend dependencies
└── README.md                    # Project documentation
```

---

## 🚀 Features

### 🔐 Authentication & Authorization
- **User Registration & Login** - Secure account creation with email validation
- **JWT-based Authentication** - Token-based auth with HTTP-only cookies
- **Role-based Access Control** - Different dashboards for patients, volunteers, and doctors
- **Session Management** - Secure logout and session persistence

### 📝 Support Forms
- **Patient Registration** - Submit health concerns and request support
- **Volunteer Registration** - Sign up to help patients and families
- **Contact Form** - Reach out to the MiniCare team
- **Help Request Submission** - Quick access to assistance

### 🤖 AI-Powered Features
- **Symptom Analysis** - AI summarization of patient descriptions
- **Smart Chatbot** - Interactive health guidance assistant
- **Keyword Recognition** - Intelligent parsing of health concerns
- **Automated Triage** - Priority routing based on symptoms

### 🎨 User Experience
- **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- **Real-time Feedback** - Loading states and success/error messages
- **Mobile Responsive** - Optimized for all device sizes
- **Accessibility** - Semantic HTML and ARIA labels

---

## 🧩 System Architecture
```mermaid
flowchart LR
    User[User Browser] -->|HTTP Requests| Frontend[Next.js Frontend]
    Frontend -->|API Calls| Backend[Express API]
    Backend -->|JWT Auth| Auth[Auth Middleware]
    Backend -->|CRUD Operations| DB[(MongoDB Atlas)]
    Backend -->|AI Requests| AI[AI Service]
    
    style Frontend fill:#3b82f6
    style Backend fill:#10b981
    style DB fill:#f59e0b
    style AI fill:#8b5cf6
```

### Data Flow
1. **User Interaction** - User interacts with Next.js frontend
2. **API Request** - Frontend sends authenticated requests to Express backend
3. **Authentication** - JWT middleware validates user tokens
4. **Database Operations** - MongoDB stores/retrieves user and submission data
5. **AI Processing** - AI service analyzes patient messages and generates insights
6. **Response** - Data flows back through the stack to the user

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Features:**
  - Server-side rendering (SSR)
  - Client-side routing
  - API route handlers
  - Optimized image loading

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (jsonwebtoken)
- **Security:** bcryptjs, cookie-parser, cors
- **Deployment:** Render
- **Features:**
  - RESTful API design
  - Middleware-based architecture
  - Session management
  - Error handling

### AI Integration
- **Current:** Rule-based pattern matching
- **Future:** OpenAI GPT, Google Gemini, Anthropic Claude
- **Capabilities:**
  - Symptom analysis
  - Health recommendations
  - Conversational chatbot
  - Multi-language support (planned)

---

**Pages:**
- `/` - Home page
- `/auth` - Login/Register
- `/role` - Role selection
- `/patient` - Patient support
- `/volunteer` - Volunteer registration
- `/doctor` - Doctor dashboard
- `/contact` - Contact form
- `/info` - Health resources

### 🔧 Backend (Render)
**URL:** [https://minicarengo.onrender.com](https://minicarengo.onrender.com)

**Health Check:** `GET /ping`

---

## 📌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Create new user account | No |
| POST | `/login` | Authenticate user | No |
| GET | `/me` | Get current user info | Yes |
| POST | `/logout` | End user session | Yes |
| GET | `/ping` | Server health check | No |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/submit` | Submit patient/volunteer form | Yes |
| GET | `/patients` | Get all patient requests | Yes (Doctor) |

### AI Routes (`/api/ai`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/summarize` | Generate AI summary of symptoms | No |
| POST | `/chat` | Chat with AI health bot | No |

---

## 🔐 Environment Variables

### Backend (`.env`)
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/minicare

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL (for CORS)
FRONTEND_URL=https://minicarengo.vercel.app

# AI Configuration (Optional)
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here
```

### Frontend (`.env.local`)
```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://minicarengo.onrender.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas account)
- Git

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/minicare-ngo.git
cd minicare-ngo

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev

# Or start production server
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontendheal

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your backend URL

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

The frontend will run on `http://localhost:3000`

### Database Setup

1. **MongoDB Atlas** (Recommended)
   - Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create new cluster
   - Get connection string
   - Add to `MONGO_URI` in `.env`

2. **Local MongoDB**
```bash
   # Install MongoDB
   brew install mongodb-community  # macOS
   # or download from mongodb.com
   
   # Start MongoDB
   mongod --dbpath /path/to/data
   
   # Update MONGO_URI in .env
   MONGO_URI=mongodb://localhost:27017/minicare
```

---

## 📖 Usage Guide

### For Patients

1. **Register/Login** - Create an account or sign in
2. **Describe Symptoms** - Enter your health concerns in detail
3. **AI Analysis** - Receive instant symptom analysis
4. **Choose Support** - Talk to a doctor or chat with AI bot
5. **Get Help** - Connect with healthcare professionals

### For Volunteers

1. **Register** - Sign up as a volunteer
2. **Select Help Types** - Choose areas you want to support
3. **Provide Contact** - Enter your phone number
4. **Get Matched** - Receive patient requests matching your expertise

### For Doctors

1. **Login** - Access your doctor dashboard
2. **Review Requests** - See all patient submissions
3. **View Details** - Read patient symptoms and AI analysis
4. **Accept Cases** - Choose patients to help
5. **Provide Care** - Offer medical guidance and support

---

## 🔮 Future Enhancements

### Phase 1: Core Features
- [ ] Admin dashboard for NGO management
- [ ] Doctor appointment scheduling system
- [ ] Real-time chat between patients and doctors
- [ ] File upload for medical documents
- [ ] Email/SMS notifications

### Phase 2: AI Enhancement
- [ ] Advanced AI chatbot with GPT-4
- [ ] Multi-language support (Hindi, Spanish, etc.)
- [ ] Voice input for symptom description
- [ ] Mental health screening tool
- [ ] Medication reminder system

### Phase 3: Advanced Features
- [ ] Video consultation integration
- [ ] Electronic health records (EHR)
- [ ] Prescription management
- [ ] Health tracking dashboard
- [ ] Community forum
- [ ] Mobile app (React Native)

### Phase 4: Scalability
- [ ] Microservices architecture
- [ ] Redis caching
- [ ] Load balancing
- [ ] CDN integration
- [ ] Advanced analytics
- [ ] HIPAA compliance

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [x] User can register with valid credentials
- [x] User cannot register with duplicate email
- [x] User can login with correct credentials
- [x] User receives error with wrong password
- [x] User stays logged in after page refresh
- [x] User can logout successfully

**Patient Flow:**
- [x] Patient can submit symptoms
- [x] AI generates summary correctly
- [x] Chat bot responds appropriately
- [x] Patient can view options after submission

**Volunteer Flow:**
- [x] Volunteer can select multiple help types
- [x] Form validates required fields
- [x] Submission succeeds with all data

**Doctor Flow:**
- [x] Doctor can view patient list
- [x] Doctor can see patient details
- [x] Doctor can accept cases

### Automated Testing (Planned)
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

---

## 🛡️ Security Considerations

### Implemented
- ✅ Password hashing with bcryptjs
- ✅ JWT authentication with HTTP-only cookies
- ✅ CORS protection
- ✅ Environment variable protection
- ✅ Input validation
- ✅ SQL injection prevention (MongoDB)

### Recommended for Production
- [ ] Rate limiting
- [ ] HTTPS enforcement
- [ ] Content Security Policy (CSP)
- [ ] SQL injection testing
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Security headers (Helmet.js)
- [ ] Regular security audits
- [ ] HIPAA compliance measures

---

## 📊 Performance Optimization

### Current Optimizations
- Server-side rendering with Next.js
- Image optimization with next/image
- Code splitting and lazy loading
- MongoDB indexing
- Efficient API design

### Future Optimizations
- Redis caching layer
- CDN for static assets
- Database query optimization
- API response compression
- Service worker for offline support

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
```bash
   git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
   git commit -m "Add amazing feature"
```
4. **Push to the branch**
```bash
   git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Be respectful and collaborative

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Pranav Dembla**
- Role: Full Stack Developer
- Education: Computer Science Student
- Focus: Backend Development & System Design

**Contact:**
- GitHub: [CHACHA0044](https://github.com/CHACHA0044)
- LinkedIn: [Your Name](www.linkedin.com/in/pranav-dembla-3a1431291)
- Email: pdembla@student.iul.ac.in
---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **MongoDB** - For reliable database services
- **Vercel** - For seamless frontend deployment
- **Render** - For free backend hosting
- **Tailwind CSS** - For beautiful styling utilities
- **Open Source Community** - For countless helpful packages

---

## ⭐ Project Status

**Current Version:** 1.0.0 (Prototype)

**Status:** Active Development

**Last Updated:** January 2025

---

## 📞 Support

For questions, issues, or suggestions:

1. **GitHub Issues** - [Create an issue](https://github.com/yourusername/minicare-ngo/issues)
2. **Email** - support@minicare.org
3. **Documentation** - Check this README

---

## 🎯 Learning Outcomes

This project demonstrates proficiency in:

- ✅ Full-stack web development
- ✅ RESTful API design
- ✅ Authentication & authorization
- ✅ Database modeling & optimization
- ✅ Modern frontend development
- ✅ AI integration concepts
- ✅ Deployment & DevOps
- ✅ Clean code architecture
- ✅ User experience design
- ✅ Project documentation

---

## 💡 Final Notes

MiniCare NGO is a **concept-level prototype** built to demonstrate modern web development skills and AI integration in healthcare. While it showcases core functionality, it is designed with scalability in mind and can be extended into a production-ready system with additional security, compliance, and feature enhancements.

**This project is ideal for:**
- Learning full-stack development
- Understanding healthcare tech
- Exploring AI integration
- Portfolio demonstration
- Internship/job applications
- Open source contribution

---

**Made with ❤️ for the community**

*Helping those who need it most, one line of code at a time.*
