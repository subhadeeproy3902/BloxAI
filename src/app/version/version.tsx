import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface VersionCardProps {
  version: string;
  date: string;
  changes: string[];
  bugfixes: string[];
  className?: string;
  isActive: boolean; // New prop to indicate active state
}

const VersionCard: React.FC<VersionCardProps> = ({ version, date, changes, bugfixes, className, isActive }) => {
  return (
    <div className="flex flex-col items-start space-x-4 md:flex-row w-full">
      <div className="w-full text-right mb-4 md:w-1/4 md:mb-0">
        <p className={`text-gray-500 ${isActive ? 'text-black dark:text-white' : ''}`}>{date}</p>
      </div>
      <div className="relative w-full md:w-4/4">
        <div className="absolute left-0 w-0.5 h-full bg-gray-200 md:h-[calc(100%+2rem)] md:top-[-1rem]" />
        <Card className={`relative ml-10 overflow-hidden bg-white px-10 shadow-md rounded-3xl p-6 my-6 custom-card w-full ${className} ${isActive ? 'active' : ''} md:max-w-full lg:max-full`}>
          <div className="absolute inset-0 h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20" />
          <CardHeader>
            <div className='flex justify-between'>
              <h1 className="text-xl font-semibold text-gray-700">Version {version}</h1>
              <h1 className="text-4xl font-semibold text-gray-700">{version}</h1>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">Improvements & Changes</h3>
              <ul className="list-disc list-inside text-gray-700">
                {changes.map((change, index) => (
                  <li key={index}>{change}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold text-gray-700">Bugfixes</h3>
              <ul className="list-disc list-inside text-gray-700">
                {bugfixes.map((bug, index) => (
                  <li key={index}>{bug}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VersionCard;
