import React, { useState } from 'react';
import { ADD_USER, BACKEND } from '../utils/Constants';
import { generateRandomString } from '../utils/functions';
import { useNavigate } from 'react-router-dom';

interface RegistrationFormData {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDay: Date | null; // Updated to include birthDay
  profile_pic: string;
  password: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    login: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDay: null, // Initialize birthDay as null
    profile_pic: '',
    password: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files?.[0] || null : type === 'date' ? new Date(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          if (key === 'birthDay' && value instanceof Date) {
            formDataToSend.append(key, value.toISOString().split('T')[0]); // Convert Date to ISO string
          }
          else if (key !== 'birthDay' && key !== 'confirmPassword') {
            formDataToSend.append(key, value.toString());
          } 
        }
      });

      const url = BACKEND + ADD_USER;

      const response = await fetch(url, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
        // Redirect or update UI as needed
      } else {
        alert(`Registration failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="login" className="block text-gray-700 font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
            maxLength={30}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            maxLength={30}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            maxLength={30}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            maxLength={255}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="birthDay" className="block text-gray-700 font-bold mb-2">
            Birth Day:
          </label>
          <input
            type="date"
            id="birthDay"
            name="birthDay"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="profile_pic" className="block text-gray-700 font-bold mb-2">
            Profile Picture:
          </label>
          <input
            type="text"
            id="profile_pic"
            name="profile_pic"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="twoFactorEnabled" className="block text-gray-700 font-bold mb-2">
            Enable Two-Factor Authentication:
          </label>
          <input
            type="checkbox"
            id="twoFactorEnabled"
            name="twoFactorEnabled"
            checked={formData.twoFactorEnabled}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
