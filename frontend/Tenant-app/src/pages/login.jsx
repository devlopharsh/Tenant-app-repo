import React, { useState, useContext } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { ToastContainer, toast } from 'react-toastify'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)  // ✅ Use login from context
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(email, password) // ✅ Use context login to set user
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please check your credentials.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 w-[100vw]">
      <ToastContainer className='absolute top-2.5 right-2.5' />
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">Welcome Back</CardTitle>
          <p className="text-center text-sm text-gray-500">Please login to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button type="submit" className="w-full">
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Don’t have an account? <span onClick={()=>{navigate('/register')}} className="text-blue-600 cursor-pointer">Register here</span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
