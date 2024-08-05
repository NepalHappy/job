import { Form, Link, redirect } from 'react-router-dom'
import { FormInput, FormSelect } from '../components'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import SubmitBtn from '../components/SubmitBtn'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
      await customFetch.post('/jobs/createJob', data)
      queryClient.invalidateQueries(['jobs'])
      toast.success('Job Created')
      return redirect('/dashboard/allJobs')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

const AddJob = () => {
  return (
    <div className="grid place-items-center  h-screen">
      <h2 className="text-3xl">Add Job</h2>
      <Form method="POST" className="card w-96 shadow-lg p-8 bg-base-100">
        <FormInput name="position" type="text" />
        <FormInput name="location" type="text" />
        <FormSelect
          list={Object.values(JOB_STATUS)}
          name="jobStatus"
          defaultValue={JOB_STATUS.PENDING}
        />
        <FormSelect
          list={Object.values(JOB_TYPE)}
          name="jobType"
          defaultValue={JOB_TYPE.FULL_TIME}
        />
        <SubmitBtn text="Submit" />
      </Form>
    </div>
  )
}
export default AddJob
