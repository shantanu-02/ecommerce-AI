# AI-Enhanced E-commerce Product Catalog

A modern e-commerce product catalog enhanced with AI-powered natural language search capabilities using OpenRouter and Google's Gemini model.

## 🚀 Features

### Core Functionality
- **Product Catalog Viewer**: Display of 12 sample products with name, price, category, description, and rating
- **Traditional Filters**: Filter by category, price range, and minimum rating
- **Responsive Design**: Mobile-friendly interface with Bootstrap

### 🧠 AI Feature: Smart Product Search (NLP)
- **Natural Language Queries**: Search using conversational language
- **Intelligent Parsing**: Understands price ranges, categories, and quality requirements
- **Example Queries**:
  - "Show me running shoes under $200"
  - "Electronics with good reviews"
  - "Casual clothing under $100"
  - "Premium headphones"
  - "Comfortable sneakers for daily wear"

## 🛠️ Tools & Libraries Used

### Frontend
- **React 18**: Modern React with hooks
- **Bootstrap 5**: Responsive UI framework
- **Font Awesome**: Icons and visual elements

### AI Integration
- **OpenRouter API**: Gateway for accessing multiple AI models
- **Google Gemini Pro**: Advanced language model for search processing
- **Axios**: HTTP client for API requests

### Development
- **Create React App**: Development environment
- **ES6+ JavaScript**: Modern JavaScript features

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenRouter API key

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-ecommerce-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_OPENROUTER_API_KEY=your_openrouter_api_key_here
   REACT_APP_OPENROUTER_MODEL=google/gemini-pro
   ```

4. **Get OpenRouter API Key**
   - Visit [OpenRouter.ai](https://openrouter.ai)
   - Sign up for an account
   - Generate an API key
   - Add credits to your account for API usage

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 How to Use

### AI Search
1. Use the blue "AI-Powered Smart Search" box at the top
2. Type natural language queries like:
   - "Show me running shoes under $150"
   - "Electronics with good reviews over $200"
   - "Casual clothing for everyday wear"
3. Click "Search" or press Enter
4. View AI-filtered results with search context

### Traditional Filters
1. Use the "Traditional Filters" section when not using AI search
2. Filter by category, price range, or minimum rating
3. Filters are automatically disabled during AI search

### Example Queries
- Click on any example query button to try pre-made searches
- View search history to quickly repeat previous searches

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── ProductCatalog.jsx    # Main catalog container
│   ├── AISearch.jsx          # AI search interface
│   ├── ProductCard.jsx       # Individual product display
│   └── FilterBar.jsx         # Traditional filters
├── services/
│   └── aiSearch.js           # AI search service
├── data/
│   └── products.json         # Product data
└── App.js                    # Main application
```

### AI Search Flow
1. User enters natural language query
2. Query is sent to OpenRouter API with Gemini model
3. AI analyzes query against product database
4. Returns relevant product IDs
5. Frontend filters and displays matching products
6. Fallback to keyword search if AI fails

## 🔮 Notable Assumptions

### Data & Scope
- **Static Product Data**: Using JSON file with 12 sample products
- **Mock Images**: Using Pexels stock photos for product images
- **Simplified Categories**: Three main categories (footwear, electronics, clothing)

### AI Integration
- **API Dependency**: Requires active OpenRouter API key and credits
- **Fallback Search**: Implements keyword-based search when AI is unavailable
- **Rate Limiting**: No rate limiting implemented (suitable for demo)

### User Experience
- **Single Page App**: No routing or user authentication
- **Client-Side Only**: No backend database or user persistence
- **Demo Focus**: Optimized for demonstration rather than production

## 🔗 Blockchain Integration Potential

The AI search system could be enhanced with blockchain features in several ways:

**Token-Gated Pricing**: Smart contracts could offer exclusive discounts to holders of specific NFTs or tokens, with the AI search understanding and applying these dynamic pricing rules based on wallet connections.

**On-Chain User Preferences**: User search patterns and preferences could be stored on-chain as encrypted data, allowing the AI to provide personalized recommendations while maintaining privacy and user ownership of their data.

**Loyalty Smart Contracts**: Blockchain-based loyalty programs could reward users with tokens for searches and purchases, with the AI factoring in loyalty status to suggest premium products or exclusive deals automatically.

## 🚀 Future Enhancements

- **User Profiles**: Personalized recommendations based on search history
- **Advanced Filters**: Brand, availability, shipping options
- **Product Comparison**: Side-by-side product comparisons
- **Voice Search**: Speech-to-text integration
- **Real-time Inventory**: Dynamic product availability
- **Multi-language Support**: International market expansion

## 📝 Development Notes

- Built with modern React patterns (hooks, functional components)
- Responsive design works on mobile and desktop
- Error handling for API failures with graceful fallbacks
- Optimized for demonstration and testing purposes
- Clean, maintainable code structure

---

**Note**: This is a demonstration project showcasing AI integration in e-commerce. For production use, consider adding user authentication, real product databases, payment processing, and enhanced security measures.