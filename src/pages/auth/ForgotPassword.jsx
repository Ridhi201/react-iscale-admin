import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const { forgotPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      await forgotPassword(email)
      setStatus('If that email exists, a reset link was sent.')
      setTimeout(() => navigate('/login'), 2500)
    } catch (err) {
      setStatus('Unable to contact server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-36 -left-24 w-96 h-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 grid max-w-4xl gap-8 rounded-2xl border border-white/10 bg-slate-950/85 p-6 shadow-2xl lg:grid-cols-[1fr_0.9fr]">
        <div className="p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-2">Forgot password?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-5">Provide your admin email and we'll send a secure link to reset your password. The link will expire for security.</p>

          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>• Secure one-time reset token</li>
            <li>• Link expires after short time</li>
            <li>• Contact support if you don't receive email</li>
          </ul>

          <div className="mt-6 text-sm">
            <Link to="/login" className="text-slate-800 dark:text-slate-200 hover:underline">Back to sign in</Link>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-slate-600 dark:text-slate-400">Admin email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@iscale.com" className="w-full rounded-xl p-3 bg-slate-900 border border-slate-800 text-slate-100" />

            <button disabled={loading} className="w-full rounded-xl bg-fuchsia-500 px-4 py-3 text-white disabled:opacity-60">{loading ? 'Sending...' : 'Send reset link'}</button>
          </form>

          {status && <div className="mt-4 rounded-lg bg-slate-900/60 p-3 text-sm text-slate-200">{status}</div>}
        </div>
      </motion.div>
    </div>
  )
}
