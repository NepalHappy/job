import { Form, redirect } from 'react-router-dom'
import FormInput from '../components/FormInput'
import SubmitBtn from '../components/SubmitBtn'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      await customFetch.post('/auth/loginUser', data)
      queryClient.invalidateQueries()
      toast.success('Login Successful')
      return redirect('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

const Login = () => {
  return (
    <div className="grid place-items-center h-screen">
      <Form
        method="POST"
        className="card bg-base-100 w-96 shadow-lg p-8 flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" name="email" label="email" />
        <FormInput type="password" name="password" label="password" />
        <SubmitBtn text="Login" />
      </Form>
    </div>
  )
}
export default Login
