import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { Form, Link } from 'react-router-dom'

day.extend(advancedFormat)
const Job = ({ _id, position, location, createdAt, jobStatus, jobType }) => {
  const date = day(createdAt).format('MMM Do, YYYY')
  return (
    <div className="card  bg-base-100 w-96 shadow-xl mt-5 ml-5 flex  mb-10">
      <div className="card-body">
        <h2 className="card-title">
          <span className="text-xl font-normal">Position:</span>
          {position}
        </h2>
        <h2 className="card-title">
          <span className="text-xl font-normal">Location:</span>
          {location}
        </h2>
        <h2 className="card-title">
          <span className="text-xl font-normal">Job Status:</span>
          {jobStatus}
        </h2>
        <h2 className="card-title">
          <span className="text-xl font-normal">Job Type:</span>
          {jobType}
        </h2>
        <h2 className="card-title">
          <span className="text-xl font-normal">Date:</span>
          {date}
        </h2>
      </div>
      <div className="card-actions justify-end p-4">
        <Link className="btn btn-neutral" to={`../editJob/${_id}`}>
          Edit
        </Link>
        <Form action={`../deleteJob/${_id}`} method="POST">
          <button className="btn btn-neutral">Delete</button>
        </Form>
      </div>
    </div>
  )
}
export default Job
