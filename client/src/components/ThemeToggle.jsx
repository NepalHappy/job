import { BsSunFill, BsMoonFill } from 'react-icons/bs'
import { useAllDashboardContext } from '../pages/DashboardLayout'

const ThemeToggle = () => {
  const { toggleDarkTheme } = useAllDashboardContext()
  return (
    <div>
      <label className="swap swap-rotate">
        <input type="checkbox" onClick={toggleDarkTheme} />
        <BsSunFill className="swap-on` w-4 h-4" />
        <BsMoonFill className="swap-off w-4 h-4" />
      </label>
    </div>
  )
}
export default ThemeToggle
