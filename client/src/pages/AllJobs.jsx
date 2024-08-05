import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import {
  JobContainer,
  PaginationContainer,
  SearchContainer,
} from '../components'
import { useContext, createContext } from 'react'
import { useQuery } from '@tanstack/react-query'
const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params
  return {
    queryKey: [
      'jobs',
      search ?? '',
      jobStatus ?? 'all',
      jobType ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const data = await customFetch.get('jobs/getAllJobs', { params })
      return data
    },
  }
}

const AllJobsContext = createContext()

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    await queryClient.ensureQueryData(allJobsQuery(params))
    return { searchValues: { ...params } }
  }

const AllJobs = () => {
  const { searchValues } = useLoaderData()
  const { data } = useQuery(allJobsQuery(searchValues))
  const { numOfPages } = data

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobContainer />
      {<PaginationContainer />}
    </AllJobsContext.Provider>
  )
}
export const useAllJobsContext = () => useContext(AllJobsContext)
export default AllJobs
