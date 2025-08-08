# AI-Enhanced E-commerce Application

A modern e-commerce application featuring **Google Gemini AI-powered natural language search** that allows users to find products using conversational queries like "Show me electronics under $100 with good reviews."

## 🚀 How to Run the App

### Prerequisites

- Node.js (v14 or higher)
- npm package manager
- Google Gemini API key (optional - fallback search works without it)

### Installation & Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd ecommerce
   npm install --legacy-peer-deps
   ```

2. **Configure API Key (Optional):**

   ```bash
   cd api/config
   cp config.env.example .env
   # Edit .env and add your Gemini API key:
   # GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Start the application:**

   ```bash
   # Terminal 1: Start backend server (Port 4000)
   cd api
   npm start

   # Terminal 2: Start frontend (Port 3000)
   cd ..
   npm start
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## 🤖 AI Feature: Natural Language Product Search

### Feature Choice: Google Gemini-Powered Search

I chose to implement **natural language product search** using Google Gemini AI because it provides the most intuitive user experience enhancement for e-commerce. Users can search using conversational language instead of traditional filters.

### How It Works

- **Input:** Natural language queries (e.g., "cheap electronics with good reviews")
- **Processing:** Google Gemini AI analyzes user intent and matches products
- **Output:** Filtered product results with relevance scoring
- **Fallback:** Intelligent keyword-based search when AI is unavailable

### Example Queries

```
✅ "Show me electronics under $100"
✅ "Products with good reviews"
✅ "Men's clothing"
✅ "Budget-friendly items"
✅ "Cheap clothes under $50"
✅ "Premium electronics over $200"
```

## 🛠️ Tools & Libraries Used

### Frontend

- **React 18** - Modern UI framework with hooks
- **Bootstrap 5** - Responsive CSS framework
- **React Router** - Client-side routing
- **Redux** - State management for shopping cart
- **React Hot Toast** - User notifications
- **React Loading Skeleton** - Loading states

### Backend

- **Node.js & Express** - Server framework
- **Axios** - HTTP client for API calls
- **Google Gemini API** - AI natural language processing
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Data Source

- **FakeStore API** - Live product data (20 products across 4 categories)

## 🎯 Notable Assumptions

### Technical Assumptions

1. **API Reliability:** Assumed FakeStore API remains stable for product data
2. **Port Configuration:** Backend runs on port 4000, frontend on 3000
3. **Browser Compatibility:** Modern browsers supporting ES6+ features
4. **Network Access:** Internet connection required for external APIs

### AI Implementation Assumptions

1. **Gemini API Quota:** Free tier limitations (15 requests/minute)
2. **Response Format:** AI returns product IDs as comma-separated numbers
3. **Query Types:** Users will use conversational English queries
4. **Fallback Priority:** Keyword search activates when AI fails or is unconfigured

### User Experience Assumptions

1. **Search Behavior:** Users prefer natural language over traditional filters
2. **Product Categories:** FakeStore API categories are sufficient for demonstration
3. **Rating System:** 4.0+ rating considered "good reviews"
4. **Price Ranges:** USD pricing with standard e-commerce patterns

### Data Assumptions

1. **Product Quality:** FakeStore API provides realistic e-commerce data
2. **Category Mapping:** Standard categories (electronics, clothing, jewelery)
3. **Search Patterns:** Common e-commerce search behaviors
4. **Inventory:** All displayed products are "in stock"

## 🔗 Blockchain Integration Potential

The AI search system could be enhanced with blockchain features such as **token-gated pricing** where users holding specific NFTs or tokens receive personalized discounts discovered through AI search queries. **On-chain user preferences** could be stored as immutable records, allowing the AI to learn from cross-platform shopping behaviors while maintaining privacy through cryptographic hashing. Additionally, **loyalty smart contracts** could automatically reward users with tokens based on AI-recommended purchases, creating a decentralized reputation system that improves search accuracy over time.

## 📁 Project Structure

```
ecommerce/
├── api/                          # Backend server
│   ├── routes/aiSearchRoute.js   # Gemini AI integration
│   ├── config/.env               # Environment variables
│   └── server.js                 # Express server
├── src/                          # Frontend React app
│   ├── components/
│   │   ├── AISearch.jsx          # AI search interface
│   │   ├── Products.jsx          # Product catalog
│   │   └── ProductCard.jsx       # Individual product display
│   └── App.js                    # Main application
└── package.json                  # Dependencies & scripts
```

## 🎨 Key Features

### AI-Powered Search

- Natural language query processing
- Intelligent fallback search
- Real-time product filtering
- Search history and suggestions

### Modern UI/UX

- Responsive design (mobile-friendly)
- Loading states and error handling
- Hover effects and animations
- Bootstrap-based components

### Product Display

- Star ratings and price information
- Category badges and tags
- High-quality product images
- Add to cart functionality

## 🚀 Future Enhancements

1. **Voice Search** - Speech-to-text integration
2. **Image Search** - AI-powered visual product search
3. **Personalization** - User preference learning
4. **Multi-language** - International market support
5. **Real Database** - Production-ready data storage

## 📊 Demo Data

The application showcases 20 diverse products from FakeStore API:

- **Electronics:** Laptops, phones, accessories
- **Men's Clothing:** Shirts, jackets, casual wear
- **Women's Clothing:** Dresses, tops, activewear
- **Jewelery:** Necklaces, rings, accessories

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note:** This is a demonstration project showcasing AI integration in e-commerce. For production use, implement proper security measures, error handling, and API rate limiting.
