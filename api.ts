import axios from 'axios';

const API_URL = '/api/generate';
const TIMEOUT_MS = 60000; // 60 seconds

export const generateIdeas = async (formData: any): Promise<string[]> => {
  try {
    console.log('Sending request to generate ideas with form data:', JSON.stringify(formData));
    const response = await axios.post(API_URL, { formData }, { timeout: TIMEOUT_MS });
    console.log('Received response:', JSON.stringify(response.data));
    return response.data.ideas;
  } catch (error) {
    console.error('Error in generateIdeas:', error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Server error: ${error.response.status}. ${error.response.data?.error || ''}`);
      } else if (error.request) {
        throw new Error('No response received from the server. Please check your connection and try again.');
      }
    }
    throw new Error('Failed to generate ideas. Please try again.');
  }
};