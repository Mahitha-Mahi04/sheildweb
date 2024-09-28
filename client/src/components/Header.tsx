import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="w-screen px-10 h-16 bg-black/25 flex items-center justify-between">
        <span className="text-2xl font-semibold">Shield Web</span>
        <div className="w-1/4 flex justify-around">
           <Link to={'/sign-in'}>Sign In</Link>
           <Link to={'/sign-up'}>Sign Up</Link>
        </div>
    </div>
  )
}

export default Header