import { Logo } from '../components'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div>
      <nav className="w-[90vw] max-w-[1120px]  h-[6rem]  flex  items-center my-0 mx-auto">
        <Logo />
      </nav>
      <div className=" grid place-items-center lg:grid-cols-2 gap-x-0.5   bg-gray-200 ">
        <div className="info my-0 mx-auto">
          <h1 className="font-bold mb-1 text-5xl">Job Tracking App </h1>
          <p className="leading-8 text-gray-400 mb-1.5 max-w-[36em]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quas
            aperiam debitis ea. Modi laborum voluptate inventore magnam, totam
            aperiam!
          </p>
          <Link to="/register" className="btn bg-teal-600 mr-5  text-white">
            Register
          </Link>
          <Link to="/login" className="btn  bg-teal-600 text-white">
            Login
          </Link>
        </div>
        <img src={main} className="hidden md:block w-[600px] h-[28rem] p-4 " />
      </div>
    </div>
  )
}
export default Landing
