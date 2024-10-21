import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface SavedIdea {
  id: number;
  title: string;
  description: string;
}

const SavedIdeasPage: React.FC = () => {
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);

  useEffect(() => {
    const ideas = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
    setSavedIdeas(ideas);
  }, []);

  const handleRemoveIdea = (id: number) => {
    const updatedIdeas = savedIdeas.filter(idea => idea.id !== id);
    setSavedIdeas(updatedIdeas);
    localStorage.setItem('savedIdeas', JSON.stringify(updatedIdeas));
  };

  return (
    <div className="glassmorphism p-8">
      <h1 className="text-3xl font-bold mb-6">Saved AI Agent Ideas</h1>
      {savedIdeas.length === 0 ? (
        <p>You haven't saved any ideas yet.</p>
      ) : (
        <div className="space-y-6">
          {savedIdeas.map((idea) => (
            <div key={idea.id} className="glassmorphism p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{idea.title}</h2>
              <p className="mb-4">{idea.description}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/solution/${idea.id}`}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemoveIdea(idea.id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedIdeasPage;