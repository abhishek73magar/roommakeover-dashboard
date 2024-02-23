import proptTypes from 'prop-types'

const PopIcon = ({ icon, value, title  }) => {
  return (
      <div className="relative cursor-pointer hover:scale-110" title={title}>
        {Number(value) && value > 0 ? <div className="absolute -top-1.5 -right-1.5 h-[15px] w-[15px] bg-red-400 text-white flex flex-row items-center justify-center rounded-full px-2 py-2">
          <span className="absolute w-full h-full bg-red-500 animate-ping rounded-full bg-opacity-75"></span>
          <span style={{ fontSize: "10px"}}>{value}</span>
        </div> : null}
        <div className="text-2xl text-white">
          {icon}
        </div>
      </div>
  )
}

PopIcon.propTypes = {
  icon: proptTypes.object,
  value: proptTypes.number,
  title: proptTypes.string
}

export default PopIcon