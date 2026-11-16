import React from 'react'

const page = () => {
  return (
     <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center md:justify-start">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-48 md:h-96 fill-white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>

        <div className="flex flex-col gap-6 max-w-md w-full mx-auto md:mx-0">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Happening now.</h1>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">Sign in to X</h2>

        
          

          
            <input
              type="text"
              placeholder="Email or username"
              className="w-full bg-black border border-gray-800 rounded-md p-4 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-black border border-gray-800 rounded-md p-4 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              required
            />

            <button
              type="submit"
              
              className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3.5 rounded-full transition disabled:opacity-50 mt-2"
            >
           
            </button>
          

          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
           
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page