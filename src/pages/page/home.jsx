import React from 'react';
import { Clock, Settings, Plus, Search, FilePlus } from 'lucide-react';

function Home() {
  return (
    <div className='w-full h-screen bg-[#1A1A1A] flex justify-between flex-col'>
      {/* Header section */}
      <div className='flex justify-between items-center px-6 pt-4 pb-2'>
        <button className='w-10 h-10 flex items-center justify-center hover:bg-[#2A2A2A] rounded-lg transition-colors'>
          <Clock className='w-6 h-6 text-gray-400' />
        </button>
        <h1 className="text-[14px] md:text-3xl text-neutral-200">
          Manifes<span className='font-bold italic text-md text-yellow-400'>T</span><span className=' text-yellow-400'>est</span>
        </h1>
        <button className='w-10 h-10 flex items-center justify-center hover:bg-[#2A2A2A] rounded-lg transition-colors'>
          <Settings className='w-6 h-6 text-gray-400' />
        </button>
      </div>
      <div className='pt-1'>
        <div className="px-8">
          <h1 className="text-[14px] md:text-3xl text-neutral-300">
            Open a Video or Webpage to Create a Test
          </h1>
          <p className="text-xs md:text-sm font-light text-neutral-500">
            No relevant content was found on this site.
          </p>
        </div>

      </div>
      <div className='flex-1  flex items-center justify-center p-2 overflow-hidden'>
        <div className='border-2  border-dashed border-[#3A3A3A] rounded-2xl p-4 md:p-8 w-1/2 max-w-md flex flex-col items-center justify-between gap-4 my-4 max-h-[60vh] md:max-h-[50vh] overflow-hidden'>
          <div className='flex-1 flex items-center justify-center'>
            <div className='w-12 h-12 md:w-8 md:h-8 flex items-center pt-2 justify-center'>
              <FilePlus className='w-10 h-10 md:w-14 md:h-14 text-yellow-500' strokeWidth={1.5} />
            </div>
          </div>
          <div className='text-center space-y-1'>
            <p className='text-md md:text-xl text-gray-300 font-medium'>Drag 'n' Drop</p>
            <p className='text-[12px] text-gray-500'>.pdf, .doc and .docx</p>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center pb-4 px-4 shrink-0'>
        <div className='w-full max-w-2xl'>
          <div className='rounded-xl px-2 py-2  bg-[#202020] border border-[#3A3A3A] flex flex-col gap-1'>
            {/* Text input on top */}
            <input
              type="text"
              placeholder="Type a topic or add a link"
              className='bg-transparent w-full outline-none text-neutral-300 placeholder-neutral-500 py-1 pb-2 text-[12px]'
            />
            {/* Icons on bottom */}
            <div className='flex items-center gap-2'>
              <button className='w-6 h-6 flex items-center justify-center hover:bg-[#3A3A3A] rounded-lg transition-colors'>
                <Plus className='w-5 h-5 text-yellow-500' strokeWidth={2.5} />
              </button>
              <button className='w-6 h-6 flex items-center justify-center hover:bg-[#3A3A3A] rounded-lg transition-colors'>
                <Search className='w-4 h-4 text-yellow-500' strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;