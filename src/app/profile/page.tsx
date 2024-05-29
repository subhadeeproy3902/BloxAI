'use client';

import React, { useState } from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface User {
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  address: {
    country: string;
    state: string;
    city: string;
    postalCode: string;
  };
}

const Setting: React.FC = () => {
  const initialUser: User = {
    profilePicture: 'https://via.placeholder.com/150',
    firstName: 'Thomas',
    lastName: 'Smith',
    email: 'thomas.smith@akrobat.com',
    phone: '+1 817 718 8273',
    bio: 'CEO and Co-Founder of Akrobat Design Studio',
    address: {
      country: 'United States of America',
      state: 'NY',
      city: 'New York City',
      postalCode: '10011',
    },
  };

  const [user, setUser] = useState<User>(initialUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if ( e.target?.result ) {
          setUser({ ...user, profilePicture: e.target.result as string });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Header/>
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Account Settings</h2>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Personal Information</h3>
            <div className="relative flex items-center mb-6">
            <label className="absolute bottom-0 left-0 bg-gray-800 text-white rounded-full p-1 cursor-pointer">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </label>
              <img
                className="w-16 h-16 rounded-full mr-4 cursor-pointer object-cover"
                src={user.profilePicture}
                alt="Profile"
                onClick={handleImageClick}
              />
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {user.firstName} {user.lastName}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
              </div>
              <div className="absolute bottom-0 right-0">
              </div>
            </div>
            <div>
              <p className="text-gray-900 dark:text-gray-100">Email: {user.email}</p>
              <p className="text-gray-900 dark:text-gray-100">Phone: {user.phone}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Address</h3>
            <div>
              <p className="text-gray-900 dark:text-gray-100">Country: {user.address.country}</p>
              <p className="text-gray-900 dark:text-gray-100">State: {user.address.state}</p>
              <p className="text-gray-900 dark:text-gray-100">City: {user.address.city}</p>
              <p className="text-gray-900 dark:text-gray-100">Postal Code: {user.address.postalCode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Image Zoom */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img src={user.profilePicture} alt="Profile Zoomed" className="max-w-full max-h-full" />
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-white text-xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Setting;
