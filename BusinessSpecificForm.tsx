import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessSpecificForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    url: '',
    context: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.businessName || formData.url || formData.context) {
      console.log('Form submitted:', formData);
      navigate('/recommendations', { state: { formData } });
    } else {
      alert('Please fill in at least one field to generate ideas.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="businessName" className="block mb-2">Business Name</label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
          placeholder="Enter your business name"
        />
      </div>

      <div>
        <label htmlFor="url" className="block mb-2">URL</label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label htmlFor="context" className="block mb-2">Context or Discovery</label>
        <textarea
          id="context"
          name="context"
          value={formData.context}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
          rows={4}
          placeholder="Provide any additional context or discovery information"
        ></textarea>
      </div>

      <p className="text-sm text-gray-300">Only one field is required to generate initial ideas.</p>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded text-white font-bold transition duration-300"
      >
        Generate AI Agent Ideas
      </button>
    </form>
  );
};

export default BusinessSpecificForm;