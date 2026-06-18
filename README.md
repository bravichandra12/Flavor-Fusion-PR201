# 🍳 Flavor Fusion

> AI-Powered Recipe Generation Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.3.0-green)](https://www.prisma.io/)
[![NextAuth](https://img.shields.io/badge/NextAuth-4.24.11-purple)](https://next-auth.js.org/)

Flavor Fusion is an innovative AI-powered recipe generation platform that helps users create delicious recipes based on their preferences, ingredients, and dietary requirements. Whether you're looking to use up leftovers or explore new culinary adventures, Flavor Fusion makes cooking accessible and exciting for everyone.

## ✨ Features

### 🤖 AI Recipe Generation
- **Smart Recipe Creation**: Generate personalized recipes using advanced AI (Groq/OpenAI)
- **Ingredient-Based Recipes**: Turn your available ingredients into delicious meals
- **Dietary Preferences**: Support for vegetarian, vegan, gluten-free, and other dietary restrictions
- **Indian Cuisine Focus**: Specialized in generating authentic Indian recipes with detailed instructions

### 📸 Visual Recipe Discovery
- **Ingredient Photo Recognition**: Upload photos of ingredients to get matching recipes
- **Recipe Gallery**: Browse through curated recipe collections
- **Visual Recipe Cards**: Beautiful presentation of generated recipes

### 👤 User Management
- **Secure Authentication**: Google OAuth integration via NextAuth.js
- **User Profiles**: Personalized cooking preferences and dietary restrictions
- **Recipe Cookbook**: Save and organize your favorite generated recipes

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.1.6 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React & React Icons
- **Authentication**: NextAuth.js with Google provider

### Backend
- **Database**: PostgreSQL with Prisma ORM
- **API Routes**: Next.js API routes
- **Authentication**: NextAuth.js with Prisma adapter
- **Password Hashing**: bcrypt

### AI Integration
- **Primary AI**: Groq API (llama3-70b-8192 model)
- **Fallback**: OpenAI API
- **Image Processing**: Streamlit app for ingredient recognition

### Development Tools
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Groq API key (or OpenAI API key)
- Google OAuth credentials (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PR2012/pr201
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `pr201` directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/flavor_fusion"
   
   # NextAuth
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # AI APIs (use one or both)
   NEXT_PUBLIC_GROQ_API_KEY="your-groq-api-key"
   OPENAI_API_KEY="your-openai-api-key"
   ```

   ⚠️ **Security Note**: Never commit API keys to version control. Use environment variables and add `.env` to `.gitignore`.

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Main app: [http://localhost:3000](http://localhost:3000)
   - Ingredient recognition: [http://localhost:8501](http://localhost:8501) (if Streamlit app is running)


### Generating Recipes

1. **Text-Based Generation**:
   - Enter a recipe idea or list of ingredients
   - Specify dietary preferences (vegetarian, vegan, etc.)
   - Click "Generate" to create personalized recipes

2. **Ingredient Photo Upload**:
   - Use the "FIND INGREDIENT" feature
   - Upload photos of available ingredients
   - Get matching recipe suggestions

3. **Recipe Customization**:
   - Specify serving sizes
   - Include cooking time preferences
   - Add allergy restrictions

### User Account Features

- **Sign Up/Login**: Use Google OAuth for secure authentication
- **Profile Management**: Set dietary preferences and cooking skill level
- **Recipe Cookbook**: Save and organize favorite recipes
- **Sharing**: Share recipes with friends and family

## 🔧 API Endpoints

### Recipe Generation
```
POST /api/recipe
Body: { "prompt": "recipe description or ingredients" }
Response: { "recipe": "generated recipe content" }
```

### User Management
```
POST /api/register          # User registration
POST /api/auth/[...nextauth] # Authentication (Google OAuth)
POST /api/forgot-password   # Password recovery
```

### Payment
```
POST /api/payment           # Handle subscription payments
```

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Database Operations

```bash
npx prisma studio           # Open Prisma Studio
npx prisma generate         # Generate Prisma client
npx prisma db push          # Push schema changes
npx prisma db pull          # Pull schema from database
```

## 🔒 Security Considerations

- **API Key Management**: Store all API keys in environment variables
- **Authentication**: Secure OAuth implementation with NextAuth.js
- **Database Security**: Use Prisma for safe database queries
- **Password Security**: bcrypt hashing for user passwords
- **CORS**: Proper CORS configuration for API endpoints

⚠️ **Important**: This project previously had hardcoded API keys in the codebase. Ensure all API keys are properly secured in environment variables and never committed to version control.

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Ensure API keys are never hardcoded

### Common Issues

**Recipe generation fails**:
- Verify your Groq/OpenAI API key is valid
- Check API rate limits
- Ensure proper environment variable configuration

**Authentication issues**:
- Verify Google OAuth credentials
- Check NEXTAUTH_URL configuration
- Ensure database connection is working

**Database connection errors**:
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Run `npx prisma generate` after schema changes

## 🎉 Acknowledgments

- **Next.js Team** for the amazing framework
- **Groq** for powerful AI capabilities
- **Prisma** for excellent database tooling
- **Tailwind CSS** for beautiful styling
- **NextAuth.js** for secure authentication

---

*Bringing AI-powered cooking to kitchens worldwide* 🌍👨‍🍳👩‍🍳
