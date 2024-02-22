import PopIcon from "components/Common/PopIcon"
import { IoIosNotificationsOutline } from "react-icons/io";

const Notification = () => {
  return (
    <div>
      <PopIcon icon={<IoIosNotificationsOutline />} value={5} />
    </div>
  )
}

export default Notification