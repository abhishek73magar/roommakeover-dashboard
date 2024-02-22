import PopIcon from 'components/Common/PopIcon'
import React from 'react'
import { BsChatLeftText } from "react-icons/bs";

const Chat = () => {
  return (
    <div>
      <PopIcon icon={<BsChatLeftText className='text-xl' />} value={0} />
    </div>
  )
}

export default Chat