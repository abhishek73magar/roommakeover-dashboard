import { RxHome } from "react-icons/rx";
import { Link, useLocation } from 'react-router-dom';
import { BsShop } from "react-icons/bs";
import { CiGrid31, CiUser } from "react-icons/ci";
import { RiPagesLine } from "react-icons/ri";
import { PiGear } from "react-icons/pi";


const mainNav = [
  { name: "Home", icon: <RxHome />, path: "/home"},
  { name: "Products", icon: <BsShop />, path: "/products"},
  { name: "Blog", icon: <CiGrid31 />, path: "/blog"},
  { name: "Customers", icon: <CiUser />, path: "/customers"},
  { name: "Pages", icon: <RiPagesLine />, path: "/pages"},
  { name: "Setting", icon: <PiGear />, path: "/setting"},
]

const subLink = [
  { name: "Dashboard", path: "", parent: "/home" },
  { name: "orders", path: '/orders', parent: "/home" },
  { name: "Order Invoice", path: "/order-invoice", parent: "/home" },
  { name: "Payment Transanction", path: "/payment-transaction", parent: "/home"},

  { name: "Product", path: "", subpath: '/products/product', parent: '/products' },
  { name: "Category", path: "/category", parent: '/products' },
  { name: "Hobbie List", path: "/hobbie-list", parent: '/products' },
  { name: "Hobbie Product", path: "/hobbie-product", parent: '/products' },
  { name: "Diy", path: "/diy", parent: '/products' },
  { name: "Customization", path: "/customization", parent: '/products' },

  { name: "Slider", path: '', subpath: '/pages/slider', parent: '/pages'},
  { name: "Banner", path: '/banner', subpath: '/pages/slider', parent: '/pages'},
  { name: "Media", path: '/media', subpath: '/pages/media', parent: '/pages'},

  { name: "Profile", path: '', subpath: "/setting/profile", parent: "/setting"},
  { name: "Email Configuration", path: '/email-configuration', parent: "/setting"},
]

const Subnavbar = () => {
  const location = useLocation()

  return (
    <nav className='text-sm'>
      <div className='flex flex-row justify-start items-center'>
        {mainNav.map((item, indx) => {
          const active = (item.path === '' && location.pathname === '/') ? true : (item.path === '') ? false : location.pathname.includes(item.path)
          return (
            <Link to={`${item.path}`} key={indx} className={`flex flex-row justify-center items-center gap-2 rounded-t-md p-4 ${active ? 'bg-white' : ""}`}>
              <span>
                {item.icon}
              </span>
              <span className='capitalize'>{item.name}</span>
            </Link>
          )
        })}
      </div>
      <div className='flex flex-row justify-start items-center bg-white overflow-auto'>
        {subLink
        .filter(({ parent }) => {
          const pathname = location.pathname;
          if(pathname.length === 1 && pathname === '/' && parent === '') return true;
          return pathname.includes(parent)
        })
        .map((item, indx) => {
          const path = item.parent + item.path;
          let active = (item.path === '') ? item.parent === location.pathname || location.pathname.includes(item.subpath) :  location.pathname.includes(path)
          return (
            <Link to={path} key={indx} className={`capitalize px-4 py-4 ${active ? 'text-primary' : ""}`}>
              {item.name}
            </Link>
          )
        })}
      </div>
      

    </nav>
  )
}

export default Subnavbar