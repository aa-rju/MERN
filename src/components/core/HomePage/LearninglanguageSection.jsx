import React from 'react'
import HighlightText from './HighLightText';
import card1 from "../../../assets/Images/card1.jpg";
import card2 from "../../../assets/Images/card2.jpg";
import card3 from "../../../assets/Images/card3.jpg";
import Button from "../HomePage/Button";

const LearninglanguageSection = () => {
  return (
    <div className='mt-20 mb-32'>
      <div className='flex flex-col gap-5 items-center'>
        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knief for
          <HighlightText text={" Learning any language"} />
        </div>
        <div className='text-center text-richblack-50 mx-auto text-base mt-4 font-medium w-[60%]'>
          Using spin making learning multiple languages easy, with 20+ languages realistic voice-over, 
          progress tracking , custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-5 w-fit gap-4 mb-20 shadow-blue-100 shadow-lg '>
          <img src={card2} alt="klf" className='object-contain w-[25%] h-72 rotate-12 translate-x-[20px] translate-y-[-10px] shadow-lg hover:shadow-none' />
          <img src={card1} alt="fkmkf" className='object-contain w-[25%] h-72 -py-5 shadow-lg hover:shadow-none' />
          <img src={card3} alt="mfflkg" className='object-contain w-[25%] h-72 -rotate-12 translate-x-[-20px] translate-y-[-10px] shadow-lg hover:shadow-none'  />
        </div>
        <div className='w-fit -mt-14 mb-20'>
          <Button active={true} linkto={"/signup"} >
            Learn More
          </Button>
        </div>
        
      </div>
    </div>
  )
}

export default LearninglanguageSection