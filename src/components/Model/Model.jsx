import propTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const Model = ({ children, slug, className }) => {
  const navigate = useNavigate()
  const modelRef = useRef()

  useEffect(() => {
    const handle = (e) => {
      if(!modelRef.current?.contains(e.target)) navigate(slug)
    }

    window.addEventListener('mousedown', handle)
    return () => window.removeEventListener('mousedown', handle)

  }, [])


  return (
    <section className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-2 px-2 flex flex-col justify-center items-center">
      <article ref={modelRef} className={twMerge("bg-white min-w-[500px] min-h-[200px] rounded-md overflow-hidden", className)}>
        {children}
      </article>
    </section>
  )
}


Model.propTypes = {
  children: propTypes.any,
  slug: propTypes.string,
  className: propTypes.string
}

export default Model