import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skill Paths",
    "Career Paths"
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
    <div>
          <div className='text-2xl font-semibold text-center'>
              Unlock the 
              <HighLightText text={" Power of Code"} />
          </div>
          
          <p className='text-center text-richblack-50 text-sm mt-2'>
              Learn to build anything you can imagine.
          </p>

          <div className='flex flex-row rounded-full bg-richblack-50 mb-5 mt-4 border-richblack-5 px-2 py-1 '>
              {
                  tabsName.map((element, index) => {
                      return (
                          <div
                              className={`mbl_cardnav text-[14px] flex flex-row items-center gap-2 
                                ${currentTab === element ? "bg-richblack-100 text-richblack-5 font-medium " : 
                                  "bg-richblack-50"
                                  }rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-100 hover:rounded-full hover:text-blue-10 px-3 py-2`}
                              key={index}
                              onClick={()=>setMyCards(element)}
                          >
                              {element}
                          </div>
                      )
                  })
              }

          </div>
          

            <div className='lg:h-[150px]'>
                  {/* courses card */}
                <div className='absolute flex flex-row gap-4 items-center justify-between mr-4 ml-4'>
                      {
                          courses.map((element, index) => {
                              return (
                                  <CourseCard
                                      key={index}
                                      cardData={element}
                                      currentCard={currentCard}
                                  setCurrentCard={setCurrentCard}
                                  />
                              )
                          })
                      }
                </div>
                  
            </div>
    </div>
  )
}

export default ExploreMore