import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await api.get('/tasks')
        setTasks(res.data)
      } catch (err) {
        setError('Failed to load tasks')
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  if (loading) return <p>Loading tasks...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              {/* Add edit/delete buttons here if needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
