import { FormInput, FormSelect } from '../components'
import SubmitBtn from '../components/SubmitBtn'
import { JOB_STATUS } from '../../../utils/constants'
import { JOB_TYPE } from '../../../utils/constants'
import { Form, redirect, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { useQuery } from '@tanstack/react-query'

const singleJobQuery = (id) => {
  return {
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/getJob/${id}`)
      return data
    },
  }
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params

    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id))
      return params.id
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const { id } = params
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
      await customFetch.patch(`/jobs/updateJob/${id}`, data)
      queryClient.invalidateQueries(['jobs'])
      toast.success('Edit Successfully')
      return redirect('/dashboard/allJobs')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

const EditJob = () => {
  const id = useLoaderData()
  const {
    data: { job },
  } = useQuery(singleJobQuery(id))
  //console.log(job)

  return (
    <div className="grid place-items-center  h-screen">
      <Form
        className="card w-96 shadow-lg p-8 bg-base-100 flex gap-y-4"
        method="POST"
      >
        <FormInput name="position" type="text" defaultValue={job.position} />
        <FormInput name="location" type="text" defaultValue={job.location} />
        <FormSelect
          list={Object.values(JOB_STATUS)}
          name="jobStatus"
          defaultValue={job.jobStatus}
        />
        <FormSelect
          list={Object.values(JOB_TYPE)}
          name="jobType"
          defaultValue={job.jobType}
        />
        <SubmitBtn text="Submit" />
      </Form>
    </div>
  )
}
export default EditJob
