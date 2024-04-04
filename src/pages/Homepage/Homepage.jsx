import Container from "components/Common/Container";
import HomepageCard from "components/Common/HomepageCard";
import { infoApi } from "libs/api";
import { CiShop, CiShoppingBasket } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { PiNewspaperClippingLight } from "react-icons/pi";

const homeList = [
  { name: "Total Order", value: 50000, icon: <CiShoppingBasket />, key: "orders" },
  { name: "Total Product", value: 100, icon: <CiShop />, key: "products" },
  { name: "Total Customer", value: 10, icon: <FiUsers />, key: "customers" },
  { name: "Total Blog", value: 5, icon: <PiNewspaperClippingLight />, key: "blogs" },
]
const Homepage = () => {
  const { data, isLoading } = infoApi.home()
  
  return (
    <section>
      <article className="flex flex-row justify-start item-center gap-5 w-full flex-wrap">
        {homeList.map((item, indx) => {
          let value = 'None'
          if(!isLoading && data) value = data[item.key]
          return <HomepageCard key={indx} name={item.name} value={value} icon={item.icon}  />
        })}
      </article>

      <br />
      <Container className="h-[490px]">

      </Container>
      
    </section>
  )
}

export default Homepage