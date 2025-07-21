import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getTranslation } from '../utils/translations';

const schemes = [
  {
    id: 'pm-kisan',
    title: 'PM-KISAN Samman Nidhi',
    description: 'Direct income support of ₹6000 per year to farmer families',
    amount: '₹6,000/year',
    eligibility: 'Small and marginal farmers',
    status: 'eligible',
    category: 'income-support'
  },
  {
    id: 'crop-insurance',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme providing financial support against crop loss',
    amount: 'Up to ₹2,00,000',
    eligibility: 'All farmers',
    status: 'eligible',
    category: 'insurance'
  },
  {
    id: 'kcc',
    title: 'Kisan Credit Card',
    description: 'Credit facility for agriculture and allied activities',
    amount: 'Based on land holding',
    eligibility: 'Farmers with land records',
    status: 'applied',
    category: 'credit'
  },
  {
    id: 'soil-health',
    title: 'Soil Health Card Scheme',
    description: 'Free soil testing and nutrient recommendations',
    amount: 'Free',
    eligibility: 'All farmers',
    status: 'completed',
    category: 'advisory'
  }
];

const GovernmentSchemesScreen = ({ onBack }) => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredSchemes, setFilteredSchemes] = useState(schemes);

  const categories = [
    { id: 'all', label: 'All Schemes' },
    { id: 'income-support', label: 'Income Support' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'credit', label: 'Credit' },
    { id: 'advisory', label: 'Advisory' }
  ];

  useEffect(() => {
    let filtered = schemes;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(scheme => 
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredSchemes(filtered);
  }, [searchTerm, selectedCategory]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'eligible':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'applied':
        return <Clock size={16} className="text-yellow-500" />;
      case 'completed':
        return <CheckCircle size={16} className="text-blue-500" />;
      default:
        return <AlertCircle size={16} className="text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'eligible':
        return 'Eligible';
      case 'applied':
        return 'Applied';
      case 'completed':
        return 'Completed';
      default:
        return 'Not Eligible';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'eligible':
        return 'bg-green-100 text-green-800';
      case 'applied':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 safe-area-top">
        <div className="flex justify-between items-center px-5 py-4">
          <button onClick={onBack} className="touch-target">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Government Schemes</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Search and Filters */}
        <div className="bg-white border-b border-gray-200 p-5">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes List */}
        <div className="p-5 space-y-4">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-3">
                  {scheme.title}
                </h3>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scheme.status)}`}>
                  {getStatusIcon(scheme.status)}
                  <span>{getStatusText(scheme.status)}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {scheme.description}
              </p>
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Benefit Amount</p>
                  <p className="text-base font-semibold text-primary-600">{scheme.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Eligibility</p>
                  <p className="text-sm text-gray-700">{scheme.eligibility}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 btn-primary text-sm py-2">
                  {scheme.status === 'eligible' ? 'Apply Now' : 'View Details'}
                </button>
                <button className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <ExternalLink size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          ))}
          
          {filteredSchemes.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">No schemes found</p>
              <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="p-5 bg-primary-50 border-t border-primary-100">
          <div className="card border border-primary-200">
            <h3 className="text-base font-semibold text-primary-800 mb-2">Need Help?</h3>
            <p className="text-sm text-primary-700 mb-4">
              Get personalized assistance with scheme applications and eligibility checks.
            </p>
            <button className="btn-primary text-sm py-2">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemesScreen;