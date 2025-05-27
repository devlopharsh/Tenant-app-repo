import React, { useState } from 'react'
import api from '../api/api'

export default function Invite() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await api.post('/invite', { email })
      setMessage(`Invite sent to ${email}`)
      setError(null)
      setEmail('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send invite')
      setMessage('')
    }
  }

  return (
    <div>
      <h1>Invite User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Invite</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
