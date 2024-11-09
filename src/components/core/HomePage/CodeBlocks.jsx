import React from 'react';
import Button from './Button';
import { FaLongArrowAltRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position = "flex-row",
    heading = <div>No heading provided</div>,
    subheading = "No subheading provided",
    btn1 = { active: false, linkto: "#", btnText: "Button 1" },
    btn2 = { active: false, linkto: "#", btnText: "Button 2" },
    codeblock = "// Code goes here",
    backgroundGradient = "",
    codeColor = "text-black"
}) => {
    return (
        <div className={`flex ${position} my-20 justify-between gap-10`} >
            {/* Section 1 */}
            <div className='w-[50%] flex flex-col gap-8'>
                {heading}
                <div className='text-richblack-10 font-bold'>
                    {subheading}
                </div>
                <div className='flex gap-7 mt-7'>
                    <Button active={btn1?.active} linkto={btn1?.linkto}>
                        <div className='flex gap-2 items-center'>
                            {btn1?.btnText}
                            <FaLongArrowAltRight />
                        </div>
                    </Button>

                    <Button active={btn2?.active} linkto={btn2?.linkto}>
                        {btn2?.btnText}
                    </Button>
                </div>
            </div>
            {/* Section 2 */}
            <div className='h-fit flex flex-row text-[15px] w-[100%] py-2 lg:w-[500px]'>
                <div className='text-center flex flex-col w-[10%] text-yellow-10 font-inter font-bold'>
                    {Array.from({ length: 11 }, (_, i) => <p key={i}>{i + 1}</p>)}
                </div>
                <div className={`w-[90%] flex flex-col text-[13px] text-yellow-50 gap-2 font-bold font-mono ${codeColor} pr-2 relative`}>
                    <div className='mg-auto m-10 bg-gradient-to-b from-richblue-5 to-red-5 h-32 w-32 rounded-full absolute justify-center opacity-15'></div>
                    <TypeAnimation
                        sequence={[codeblock, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block"
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;
