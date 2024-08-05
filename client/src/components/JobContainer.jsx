import { useAllJobsContext } from '../pages/AllJobs'
import Job from './Job'

const JobContainer = () => {
  const response = useAllJobsContext()
  const lists = response.data.data.jobs
  if (lists.length === 0) {
    return <h2>No jobs to display...</h2>
  }
  return (
    <div className="flex flex-col flex-wrap gap-y-8 mt-8 bg-base-200 lg:flex-row lg:flex-wrap lg:align-items lg:py-15 ">
      {lists.map((list) => {
        return <Job key={list._id} {...list} />
      })}
    </div>
  )
}
export default JobContainer
