import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import '../App.css'
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [organizationName, setOrganizationName] = useState('')
  const [JoinOrgID, setJoinOrgID] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()


  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await api.post('/auth/register', { name, email, password, organizationName, joinOrgID: JoinOrgID })
      toast.success('Registration successful! Please login.')
      navigate('/login')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 w-[100vw]">
      <ToastContainer className='absolute top-2.5 right-2.5' />
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">Create an Account</CardTitle>
          <p className="text-center text-sm text-gray-500">Join us by filling the details below</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="mt-1"
              />
            </div>

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
                placeholder="Choose a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="organizaionName">OrganisationName</Label>
              <Input
                id="organizaionName"
                type="text"
                placeholder="Enter organisation"
                value={organizationName}
                onChange={e => setOrganizationName(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="JoinOrgID">OrganisationName</Label>
              <Input
                id="JoinOrgID"
                type="text"
                placeholder="Enter organisation ID "
                value={JoinOrgID}
                onChange={e => setJoinOrgID(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <Button type="submit" className="w-full">
              Register
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>Login here</span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
