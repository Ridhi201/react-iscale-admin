import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

export default function TeamDropdown({ value, onChange, className = '', placeholder = 'Select Team Member' }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDropdown = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/myadmin/team/dropdown`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data?.status) {
          setTeams(res.data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch team dropdown:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdown();
  }, []);

  return (
    <select
      value={value}
      onChange={onChange}
      className={`border border-slate-300 dark:border-[#1f1b2e] rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] bg-white dark:bg-[#13111c] text-slate-800 dark:text-slate-200 ${className}`}
      disabled={loading}
    >
      <option value="">{loading ? 'Loading...' : placeholder}</option>
      {teams.map(team => (
        <option key={team._id} value={team._id}>
          {team.member_name}
        </option>
      ))}
    </select>
  );
}
