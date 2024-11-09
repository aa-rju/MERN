import React from 'react'
import Logo1 from "../../../assets/logo/Logo1.png";
import Logo2 from "../../../assets/logo/Logo2.png";
import Logo3 from "../../../assets/logo/Logo3.png";
import Logo4 from "../../../assets/logo/Logo4.png";
import timelineImage from "../../../assets/Images/timelineImage.jpg"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        description:"Fully committed to the success company"
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        description:"Fully committed to the success company"
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        description:"Fully committed to the success company"
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        description:"Fully committed to the success company"
    }
]


const TimelineSection = () => {
  return (
      <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
          <div className='greenbox_wala flex flex-row gap-5 mb-20 mt-[100px] justify-center items-center'>
              <div className='w-[40%] flex flex-col gap-12'>
                  {
                      timeline.map((element, index) => {
                          return (
                              <div className='flex flex-row gap-6 mx-auto ml-10' key={index}>
                                  
                                  <div className='w-[50px] h-[50px] bg-white flex items-center '>
                                    <img src={element.Logo} alt="xyz" />  
                                  </div>
                                  
                                  <div className='flex flex-col'>
                                      <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                      <p className='text-base'>{element.description}</p>
                                  </div>
                              </div>
                          )
                      })
                  }
              </div>

              <div className='relative shadow-blue-100 w-[50%]'>
                  {/* //pixabay pixels.com */}
                  <img src={timelineImage} alt=""
                      className='shadow-white object-cover h-fit'
                  />
                  
                  <div className='absolute bg-green-100 flex flex-row text-white uppercase py-6 px-2
                  left-[50%] translate-x-[-50%] mb-20 mt-[-10%] w-fit
                  '>
                      
                      <div className='flex flex-row gap-5 items-center border-r border-x-green-10 px-7'>
                          <p className='text-sm font-bold sm:text-xl md:text-xl '>10</p>
                          <p className='text-green-50 text-[6px] sm:text-[12px] md:text-[18px]'>Years of Experience</p>
                      </div>

                        <div className='flex flex-row gap-5 items-center px-4'>
                          <p className='text-sm font-bold sm:text-xl md:text-xl'>250</p>
                          <p className='text-green-50 text-[10px] sm:text-[12px] md:text-[18px]'>Type of courses</p>
                      </div>
                      
                  </div>


              </div>

          </div>
          <div></div>
    </div>
  )
}

export default TimelineSection