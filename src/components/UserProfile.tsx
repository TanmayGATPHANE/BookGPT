import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export function UserProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, signOut } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors duration-200 header-user-profile shadow-lg"
      >
        <span className="text-white font-semibold text-sm">
          {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg z-50 animate-dropdown-fade-in header-dropdown">
          <div className="p-4 border-b border-orange-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <button
              onClick={() => {
                signOut();
                setIsDropdownOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
