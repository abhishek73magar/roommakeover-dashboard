import { createHashRouter } from "react-router-dom";
import Header from "./Header";

import Homepage from "pages/Homepage/Homepage";
import Products from "pages/Products/Products";
import Blog from "pages/Blog/Blog";
import Customers from "pages/Customers/Customers";
import Pages from "pages/Pages/Pages";
import Category from "pages/Products/Category/Category";
import HobbieList from "pages/Products/Hobbie/HobbieList/HobbieList";
import Orders from "pages/Homepage/Orders/Orders";
import HobbieProduct from "pages/Products/Hobbie/HobbieProduct/HobbieProduct";
import DIYPage from "pages/Products/DIY/DIYPage";
import OrderInfo from "pages/Homepage/Orders/OrderInfo";
import CreateProduct from "pages/Products/CreateProduct";
import UpdateProduct from "pages/Products/UpdateProduct";
import CreateCategory from "pages/Products/Category/CreateCategory";
import UpdateCategory from "pages/Products/Category/UpdateCategory";
import CreateHobbieList from "pages/Products/Hobbie/HobbieList/CreateHobbieList";
import UpdateHobbieList from "pages/Products/Hobbie/HobbieList/UpdateHobbieList";
import CreateHobbieProduct from "pages/Products/Hobbie/HobbieProduct/CreateHobbieProduct";
import UpdateHobbieProduct from "pages/Products/Hobbie/HobbieProduct/UpdateHobbieProduct";
import CreateDIY from "pages/Products/DIY/CreateDIY";
import UpdateDIY from "pages/Products/DIY/UpdateDIY";
import CreateBlog from "pages/Blog/CreateBlog";
import UpdateBlog from "pages/Blog/UpdateBlog";
import Slider from "pages/Pages/Slider/Slider";
import CreateSlider from "pages/Pages/Slider/CreateSlider";
import Profile from "pages/Setting/Profile/Profile";
import CreateProfile from "pages/Setting/Profile/CreateProfile";
import UpdateProfile from "pages/Setting/Profile/UpdateProfile";
import Customization from "pages/Products/Customization/Customization";
import Login from "pages/Login/Login";
import { auth } from "libs/auth";
import Media from "pages/Pages/Media/Media";
import AddMedia from "pages/Pages/Media/AddMedia";


export const router = createHashRouter([
  {
    path: "/",
    element: <Header />,
    loader: auth,
    children: [
      { 
        path: "/home",
        children: [
          { path: "", element: <Homepage /> },
          { 
            path: "orders",
            children: [
              { path: "", element: <Orders />},
              { path: ":collection_id", element: <OrderInfo />},
            ]
          }
        ]
      },
      {
        path: "/products",
        children: [
          { path: "", element: <Products /> },
          { path: "product", element: <Products /> },
          { path: "product/create", element: <CreateProduct /> },
          { path: "product/update", element: <UpdateProduct /> },

          { path: "category", element: <Category /> },
          { path: "category/create", element: <CreateCategory /> },
          { path: "category/update", element: <UpdateCategory /> },

          { path: "hobbie-list", element: <HobbieList /> },
          { path: "hobbie-list/create", element: <CreateHobbieList /> },
          { path: "hobbie-list/update", element: <UpdateHobbieList /> },

          { path: "hobbie-product", element: <HobbieProduct /> },
          { path: "hobbie-product/create", element: <CreateHobbieProduct /> },
          { path: "hobbie-product/update", element: <UpdateHobbieProduct /> },

          { path: "diy", element: <DIYPage /> },
          { path: "diy/create", element: <CreateDIY /> },
          { path: "diy/update", element: <UpdateDIY /> },

          { path: "customization", element: <Customization /> },
        ]
      },
      {
        path: "/blog",
        children: [
          { path: "", element: <Blog /> },
          { path: "create", element: <CreateBlog />},
          { path: "update", element: <UpdateBlog />}
        ]
      },
      {
        path: "/customers",
        children: [
          { path: "", element: <Customers /> },
        ]
      },
      {
        path: "/pages",
        children: [
          { path: "", element: <Slider /> },
          { path: 'slider/create', element: <CreateSlider />},
          { path: 'banner', element: <Pages />},
          { path: 'media', element: <Media />},
          { path: 'media/add', element: <AddMedia />},
          
        ]
      },
      {
        path: "/setting",
        children: [
          { path: "", element: <Profile /> },
          { path: "profile/create", element: <CreateProfile />},
          { path: "profile/update", element: <UpdateProfile />},
          { path: "order-email", element: <Pages /> },
        ]
      },
    ]
  }, {
    path: "/login",
    loader: auth,
    element: <Login />
  }
])