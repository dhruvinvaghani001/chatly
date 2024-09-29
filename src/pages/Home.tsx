import React from 'react'

const Home = () => {
  return (
    <>
      <main className='flex-grow flex items-center justify-center bg-background'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-4'>Welcome to ChatApp!</h1>
          <p className='text-lg mb-6'>
            Connect with your friends in real-time.
          </p>
          <a
            href='/signup'
            className='bg-primary text-white px-4 py-2 rounded hover:bg-destructive'
          >
            Get Started
          </a>
        </div>
      </main>
    </>
  )
}

export default Home
