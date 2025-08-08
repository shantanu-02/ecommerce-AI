import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

class AISearchService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;
    this.model = process.env.REACT_APP_OPENROUTER_MODEL || 'google/gemini-pro';
  }

  async searchProducts(query, products) {
    if (!this.apiKey) {
      console.warn('OpenRouter API key not found. Using fallback search.');
      return this.fallbackSearch(query, products);
    }

    try {
      const prompt = this.createSearchPrompt(query, products);
      
      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful e-commerce search assistant. Analyze user queries and return relevant product IDs based on their requirements.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'AI E-commerce Search'
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      return this.parseAIResponse(aiResponse, products);
    } catch (error) {
      console.error('AI search failed:', error);
      return this.fallbackSearch(query, products);
    }
  }

  createSearchPrompt(query, products) {
    const productList = products.map(p => 
      `ID: ${p.id}, Name: ${p.name}, Price: $${p.price}, Category: ${p.category}, Rating: ${p.rating}, Description: ${p.description}`
    ).join('\n');

    return `
User Query: "${query}"

Available Products:
${productList}

Based on the user's query, return ONLY the product IDs (comma-separated numbers) that best match their requirements. Consider:
- Price ranges (under/over certain amounts)
- Categories (footwear, electronics, clothing)
- Ratings (good reviews = 4.0+)
- Product features mentioned in descriptions
- Keywords and synonyms

Example responses:
- For "running shoes under $100": return product IDs that match
- For "electronics with good reviews": return IDs of electronics with rating 4.0+
- For "casual clothing": return clothing items suitable for casual wear

Return format: Just the numbers separated by commas (e.g., "1,3,5")
`;
  }

  parseAIResponse(aiResponse, products) {
    try {
      // Extract numbers from AI response
      const matches = aiResponse.match(/\d+/g);
      if (!matches) return [];

      const productIds = matches.map(id => parseInt(id));
      return products.filter(product => productIds.includes(product.id));
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return [];
    }
  }

  fallbackSearch(query, products) {
    const searchTerms = query.toLowerCase().split(' ');
    
    return products.filter(product => {
      const searchableText = `
        ${product.name} 
        ${product.category} 
        ${product.description} 
        ${product.tags?.join(' ') || ''}
      `.toLowerCase();

      // Check for price filters
      const priceMatch = query.match(/under\s+\$?(\d+)|below\s+\$?(\d+)|less\s+than\s+\$?(\d+)/i);
      if (priceMatch) {
        const maxPrice = parseInt(priceMatch[1] || priceMatch[2] || priceMatch[3]);
        if (product.price > maxPrice) return false;
      }

      const overPriceMatch = query.match(/over\s+\$?(\d+)|above\s+\$?(\d+)|more\s+than\s+\$?(\d+)/i);
      if (overPriceMatch) {
        const minPrice = parseInt(overPriceMatch[1] || overPriceMatch[2] || overPriceMatch[3]);
        if (product.price < minPrice) return false;
      }

      // Check for rating filters
      if (query.includes('good reviews') || query.includes('high rating')) {
        if (product.rating < 4.0) return false;
      }

      // Check if any search terms match
      return searchTerms.some(term => 
        searchableText.includes(term) ||
        this.getSynonyms(term).some(synonym => searchableText.includes(synonym))
      );
    });
  }

  getSynonyms(term) {
    const synonymMap = {
      'shoes': ['footwear', 'sneakers', 'boots'],
      'laptop': ['computer', 'macbook', 'notebook'],
      'phone': ['smartphone', 'mobile'],
      'cheap': ['affordable', 'budget', 'inexpensive'],
      'expensive': ['premium', 'high-end', 'luxury'],
      'good': ['excellent', 'great', 'quality'],
      'running': ['jogging', 'athletic', 'sport'],
      'casual': ['everyday', 'informal', 'relaxed']
    };

    return synonymMap[term] || [];
  }
}

export default new AISearchService();