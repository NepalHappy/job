import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { redirect } from 'react-router-dom'

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const { id } = params
    try {
      await customFetch.delete(`/jobs/deleteJob/${id}`)
      queryClient.invalidateQueries(['jobs'])
      toast.success('Job Deleted')
      return redirect('/dashboard/allJobs')
    } catch (error) {
      toast.error(error?.response?.data.msg)
      return error
    }
  }
const DeleteJob = () => {
  return <div>DeleteJob</div>
}
export default DeleteJob
