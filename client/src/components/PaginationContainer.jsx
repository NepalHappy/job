import { useLocation, useNavigate } from 'react-router-dom'
import { useAllJobsContext } from '../pages/AllJobs'

const PaginationContainer = () => {
  const { data } = useAllJobsContext()
  const { jobs, totalJobs, numOfPages, currentPage } = data.data

  const navigate = useNavigate()

  const { search, pathname } = useLocation()

  const pages = Array.from({ length: numOfPages }, (v, index) => {
    return index + 1
  })

  const handlePageChange = (page) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', page)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButtons = ({ page, activeClass }) => {
    return (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300 ' : ''
        }`}
      >
        {page}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []

    //first page
    pageButtons.push(addPageButtons({ page: 1, activeClass: currentPage == 1 }))

    //dots
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      )
    }

    if (currentPage > 2) {
      pageButtons.push(
        addPageButtons({ page: currentPage - 1, activeClass: false })
      )
    }

    //current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(addPageButtons({ page: currentPage, activeClass: true }))
    }

    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButtons({ page: currentPage + 1, activeClass: false })
      )
    }
    //dots
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>
      )
    }
    //last page
    pageButtons.push(
      addPageButtons({
        page: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    )

    return pageButtons
  }

  if (numOfPages > 1) {
    return (
      <div className="flex justify-end mt-6">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = currentPage - 1
            if (prevPage < 1) prevPage = numOfPages
            handlePageChange(prevPage)
          }}
        >
          Prev
        </button>

        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = currentPage + 1
            if (nextPage > numOfPages) nextPage = 1
            handlePageChange(nextPage)
          }}
        >
          Next
        </button>
      </div>
    )
  } else {
  }
}
export default PaginationContainer
