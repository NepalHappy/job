import { useAllDashboardContext } from '../pages/DashboardLayout'
import { FaUserCircle } from 'react-icons/fa'
const LogoutContainer = () => {
  const { logoutUser, user } = useAllDashboardContext()
  return (
    <div className="flex justify-center items-center ">
      <span>Hello {user.name}</span>
      {user.avatar ? (
        <img src={user.avatar} alt="image" className="w-6 h-6 rounded-lg" />
      ) : (
        <FaUserCircle />
      )}

      <button onClick={logoutUser} className="btn btn-ghost">
        Logout
      </button>
    </div>
  )
}
export default LogoutContainer
