import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container';
import { PiNewspaperLight } from "react-icons/pi";

const Pages = () => {
  return (
    <section className='my-2'>
      <BreadHeader icon={<PiNewspaperLight />} title="Pages" subtitle="Page details are here." />
      
      <br />
      <Container>

      </Container>
    </section>
  )
}

export default Pages