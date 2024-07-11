import Navigation from "components/Navigation/Navigation"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

const Header = () => {

  return (
    <>
      <Navigation />
      <main className="mx-auto w-[95%] xl:w-[75%] text-secondary py-2">
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

export default Header