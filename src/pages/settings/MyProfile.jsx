import { useState, useEffect, useRef } from 'react'
import { Camera, User, Mail, Lock, Phone } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function MyProfile() {
  const [profileData, setProfileData] = useState({
    id: '',
    admin_name: '',
    email: '',
    login_id: '',
    contact_no: '',
    old_password: '',
    new_password: '',
    permission: '1',
    status: 'active'
  })
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/profile/my`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = res.data.data || res.data
      setProfileData({
        id: data._id || data.id || '',
        admin_name: data.admin_name || data.name || '',
        email: data.email || '',
        login_id: data.login_id || '',
        contact_no: data.contact_no || data.phone || '',
        old_password: '',
        new_password: '',
        permission: data.permission || data.role || '1',
        status: data.status || 'active'
      })
      if (data && data.profile_pic && data.profile_pic !== 'default.png') {
        const picUrl = data.profile_pic.startsWith('http') ? data.profile_pic : `${BASE_URL}/${data.profile_pic.replace(/\\/g, '/')}`
        setPreviewImage(picUrl)
      }
      setLoading(false)
    } catch (err) {
      console.error('Error fetching profile:', err)
      setErrorMessage('Failed to load profile data.')
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleUpdate = async () => {
    setErrorMessage('')
    setSuccessMessage('')
    setIsUpdating(true)
    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      const detailsPayload = {
        admin_name: profileData.admin_name
      }

      console.log(detailsPayload)

      await axios.put(`${BASE_URL}/myadmin/profile/update`, detailsPayload, { headers })
      
      if (profileData.old_password && profileData.new_password) {
        const passwordPayload = { 
          old_password: profileData.old_password,
          new_password: profileData.new_password
        }
        await axios.put(`${BASE_URL}/myadmin/profile/password`, passwordPayload, { headers })
      }
      
      if (fileInputRef.current?.files?.[0]) {
        const imagePayload = new FormData()
        imagePayload.append('profile_pic', fileInputRef.current.files[0])
        await axios.put(`${BASE_URL}/myadmin/profile/update/image`, imagePayload, { headers })
      }
      
      setSuccessMessage('Profile updated successfully!')
      
      // Clear password fields after successful update
      setProfileData(prev => ({ ...prev, old_password: '', new_password: '' }))
      
    } catch (error) {
      console.error('Update error:', error)
      const msg = error.response?.data?.message || error.response?.data?.error || error.message
      setErrorMessage(`Error: ${msg}`)
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading Profile...</div>
  }

  return (
    <div className="h-full animate-fade-in-up">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md border border-slate-100 overflow-hidden mb-5">
        
        {/* Header - Success Story Theme */}
        <div className="bg-[#144f36] rounded-t-2xl p-5 flex justify-between items-center shadow-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white dark:bg-[#13111c]/10 rounded-full blur-2xl group-hover:bg-white dark:bg-[#13111c]/20 transition-all duration-700 pointer-events-none"></div>
          
          <div className="flex items-center relative z-10">
            <div className="w-1.5 h-7 bg-white dark:bg-[#13111c]/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
            <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">My Profile</h2>
          </div>
        </div>
        
        <div className="p-6">
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm text-sm">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-sm text-sm">
              {successMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h3 className="text-lg font-medium text-slate-800 font-bold">Details</h3>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm font-bold text-slate-800">Name :</label>
                  <div className="flex-1 flex border border-slate-300 bg-white text-slate-700 rounded overflow-hidden focus-within:border-[#144f36] focus-within:ring-1 focus-within:ring-[#144f36] transition-all">
                    <div className="bg-slate-50 px-3 flex items-center justify-center border-r border-slate-300 text-slate-500">
                      <User size={16} />
                    </div>
                    <input 
                      type="text" 
                      name="admin_name"
                      value={profileData.admin_name}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm font-bold text-slate-800">Email :</label>
                  <div className="flex-1 flex border border-slate-300 bg-white text-slate-700 rounded overflow-hidden focus-within:border-[#144f36] focus-within:ring-1 focus-within:ring-[#144f36] transition-all">
                    <div className="bg-slate-50 px-3 flex items-center justify-center border-r border-slate-300 text-slate-500">
                      <Mail size={16} />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm font-bold text-slate-800">Log ID :</label>
                  <div className="flex-1 flex border border-slate-300 bg-white text-slate-700 rounded overflow-hidden focus-within:border-[#144f36] focus-within:ring-1 focus-within:ring-[#144f36] transition-all">
                    <div className="bg-slate-50 px-3 flex items-center justify-center border-r border-slate-300 text-slate-500">
                      <Lock size={16} />
                    </div>
                    <input 
                      type="text" 
                      name="login_id"
                      value={profileData.login_id}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm font-bold text-slate-800">Old Password :</label>
                  <div className="flex-1 flex border border-slate-300 bg-white text-slate-700 rounded overflow-hidden focus-within:border-[#144f36] focus-within:ring-1 focus-within:ring-[#144f36] transition-all">
                    <div className="bg-slate-50 px-3 flex items-center justify-center border-r border-slate-300 text-slate-500">
                      <Lock size={16} />
                    </div>
                    <input 
                      type="password" 
                      name="old_password"
                      placeholder="Required to set new password"
                      value={profileData.old_password}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm font-bold text-slate-800">New Password :</label>
                  <div className="flex-1 flex border border-slate-300 bg-white text-slate-700 rounded overflow-hidden focus-within:border-[#144f36] focus-within:ring-1 focus-within:ring-[#144f36] transition-all">
                    <div className="bg-slate-50 px-3 flex items-center justify-center border-r border-slate-300 text-slate-500">
                      <Lock size={16} />
                    </div>
                    <input 
                      type="password" 
                      name="new_password"
                      placeholder="Leave blank to keep unchanged"
                      value={profileData.new_password}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm font-bold text-slate-800">Contact No :</label>
                  <div className="flex-1 flex border border-slate-300 bg-white text-slate-700 rounded overflow-hidden focus-within:border-[#144f36] focus-within:ring-1 focus-within:ring-[#144f36] transition-all">
                    <div className="bg-slate-50 px-3 flex items-center justify-center border-r border-slate-300 text-slate-500">
                      <Phone size={16} />
                    </div>
                    <input 
                      type="text" 
                      name="contact_no"
                      value={profileData.contact_no}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button 
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="bg-[#144f36] text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-[#0f3d2a] transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isUpdating ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm h-fit">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h3 className="text-lg font-medium text-slate-800 font-bold">Profile Picture</h3>
              </div>
              <div className="p-8 flex flex-col items-center">
                <div className="mb-8">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Profile" 
                      className="w-48 h-48 rounded-full object-cover border-4 border-slate-100 shadow-md"
                    />
                  ) : (
                    <div className="w-48 h-48 rounded-full border-4 border-slate-100 shadow-md flex items-center justify-center bg-slate-50 text-slate-400">
                      <User size={64} />
                    </div>
                  )}
                </div>
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden" 
                  accept="image/*"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full max-w-sm bg-[#144f36] text-white px-4 py-2.5 rounded flex items-center justify-center gap-2 hover:bg-[#0f3d2a] transition-colors shadow-sm text-sm font-bold"
                >
                  <Camera size={18} />
                  <span>Change Profile Picture</span>
                </button>
                <p className="text-xs text-slate-500 mt-3 text-center">
                  Recommended size: 250 x 250 px (1:1 Ratio)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
