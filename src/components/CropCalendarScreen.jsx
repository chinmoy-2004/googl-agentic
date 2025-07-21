import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Bell, Cloud, Droplets, Thermometer } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getTranslation } from '../utils/translations';

const CropCalendarScreen = ({ onBack }) => {
  const { state } = useApp();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [cropActivities, setCropActivities] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const activities = [
    {
      id: 1,
      crop: 'Wheat',
      activity: 'Sowing',
      period: 'Nov 15 - Nov 30',
      status: 'upcoming',
      icon: '🌾',
      description: 'Optimal time for wheat sowing in your region'
    },
    {
      id: 2,
      crop: 'Tomato',
      activity: 'Transplanting',
      period: 'Dec 1 - Dec 15',
      status: 'current',
      icon: '🍅',
      description: 'Move seedlings to main field'
    },
    {
      id: 3,
      crop: 'Rice',
      activity: 'Harvesting',
      period: 'Nov 20 - Dec 10',
      status: 'current',
      icon: '🍚',
      description: 'Harvest when grains are golden yellow'
    },
    {
      id: 4,
      crop: 'Onion',
      activity: 'Fertilizer Application',
      period: 'Dec 5 - Dec 12',
      status: 'upcoming',
      icon: '🧅',
      description: 'Apply NPK fertilizer for better bulb development'
    }
  ];

  const weatherData = {
    temperature: '28°C',
    humidity: '65%',
    rainfall: '12mm',
    condition: 'Partly Cloudy'
  };

  useEffect(() => {
    // Filter activities based on selected month
    setCropActivities(activities);
  }, [selectedMonth]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'current':
        return 'Active';
      case 'upcoming':
        return 'Upcoming';
      case 'completed':
        return 'Completed';
      default:
        return 'Scheduled';
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
          <h1 className="text-lg font-semibold text-gray-800">Crop Calendar</h1>
          <button className="touch-target">
            <Bell size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Month Selector */}
        <div className="bg-white border-b border-gray-200 p-5">
          <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedMonth === index
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Weather Card */}
        <div className="p-5">
          <div className="card mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Today's Weather</h3>
                <p className="text-sm text-gray-600">{weatherData.condition}</p>
              </div>
              <Cloud size={40} className="text-gray-400" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Thermometer size={20} className="text-red-500 mx-auto mb-1" />
                <p className="text-sm font-semibold text-gray-800">{weatherData.temperature}</p>
                <p className="text-xs text-gray-600">Temperature</p>
              </div>
              <div className="text-center">
                <Droplets size={20} className="text-blue-500 mx-auto mb-1" />
                <p className="text-sm font-semibold text-gray-800">{weatherData.humidity}</p>
                <p className="text-xs text-gray-600">Humidity</p>
              </div>
              <div className="text-center">
                <Cloud size={20} className="text-gray-500 mx-auto mb-1" />
                <p className="text-sm font-semibold text-gray-800">{weatherData.rainfall}</p>
                <p className="text-xs text-gray-600">Rainfall</p>
              </div>
            </div>
          </div>

          {/* Activities Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Activities for {months[selectedMonth]}
            </h3>
            
            <div className="space-y-4">
              {cropActivities.map((activity) => (
                <div key={activity.id} className="card">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-base font-semibold text-gray-800">
                            {activity.crop} - {activity.activity}
                          </h4>
                          <p className="text-sm text-gray-600">{activity.period}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                          {getStatusText(activity.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{activity.description}</p>
                      
                      {activity.status === 'current' && (
                        <div className="flex space-x-2">
                          <button className="btn-primary text-sm py-2 px-4">
                            Mark Complete
                          </button>
                          <button className="btn-secondary text-sm py-2 px-4">
                            Set Reminder
                          </button>
                        </div>
                      )}
                      
                      {activity.status === 'upcoming' && (
                        <button className="btn-secondary text-sm py-2 px-4">
                          <Bell size={16} className="mr-1" />
                          Set Reminder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Tips */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">This Week's Tips</h3>
            <div className="card border-l-4 border-l-primary-500">
              <h4 className="font-semibold text-gray-800 mb-2">Optimal Farming Conditions</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Morning hours (6-9 AM) are best for spraying</li>
                <li>• Soil moisture is adequate for transplanting</li>
                <li>• Watch for pest activity in tomato crops</li>
                <li>• Consider organic fertilizers for better soil health</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropCalendarScreen;