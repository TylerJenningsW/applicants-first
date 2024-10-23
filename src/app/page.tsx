import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Clock, ChartBar } from 'lucide-react';
import Navbar from './components/Navigation';

export default function Home() {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Applicant Tracking",
      description: "Streamline your recruitment process with our intelligent tracking system"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Time Management",
      description: "Efficiently manage interview schedules and hiring timelines"
    },
    {
      icon: <ChartBar className="w-6 h-6 text-blue-500" />,
      title: "Analytics Dashboard",
      description: "Make data-driven decisions with comprehensive hiring analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Streamline Your <span className="text-blue-600">Hiring Process</span> with Intelligence
              </h1>
              <p className="text-lg text-gray-600">
                Transform your recruitment workflow with our comprehensive HR management platform. Make better hiring decisions, faster.
              </p>
              <div className="flex items-center space-x-4">
                <Link href="/role-management">
                  <button className="group px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/login">
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative h-64 lg:h-96">
              <div className="absolute inset-0 bg-blue-100 rounded-2xl overflow-hidden">
                <Image 
                  src="/images/group-of-people.jpeg"
                  alt="Group of People"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};