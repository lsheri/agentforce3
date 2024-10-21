import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/generate-ideas', async (req, res) => {
  try {
    const { formData } = req.body;
    console.log('Received form data:', formData);
    
    const prompt = `Generate 3 concise AI agent ideas for Salesforce AgentForce:
    Industry: ${formData.industry}, Sub-Industry: ${formData.subIndustry}
    Business Context: ${formData.businessContext}
    Type: ${formData.agentType}
    Value: ${formData.agentValue.join(', ')}

    For each idea, provide:
    1. Title (1 sentence)
    2. Value proposition (1-2 sentences)
    3. Sales pitch (2-3 sentences)
    4. Salesforce Integration (1-2 sentences): Specify which Salesforce product clouds (e.g., Sales Cloud, Service Cloud, Marketing Cloud, Commerce Cloud, etc.) the agent will integrate with and how it will leverage AgentForce capabilities.
    5. Use Case 1 (2-3 sentences): Provide a specific example of how a fictitious company could use this agent.
    6. Use Case 2 (2-3 sentences): Provide another specific example for a different fictitious company.

    Be concise and direct. Ensure the response considers that the agent is built on Salesforce with AgentForce. Separate each idea with three dashes (---).`;

    console.log('Sending request to OpenAI API...');
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`OpenAI API error (${response.status}):`, errorBody);
      throw new Error(`OpenAI API responded with status ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    const ideas = data.choices[0].message.content.split('---').map(idea => idea.trim()).filter(idea => idea);

    console.log('Successfully generated ideas');
    res.json({ ideas });
  } catch (error) {
    console.error('Error generating ideas:', error);
    res.status(500).json({ error: `An error occurred while generating ideas: ${error.message}` });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});