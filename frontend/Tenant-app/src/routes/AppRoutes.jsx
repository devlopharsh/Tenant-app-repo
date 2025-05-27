import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Tasks from '../pages/Task'
import Invite from '../pages/Invite'
import Home from '../pages/Home'
import PrivateRoute from '../components/PrivateRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />
      <Route
        path="/invite"
        element={
          <PrivateRoute>
            <Invite />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
