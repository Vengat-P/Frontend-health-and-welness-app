import React from 'react';

const About = () => {
    return (
        <>
        <div className='mx-auto grid p-3 gap-4 mt-3 mb-3  w-3/4 h-3/4 border-2 '>
            <h1 className='text-3xl text-start font-bold'>How to use Fit2Go</h1>
            <h3 className='text-xl '>- Enter your  fitnesslog daily</h3>
            <h3 className='text-xl '>- Enter your  nutrition intake daily</h3>
            <h3 className='text-xl '>- set your goal and complete daily</h3>
            <h3 className='text-xl '>- Track your calroies burn and taken through bar chart</h3>
        </div>
        <div className='mx-auto grid p-3 gap-4 mt-3 mb-3  w-3/4 h-3/4 border-2 '>
            <h1 className='text-3xl text-start font-bold'>Tips</h1>
            <h3 className='text-xl '>- For weight gain take calories greater than calories burn do fitness activities</h3>
            <h3 className='text-xl '>- For weight lose take calroies lesser than calories burn but follow diet plan </h3>
            <h3 className='text-xl '>- Enter all logs properly you will get result</h3>
        </div>
        </>
    );
};

export default About;