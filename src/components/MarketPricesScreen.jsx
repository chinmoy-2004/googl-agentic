import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, ChevronDown, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { callGeminiAPI } from '../config/gemini.js';
import { useApp } from '../contexts/AppContext.jsx';
import { getTranslation } from '../utils/translations.js';

const crops = [
  { id: 'tomato', nameKey: 'tomato', emoji: '🍅' },
  { id: 'wheat', nameKey: 'wheat', emoji: '🌾' },
  { id: 'rice', nameKey: 'rice', emoji: '🍚' },
  { id: 'onion', nameKey: 'onion', emoji: '🧅' },
  { id: 'potato', nameKey: 'potato', emoji: '🥔' },
  { id: 'corn', nameKey: 'corn', emoji: '🌽' },
];

const MarketPricesScreen = ({ onBack }) => {
  const context = useApp();
  const state = context?.state || { selectedLanguage: 'English', isOnline: true };
  const [selectedCrop, setSelectedCrop] = useState(crops[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [marketInsights, setMarketInsights] = useState('');
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    fetchMarketData();
  }, [selectedCrop]);

  const fetchMarketData = async () => {
    try {
      setIsLoading(true);
      
      // Generate mock price data
      const basePrice = Math.floor(Math.random() * 50) + 20;
      const change = (Math.random() - 0.5) * 20;
      
      const mockPriceData = {
        currentPrice: basePrice,
        change: change,
        unit: 'kg',
        lastUpdated: new Date().toLocaleTimeString(),
      };
      
      // Generate price history for chart
      const history = Array.from({ length: 7 }, (_, i) => ({
        day: `Day ${i + 1}`,
        price: basePrice + (Math.random() - 0.5) * 10
      }));
      
      setPriceData(mockPriceData);
      setPriceHistory(history);
      
      if (state.isOnline) {
        // Get AI insights
        const prompt = `Provide market analysis and selling recommendations for ${selectedCrop.nameKey} with current price trends.`;
        const insights = await callGeminiAPI(prompt);
        setMarketInsights(insights);
      } else {
        setMarketInsights('Market insights will be available when connection is restored.');
      }
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectCrop = (crop) => {
    setSelectedCrop(crop);
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 safe-area-top">
        <div className="flex justify-between items-center px-5 py-4">
          <button onClick={onBack} className="touch-target">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {getTranslation(state.selectedLanguage, 'marketPrices')}
          </h1>
          <button onClick={fetchMarketData} className="touch-target" disabled={isLoading}>
            <RefreshCw size={20} className={`text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        {/* Crop Selector */}
        <div className="relative mb-6 z-10">
          <label className="block text-base font-semibold text-gray-800 mb-3">
            {getTranslation(state.selectedLanguage, 'selectCrop')}
          </label>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-xl px-4 py-3"
          >
            <div className="flex items-center">
              <span className="text-xl mr-3">{selectedCrop.emoji}</span>
              <span className="text-base text-gray-700">
                {getTranslation(state.selectedLanguage, selectedCrop.nameKey)}
              </span>
            </div>
            <ChevronDown size={20} className="text-gray-500" />
          </button>
          
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
              {crops.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => selectCrop(crop)}
                  className="w-full flex items-center px-4 py-3 hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-xl mr-3">{crop.emoji}</span>
                  <span className="text-base text-gray-700">
                    {getTranslation(state.selectedLanguage, crop.nameKey)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Display */}
        {priceData && (
          <div className="card mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {getTranslation(state.selectedLanguage, selectedCrop.nameKey)}
              </h2>
              <div className={`flex items-center px-2 py-1 rounded-lg ${
                priceData.change >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {priceData.change >= 0 ? 
                  <TrendingUp size={16} className="text-green-600 mr-1" /> : 
                  <TrendingDown size={16} className="text-red-600 mr-1" />
                }
                <span className={`text-sm font-semibold ${
                  priceData.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {priceData.change >= 0 ? '+' : ''}{priceData.change.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-gray-800 mb-1">
                ₹{priceData.currentPrice}/{priceData.unit}
              </p>
              <p className="text-sm text-gray-600">
                {getTranslation(state.selectedLanguage, 'lastUpdated')}: {priceData.lastUpdated}
              </p>
            </div>

            {/* Price Chart */}
            {priceHistory.length > 0 && (
              <div className="h-32 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory}>
                    <XAxis dataKey="day" hide />
                    <YAxis hide />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#22C55E" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <p className="text-lg font-bold text-gray-800">₹{(priceData?.currentPrice || 0) - 5}</p>
            <p className="text-xs text-gray-600">{getTranslation(state.selectedLanguage, 'yesterday')}</p>
          </div>
          <div className="card text-center">
            <p className="text-lg font-bold text-gray-800">₹{(priceData?.currentPrice || 0) + 3}</p>
            <p className="text-xs text-gray-600">{getTranslation(state.selectedLanguage, 'weekHigh')}</p>
          </div>
          <div className="card text-center">
            <p className="text-lg font-bold text-gray-800">₹{(priceData?.currentPrice || 0) - 8}</p>
            <p className="text-xs text-gray-600">{getTranslation(state.selectedLanguage, 'weekLow')}</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-base text-gray-600">
              {getTranslation(state.selectedLanguage, 'fetchingInsights')}
            </p>
          </div>
        )}

        {/* AI Market Insights */}
        {marketInsights && !isLoading && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {getTranslation(state.selectedLanguage, 'aiMarketInsights')}
            </h3>
            <div className="card border-l-4 border-l-blue-500">
              <p className="text-base text-gray-700 leading-relaxed">{marketInsights}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPricesScreen;