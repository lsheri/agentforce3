import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateIdeas } from '../services/api';

const RecommendationsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state as { formData: any };
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching ideas with form data:', JSON.stringify(formData));
        const result = await generateIdeas(formData);
        console.log('Received ideas:', result);
        setIdeas(result);
      } catch (err) {
        console.error('Error fetching ideas:', err instanceof Error ? err.message : String(err));
        setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [formData]);

  if (loading) return <div className="text-center mt-8">Generating AI agent ideas...</div>;
  if (error) return (
    <div className="text-center mt-8">
      <p className="text-red-500">{error}</p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded text-white font-bold"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Agent Recommendations</h1>
      {ideas.length === 0 ? (
        <p>No ideas generated. Please try again with different inputs.</p>
      ) : (
        ideas.map((idea, index) => (
          <div key={index} className="mb-4 p-4 bg-white bg-opacity-10 rounded">
            <p className="whitespace-pre-wrap">{idea}</p>
          </div>
        ))
      )}
      <button
        onClick={() => navigate('/')}
        className="mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded text-white font-bold"
      >
        Generate More Ideas
      </button>
    </div>
  );
};

export default RecommendationsPage;