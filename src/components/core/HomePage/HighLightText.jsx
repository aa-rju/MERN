import React from 'react'

const HighLightText = ({text}) => {
  return (
      <span className='font-bold text-blue-50  '>
          {/* bg-gradient-to-b from-yellow-10 to-red-50 */}
          {text}
    </span>
  )
}

export default HighLightText