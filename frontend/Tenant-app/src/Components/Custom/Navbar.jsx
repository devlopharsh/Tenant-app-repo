import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow bg-white">
      <h1 className="text-xl font-bold">TaskManager</h1>
      <div>
        <Link to="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>
        <Link to="/tasks">
          <Button variant="ghost">Tasks</Button>
        </Link>
      </div>
    </nav>
  )
}
