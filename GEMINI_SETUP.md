# Google Gemini AI Integration Setup Guide

## 🚀 Quick Setup

### 1. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

Create a `.env` file in the `api/config/` directory:

```env
# Google Gemini AI API Key (Required for AI Search)
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Other existing configurations...
PORT=4001
NODE_ENV=development
```

### 3. Start the Application

```bash
# Terminal 1: Start the backend server (Port 4001)
cd api
npm install
npm start

# Terminal 2: Start the frontend (Port 3000)
cd ..
npm start
```

### 4. Verify Backend is Running

Check that your backend server is running on port 4001:

- Backend: http://localhost:4001
- Frontend: http://localhost:3000

## 🎯 How to Use AI Search

### Natural Language Queries

The AI search supports various natural language patterns:

#### Price-Based Queries

- "Show me products under $50"
- "Electronics over $100"
- "Budget-friendly items"

#### Category-Based Queries

- "Men's clothing"
- "Women's accessories"
- "Electronics with good reviews"

#### Combined Queries

- "Electronics under $100 with good reviews"
- "Men's clothing under $50"
- "Budget-friendly women's items"

### Example Searches

1. **"Show me electronics under $100"**

   - Returns electronics products priced under $100

2. **"Products with good reviews"**

   - Returns products with 4.0+ star ratings

3. **"Men's clothing"**

   - Returns all men's clothing items

4. **"Budget-friendly items"**
   - Returns products under $50

## 🔧 Technical Details

### API Endpoint

- **URL**: `POST http://localhost:4001/api/ai-search`
- **Request Body**:
  ```json
  {
    "query": "your search query",
    "products": [array of products]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "results": [filtered products],
    "query": "original query",
    "totalFound": 5
  }
  ```

### Fallback System

If Gemini API fails, the system automatically falls back to:

- Keyword-based search
- Price filtering
- Category matching
- Rating filtering

### Error Handling

- API key not configured → Fallback search
- Network errors → Fallback search
- Invalid responses → Fallback search

## 🎨 Features

### AI Search Interface

- Natural language input
- Example queries
- Search history
- Loading states
- Error handling

### Product Display

- Enhanced product cards
- Star ratings
- Price information
- Category badges
- Hover effects

### Integration

- Works with existing product data
- Compatible with traditional filters
- Responsive design
- Mobile-friendly

## 🐛 Troubleshooting

### Common Issues

1. **"Gemini API key not configured"**

   - Check your `.env` file
   - Ensure `GEMINI_API_KEY` is set correctly
   - Restart the server after adding the key

2. **"Search failed"**

   - Check internet connection
   - Verify API key is valid
   - Check server logs for errors

3. **"404 Not Found" error**

   - Ensure backend server is running on port 4001
   - Check that CORS is properly configured
   - Verify the API endpoint URL

4. **"CORS error"**

   - Backend server should be running on port 4001
   - Frontend should be on port 3000
   - CORS middleware is already configured

5. **No results found**
   - Try different search terms
   - Check if products match your criteria
   - Use broader search terms

### Debug Mode

To see detailed logs, add to your `.env`:

```env
DEBUG=true
NODE_ENV=development
```

### Testing the API

You can test the API endpoint directly:

```bash
curl -X POST http://localhost:4001/api/ai-search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "electronics under $100",
    "products": []
  }'
```

## 📊 API Usage

### Rate Limits

- Google Gemini: 15 requests per minute (free tier)
- Consider upgrading for production use

### Cost

- Free tier: $0 for first 15 requests/minute
- Paid tier: $0.0005 per 1K characters

### Monitoring

Check your usage at: [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🚀 Production Deployment

### Environment Variables

```env
GEMINI_API_KEY=your_production_key
NODE_ENV=production
PORT=4001
```

### Security

- Never commit API keys to version control
- Use environment variables
- Consider API key rotation

### Performance

- Implement caching for frequent queries
- Add rate limiting
- Monitor API usage

## 📝 Example Queries

### Price Ranges

- "under $50"
- "over $100"
- "between $20 and $80"

### Categories

- "electronics"
- "men's clothing"
- "women's clothing"
- "jewelery"

### Quality

- "good reviews"
- "high rating"
- "well rated"

### Combined

- "electronics under $100 with good reviews"
- "budget-friendly men's clothing"
- "premium women's accessories"

## 🔍 Port Configuration

### Development Setup

- **Frontend (React)**: http://localhost:3000
- **Backend (Express)**: http://localhost:4001
- **API Endpoint**: http://localhost:4001/api/ai-search

### Environment Variables

You can customize the backend port by setting:

```env
PORT=4001  # or any other port you prefer
```

---

**Note**: The AI search enhances user experience by understanding natural language queries, making product discovery more intuitive and user-friendly.
