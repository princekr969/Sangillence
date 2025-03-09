import React from 'react';
import ReactPlayer from 'react-player';
import {ContentCard} from "./index"

function VideoSection() {
  
  return (

    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className='text-3xl md:text-center md:text-5xl font-normal pb-6 md:pb-9'>CHECK OUT OUR TEASER</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column - Video Section */}
          <div className="relative rounded-2xl overflow-hidden">
          <ReactPlayer
            url="https://youtu.be/4t1AFReVdTM?si=fCRXCxDA_Zws7c0T"
            controls
            width="100%"
            height="400px"
          />
    </div>

        {/* Right Column - Content */}
        <div className="space-y-5">

          <ContentCard
            title = "Who We Are"
            description = 'Welcome to Sangillence Academy, where "Sangat से Intelligence है!" We are a dedicated coaching institute for students in classes 3rd to 8th, offering a nurturing environment to shape young minds during their formative years. Inspired by the principles of NEP 2020, we focus on building lifelong study habits, values, and skills for intellectual growth and societal understanding.'
            bgColor='bg-green-100' />

          <ContentCard
            title = "Our Motivation"
            description = 'At Sangillence Academy, we believe students in classes 3rd to 8th are like clay in the hands of a potter. Our mission is to provide them with the right "sangat" (environment) to mold their character, thinking, and abilities. By instilling curiosity and fostering critical thinking, we prepare students for the challenges of the future.'
            bgColor='bg-emerald-800'
            textColor='text-white' />

        </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSection;