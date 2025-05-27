import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardHeader, CardTitle, CardContent } from '../Components/ui/card'
import { Loader2 } from 'lucide-react'
import { Button } from '../Components/ui/button'
import '../App.css'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const taskURL = import.meta.env.TASKURL
        console.log('TASKURL:', taskURL)
        const res = await axios.get(`${taskURL}/tasks/`)
        setStats(res.data)
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to load stats'
        setError(message)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen min-w-screen   ">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen  min-w-screen   flex flex-col items-center py-20 bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">📊 Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <Card className="shadow-lg rounded-2xl duration-200 hover:scale-105 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-xl text-gray-700">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-3xl font-bold text-blue-600">{stats.totalTasks}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl duration-200 hover:scale-105 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-xl text-gray-700">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-3xl font-bold text-green-600">{stats.completedTasks}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl duration-200 hover:scale-105 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-xl text-gray-700">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-3xl font-bold text-red-600">{stats.overdueTasks}</p>
          </CardContent>
        </Card>
      </div>


    </div>
  )
}
