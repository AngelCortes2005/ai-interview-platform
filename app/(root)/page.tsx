import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'

const page = () => {
  return (
    <>
    <section className="card-cta">
      <div className="flex flex-col gap-6 max-w-lg">
        <h2>Get Started with InterLab. AI-Powered Interview Practice & Feedback</h2>
        <p className="text-lg">
          InterLab is your AI-powered platform for practicing job interviews. 
          Sign up now to enhance your interview skills and boost your confidence.
        </p>
        <Button asChild className="btn-primary max-sm:w-full">
          <Link href="/interview">Start Interview</Link>
        </Button>
      </div>
      <Image
        src="/robot.png"
        alt="robot-image"
        width={400}
        height={400}
        className="max-sm:hidden max-md:hidden" />
    </section>
    <section className="flex flex-col gap-6 mt-8">
      <h2>Your Interviews</h2>

      <div className="interviews-section">
        {dummyInterviews.map((interview) => (
          <InterviewCard {...interview} key={interview.id} />
        ))}
      </div>
    </section>

    <section className="flex flex-col gap-6 mt-8">
      <h2>Take an Interview</h2>
      <div className="interviews-section">
        {dummyInterviews.map((interview) => (
          <InterviewCard {...interview} key={interview.id} />
        ))}
        {/* <p>There are no interviews available</p> */}
      </div>
    </section>
    </>
  )
}

export default page