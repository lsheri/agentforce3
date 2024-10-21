import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

interface DetailedSolution {
  id: string;
  title: string;
  value: string;
  pitch: string;
  salesforceIntegration: string;
}

const DetailedSolutionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const solution = location.state?.solution as DetailedSolution | undefined;

  if (!solution) {
    navigate('/');
    return null;
  }

  const handleSaveIdea = () => {
    const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
    const updatedIdeas = [...savedIdeas, solution];
    localStorage.setItem('savedIdeas', JSON.stringify(updatedIdeas));
    alert('Idea saved successfully!');
  };

  return (
    <div className="glassmorphism p-8">
      <h1 className="text-3xl font-bold mb-6">{solution.title}</h1>

      <h2 className="text-2xl font-semibold mb-4">Value Proposition</h2>
      <p className="mb-6">{solution.value}</p>

      <h2 className="text-2xl font-semibold mb-4">Sales Pitch</h2>
      <p className="mb-6">{solution.pitch}</p>

      <h2 className="text-2xl font-semibold mb-4">Salesforce Integration</h2>
      <p className="mb-6">{solution.salesforceIntegration}</p>

      <button
        onClick={handleSaveIdea}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Save Idea
      </button>
    </div>
  );
};

export default DetailedSolutionPage;