import { NavLink } from 'react-router-dom'
const links = [
  { id: 1, url: '', text: 'AddJob' },
  { id: 2, url: 'profile', text: 'profile' },
  { id: 3, url: 'allJobs', text: 'allJob' },
]

const NavLinks = () => {
  return links.map((link) => {
    const { text, url, id } = link
    return (
      <li key={id}>
        <NavLink className=" nav-link capitalize" to={url}>
          {text}
        </NavLink>
      </li>
    )
  })
}
export default NavLinks
