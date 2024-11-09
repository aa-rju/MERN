import React from 'react'
// import { HomePageExplore } from '../../../data/homepage-explore';

const CourseCard = (tag,courses,heading) => {
    return (
      <div>
            <div className='animate-bounce '>
                <div>
                    <h2>{courses.heading}</h2>
                </div>
            </div>
      </div>
    
  )
}

export default CourseCard