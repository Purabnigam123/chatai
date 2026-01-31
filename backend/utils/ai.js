import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

console.log('GEMINI_API_KEY loaded:', GEMINI_API_KEY ? 'YES ✓' : 'NO ✗');
if (!GEMINI_API_KEY) {
  console.warn('⚠️ WARNING: GEMINI_API_KEY is not set. Add it to backend/.env');
}

export async function generateAIResponse(messages) {
  if (!GEMINI_API_KEY) {
    // Return mock response if no API key
    return 'I am a demo AI assistant. To enable real AI responses, please set your GEMINI_API_KEY in the .env file.';
  }

  try {
    console.log('Sending request to Gemini API...');
    console.log('Messages count:', messages.length);
    console.log('API Key exists:', !!GEMINI_API_KEY);
    console.log('API Key length:', GEMINI_API_KEY?.length);
    
    // Convert messages format for Gemini
    const contents = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));
    
    const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
    console.log('API URL:', url.substring(0, 80) + '...');
    
    const response = await axios.post(
      url,
      {
        contents: contents,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('AI API Error Status:', error.response?.status);
    console.error('AI API Error Data:', JSON.stringify(error.response?.data, null, 2));
    console.error('AI API Error Message:', error.message);
    
    // Check for quota/rate limit errors
    const statusCode = error.response?.status;
    const errorData = error.response?.data;
    
    if (statusCode === 429 || errorData?.error?.status === 'RESOURCE_EXHAUSTED') {
      return '⚠️ **API Quota Exceeded**\n\nThe free tier limit (20 requests/day) has been reached. Options:\n\n1. Wait until tomorrow for the quota to reset\n2. Create a new API key at [Google AI Studio](https://aistudio.google.com/apikey)\n3. Enable billing for higher limits';
    }
    
    return 'I encountered an error processing your request. Please try again.';
  }
}

