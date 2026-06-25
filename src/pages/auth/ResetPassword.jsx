import { useEffect, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../store/AuthContext'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      setStatus('Invalid or missing reset token.')
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) return
    setLoading(true); setTimeout(() => setLoading(false), 2000)
    setStatus('')
    try {
      await resetPassword({ token, password })
      setStatus('Password reset successful. Redirecting to login...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setStatus('Unable to reset password at this time.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-36 -left-24 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute -bottom-28 -right-10 w-80 h-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-3xl w-full rounded-2xl border border-white/10 bg-slate-950/85 p-6 shadow-2xl">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Reset password</h2>
            <p className="text-slate-600 dark:text-slate-400">Choose a strong password. You'll be redirected to sign in after a successful reset.</p>
            <div className="mt-4 text-sm">
              <Link to="/login" className="text-slate-800 dark:text-slate-200 hover:underline">Back to sign in</Link>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full rounded-xl p-3 bg-slate-900 border border-slate-800 text-slate-100" />
              <button disabled={loading} className="w-full rounded-xl bg-fuchsia-500 px-4 py-3 text-white disabled:opacity-60">{loading ? 'Updating...' : 'Set new password'}</button>
            </form>

            {status && <div className="mt-4 rounded-lg bg-slate-900/60 p-3 text-sm text-slate-200">{status}</div>}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
