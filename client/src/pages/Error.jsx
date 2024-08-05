import { useRouteError, Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'

const Error = () => {
  const error = useRouteError()
  console.log(error)
  if (error.status === 404) {
    return (
      <div className="flex items-center justify-center flex-col min-h-screen text-center">
        <img src={img} alt="" className="max-w-[600px] w-[90vw] block" />
        <h3 className="mb-0.5">Page Not Found</h3>
        <p className="leading-6 mt-0.5 mb-1  text-gray-700">
          We cant seem to find the page you are looking for
        </p>
        <Link to="/">Back Home</Link>
      </div>
    )
  }

  return <div>Error</div>
}
export default Error
