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

const GeneralDiscoveryForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    industry: '',
    otherIndustry: '',
    subIndustry: '',
    otherSubIndustry: '',
    businessContext: '',
    agentType: '',
    agentValue: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCardSelection = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAgentValueSelection = (value: string) => {
    const updatedValues = formData.agentValue.includes(value)
      ? formData.agentValue.filter(v => v !== value)
      : [...formData.agentValue, value];
    setFormData({ ...formData, agentValue: updatedValues });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/recommendations', { state: { formData } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Industry</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => handleCardSelection('industry', industry)}
              className={`p-4 rounded-lg flex flex-col items-center justify-center ${
                formData.industry === industry ? 'bg-purple-600' : 'bg-purple-800'
              } hover:bg-purple-700 transition-colors`}
            >
              <span>🏢</span>
              <span>{industry}</span>
            </button>
          ))}
        </div>
        {formData.industry === 'Other' && (
          <input
            type="text"
            name="otherIndustry"
            value={formData.otherIndustry}
            onChange={handleInputChange}
            placeholder="Specify industry"
            className="mt-4 w-full p-2 rounded bg-white bg-opacity-20"
          />
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Sub-Industry</h2>
        <select
          name="subIndustry"
          value={formData.subIndustry}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-white bg-opacity-20"
        >
          <option value="">Select Sub-Industry</option>
          {formData.industry && subIndustries[formData.industry as keyof typeof subIndustries].map((subIndustry) => (
            <option key={subIndustry} value={subIndustry}>{subIndustry}</option>
          ))}
        </select>
        {formData.subIndustry === 'Other' && (
          <input
            type="text"
            name="otherSubIndustry"
            value={formData.otherSubIndustry}
            onChange={handleInputChange}
            placeholder="Specify sub-industry"
            className="mt-4 w-full p-2 rounded bg-white bg-opacity-20"
          />
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Additional Business Context</h2>
        <textarea
          name="businessContext"
          value={formData.businessContext}
          onChange={handleInputChange}
          placeholder="Add any additional business context or business name"
          className="w-full p-2 rounded bg-white bg-opacity-20"
          rows={4}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Agent Type</h2>
        <div className="grid grid-cols-2 gap-4">
          {agentTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleCardSelection('agentType', type)}
              className={`p-4 rounded-lg flex flex-col items-center justify-center ${
                formData.agentType === type ? 'bg-purple-600' : 'bg-purple-800'
              } hover:bg-purple-700 transition-colors`}
            >
              <span>{type === 'Customer Facing' ? '👥' : '💼'}</span>
              <span>{type}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Agent Value</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {agentValues.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleAgentValueSelection(value)}
              className={`p-4 rounded-lg flex flex-col items-center justify-center ${
                formData.agentValue.includes(value) ? 'bg-purple-600' : 'bg-purple-800'
              } hover:bg-purple-700 transition-colors`}
            >
              <span>📊</span>
              <span>{value}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded text-white font-bold transition duration-300"
      >
        Generate AI Agent Ideas
      </button>
    </form>
  );
};

export default GeneralDiscoveryForm;