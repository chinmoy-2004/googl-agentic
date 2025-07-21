// Gemini API configuration and helper functions
const apiKey = ""; // Leave empty as specified

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export const callGeminiAPI = async (prompt, imageBase64 = null) => {
  try {
    const requestBody = {
      contents: [{
        parts: []
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    // Add text prompt
    if (prompt) {
      requestBody.contents[0].parts.push({
        text: prompt
      });
    }

    // Add image if provided
    if (imageBase64) {
      requestBody.contents[0].parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64
        }
      });
    }

    // Simulate API call with mock responses for development
    return simulateGeminiResponse(prompt, imageBase64);
    
    // Uncomment below for actual API calls when apiKey is provided
    /*
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
    */
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
};

// Simulate Gemini responses for development
const simulateGeminiResponse = async (prompt, imageBase64) => {
  // Add realistic delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  const lowerPrompt = prompt.toLowerCase();

  // Disease diagnosis responses
  if (imageBase64 || lowerPrompt.includes('disease') || lowerPrompt.includes('leaf') || lowerPrompt.includes('plant')) {
    const diseases = [
      "🔍 **Septoria Leaf Spot Detected**\n\n**Severity:** Moderate\n\n**Treatment:**\n• Apply Neem Oil spray every 7 days\n• Remove affected leaves immediately\n• Ensure proper drainage\n• Avoid overhead watering\n\n**Prevention:** Maintain good air circulation and crop rotation.",
      "🔍 **Early Blight Identified**\n\n**Severity:** High\n\n**Treatment:**\n• Use Copper-based fungicide immediately\n• Improve air circulation around plants\n• Remove infected plant debris\n• Apply preventive sprays weekly\n\n**Prevention:** Avoid overhead irrigation and ensure proper spacing.",
      "🔍 **Powdery Mildew Found**\n\n**Severity:** Low\n\n**Treatment:**\n• Apply Baking Soda solution (1 tsp per liter)\n• Increase sunlight exposure\n• Improve air circulation\n• Remove affected leaves\n\n**Prevention:** Avoid overcrowding and maintain proper humidity levels.",
      "✅ **Healthy Plant Detected!**\n\n**Status:** Excellent condition\n\n**Recommendations:**\n• Continue current care routine\n• Monitor for any changes\n• Maintain regular watering schedule\n• Consider preventive treatments during monsoon\n\n**Next Check:** Schedule in 2 weeks"
    ];
    return diseases[Math.floor(Math.random() * diseases.length)];
  }

  // Market price responses
  if (lowerPrompt.includes('price') || lowerPrompt.includes('market') || lowerPrompt.includes('sell')) {
    return `📈 **Current Market Analysis**\n\n**Tomato Prices:** ₹45/kg (+7% from yesterday)\n\n**Recommendation:**\n• Sell 45% today at ₹23-25/kg\n• Sell 30% tomorrow at ₹22-25/kg\n• Store unripe ones due to predicted hailstorm\n\n**Market Outlook:** Prices expected to rise 15% next week due to supply shortage.\n\n💡 Need storage advice? Just ask!`;
  }

  // Government scheme responses
  if (lowerPrompt.includes('scheme') || lowerPrompt.includes('subsidy') || lowerPrompt.includes('government')) {
    return `🏛️ **Government Schemes for You**\n\n**Eligible Schemes:**\n• PM-KISAN: ₹6000/year direct benefit\n• Crop Insurance: Up to ₹2,00,000 coverage\n• Seed Subsidy: 50% off certified seeds\n\n**Quick Action - PM-KISAN:**\n1. Visit nearest CSC center\n2. Bring: Aadhaar, bank details, land documents\n3. Application deadline: March 31st\n\n**Status:** You can apply immediately!`;
  }

  // Crop calendar responses
  if (lowerPrompt.includes('sow') || lowerPrompt.includes('plant') || lowerPrompt.includes('harvest') || lowerPrompt.includes('when')) {
    return `📅 **Optimal Crop Calendar**\n\n**For Your Location:**\n\n**Wheat:**\n• Sowing: Nov 15-30 (Best time: Nov 20-25)\n• Harvest: April\n\n**Rice:**\n• Sowing: Jun 1-15\n• Harvest: October\n\n**Brinjal:**\n• Year-round cultivation possible\n• Best seasons: Feb-Mar and Jun-Jul\n\n⚠️ **Important:** Consider soil temperature (18-25°C) and moisture levels before sowing.`;
  }

  // General farming advice
  return `🌱 **AI Agricultural Assistant**\n\nI'm here to help with your farming needs! You can ask me about:\n\n• 🔍 Crop disease diagnosis\n• 💰 Market prices and selling advice\n• 🏛️ Government schemes and subsidies\n• 📅 Sowing and harvesting schedules\n• 🌦️ Weather-based farming tips\n• 💡 General agricultural guidance\n\nHow can I assist you today?`;
};