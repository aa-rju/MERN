import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,active,linkto}) => {
  return (
      <Link to={linkto}>
          <div className={`text-center text-[13px] -x-6 py-3 rounded-md font-bold
             ${active ? "bg-yellow-50 text-black " : "bg-richblack-50"}
             hover:scale-95 transition-all duration-200 px-3
             `}>
              {children}
          </div>
          
      </Link>
  )
}

export default Button