const express = require("express");
const router = express.Router();
const axios = require("axios");

// Google Gemini API configuration
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// AI Search endpoint
router.post("/ai-search", async (req, res) => {
  try {
    const { query, products } = req.body;

    if (!query || !products) {
      return res.status(400).json({
        success: false,
        message: "Query and products are required",
      });
    }

    if (!GEMINI_API_KEY) {
      console.log("Gemini API key not configured, using fallback search");
      const fallbackResults = fallbackSearch(query, products);
      return res.json({
        success: true,
        results: fallbackResults,
        query: query,
        totalFound: fallbackResults.length,
        fallback: true,
        message: "Using enhanced keyword search (Gemini API not configured)",
      });
    }

    // Create prompt for Gemini
    const prompt = createSearchPrompt(query, products);

    // Call Gemini API
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 500,
          topP: 0.8,
          topK: 40,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      }
    );

    // Parse Gemini response
    if (response.data.candidates && response.data.candidates[0]) {
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      const results = parseAIResponse(aiResponse, products);

      return res.json({
        success: true,
        results: results,
        query: query,
        totalFound: results.length,
      });
    } else {
      throw new Error("Invalid response from Gemini API");
    }
  } catch (error) {
    console.error("AI Search Error:", error);

    // Fallback to keyword search if AI fails
    try {
      const { query, products } = req.body;
      const fallbackResults = fallbackSearch(query, products);

      return res.json({
        success: true,
        results: fallbackResults,
        query: query,
        totalFound: fallbackResults.length,
        fallback: true,
      });
    } catch (fallbackError) {
      return res.status(500).json({
        success: false,
        message: "Search failed and fallback also failed",
      });
    }
  }
});

// Create search prompt for Gemini
function createSearchPrompt(query, products) {
  const productList = products
    .map(
      (p) =>
        `ID: ${p.id}, Title: ${p.title}, Price: $${p.price}, Category: ${
          p.category
        }, Rating: ${p.rating?.rate || "N/A"}, Description: ${p.description}`
    )
    .join("\n");

  return `
    You are an AI search assistant for an e-commerce store. Analyze the user's query and return relevant product IDs.
    
    User Query: "${query}"
    
    Available Products:
    ${productList}
    
    SEARCH RULES:
    1. PRICE FILTERS:
       - "under $X", "below $X", "up to $X", "upto $X" = price ≤ X
       - "over $X", "above $X" = price ≥ X
       - For "items upto $5000" = return products with price ≤ 5000
    
    2. CATEGORY MATCHING (BE SPECIFIC):
       - "men's clothing" = ONLY "men's clothing" category
       - "women's clothing" = ONLY "women's clothing" category  
       - "electronics" = ONLY "electronics" category
       - "jewelery" OR "jewelry" OR "accessories" = ONLY "jewelery" category
       - "clothes" OR "clothing" = BOTH men's clothing AND women's clothing
    
    3. SEARCH EXAMPLES:
       - "items upto $5000" → return ALL products with price ≤ 5000
       - "men's clothing" → return ONLY men's clothing items
       - "accessories" → return ONLY jewelery category items
       - "electronics under $100" → return electronics with price ≤ 100
    
    IMPORTANT: 
    - Always match categories EXACTLY as specified above
    - For price queries without category, return ALL categories within price range
    - Return product IDs as comma-separated numbers (e.g., "1,3,5")
    - If no matches, return "none"
    
    Your response:`;
}

// Parse AI response to extract product IDs
function parseAIResponse(aiResponse, products) {
  try {
    // Extract numbers from AI response
    const matches = aiResponse.match(/\d+/g);
    if (!matches) return [];

    const productIds = matches.map((id) => parseInt(id));
    return products.filter((product) => productIds.includes(product.id));
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return [];
  }
}

// Fallback search function
function fallbackSearch(query, products) {
  const searchTerms = query
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 2);
  const results = [];

  products.forEach((product) => {
    let score = 0;
    const searchableText = `
      ${product.title} 
      ${product.category} 
      ${product.description} 
    `.toLowerCase();

    // Price filtering - improved patterns
    const priceMatch = query.match(
      /under\s+\$?(\d+)|below\s+\$?(\d+)|less\s+than\s+\$?(\d+)|up\s*to\s+\$?(\d+)|upto\s+\$?(\d+)/i
    );
    if (priceMatch) {
      const maxPrice = parseInt(
        priceMatch[1] ||
          priceMatch[2] ||
          priceMatch[3] ||
          priceMatch[4] ||
          priceMatch[5]
      );
      if (product.price > maxPrice) return;
    }

    const overPriceMatch = query.match(
      /over\s+\$?(\d+)|above\s+\$?(\d+)|more\s+than\s+\$?(\d+)/i
    );
    if (overPriceMatch) {
      const minPrice = parseInt(
        overPriceMatch[1] || overPriceMatch[2] || overPriceMatch[3]
      );
      if (product.price < minPrice) return;
    }

    // Rating filtering
    if (
      query.includes("good reviews") ||
      query.includes("high rating") ||
      query.includes("well rated")
    ) {
      if (product.rating?.rate < 4.0) return;
      score += 2;
    }

    // Category matching - be more specific
    if (
      query.includes("men's clothing") &&
      product.category === "men's clothing"
    ) {
      score += 5;
    } else if (
      query.includes("women's clothing") &&
      product.category === "women's clothing"
    ) {
      score += 5;
    } else if (
      query.includes("men's") &&
      product.category === "men's clothing"
    ) {
      score += 4;
    } else if (
      query.includes("women's") &&
      product.category === "women's clothing"
    ) {
      score += 4;
    } else if (
      (query.includes("accessories") ||
        query.includes("jewelry") ||
        query.includes("jewelery")) &&
      product.category === "jewelery"
    ) {
      score += 5;
    } else if (
      query.includes("electronics") &&
      product.category === "electronics"
    ) {
      score += 5;
    } else if (
      (query.includes("clothes") || query.includes("clothing")) &&
      (product.category === "men's clothing" ||
        product.category === "women's clothing")
    ) {
      score += 3;
    }

    // Keyword matching with scoring
    searchTerms.forEach((term) => {
      if (searchableText.includes(term)) {
        score += 1;
      }

      // Check synonyms
      const synonyms = getSynonyms(term);
      synonyms.forEach((synonym) => {
        if (searchableText.includes(synonym)) {
          score += 0.8;
        }
      });
    });

    // Special keyword boosts
    if (query.includes("budget") && product.price < 50) score += 1;
    if (query.includes("premium") && product.price > 200) score += 1;

    if (score > 0) {
      results.push({ product, score });
    }
  });

  // Sort by score and return products
  return results.sort((a, b) => b.score - a.score).map((item) => item.product);
}

// Get synonyms for better matching
function getSynonyms(term) {
  const synonymMap = {
    shoes: ["footwear", "sneakers", "boots"],
    laptop: ["computer", "macbook", "notebook"],
    phone: ["smartphone", "mobile"],
    cheap: ["affordable", "budget", "inexpensive"],
    expensive: ["premium", "high-end", "luxury"],
    good: ["excellent", "great", "quality"],
    clothing: ["apparel", "clothes", "wear"],
    accessories: ["jewelery", "jewelry", "accessory"],
  };

  return synonymMap[term] || [];
}

module.exports = router;
