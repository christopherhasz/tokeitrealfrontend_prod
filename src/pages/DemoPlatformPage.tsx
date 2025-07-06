import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Euro, Home, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Nav } from '../components/Nav';

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  description: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  type: string;
  yield: number;
  minInvestment: number;
  totalTokens: number;
  availableTokens?: number;
  capitalRaised?: number;
  targetCapital?: number;
  status: 'funding' | 'trading';
  currentTokenValue?: number;
}

const properties: Property[] = [
  {
    id: 'modern-family-apartment',
    name: 'Modern Family Apartment',
    location: 'Leipzig, Germany',
    price: 320000,
    description: '78m² 3-bedroom apartment in residential area with modern amenities and excellent transport links.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    bedrooms: 3,
    bathrooms: 1,
    sqm: 78,
    type: 'Apartment',
    yield: 4.8,
    minInvestment: 1,
    totalTokens: 32000,
    status: 'funding',
    capitalRaised: 180000,
    targetCapital: 320000
  },
  {
    id: 'suburban-house',
    name: 'Suburban House',
    location: 'Eindhoven, Netherlands',
    price: 285000,
    description: '110m² family home with small garden, perfect for young families in a quiet neighborhood.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    bedrooms: 3,
    bathrooms: 2,
    sqm: 110,
    type: 'House',
    yield: 5.2,
    minInvestment: 1,
    totalTokens: 28500,
    status: 'funding',
    capitalRaised: 142500,
    targetCapital: 285000
  },
  {
    id: 'city-apartment-building',
    name: 'City Apartment Building',
    location: 'Porto, Portugal',
    price: 240000,
    description: '65m² 2-bedroom apartment near city center with historic charm and modern renovations.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    bedrooms: 2,
    bathrooms: 1,
    sqm: 65,
    type: 'Apartment',
    yield: 6.1,
    minInvestment: 1,
    totalTokens: 24000,
    status: 'trading',
    currentTokenValue: 42.80
  }
];

export const DemoPlatformPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE').format(num);
  };

  const getFundingPercentage = (raised: number, target: number) => {
    return Math.round((raised / target) * 100);
  };

  const handleViewDetails = (propertyId: string) => {
    navigate(`/demo-platform/${propertyId}`);
  };

  const totalValue = properties.reduce((sum, prop) => sum + prop.price, 0);
  const totalTokens = properties.reduce((sum, prop) => sum + prop.totalTokens, 0);
  const avgYield = properties.reduce((sum, prop) => sum + prop.yield, 0) / properties.length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-6">
            Demo Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our tokenized real estate investment opportunities. Start investing with as little as €1.
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              <Home className="w-6 h-6 text-white dark:text-black" />
            </div>
            <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">3</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Properties</p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              <Euro className="w-6 h-6 text-white dark:text-black" />
            </div>
            <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">{formatPrice(totalValue).replace('€', '€')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white dark:text-black" />
            </div>
            <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">{formatNumber(totalTokens)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Tokens</p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white dark:text-black" />
            </div>
            <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">{avgYield.toFixed(1)}%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Yield</p>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Property Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-sm font-light">
                  {property.yield}% Yield
                </div>
                {property.status === 'trading' && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-light">
                    Trading Active
                  </div>
                )}
                {property.status === 'funding' && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-light">
                    Funding
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-2">
                    {property.name}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <p className="text-2xl font-light text-gray-900 dark:text-gray-100">
                    {formatPrice(property.price)}
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {property.description}
                </p>

                {/* Property Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <p className="text-lg font-light text-gray-900 dark:text-gray-100">{property.bedrooms}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Bedrooms</p>
                  </div>
                  <div>
                    <p className="text-lg font-light text-gray-900 dark:text-gray-100">{property.bathrooms}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Bathrooms</p>
                  </div>
                  <div>
                    <p className="text-lg font-light text-gray-900 dark:text-gray-100">{property.sqm}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">m²</p>
                  </div>
                </div>

                {/* Investment Status */}
                {property.status === 'funding' && property.capitalRaised && property.targetCapital && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Capital Raised</span>
                      <span>{getFundingPercentage(property.capitalRaised, property.targetCapital)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getFundingPercentage(property.capitalRaised, property.targetCapital)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatPrice(property.capitalRaised)} / {formatPrice(property.targetCapital)}
                    </p>
                  </div>
                )}

                {property.status === 'trading' && property.currentTokenValue && (
                  <div className="mb-4">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Fully Funded - Trading Active</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Current Token Value</span>
                        <span className="text-lg font-medium text-green-600 dark:text-green-400">
                          €{property.currentTokenValue.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Investment Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Min. Investment</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      €{property.minInvestment}
                    </span>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => handleViewDetails(property.id)}
                  className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-light
                           flex items-center justify-center space-x-2
                           hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300
                           transform hover:scale-105 active:scale-95"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Ready to Start Investing?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are already building their real estate portfolio through tokenization
          </p>
          <a
            href="https://www.linkedin.com/company/tokeitreal/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg font-light
                     hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300
                     transform hover:scale-105 active:scale-95"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
};