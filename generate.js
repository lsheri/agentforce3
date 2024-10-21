import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { formData } = req.body;

    const prompt = `Generate 3 brief AI agent ideas for Salesforce AgentForce:
Industry: ${formData.industry}
Sub-Industry: ${formData.subIndustry}
Business Context: ${formData.businessContext}
Agent Type: ${formData.agentType}
Agent Value: ${formData.agentValue.join(', ')}

For each idea, provide a title and a one-sentence description.
Separate ideas with ---.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    });

    const ideas = completion.data.choices[0].message.content.split('---').map(idea => idea.trim()).filter(idea => idea);

    res.status(200).json({ ideas });
  } catch (error) {
    console.error('Error generating ideas:', error);
    res.status(500).json({ error: 'An error occurred while generating ideas', details: error.toString() });
  }
}