import { Form, Link, useSubmit } from 'react-router-dom'
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import SubmitBtn from './SubmitBtn'
import { useAllJobsContext } from '../pages/AllJobs'

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext()
  const { search, jobStatus, jobType, sort } = searchValues
  const submit = useSubmit()
  const debounce = (onChange) => {
    let timeout
    return (e) => {
      const form = e.currentTarget.form
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        onChange(form)
      }, 2000)
    }
  }
  return (
    <div className="bg-base-200">
      <h2 className="text-2xl text-center">Search Form</h2>
      <Form className=" rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3  items-center">
        <FormInput
          name="search"
          type="text"
          label="Search"
          defaultValue={search}
          onChange={debounce((form) => {
            submit(form)
          })}
        />
        <FormSelect
          name="jobStatus"
          label="Job Status"
          list={['all', ...Object.values(JOB_STATUS)]}
          defaultValue={jobStatus}
          onChange={(e) => {
            submit(e.currentTarget.form)
          }}
        />
        <FormSelect
          name="jobType"
          label="Job Type"
          list={['all', ...Object.values(JOB_TYPE)]}
          defaultValue={jobType}
          onChange={(e) => {
            submit(e.currentTarget.form)
          }}
        />
        <FormSelect
          name="sort"
          label="Sort"
          list={[...Object.values(JOB_SORT_BY)]}
          onChange={(e) => {
            submit(e.currentTarget.form)
          }}
          defaultValue={sort}
        />

        <Link className="btn btn-primary" to="/dashboard/allJobs">
          Reset Search Values
        </Link>
      </Form>
    </div>
  )
}
export default SearchContainer
