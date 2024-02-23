import PopIcon from 'components/Common/PopIcon'
import { BsChatLeftText } from "react-icons/bs";

const Chat = () => {
  return (
    <div>
      <PopIcon icon={<BsChatLeftText className='text-xl' />} value={0} title="Chat" />
    </div>
  )
}

export default Chat