import propTypes from 'prop-types'

const HomepageCard = ({ name, prefix, value, icon }) => {
  return (
    <div className="flex flex-row justify-between items-center bg-white p-5 flex-1" >
    <div className="flex flex-col gap-2 justify-between items-start">
      <div className="text-2xl font-bold">{prefix ?? ''} {value}</div>
      <div className="text-sm">{name}</div>
    </div>
    <div className="text-5xl text-primary">
    {icon}
    </div>
  </div>
  )
}


HomepageCard.propTypes = {
  name: propTypes.string,
  prefix: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  icon: propTypes.object
}

HomepageCard.defaultProps = {
  prefix: null
}
export default HomepageCard