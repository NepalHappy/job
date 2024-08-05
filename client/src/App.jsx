import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  AddJob,
  EditJob,
  DeleteJob,
  Register,
  Login,
  DashboardLayout,
  HomeLayout,
  Landing,
  Error,
  Admin,
  AllJobs,
  Profile,
} from './pages'
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as jobAction } from './pages/AddJob'
import { action as editAction } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'
import { action as profileAction } from './pages/Profile'

import { loader as jobLoader } from './pages/AllJobs'
import { loader as editLoader } from './pages/EditJob'
import { loader as dashboardLoader } from './pages/DashboardLayout'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      { path: 'register', element: <Register />, action: registerAction },
      { path: 'login', element: <Login />, action: loginAction(queryClient) },
      {
        path: 'dashboard',
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),

        children: [
          { index: true, element: <AddJob />, action: jobAction(queryClient) },
          {
            path: 'allJobs',
            element: <AllJobs />,
            loader: jobLoader(queryClient),
          },
          {
            path: 'editJob/:id',
            element: <EditJob />,
            loader: editLoader(queryClient),
            action: editAction(queryClient),
          },
          {
            path: 'deleteJob/:id',
            element: <DeleteJob />,
            action: deleteJobAction(queryClient),
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction(queryClient),
          },
        ],
      },
    ],
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
