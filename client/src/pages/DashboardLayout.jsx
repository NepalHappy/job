import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { Navbar, Loading } from '../components'
import { createContext, useContext, useEffect, useState } from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch.get('/user/getCurrentUser')
    return data
  },
}

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery)
  } catch (error) {
    return redirect('/')
  }
}

const DashboardContext = createContext()

const themes = {
  winter: 'winter',
  dracula: 'dracula',
}

const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme') || themes.winter
}

const DashboardLayout = ({ queryClient }) => {
  const data = useQuery(userQuery).data
  const { user } = data
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'
  const [theme, setTheme] = useState(getThemeFromLocalStorage())
  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logoutUser')
    queryClient.invalidateQueries()
    toast.success('Logging out...')
  }

  const toggleDarkTheme = () => {
    const { winter, dracula } = themes
    const newTheme = theme === winter ? dracula : winter

    setTheme(newTheme)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const [isDarkTheme, setIsDarkTheme] = useState(false)
  return (
    <DashboardContext.Provider
      value={{ user, logoutUser, toggleDarkTheme, isDarkTheme }}
    >
      <Navbar />
      {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
    </DashboardContext.Provider>
  )
}

export const useAllDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout
