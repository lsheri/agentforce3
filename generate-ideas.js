const fetch = require('node-fetch');

const TIMEOUT_MS = 30000; // Increased to 30 seconds

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { formData } = req.body;
    
    console.log('Received form data:', JSON.stringify(formData));

    const prompt = `Generate 3 brief AI agent ideas for Salesforce AgentForce:
Industry: ${formData.industry}
Sub-Industry: ${formData.subIndustry}
Business Context: ${formData.businessContext}
Agent Type: ${formData.agentType}
Agent Value: ${formData.agentValue.join(', ')}

For each idea, provide a title and a one-sentence description.
Separate ideas with ---.`;

    console.log('Generated prompt:', prompt);

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      return res.status(500).json({ error: 'OpenAI API key is not configured' });
    }

    console.log('Sending request to OpenAI API');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 300
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!openAIResponse.ok) {
      const errorBody = await openAIResponse.text();
      console.error(`OpenAI API error (${openAIResponse.status}):`, errorBody);
      return res.status(openAIResponse.status).json({ error: `OpenAI API error: ${openAIResponse.status}`, details: errorBody });
    }

    const data = await openAIResponse.json();
    console.log('Received response from OpenAI:', JSON.stringify(data));

    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      console.error('Unexpected response format from OpenAI API:', JSON.stringify(data));
      return res.status(500).json({ error: 'Unexpected response format from OpenAI API' });
    }

    const ideas = data.choices[0].message.content.split('---').map(idea => idea.trim()).filter(idea => idea);
    console.log('Generated ideas:', ideas);

    return res.status(200).json({ ideas });
  } catch (error) {
    console.error('Error generating ideas:', error);
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'Request timed out' });
    }
    return res.status(500).json({ error: 'An error occurred while generating ideas', details: error.toString() });
  }
};