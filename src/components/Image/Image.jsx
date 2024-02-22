import propTypes from 'prop-types'
import defaultImage from 'assets/default.png'
import { twMerge } from 'tailwind-merge'

const Image = ({defaultSrc, className, ...imgProps }) => {
  const __onError = (e) => { e.target.src = defaultSrc }
  return <img onError={__onError} className={twMerge('image-bg w-full min-h-[70px]', className)} {...imgProps} />
}

Image.propTypes = {
  defaultSrc: propTypes.oneOfType([ propTypes.string, propTypes.object]),
  className: propTypes.string,
}

Image.defaultProps = {
  defaultSrc: defaultImage,
  className: ''
}

export default Image