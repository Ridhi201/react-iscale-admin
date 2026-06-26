import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'
import { Upload } from 'lucide-react'

const TABS = [
  'General Settings',
  'Visual Settings',
  'Social Media Settings',
  'SEO Settings',
  'Email Settings',
  'SMS Settings',
  'Payment Settings',
  'Live Class'
]

const ENDPOINT_MAP = {
  'General Settings': 'general',
  'Visual Settings': 'visual',
  'Social Media Settings': 'social-media',
  'SEO Settings': 'seo',
  'Email Settings': 'email',
  'SMS Settings': 'sms',
  'Payment Settings': 'payment',
  'Live Class': 'live-class'
}

export default function ApplicationSetting() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [settingsId, setSettingsId] = useState(null)
  
  // File refs for visual settings
  const fileRefs = {
    app_icon: useRef(null),
    app_logo: useRef(null),
    footer_logo: useRef(null),
    mobile_logo: useRef(null),
    admin_login_image: useRef(null),
    home_screen_image: useRef(null)
  }

  // Previews for visual settings
  const [previews, setPreviews] = useState({
    app_icon: '',
    app_logo: '',
    footer_logo: '',
    mobile_logo: '',
    admin_login_image: '',
    home_screen_image: ''
  })

  // Form States
  const [forms, setForms] = useState({
    'General Settings': {
      app_name: 'The iScale',
      date_format: 'DD-MM-YY',
      time_format: '12 Hours',
      time_zone: 'Asia/Kolkata',
      address: '',
      email: '',
      mobile: '',
      alt_mobile: ''
    },
    'Visual Settings': {}, // Handled by previews and refs
    'Social Media Settings': {
      facebook_url: '',
      instagram_url: '',
      linkedin_url: '',
      twitter_url: '',
      youtube_url: '',
      whatsapp: '',
      telegram: '',
      website_url: '',
      playstore_url: '',
      appstore_url: ''
    },
    'SEO Settings': {
      application_title: '',
      application_keywords: '',
      description: '',
      author: '',
      google_recaptcha: 'Enable',
      recaptcha_key: '',
      recaptcha_key_secret: '',
      google_analytics_code: ''
    },
    'Email Settings': {
      smtp_host: '',
      smtp_username: '',
      smtp_password: '',
      smtp_port: '',
      mail_encryption: 'ssl',
      mail_from_name: ''
    },
    'SMS Settings': {
      msg_91_api_url: '',
      msg_91_api_key: '',
      msg_91_sender_id: '',
      msg_91_template_id: '',
      msg_91_message: '',
      msg_91_title: ''
    },
    'Payment Settings': {
      online_payment: 'Active',
      razorpay_test_key: '',
      razorpay_test_secret: '',
      razorpay_live_key: '',
      razorpay_live_secret: '',
      gateway_status: 'Live Mode'
    },
    'Live Class': {
      api_key: '',
      api_secret: '',
      email_address: ''
    }
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setFetching(true)
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/app-settings/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const data = Array.isArray(res.data?.data) ? res.data.data[0] : (res.data?.data || res.data)
      
      if (data) {
        setSettingsId(data._id || data.id)
        
        setForms(prev => {
          const newForms = { ...prev }
          
          if (data.general) Object.assign(newForms['General Settings'], data.general)
          if (data.social_media || data.socialMedia) Object.assign(newForms['Social Media Settings'], data.social_media || data.socialMedia)
          if (data.seo) Object.assign(newForms['SEO Settings'], data.seo)
          if (data.email) Object.assign(newForms['Email Settings'], data.email)
          if (data.sms) Object.assign(newForms['SMS Settings'], data.sms)
          if (data.payment) Object.assign(newForms['Payment Settings'], data.payment)
          if (data.live_class || data.liveClass) Object.assign(newForms['Live Class'], data.live_class || data.liveClass)
          
          return newForms
        })

        if (data.visual) {
          setPreviews({
            app_icon: data.visual.app_icon ? `${BASE_URL}/${data.visual.app_icon}` : '',
            app_logo: data.visual.app_logo ? `${BASE_URL}/${data.visual.app_logo}` : '',
            footer_logo: data.visual.footer_logo ? `${BASE_URL}/${data.visual.footer_logo}` : '',
            mobile_logo: data.visual.mobile_logo ? `${BASE_URL}/${data.visual.mobile_logo}` : '',
            admin_login_image: data.visual.admin_login_image ? `${BASE_URL}/${data.visual.admin_login_image}` : '',
            home_screen_image: data.visual.home_screen_image ? `${BASE_URL}/${data.visual.home_screen_image}` : '',
          })
        }
      }
    } catch (error) {
      console.error("Failed to fetch settings", error)
    } finally {
      setFetching(false)
    }
  }

  const handleInputChange = (tab, field, value) => {
    setForms(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value
      }
    }))
  }

  const handleFileChange = (field, e) => {
    const file = e.target.files[0]
    if (file) {
      setPreviews(prev => ({
        ...prev,
        [field]: URL.createObjectURL(file)
      }))
    }
  }

  const handleUpdate = async () => {
    try {
      setLoading(true); 
      const token = localStorage.getItem('token')
      const endpointSuffix = ENDPOINT_MAP[activeTab]
      
      let payload
      let headers = { Authorization: `Bearer ${token}` }
      
      if (activeTab === 'Visual Settings') {
        payload = new FormData()
        Object.keys(fileRefs).forEach(key => {
          if (fileRefs[key].current?.files?.[0]) {
            payload.append(key, fileRefs[key].current.files[0])
          }
        })
        headers['Content-Type'] = 'multipart/form-data'
      } else {
        payload = forms[activeTab]
      }
      
      const url = `${BASE_URL}/myadmin/app-settings/${endpointSuffix}`
      
      const res = await axios.put(url, payload, { headers })
      
      if (res.data?.status || res.data?.success || res.status === 200) {
        await window.customAlert(`${activeTab} updated successfully!`)
      } else {
        await window.customAlert(res.data?.message || 'Failed to update settings')
      }
    } catch (error) {
      console.error("Update failed", error)
      await window.customAlert(error.response?.data?.message || 'Error updating settings. Check console.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateAll = async () => {
    try {
      setLoading(true); 
      const token = localStorage.getItem('token')
      const url = settingsId 
        ? `${BASE_URL}/myadmin/app-settings/update/${settingsId}`
        : `${BASE_URL}/myadmin/app-settings/add`
        
      const payload = { ...forms }
      // Exclude Visual Settings from mass JSON update since it requires FormData usually, 
      // or handle it separately if backend allows.
      delete payload['Visual Settings']
        
      const res = await axios.put(url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await window.customAlert(`All Text Settings updated successfully!`)
    } catch (error) {
      await window.customAlert(error.response?.data?.message || 'Failed to update all settings')
    } finally {
      setLoading(false)
    }
  }

  const renderFieldRow = (tab, field, label, type = 'text', options = null) => {
    return (
      <div className="flex flex-col md:flex-row md:items-center gap-4 py-2 border-b border-slate-100 last:border-0">
        <div className="md:w-[200px] flex-shrink-0">
          <label className="text-[13px] font-bold text-slate-700">{label}</label>
        </div>
        <div className="flex-1">
          {type === 'select' ? (
            <select 
              value={forms[tab][field] || ''}
              onChange={(e) => handleInputChange(tab, field, e.target.value)}
              className="w-full border border-slate-300 bg-white text-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
            >
              {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : type === 'textarea' ? (
            <textarea 
              value={forms[tab][field] || ''}
              onChange={(e) => handleInputChange(tab, field, e.target.value)}
              rows={3}
              className="w-full border border-slate-300 bg-white text-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] resize-none"
            />
          ) : (
            <input 
              type={type}
              value={forms[tab][field] || ''}
              onChange={(e) => handleInputChange(tab, field, e.target.value)}
              className="w-full border border-slate-300 bg-white text-slate-700 rounded px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
            />
          )}
        </div>
      </div>
    )
  }

  const renderVisualUploadCard = (fieldKey, label, instructions) => {
    return (
      <div className="flex flex-col items-center p-4">
        <h4 className="text-sm font-bold text-slate-700 mb-2">{label}</h4>
        
        <div className="w-full max-w-[200px] aspect-square bg-slate-50 border border-dashed border-slate-300 rounded flex items-center justify-center overflow-hidden mb-3 relative group">
          {previews[fieldKey] ? (
            <img src={previews[fieldKey]} alt={label} className="w-full h-full object-contain p-2" />
          ) : (
            <div className="text-slate-400 text-xs text-center p-4">Default Image</div>
          )}
        </div>
        
        <p className="text-[10px] text-slate-500 text-center mb-3 min-h-[30px]">{instructions}</p>
        
        <div className="w-full max-w-[200px]">
          <button 
            type="button"
            onClick={() => fileRefs[fieldKey].current?.click()}
            className="w-full bg-[#144f36] hover:bg-[#0f3d2a] text-white text-sm font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 mb-2 shadow-sm"
          >
            <Upload size={14} /> Change
          </button>
          
          <input 
            type="file" 
            ref={fileRefs[fieldKey]} 
            onChange={(e) => handleFileChange(fieldKey, e)}
            accept="image/*" 
            className="w-full text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-slate-300 file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100" 
          />
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General Settings':
        return (
          <div className="flex flex-col gap-1">
            {renderFieldRow(activeTab, 'app_name', 'Application Name')}
            {renderFieldRow(activeTab, 'date_format', 'Date Format', 'select', ['DD-MM-YY', 'MM-DD-YY', 'YY-MM-DD'])}
            {renderFieldRow(activeTab, 'time_format', 'Time Format', 'select', ['12 Hours', '24 Hours'])}
            {renderFieldRow(activeTab, 'time_zone', 'Time Zone')}
            {renderFieldRow(activeTab, 'address', 'Address', 'textarea')}
            {renderFieldRow(activeTab, 'email', 'Contact Email')}
            {renderFieldRow(activeTab, 'mobile', 'Mobile Number')}
            {renderFieldRow(activeTab, 'alt_mobile', 'Alternate Mobile')}
          </div>
        )
      case 'Visual Settings':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {renderVisualUploadCard('app_icon', 'App Icon', 'Preferred Icon Size 32*32')}
            {renderVisualUploadCard('app_logo', 'App Logo', 'Preferred Logo Size (250 X 250) (1 : 1 ratio) (Width X Height)')}
            {renderVisualUploadCard('footer_logo', 'Footer Logo', 'Preferred Icon Size (250 X 250) (1 : 1 ratio) (Width X Height)')}
            {renderVisualUploadCard('mobile_logo', 'Mobile Logo', 'Preferred Icon Size (250 X 250) (1 : 1 ratio) (Width X Height)')}
            {renderVisualUploadCard('admin_login_image', 'Admin Login Image', 'Preferred Icon Size (250 X 250) (1 : 1 ratio) (Width X Height)')}
            {renderVisualUploadCard('home_screen_image', 'Home Screen Image', 'Preferred Image Size (250 X 250) (1 : 1 ratio) (Width X Height)')}
          </div>
        )
      case 'Social Media Settings':
        return (
          <div className="flex flex-col gap-1">
            {renderFieldRow(activeTab, 'facebook_url', 'Facebook Url')}
            {renderFieldRow(activeTab, 'instagram_url', 'Instagram Url')}
            {renderFieldRow(activeTab, 'linkedin_url', 'Linkedin Url')}
            {renderFieldRow(activeTab, 'twitter_url', 'Twitter Url')}
            {renderFieldRow(activeTab, 'youtube_url', 'Youtube Url')}
            {renderFieldRow(activeTab, 'whatsapp', 'Whats App')}
            {renderFieldRow(activeTab, 'telegram', 'Telegram')}
            {renderFieldRow(activeTab, 'website_url', 'Website Url')}
            {renderFieldRow(activeTab, 'playstore_url', 'Playstore Url')}
            {renderFieldRow(activeTab, 'appstore_url', 'Appstore Url')}
          </div>
        )
      case 'SEO Settings':
        return (
          <div className="flex flex-col gap-1">
            {renderFieldRow(activeTab, 'application_title', 'Application Title')}
            {renderFieldRow(activeTab, 'application_keywords', 'Application Keywords', 'textarea')}
            {renderFieldRow(activeTab, 'description', 'Description', 'textarea')}
            {renderFieldRow(activeTab, 'author', 'Author')}
            {renderFieldRow(activeTab, 'google_recaptcha', 'Google Recaptcha', 'select', ['Enable', 'Disable'])}
            {renderFieldRow(activeTab, 'recaptcha_key', 'Recaptcha Key')}
            {renderFieldRow(activeTab, 'recaptcha_key_secret', 'Recaptcha Key Secret')}
            {renderFieldRow(activeTab, 'google_analytics_code', 'Google Analytics Code', 'textarea')}
          </div>
        )
      case 'Email Settings':
        return (
          <div className="flex flex-col gap-1">
            {renderFieldRow(activeTab, 'smtp_host', 'SMTP Host')}
            {renderFieldRow(activeTab, 'smtp_username', 'SMTP Username')}
            {renderFieldRow(activeTab, 'smtp_password', 'SMTP Password', 'password')}
            {renderFieldRow(activeTab, 'smtp_port', 'SMTP Port', 'number')}
            {renderFieldRow(activeTab, 'mail_encryption', 'Mail Encryption', 'select', ['ssl', 'tls', 'none'])}
            {renderFieldRow(activeTab, 'mail_from_name', 'Mail From Name')}
          </div>
        )
      case 'SMS Settings':
        return (
          <div className="flex flex-col gap-1">
            {renderFieldRow(activeTab, 'msg_91_api_url', 'Msg 91 API Url')}
            {renderFieldRow(activeTab, 'msg_91_api_key', 'Msg 91 API Key')}
            {renderFieldRow(activeTab, 'msg_91_sender_id', 'Msg 91 Sender ID')}
            {renderFieldRow(activeTab, 'msg_91_template_id', 'Msg 91 Templete ID')}
            {renderFieldRow(activeTab, 'msg_91_message', 'Msg 91 Message', 'textarea')}
            {renderFieldRow(activeTab, 'msg_91_title', 'Msg 91 Title')}
          </div>
        )
      case 'Payment Settings':
        return (
          <div className="flex flex-col gap-1">
            {renderFieldRow(activeTab, 'online_payment', 'Online Payment', 'select', ['Active', 'Inactive'])}
            {renderFieldRow(activeTab, 'razorpay_test_key', 'Razorpay Test Key')}
            {renderFieldRow(activeTab, 'razorpay_test_secret', 'Razorpay Test Secret')}
            {renderFieldRow(activeTab, 'razorpay_live_key', 'Razorpay Live Key')}
            {renderFieldRow(activeTab, 'razorpay_live_secret', 'Razorpay Live Secret')}
            {renderFieldRow(activeTab, 'gateway_status', 'Gateway Status', 'select', ['Live Mode', 'Test Mode'])}
          </div>
        )
      case 'Live Class':
        return (
          <div className="flex flex-col gap-1">
            {renderFieldRow(activeTab, 'api_key', 'Api Key')}
            {renderFieldRow(activeTab, 'api_secret', 'Api Secret')}
            {renderFieldRow(activeTab, 'email_address', 'Email Address')}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="h-full animate-fade-in-up flex flex-col">
      <div className="bg-[#f6f6ff] rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-shadow border border-slate-100 overflow-hidden mb-5 flex flex-col h-full max-w-[1400px]">
        
        {/* Header - Success Story Theme */}
        <div className="bg-[#144f36] rounded-t-2xl p-5 flex justify-between items-center shadow-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700 pointer-events-none"></div>
          
          <div className="flex items-center relative z-10">
            <div className="w-1.5 h-7 bg-white/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
            <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">Application Setting</h2>
          </div>
          
          <div className="flex gap-2 relative z-10">
            <button 
              onClick={handleUpdateAll}
              className="bg-white hover:bg-slate-50 text-[#144f36] px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2 hover:shadow hover:-translate-y-0.5"
            >
              Update Everything
            </button>
          </div>
        </div>
        
        {fetching ? (
          <div className="p-12 text-center text-slate-500 font-medium">Loading settings from server...</div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 h-full min-h-0 bg-[#f0f4f8]">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-[250px] flex-shrink-0 flex flex-col">
              <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden flex-1">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-5 py-4 text-[13px] border-b border-slate-100 last:border-b-0 transition-colors ${
                      activeTab === tab 
                        ? 'bg-[#1450a3] text-white font-medium' // Blue highlight from screenshots
                        : 'bg-[#f6f9fc] text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col h-full">
              <div className="px-6 py-4 border-b-2 border-[#16b1e6] bg-white flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-700">{activeTab}</h3>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="w-full">
                  {renderTabContent()}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
                <button 
                  onClick={handleUpdate}
                  disabled={loading}
                  className="bg-[#144f36] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#0f3d2a] transition-all shadow-sm disabled:opacity-50"
                >
                  {loading ? 'Saving...' : `Update Setting`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
