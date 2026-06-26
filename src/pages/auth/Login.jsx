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
    register,
    isAuthenticated,
  } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] =
    useState(false)

  const [mode, setMode] =
    useState('login')

  const [regName, setRegName] =
    useState('')

  const [regPhone, setRegPhone] =
    useState('')

  const [regPassword, setRegPassword] =
    useState('')

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
  // REGISTER
const handleRegister = async (e) => {

  e.preventDefault()

  setError('')
  setSuccess('')
  setLoading(true); 

  try {

    console.log("REGISTER STARTED")

    await register({

      admin_name: regName,

      email,

      password: regPassword,

      phone: regPhone,

    })

    console.log("REGISTER SUCCESS")

    // AUTO LOGIN
    const success = await login({

      email,

      password: regPassword,

    })

    if (success) {

      navigate('/')

    }

  } catch (err) {

    console.log(err)

    setError(
      err.message || 'Registration failed'
    )

  } finally {

    setLoading(false)

  }
}
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#020617] text-slate-100 overflow-hidden relative">

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[120px]" />

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
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#f6f6ff]/5 backdrop-blur-2xl">

          {/* LEFT */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-white/5 to-transparent border-r border-white/10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-sm text-fuchsia-300 font-medium">
                <Sparkles className="h-4 w-4" />
                The iScale LMS Platform
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                Manage your digital ecosystem seamlessly.
              </h1>

              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Access your personalized admin
                console to oversee courses,
                registrations, and analytics.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto space-y-8">

              <div>
                <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-300 font-bold tracking-tight">
                  {mode === 'login'
                    ? 'Welcome Back'
                    : 'Create Account'}
                </h2>

                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  {mode === 'login'
                    ? 'Enter your credentials'
                    : 'Create admin account'}
                </p>
              </div>

              {/* TOGGLE */}
              <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-[#f6f6ff]/5 border border-white/10">

                <button
                  type="button"
                  onClick={() =>
                    setMode('login')
                  }
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold ${
                    mode === 'login'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMode('register')
                  }
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold ${
                    mode === 'register'
                      ? 'bg-fuchsia-600 text-white'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Register
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={mode}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  onSubmit={
                    mode === 'login'
                      ? handleSubmit
                      : handleRegister
                  }
                  className="space-y-5"
                >

                  {mode === 'register' && (
                    <>

                      {/* NAME */}
                      <div>
                        <label className="text-sm text-slate-800 dark:text-slate-200">
                          Full Name
                        </label>

                        <div className="relative mt-2">
                          <User className="absolute left-4 top-4 h-5 w-5 text-slate-500 dark:text-slate-400" />

                          <input
                            type="text"
                            value={regName}
                            onChange={(e) =>
                              setRegName(
                                e.target.value
                              )
                            }
                            placeholder="Admin Name"
                            className="w-full pl-11 pr-4 py-3.5 bg-[#f6f6ff]/5 border border-white/10 rounded-xl text-white outline-none"
                            required
                          />
                        </div>
                      </div>

                      {/* PHONE */}
                      <div>
                        <label className="text-sm text-slate-800 dark:text-slate-200">
                          Phone
                        </label>

                        <div className="relative mt-2">
                          <Phone className="absolute left-4 top-4 h-5 w-5 text-slate-500 dark:text-slate-400" />

                          <input
                            type="number"
                            value={regPhone}
                            onChange={(e) =>
                              setRegPhone(
                                e.target.value
                              )
                            }
                            placeholder="9876543210"
                            className="w-full pl-11 pr-4 py-3.5 bg-[#f6f6ff]/5 border border-white/10 rounded-xl text-white outline-none"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* EMAIL */}
                  <div>
                    <label className="text-sm text-slate-800 dark:text-slate-200">
                      Email Address
                    </label>

                    <div className="relative mt-2">
                      <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-500 dark:text-slate-400" />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(
                            e.target.value
                          )
                        }
                        placeholder="admin@gmail.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#f6f6ff]/5 border border-white/10 rounded-xl text-white outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="text-sm text-slate-800 dark:text-slate-200">
                      Password
                    </label>

                    <div className="relative mt-2">
                      <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-500 dark:text-slate-400" />

                      <input
                        type="password"
                        value={
                          mode === 'login'
                            ? password
                            : regPassword
                        }
                        onChange={(e) =>
                          mode ===
                          'login'
                            ? setPassword(
                                e.target
                                  .value
                              )
                            : setRegPassword(
                                e.target
                                  .value
                              )
                        }
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#f6f6ff]/5 border border-white/10 rounded-xl text-white outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* ERROR */}
                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  {/* SUCCESS */}
                  {success && (
                    <div className="p-3 rounded-xl bg-green-500/10 text-green-400 text-sm">
                      {success}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#f6f6ff] dark:bg-[#1f1b2e] text-indigo-900 dark:text-indigo-300 font-bold tracking-tight font-bold hover:bg-slate-200 transition-all"
                  >
                    {loading
                      ? 'Processing...'
                      : mode === 'login'
                      ? 'Sign In Securely'
                      : 'Create Account'}

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