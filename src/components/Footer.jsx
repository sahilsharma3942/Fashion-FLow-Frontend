// Footer.jsx
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Clothing Store. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Contact Us</a>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-gray-400">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-gray-400">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Twitter" className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-gray-400">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Instagram" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};
