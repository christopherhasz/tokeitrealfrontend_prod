import React from 'react';
import { Building2, Wrench, Users, Receipt, BarChart3, Shield } from 'lucide-react';

interface ManagementSectionProps {
  language?: 'de' | 'en';
}

export const ManagementSection: React.FC<ManagementSectionProps> = ({ language = 'en' }) => {
  const managementAspects = [
    {
      icon: Building2,
      title: 'Property Maintenance',
      description: 'Regular upkeep and preventive maintenance to preserve and enhance property value',
      tasks: ['Building repairs', 'System upgrades', 'Preventive maintenance', 'Emergency services']
    },
    {
      icon: Users,
      title: 'Tenant Relations',
      description: 'Professional tenant management and support for optimal occupancy',
      tasks: ['Tenant screening', 'Lease management', '24/7 support', 'Conflict resolution']
    },
    {
      icon: Receipt,
      title: 'Financial Management',
      description: 'Comprehensive financial oversight and transparent reporting',
      tasks: ['Rent collection', 'Expense tracking', 'Budget planning', 'Financial reporting']
    }
  ];

  const benefits = [
    {
      icon: BarChart3,
      title: '100% Net Rental Income',
      description: 'Receive your full share of rental income after operational costs'
    },
    {
      icon: Shield,
      title: 'Professional Oversight',
      description: 'Expert team handling all aspects of property management'
    },
    {
      icon: Wrench,
      title: 'Maintenance Coverage',
      description: 'All necessary repairs and upgrades professionally managed'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-6">
            {language === 'de' ? 'Professionelle Immobilienverwaltung' : 'Professional Property Management'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'de'
              ? 'Konzentrieren Sie sich auf Ihre Investition, während unser Expertenteam alle Aspekte der Immobilienverwaltung übernimmt'
              : 'Focus on your investment while our expert team handles all aspects of property management'}
          </p>
        </div>

        {/* Management Aspects Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {managementAspects.map((aspect, index) => (
            <div 
              key={aspect.title}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center mb-6">
                  <aspect.icon className="w-12 h-12 text-black dark:text-white" />
                </div>
                <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                  {aspect.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {aspect.description}
                </p>
                <ul className="space-y-3">
                  {aspect.tasks.map((task, taskIndex) => (
                    <li 
                      key={taskIndex}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-black dark:bg-white rounded-full mr-3" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Investor Benefits */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100 mb-8 text-center">
            Investor Benefits
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-10 h-10 text-black dark:text-white" />
                </div>
                <h4 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};