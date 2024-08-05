import { StatusCodes } from 'http-status-codes'
import Job from '../models/JobModel.js'
import { NotFoundError, UnauthenticatedError } from '../errors/customErrors.js'

export const createJob = async (req, res) => {
  const { userId } = req.user
  req.body.createdBy = userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.OK).json({ msg: job })
}

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query
  const { userId } = req.user

  const queryObject = {
    createdBy: userId,
  }

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ]
  }

  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'location',
    'z-a': '-location',
  }

  const sortKey = sortOptions[sort] || sortOptions.newest

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit)
  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)
  //if (!jobs) throw new NotFoundError(`No Job Found`)
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs })
}

export const getJob = async (req, res) => {
  const { id } = req.params
  // if (!id) throw new NotFoundError(`No Job with ${id}`)
  const job = await Job.findById({ _id: id })
  res.status(StatusCodes.OK).json({ job: job })
}
export const updateJob = async (req, res) => {
  const { userId } = req.user
  const { id } = req.params
  // if (!id) throw new NotFoundError(`No Job with ${id}`)
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(StatusCodes.OK).json({ msg: updatedJob })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  //if (!id) throw new NotFoundError(`No Job with ${id}`)
  const deleteJob = await Job.findByIdAndDelete({ _id: id })
  res.status(StatusCodes.OK).json({ msg: 'Job Deleted' })
}
