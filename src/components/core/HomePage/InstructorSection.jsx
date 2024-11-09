import React from 'react'
import Instructor from "../../../assets/Images/Instructor.jpg"
import HighLightText from './HighLightText'
import Button from './Button';
import { FaLongArrowAltRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className='  mt-20 flex-col'>
      <div className='instructor_wala flex items-center w-fit gap-8 lg:flex-row md:flex-row sm:flex-row '>

        <div className='w-[50%]'>
          <img src={Instructor} alt="" className='shadow-white' />
        </div>

        <div className='w-[50%] flex flex-col gap-10'>
          <div className='text-4xl font-semibold w-[50%]'>
            Become an
            <HighLightText text={" Instructor"} />
          </div>
          <p className='w-fit sm:font-medium text-[16px] w-[80%] text-richblack-10 '>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere numquam nostrum distinctio temporibus, reprehenderit ea beatae aliquid nesciunt vero fuga blanditiis qui et repudiandae incidunt commodi maiores nam! Magni, laudantium.
          </p>

          <div className='w-fit'>

            <Button active={true} linkto={"/signup"}>
              <div className='flex flex-row gap-2 items-center ms-auto'>
                Start Teaching Today
                <FaLongArrowAltRight />
              </div>
            </Button>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default InstructorSection