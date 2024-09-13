import propTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const Container = ({ children, className }) => {
  return (
    <article className={twMerge('bg-white min-h-[300px] p-4', className)}>{children}</article>
  )
}

Container.propTypes = {
  children: propTypes.oneOfType([propTypes.array, propTypes.object]),
  className: propTypes.string
}

export default Container