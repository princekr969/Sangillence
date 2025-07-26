import React from 'react'
import { AboutHeader, AboutMainSection, AboutBenefitSection, AboutFlagshipSection, AboutBeliefSection } from '../components'

function AboutPage() {
  return (
    <div className='cursor-default'>
      <AboutHeader/>
      <AboutMainSection/>
      <AboutBenefitSection/>
      <AboutFlagshipSection/>
      <AboutBeliefSection/>
    </div>
  )
}

export default AboutPage
