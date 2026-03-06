# WeTransform - AI-Powered Self-Care & Confidence Guidance Platform

An MVP web application designed to provide safe, AI-assisted self-care, grooming, fashion, diet, and confidence guidance for teenagers aged 12–18. The platform emphasizes healthy habits and personal growth rather than unrealistic appearance changes.

## 🎯 Project Overview

**WeTransform** is a digital self-growth companion that helps teenagers look better by learning to take care of themselves—physically, mentally, and socially—in a healthy and responsible way.

### Core Features:
- **Safe Onboarding** with mandatory parental consent
- **Optional AI Photo Analysis** (face shape, skin type, condition, tone)
- **Personalized Guidance** on skincare, haircut, fashion, diet, and confidence
- **3-Day Free Trial** followed by affordable subscription plans
- **Mock AI Analysis** for MVP (rule-based logic, no real ML)
- **Strong Safety & Ethics** focus with clear disclaimers

## 🏗️ Tech Stack

### Backend:
- **Node.js** + **Express.js**
- **MongoDB** for data storage
- **JWT** for authentication
- **Bcryptjs** for password hashing

### Frontend:
- **React** 18.2.0
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

## 📁 Project Structure

```
WeTransform/
├── Backend/
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API endpoints
│   ├── middleware/          # Authentication & utilities
│   ├── utils/               # Helper functions
│   ├── server.js            # Main server file
│   ├── .env.example         # Environment variables template
│   └── package.json
│
└── Frontend/
    ├── public/              # Static assets
    ├── src/
    │   ├── pages/           # Page components
    │   ├── components/      # Reusable components (if needed)
    │   ├── utils/           # API calls & context
    │   ├── styles/          # CSS files
    │   ├── App.js           # Main App component
    │   └── index.js         # React entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites:
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup:

1. **Navigate to Backend directory:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```
   
4. **Update `.env` with your MongoDB URI:**
   ```
   MONGODB_URI=mongodb://localhost:27017/wetransform
   JWT_SECRET=your_secure_secret_key
   PORT=5000
   ```

5. **Start MongoDB** (if local):
   ```bash
   mongod
   ```

6. **Run the Backend:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup:

1. **Navigate to Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file (optional):**
   ```bash
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Run the Frontend:**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication:
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### User Profile:
- `POST /api/user/profile` - Create/Update profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/selected-areas` - Update improvement areas
- `POST /api/user/upload-photo` - Upload photo for analysis
- `DELETE /api/user/delete-photo` - Delete uploaded photo

### Analysis:
- `POST /api/analysis/analyze` - Analyze uploaded photo
- `GET /api/analysis/latest` - Get latest analysis
- `POST /api/analysis/skip` - Skip photo analysis

### Guidance:
- `POST /api/guidance/generate` - Generate personalized guidance
- `GET /api/guidance/my-guidance` - Get user's guidance
- `GET /api/guidance/subscription-status` - Check subscription
- `POST /api/guidance/upgrade-subscription` - Upgrade plan

## 🔐 Safety & Ethics Guidelines

### Mandatory Features:
1. **Age Gate** - Users must be 12-18
2. **Parental Consent** - Mandatory checkbox required
3. **Data Protection** - Users can delete data anytime
4. **No Face Altering** - Analysis only, no transformations
5. **Clear Disclaimers** - Educational guidance, not medical advice
6. **Positive Language** - Avoid terms like "fix," "fair vs dark," "perfect"

### What We Don't Do:
- ❌ Show altered or "perfect" face transformations
- ❌ Promote unrealistic beauty standards
- ❌ Store photos permanently (mock implementation)
- ❌ Provide medical or cosmetic advice
- ❌ Share user data with third parties

## 📊 Database Models

### User:
```javascript
{
  email, password, age, gender,
  parentalConsent, parentEmail,
  subscriptionStatus, subscriptionEndDate,
  createdAt, lastLogin
}
```

### UserProfile:
```javascript
{
  userId, height, weight,
  photoUrl, photoConsent,
  selectedAreas, updatedAt
}
```

### Analysis:
```javascript
{
  userId, photoUrl,
  faceShape, skinType, skinCondition, skinTone,
  insights, analyzedAt, confidence
}
```

### Guidance:
```javascript
{
  userId, areas, dietChart,
  confidenceTips, generatedAt, updatedAt
}
```

## 🎨 UI/UX Features

- **Color Palette**: Black background with neon green accents
- **Typography**: Clear, friendly, encouraging language
- **Accessibility**: High contrast, readable fonts
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **User Flow**: Simple, intuitive navigation

## 📝 User Journey

1. **Landing Page** → Learn about WeTransform
2. **Signup** → Create account (age gate + parental consent)
3. **Onboarding** → Enter height, weight, select improvement areas
4. **Photo Analysis** → Optional photo upload or skip
5. **Guidance Selection** → Confirm/choose focus areas
6. **Guidance Dashboard** → View personalized recommendations
7. **Subscription** → Upgrade to premium plans (MVP)

## 🔄 Free Trial & Subscription

- **Free Trial**: 3 days (automatically expires)
- **Plans**:
  - 1 Month: ₹149
  - 2 Months: ₹250
  - 3 Months: ₹450
  - 6 Months: ₹600

*Note: Payment gateway integration is out of scope for MVP*

## 🧪 Testing

To test the application:

1. **Create a test account**
2. **Use mock data** for profile (height: 170, weight: 65)
3. **Select improvement areas**
4. **Skip or upload a photo** (any image works)
5. **View personalized guidance**
6. **Check subscription status**

## 🚀 Deployment

### Backend (Heroku):
```bash
heroku create your-app-name
git push heroku main
```

### Frontend (Vercel/Netlify):
```bash
npm run build
# Deploy the 'build' folder
```

## 📋 Scope & Out of Scope

### ✅ In Scope (MVP):
- User authentication & profiles
- Mock AI analysis (rule-based)
- Personalized guidance generation
- Subscription UI (no payment)
- Safety & ethics compliance
- Responsive design

### ❌ Out of Scope (MVP):
- Real facial analysis ML model
- Payment gateway integration
- Social media sharing
- Community features
- Medical diagnoses
- Brand endorsements

## 🛡️ Security Best Practices

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens for authentication
- ✅ CORS enabled for frontend
- ✅ Input validation on all endpoints
- ✅ No sensitive data in responses
- ✅ Environment variables for secrets

## 📄 Environment Variables

### Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wetransform
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

This is an MVP project. Future enhancements:
- Real ML model for photo analysis
- Payment gateway integration
- Enhanced personalization algorithms
- Progress tracking with charts
- Community moderation features
- Mobile app version

## 📞 Support & Contact

For issues or questions about the platform:
- Review the disclaimer on all pages
- Contact us through the app
- Parental consent notice is mandatory

## ⚖️ Legal & Compliance

- **Age Restriction**: 12-18 years only
- **GDPR Compliant**: Data protection focus
- **Parental Consent**: Required for minors
- **Disclaimer**: Clear educational-only messaging

## 📄 License

This project is proprietary and designed for educational purposes.

---

**Remember**: WeTransform is about **self-care, good habits, and confidence**—not perfection. 💚
#   W e T r a n s f o r m  
 