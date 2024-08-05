import { NavLink } from 'react-router-dom'
import links from '../utils/links'
import Logo from './Logo'
import { FaBarsStaggered } from 'react-icons/fa6'
import NavLinks from './NavLinks'
import { useAllDashboardContext } from '../pages/DashboardLayout'
import LogoutContainer from './LogoutContainer'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  return (
    <nav className="bg-base-200">
      <div className="navbar">
        <div className="navbar-start">
          <Logo />
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="w-6 h-6" />
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
              >
                <NavLinks />
              </ul>
            </label>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex justify-end">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          <LogoutContainer />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
