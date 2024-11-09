import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import  HighLightText  from '../components/core/HomePage/HighLightText';
import Button from '../components/core/HomePage/Button';
import Banner from "../assets/Images/Banner.mp4";
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearninglanguageSection from '../components/core/HomePage/LearninglanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from "../components/common/footer"
import ExploreMore from '../components/core/HomePage/ExploreMore';

const Home = () => {
  return (
      <div>
          {/* /*section 1 */}
          <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between '>
              
              <Link to={"/signup"} >
                  
                  <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-50 font-bold text-white transition-all duration-200 hover:scale-95 w-fit '>
                      <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-100 '>
                          <p>Become an instructor</p>
                          {/* npm i react-icons */}
                          <FaLongArrowAltRight />
                      </div>
                  </div>
              </Link>

              <div className='text-center text-4xl font-semibold mt-10'>
                  Empower Your Future With
                  {/* <span>Coding Skills</span> */}
                  <HighLightText text={" Coding Skills"} />
              </div>
              <div className='mt-4 w-[80%] text-center text-lg font-bold text-richblue-10 justify-center '>
                  With our online coding courses, you will find the right direction for your future endavour. The courses empower you with all the necessery skill yet to learn with dedicated classes and knowledge sessions.
              </div>



              <div className='mx-3 my-12 shadow-blue-100 w-[70%] '>
                  {/* //put shadow */}
                  <video
                      muted
                      loop
                      autoPlay
                  >
                      <source src={Banner} type="video/mp4" />
                      
                  </video>
              </div>
            {/* code-section-i */}
              <div>
                  <CodeBlocks
                      position={"flex-col lg:flex-row md:flex:row sm:flex-row"}
                      heading={
                          <div className='font-bold'>
                              Unlock Your
                              <HighLightText text={" coding potential"} />
                              with our online courses
                          </div>
                      }
                      subheading={
                          "ek din kavhi jo khudko tarase mere najarse tu jara hai ree..."
                      }
                      btn1={
                          {
                              btnText : "try it yourSelf",
                              linkto : "/signup",
                              active: true,
                          }
                      }

                

                      //type animation
                    codeblock={`<<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    </head>\n`}
                      //   ,backgroundGradient,
                      codeColor={"text-red-20  "}
                      
                  />
              </div>

              {/* code section ii */}
              <div>
                  <CodeBlocks
                      position={"flex-col-reverse lg:flex-row-reverse md:flex-row-reverse sm:flex-row-reverse"}
                      heading={
                          <div className='font-bold'>
                              Unlock Your
                              <HighLightText text={" coding potential"} />
                              with our online courses
                          </div>
                      }
                      subheading={
                          "ek din kavhi jo khudko tarase mere najarse tu jara hai ree..."
                      }
                      btn1={
                          {
                              btnText : "try it yourSelf",
                              linkto : "/signup",
                              active: true,
                          }
                      }
                      btn2={
                      {
                        btnText : "Learn More",
                        linkto : "/login",
                        active:false,
                      }
                  }

                      //type animation
                    codeblock={`<<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    </head>\n`}
                      //   ,backgroundGradient,
                      codeColor={"text-red-20  "}
                      
                  />
              </div>

              <ExploreMore />

          </div>
          {/* section 2 */}

          <div className='bg-white text-richblack-100'>
              <div className='homepage_bg h-[310px]'>
                  <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto justify-center'>
                      
                      <div className='flex flex-row gap-7 text-white mt-20'>
                          <Button active={true} linkto={"/signup"} >
                              <div className='flex gap-2 items-center '>
                                  Explore Full Catalog
                                  <FaLongArrowAltRight/>
                              </div>
                              
                          </Button>
                          <Button active={false}linkto={"/login"} >
                              <div className='flex gap-2 items-center '>
                                  Learn More
                              </div>
                              
                          </Button>
                      </div>
                  </div>
              </div>
              

              <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                  <div className='flex flex-row gap-5 mb-20 mt-[100px]'>
                      <div className='text-4xl font-semibold w-[45%]'>
                          Get the skills you need for a 
                          <HighLightText text={" Job that is in demand"} />
                      </div>

                      <div className='flex flex-col gap-10 w-[40%] items-start'>
                          <div className='text-[16px]'>
                              The modern is the dictates thek fdjkf djfie dfjdifj kuch toh hai tujhse raavta kuch toh hai tujhse raabta
                          </div>
                          <Button active={true} linkto={"/signup"} >
                          Learn More</Button>
                          
                      </div>

                  </div>
              </div>

              <TimelineSection />

              <LearninglanguageSection />

          </div>

          {/* section 3 */}

          <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-black text-white '>
              
              <InstructorSection />

              <h2 className='text-center text-4xl font-semibold mt-10 '>Review from other learners..</h2>

              {/* Review-slider here */}

          </div>
    

          {/* footer */}
          <Footer/>
       </div>
  )
}

export default Home