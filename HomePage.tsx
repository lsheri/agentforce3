import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const industries = [
  'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Technology',
  'Education', 'Government', 'Non-profit', 'Travel and Hospitality', 'Other'
];

const subIndustries = {
  Healthcare: ['Hospitals', 'Clinics', 'Pharmaceuticals', 'Medical Devices', 'Telemedicine', 'Other'],
  Finance: ['Banking', 'Insurance', 'Investment', 'Fintech', 'Wealth Management', 'Other'],
  Retail: ['E-commerce', 'Brick and Mortar', 'Grocery', 'Fashion', 'Electronics', 'Other'],
  Manufacturing: ['Automotive', 'Electronics', 'Food and Beverage', 'Textiles', 'Aerospace', 'Other'],
  Technology: ['Software', 'Hardware', 'IT Services', 'Telecommunications', 'Cybersecurity', 'Other'],
  Education: ['K-12', 'Higher Education', 'Online Learning', 'EdTech', 'Vocational Training', 'Other'],
  Government: ['Federal', 'State', 'Local', 'Defense', 'Public Services', 'Other'],
  'Non-profit': ['Charities', 'Foundations', 'NGOs', 'Social Services', 'Environmental', 'Other'],
  'Travel and Hospitality': ['Hotels', 'Airlines', 'Cruise Lines', 'Travel Agencies', 'Restaurants', 'Other'],
  Other: ['Other']
};

const agentTypes = ['Customer Facing', 'Internal Team Facing'];

const agentValues = [
  'Operational Efficiency', 'Revenue Generation', 'Customer Satisfaction',
  'Data Analysis', 'Process Automation', 'Decision Support'
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    industry: '',
    subIndustry: '',
    businessContext: '',
    agentType: '',
    agentValue: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAgentValueChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      agentValue: prev.agentValue.includes(value)
        ? prev.agentValue.filter(v => v !== value)
        : [...prev.agentValue, value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/recommendations', { state: { formData } });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AgentForce AI Discovery Tool</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="industry" className="block mb-1">Industry</label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-white bg-opacity-20"
          >
            <option value="">Select an industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        {formData.industry && (
          <div>
            <label htmlFor="subIndustry" className="block mb-1">Sub-Industry</label>
            <select
              id="subIndustry"
              name="subIndustry"
              value={formData.subIndustry}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-white bg-opacity-20"
            >
              <option value="">Select a sub-industry</option>
              {subIndustries[formData.industry as keyof typeof subIndustries].map(subIndustry => (
                <option key={subIndustry} value={subIndustry}>{subIndustry}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="businessContext" className="block mb-1">Business Context</label>
          <textarea
            id="businessContext"
            name="businessContext"
            value={formData.businessContext}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-white bg-opacity-20"
            rows={4}
            placeholder="Describe your business context"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Agent Type</label>
          <div className="flex space-x-4">
            {agentTypes.map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="agentType"
                  value={type}
                  checked={formData.agentType === type}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1">Agent Value</label>
          <div className="grid grid-cols-2 gap-2">
            {agentValues.map(value => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.agentValue.includes(value)}
                  onChange={() => handleAgentValueChange(value)}
                  className="mr-2"
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded text-white font-bold"
        >
          Generate AI Agent Ideas
        </button>
      </form>
    </div>
  );
};

export default HomePage;