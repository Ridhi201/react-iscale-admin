import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

export default function UserSearchDropdown({ onSelect, placeholder = 'Search users...', className = '' }) {
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!keyword.trim()) {
        setUsers([]);
        return;
      }
      
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/myadmin/app-users/search?keyword=${encodeURIComponent(keyword)}&page=1&limit=100`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data?.status) {
          setUsers(res.data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch users for dropdown:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchUsers();
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [keyword]);

  const handleSelect = (user) => {
    setKeyword(user.full_name || `${user.first_name} ${user.last_name}`);
    setIsOpen(false);
    if (onSelect) {
      onSelect(user);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full border border-slate-300 dark:border-[#1f1b2e] rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-white dark:bg-[#13111c] text-slate-800 dark:text-slate-200"
      />
      
      {isOpen && (keyword.trim().length > 0) && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-[#1f1b2e] border border-slate-200 dark:border-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-sm text-slate-500 text-center">Searching...</div>
          ) : users.length > 0 ? (
            <ul className="py-1">
              {users.map((user) => (
                <li
                  key={user._id}
                  onClick={() => handleSelect(user)}
                  className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-[#13111c] cursor-pointer border-b border-slate-100 dark:border-gray-800/50 last:border-b-0"
                >
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {user.full_name || `${user.first_name} ${user.last_name}`}
                  </div>
                  <div className="text-xs text-slate-500">
                    {user.email}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-sm text-slate-500 text-center">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}
