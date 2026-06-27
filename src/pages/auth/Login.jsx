import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'
import {
  motion,
  AnimatePresence,
} from 'framer-motion'

import {
  ShieldAlert,
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  User,
  Phone,
} from 'lucide-react'

import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { useAuth } from '../../store/AuthContext'

export default function Login() {
  const navigate = useNavigate()

  const location = useLocation()

  const {
    login,
    isAuthenticated,
  } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState('')

  const from =
    location.state?.from?.pathname || '/'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  // LOGIN
  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')
    setLoading(true); 

    try {
      console.log("LOGIN STARTED")

      const isSuccess = await login({ email, password })

      if (isSuccess) {
        console.log("LOGIN SUCCESS")
        setSuccess('Login Successful')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      console.log("LOGIN FAILED")
      console.log(err)
      setError(err?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-emerald-50/40 via-white to-slate-100/50 text-slate-800 overflow-hidden relative">

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#144f36]/10 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-[1040px] relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[2.5rem] overflow-hidden border border-slate-200/80 shadow-2xl bg-white dark:bg-[#13111c] dark:border-slate-800/80">

          {/* LEFT */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#144f36] to-[#0f3d2a] border-r border-slate-200 dark:border-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-500/20 rounded-full blur-[80px]" />
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300 font-medium">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                The iScale LMS Platform
              </div>

              <h1 className="text-5xl font-bold leading-tight text-white">
                Manage your digital ecosystem seamlessly.
              </h1>

              <p className="text-emerald-100/80 text-lg leading-relaxed">
                Access your personalized admin
                console to oversee courses,
                registrations, and analytics.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-[#13111c]">
            <div className="w-full max-w-md mx-auto space-y-8">

              <div>
                <h2 className="text-3xl font-bold text-[#144f36] dark:text-emerald-400 tracking-tight">
                  Welcome Back
                </h2>

                <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  Enter your credentials
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key="login"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* EMAIL */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>

                    <div className="relative mt-2">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(
                            e.target.value
                          )
                        }
                        placeholder="admin@gmail.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 dark:bg-[#181622]/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>

                    <div className="relative mt-2">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />

                      <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 dark:bg-[#181622]/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* ERROR */}
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 text-sm">
                      {error}
                    </div>
                  )}

                  {/* SUCCESS */}
                  {success && (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 text-sm">
                      {success}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#144f36] text-white font-bold tracking-tight hover:bg-[#0f3d2a] shadow-md hover:shadow-lg hover:shadow-emerald-950/20 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Sign In Securely'}

                    {!loading && (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </button>

                </motion.form>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}