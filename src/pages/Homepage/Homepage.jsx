import Container from "components/Common/Container";
import { CiShoppingBasket } from "react-icons/ci";


const Homepage = () => {
  return (
    <section>
      <article className="flex flex-row justify-start item-center gap-5 w-full flex-wrap">
        {Array(4).fill().map((item, indx) => {
          return(
            <div className="flex flex-row justify-between items-center bg-white p-5 flex-1" key={indx}>
              <div className="flex flex-col gap-2 justify-between items-start">
                <div className="text-lg font-bold">50,000</div>
                <div className="text-sm">Total Orders</div>
              </div>
              <div>
                <CiShoppingBasket className="text-5xl text-primary" />
              </div>
            </div>
          )
        })}
      </article>

      <br />
      <Container className="h-[490px]">

      </Container>
      
    </section>
  )
}

export default Homepage