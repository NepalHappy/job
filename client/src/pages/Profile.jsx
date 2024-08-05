import { Form, redirect } from 'react-router-dom'
import { FormInput, FormSelect, FormFile } from '../components'
import { useAllDashboardContext } from './DashboardLayout'
import SubmitBtn from '../components/SubmitBtn'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    // const data = Object.fromEntries(formData)
    const file = formData.get('avatar')
    if (file && file.size > 500000) {
      toast.error('Image size too large')
      return null
    }
    try {
      await customFetch.patch('/user/updateUser', formData)
      queryClient.invalidateQueries(['user'])
      toast.success('Profile Update')
      return redirect('/dashboard')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.msg)
      return null
    }
  }

const Profile = () => {
  const { user } = useAllDashboardContext()
  const { name, email } = user
  return (
    <div className="grid place-items-center h-screen">
      <Form
        className="card w-96 shadow=lg bg-base-200 px-8 flex flex-col gap-y-4"
        method="post"
        encType="multipart/form-data"
      >
        <h4 className="text-3xl text-center p-5">Profile</h4>
        <FormInput type="text" name="name" defaultValue={name} label="name" />
        <FormInput
          type="text"
          name="email"
          defaultValue={email}
          label="email"
        />
        <FormFile
          type="file"
          name="avatar"
          id="avatar"
          label="File Upload"
          accept="image/*"
        />
        <SubmitBtn text="Update" />
      </Form>
    </div>
  )
}
export default Profile
