interface GlobalLoaderProps {
  progress: number;
  isLoaded: boolean;
}

export function GlobalLoader({ progress, isLoaded }: GlobalLoaderProps) {
  // If we are completely finished loading and the fade-out is likely done, we could unmount, 
  // but we handle unmounting in the parent. We just need to manage the opacity class here.

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F7F2E4] transition-all duration-1000 ease-in-out ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex w-full max-w-sm flex-col items-center justify-center px-8 text-neutral-900">
        <h1 className="font-tavern text-5xl font-black uppercase tracking-widest text-neutral-900 mb-12">
          MINILLM<span className="text-[#cc3333]">.</span>
        </h1>

        {/* Progress Bar Container */}
        <div className="w-full border border-neutral-900 h-2 p-[1px] relative mb-4">
          <div 
            className="h-full bg-neutral-900 transition-all duration-200 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        {/* Status Text */}
        <div className="w-full flex items-center justify-between font-mono text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
          <span>{progress === 100 ? 'READY.' : 'LOADING ASSETS...'}</span>
          <span>{progress}%</span>
        </div>

        {/* Barcode Deco */}
        <div className="mt-12 flex h-8 w-full items-center justify-center gap-[2px] opacity-20 mix-blend-multiply">
            <div className="h-full w-[1px] bg-black"></div>
            <div className="h-full w-[3px] bg-black"></div>
            <div className="h-full w-[2px] bg-black"></div>
            <div className="h-full w-[1px] bg-black"></div>
            <div className="h-full w-[4px] bg-black"></div>
            <div className="h-full w-[2px] bg-black"></div>
            <div className="h-full w-[1px] bg-black"></div>
            <div className="h-full w-[3px] bg-black"></div>
            <div className="h-full w-[2px] bg-black"></div>
            <div className="h-full w-[5px] bg-black"></div>
            <div className="h-full w-[1px] bg-black"></div>
            <div className="h-full w-[2px] bg-black"></div>
            <div className="h-full w-[3px] bg-black"></div>
            <div className="h-full w-[1px] bg-black"></div>
            <div className="h-full w-[2px] bg-black"></div>
            <div className="h-full w-[4px] bg-black"></div>
            <div className="h-full w-[1px] bg-black"></div>
        </div>
      </div>
    </div>
  )
}
