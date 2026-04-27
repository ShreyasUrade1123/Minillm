import { useCallback, useRef, useState, useEffect } from 'react'
import { ScrollSequence } from '@/components/ui/ScrollSequence'
import { useImagePreloader } from '@/hooks/useImagePreloader'
import { GlobalLoader } from '@/components/ui/GlobalLoader'

export default function HomePage() {
  const oldStateRef = useRef<HTMLDivElement>(null)
  const newStateRef = useRef<HTMLDivElement>(null)
  const scroll3StateRef = useRef<HTMLDivElement>(null)
  const distributionRef = useRef<HTMLDivElement>(null)
  const [showFixedFooter, setShowFixedFooter] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide the fixed footer when the distribution section is in view
        setShowFixedFooter(!entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    if (distributionRef.current) {
      observer.observe(distributionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  // Generate URLs for the 240 frames of scroll1, 40 frames of scroll2, and 160 frames of scroll3
  const frameUrlGen = useCallback((index: number) => {
    if (index <= 240) {
      return `/scroll1/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
    } else if (index <= 280) {
      const scroll2Index = index - 240
      return `/scroll2/ezgif-frame-${scroll2Index.toString().padStart(3, '0')}.jpg`
    } else {
      const scroll3Index = index - 280
      // Frame 1 and 160 are .png for some reason
      if (scroll3Index === 1 || scroll3Index === 160) {
        return `/scroll3/ezgif-frame-${scroll3Index.toString().padStart(3, '0')}.png`
      }
      return `/scroll3/ezgif-frame-${scroll3Index.toString().padStart(3, '0')}.jpg`
    }
  }, [])

  const { progress, isLoaded } = useImagePreloader(440, frameUrlGen)

  // Lock scrolling while loading
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLoaded])

  const handleProgress = useCallback((progress: number) => {
    if (oldStateRef.current) {
      let opacity = 0
      if (progress > 0.20 && progress <= 0.28) {
        opacity = Math.max(0, Math.min(1, (progress - 0.20) / 0.08))
      } else if (progress > 0.28 && progress <= 0.48) {
        opacity = 1
      } else if (progress > 0.48 && progress <= 0.64) {
        opacity = Math.max(0, Math.min(1, 1 - (progress - 0.48) / 0.16))
      } else if (progress > 0.64) {
        opacity = 0
      }
      oldStateRef.current.style.opacity = opacity.toString()
      oldStateRef.current.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none'
    }

    if (newStateRef.current) {
      let opacity = 0
      if (progress > 0.48 && progress <= 0.64) {
        opacity = Math.max(0, Math.min(1, (progress - 0.48) / 0.16))
      } else if (progress > 0.64 && progress <= 0.80) {
        opacity = 1
      } else if (progress > 0.80 && progress <= 0.95) {
        opacity = Math.max(0, Math.min(1, 1 - (progress - 0.80) / 0.15))
      } else if (progress > 0.95) {
        opacity = 0
      }
      newStateRef.current.style.opacity = opacity.toString()
      newStateRef.current.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none'
    }

    if (scroll3StateRef.current) {
      let opacity = 0
      if (progress > 0.90) {
        opacity = Math.max(0, Math.min(1, (progress - 0.90) / 0.10))
      }
      scroll3StateRef.current.style.opacity = opacity.toString()
      scroll3StateRef.current.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none'
    }
  }, [])

  return (
    <>
      <GlobalLoader progress={progress} isLoaded={isLoaded} />
      <div className="w-full">
      {/* Scroll Sequence Hero Section */}
      <ScrollSequence
        frameCount={440}
        startFrame={1} // <-- CHANGE THIS NUMBER to start at a different frame (e.g. 20)
        frameUrlGen={frameUrlGen}
        aspectRatio={16 / 9}
        className="h-[1000vh]" // Set to 1000vh to give a long scroll track for crossfades and scroll3
        timeline={[
          [0.0, 1],
          [0.24, 240],   // Play scroll1 (takes 240vh)
          [0.48, 240],   // Hold frame 240
          [0.64, 280],   // Play scroll2 (takes 160vh) while crossing fading Old State -> New State
          [0.80, 280],   // Hold frame 280
          [1.0, 440],    // Play scroll3 (takes 200vh) while New State fades out
        ]}
        onProgress={handleProgress}
        endChildren={
          <div className="relative h-full w-full">
            {/* ==============================================================
                OLD STATE 
                (FIG 02, EVERY WORD, 12_12_26 Stamp)
                ============================================================== */}
            <div ref={oldStateRef} className="absolute inset-0 z-10 opacity-0 pointer-events-none">
              <img
                src="/ChatGPT Image Apr 27, 2026, 10_49_22 PM 1.png"
                alt="Left Data Flow"
                className="absolute left-56 top-1/2 h-[75%] top-[55%] w-1/2 -translate-y-1/2 object-contain object-left pointer-events-none"
              />
              <img
                src="/ChatGPT Image Apr 27, 2026, 10_49_22 PM 2.png"
                alt="Right Data Flow"
                className="absolute right-24 top-1/2 h-[75%] top-[55%] w-1/2 -translate-y-1/2 object-contain object-right pointer-events-none"
              />

              {/* Top Left Text Block */}
              <div className="absolute left-[23%] top-[1%] flex flex-col gap-0">
                <p className="font-mono text-xs font-bold tracking-widest text-neutral-400">
                  FIG. 02 / DATA_FLOW / CURRENT_STATE
                </p>
                <h1
                  className="font-tavern text-5xl font-black uppercase tracking-tighter text-neutral-900 md:text-6xl lg:text-[60px]"
                  style={{ lineHeight: 0.85 }}
                >
                  EVERY WORD<br />
                  YOU TYPE<br />
                  GOES<br />
                  SOMEWHERE.
                </h1>
              </div>

              {/* Red Stamp */}
              <img
                src="/ChatGPT Image Apr 28, 2026, 12_12_26 AM.png"
                alt="NOT YOURS."
                className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-[40%] w-[60%] max-w-[800px] object-contain mix-blend-multiply opacity-75 pointer-events-none"
              />

              {/* Bottom Text */}
              <div className="absolute bottom-16 left-1/2 flex w-full -translate-x-1/2 flex-col items-center gap-4 text-center font-mono text-xs font-bold tracking-widest text-neutral-800 md:text-sm">
                <p>
                  EVERY PROMPT. EVERY DRAFT. EVERY THOUGHT.<br />
                  LEAVES YOUR MACHINE THE MOMENT YOU HIT SEND.
                </p>
                <button className="mt-2 flex items-center gap-2 text-neutral-400 transition-colors hover:text-neutral-900 uppercase">
                  &darr; CONTINUE
                </button>
              </div>


            </div>

            {/* ==============================================================
                NEW STATE 
                (FIG 03, UNTIL NOW, 12_48_10 Stamp)
                ============================================================== */}
            <div ref={newStateRef} className="absolute inset-0 z-20 opacity-0 pointer-events-none">
              <img
                src="/ChatGPT Image Apr 27, 2026, 10_49_22 PM 3.png"
                alt="Left Data Flow"
                className="absolute left-56 top-1/2 h-[75%] top-[45%] w-1/2 -translate-y-1/2 object-contain object-left pointer-events-none"
              />
              <img
                src="/ChatGPT Image Apr 27, 2026, 10_49_22 PM 4.png"
                alt="Right Data Flow"
                className="absolute right-44 top-1/2 h-[75%] top-[45%] w-1/2 -translate-y-1/2 object-contain object-right pointer-events-none"
              />

              {/* Top Left Text Block */}
              <div className="absolute left-[23%] top-[1%] flex flex-col gap-0">
                <p className="font-mono text-xs font-bold tracking-widest text-neutral-400">
                  FIG. 03 / DATA_FLOW / LOCAL_STATE
                </p>
                <h1 className="font-tavern text-5xl font-black uppercase leading-[0.85] tracking-tighter text-neutral-900 md:text-6xl lg:text-[60px]">
                  UNTIL
                  <br />
                  NOW.
                </h1>
              </div>


              {/* Top Small Text Block */}
              <div className="absolute left-[49%] top-[13%] flex flex-col gap-0">
                <p className="font-mono text-[14px] font-semibold tracking-widest text-neutral-400">
                  NO_NETWORK
                </p>
              </div>

              {/* Top Small Text Block */}
              <div className="absolute left-[30%] top-[52%] flex flex-col gap-0">
                <p className="font-mono text-[14px] font-semibold tracking-widest text-neutral-400">
                  ON_DEVICE
                </p>
              </div>

              {/* Top Small Text Block */}
              <div className="absolute right-[26%] top-[52%] flex flex-col gap-0">
                <p className="font-mono text-[14px] font-semibold tracking-widest text-neutral-400">
                  LOCAL_MEMORY
                </p>
              </div>

              {/* Red Stamp */}
              <img
                src="/ChatGPT Image Apr 28, 2026, 01_01_37 AM.png"
                alt="NOT YOURS."
                className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-[40%] w-[60%] max-w-[800px] object-contain mix-blend-multiply opacity-75 pointer-events-none"
              />

              {/* Bottom Text */}
              <div className="absolute bottom-16 left-1/2 flex w-full -translate-x-1/2 flex-col items-center gap-4 text-center font-mono text-xs font-bold tracking-widest text-neutral-800 md:text-sm">
                <p>
                  YOUR MACHINE. YOUR MODELS. YOUR WORDS.<br />
                  NOTHING LEAVES. NOTHING LISTENS.
                </p>
                <button className="mt-2 flex items-center gap-2 text-neutral-400 transition-colors hover:text-neutral-900 uppercase">
                  &darr; CONTINUE
                </button>
              </div>


            </div>

            {/* ==============================================================
                SCROLL 3 STATE 
                ============================================================== */}
            <div ref={scroll3StateRef} className="absolute inset-0 z-30 opacity-0 pointer-events-none">
              <div className="absolute left-[10%] top-[3%] flex flex-col gap-0">
                <p className="font-mono text-xs font-bold tracking-widest text-neutral-400">
                  FIG. 04 / SILENCE
                </p>
                <h1
                  className="font-tavern text-5xl font-black uppercase tracking-tighter text-neutral-900 md:text-6xl lg:text-[90px]"
                  style={{ lineHeight: 0.85 }}
                >
                  THEN <br />
                  WE BUILD<br />
                  THIS<span className="text-red-600">.</span>
                </h1>


              </div>
              {/* Bottom Text */}
              <div className="absolute bottom-16 left-[51%] flex w-full -translate-x-1/2 flex-col items-center gap-4 text-center font-mono text-xs font-bold tracking-widest text-neutral-800 md:text-sm">
                <p>
                  NO CLOUD. NO COMPANIES. NO COMPROMISE.<br />
                </p>
                <button className="mt-2 flex items-center gap-2 text-neutral-400 transition-colors hover:text-neutral-900 uppercase">
                  &darr; CONTINUE
                </button>
              </div>


            </div>
          </div>
        }
      >
        <div className="flex h-full w-full items-start pt-32 justify-end pr-4 pl-0 pb-16 md:pr-8 lg:pr-6 md:pt-40 lg:pt-62">
          <div className="flex w-full max-w-2xl flex-col items-start gap-2 text-neutral-900">
            <h1 className="font-tavern text-6xl font-bold ppercase leading-[0.90] tracking-tighter md:text-[65px] lg:text-[100px]">
              The AI<br />
              That Runs<br />
              On<br />
              Your<br />
              Machine.
            </h1>
            <p className="mt-7 font-mono text-xs font-bold tracking-widest text-neutral-800 md:text-sm">
              LLAMA / GEMMA / MISTRAL / QWEN /<br />
              + 1000 HUGGINGFACE MODELS. OFFLINE. NO ACCOUNT.
            </p>
            <div className="mt-4 flex w-full max-w-[500px] items-center gap-4 font-mono text-sm font-bold">
              <div className="flex-1 border-2 border-neutral-900 bg-transparent px-4 py-3 text-neutral-600">
                ENTER_EMAIL &gt;
              </div>
              <button className="bg-[#cc3333] px-6 py-3 text-[#F7F2E4] transition-colors hover:bg-red-800">
                &rarr; JOIN WAITLIST
              </button>
            </div>
          </div>
        </div>
      </ScrollSequence>

      {/* ==============================================================
          CAPABILITIES SECTION (Static Flow after animation)
          ============================================================== */}
      <section className="relative z-40 w-full border-t border-neutral-300 bg-[#F7F2E4] pt-8 font-mono">
        <div className="mx-auto flex max-w-[1400px] flex-col px-4 sm:px-8">


          {/* Main Content Area */}
          <div className="mt-8 flex flex-col">
            <p className="text-xs font-bold tracking-widest text-neutral-400">
              FIG. 05 / CAPABILITIES
            </p>
            <h2 className="mt-2 font-tavern text-6xl font-black uppercase leading-[0.8] tracking-tighter text-neutral-900 md:text-[80px] lg:text-[100px]">
              WHAT<br />
              IT DOES<span className="text-red-600">.</span>
            </h2>

            {/* Stamp Cards Grid */}
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">

              {/* Card 1 */}
              <div className="relative flex flex-col p-6 pt-8">
                <div className="stamp-bg"></div>
                {/* Top decorations */}
                <div className="flex w-full items-center justify-between">
                  <span className="text-xl text-neutral-900">◆</span>
                  <span className="font-serif text-5xl text-[#cc3333]">01</span>
                </div>
                {/* Illustration (Sprite) */}
                <div
                  className="mt-8 h-[250px] w-full mix-blend-multiply"
                  style={{
                    backgroundImage: 'url("/ChatGPT Image Apr 28, 2026, 03_57_28 AM.png")',
                    backgroundSize: '320%',
                    backgroundPosition: '2% 48%', // Approximate crop for first image
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                {/* Content */}
                <div className="mt-8 flex flex-col">
                  <h3 className="font-tavern text-3xl font-black uppercase leading-none tracking-tighter text-neutral-900">
                    RUNS ON<br />
                    YOUR DEVICE.
                  </h3>
                  <p className="mt-4 text-xs font-bold leading-relaxed tracking-widest text-neutral-600">
                    NO CLOUD.<br />
                    NO ACCOUNT.<br />
                    NO NETWORK CALLS.
                  </p>
                </div>
                <div className="mt-12 flex w-full justify-center border-t border-dashed border-neutral-300 pt-4 text-[10px] font-bold tracking-widest text-neutral-400">
                  MINILLM / LOCAL_INFERENCE / 01
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative flex flex-col p-6 pt-8">
                <div className="stamp-bg"></div>
                {/* Top decorations */}
                <div className="flex w-full items-center justify-between">
                  <span className="text-xl text-neutral-900">◆</span>
                  <span className="font-serif text-5xl text-[#cc3333]">02</span>
                </div>
                {/* Illustration (Sprite) */}
                <div
                  className="mt-8 h-[250px] w-full mix-blend-multiply"
                  style={{
                    backgroundImage: 'url("/ChatGPT Image Apr 28, 2026, 03_57_28 AM.png")',
                    backgroundSize: '320%',
                    backgroundPosition: '50% 48%', // Approximate crop for second image
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                {/* Content */}
                <div className="mt-8 flex flex-col">
                  <h3 className="font-tavern text-3xl font-black uppercase leading-none tracking-tighter text-neutral-900">
                    ANY MODEL.<br />
                    ANY FORMAT.
                  </h3>
                  <p className="mt-4 text-xs font-bold leading-relaxed tracking-widest text-neutral-600">
                    GGUF, MLX, SAFETENSORS.<br />
                    LOAD ANYTHING FROM<br />
                    HUGGING FACE.
                  </p>
                </div>
                <div className="mt-12 flex w-full justify-center border-t border-dashed border-neutral-300 pt-4 text-[10px] font-bold tracking-widest text-neutral-400">
                  MINILLM / MODEL_LIBRARY / 02
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative flex flex-col p-6 pt-8">
                <div className="stamp-bg"></div>
                {/* Top decorations */}
                <div className="flex w-full items-center justify-between">
                  <span className="text-xl text-neutral-900">◆</span>
                  <span className="font-serif text-5xl text-[#cc3333]">03</span>
                </div>
                {/* Illustration (Sprite) */}
                <div
                  className="mt-8 h-[250px] w-full mix-blend-multiply"
                  style={{
                    backgroundImage: 'url("/ChatGPT Image Apr 28, 2026, 03_57_28 AM.png")',
                    backgroundSize: '320%',
                    backgroundPosition: '98% 48%', // Approximate crop for third image
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                {/* Content */}
                <div className="mt-8 flex flex-col">
                  <h3 className="font-tavern text-3xl font-black uppercase leading-none tracking-tighter text-neutral-900">
                    REAL TOOLS<br />
                    BUILT IN.
                  </h3>
                  <p className="mt-4 text-xs font-bold leading-relaxed tracking-widest text-neutral-600">
                    TOOL CALLING. PDFs.<br />
                    IMAGES. FULL PARAMETER<br />
                    CONTROL.
                  </p>
                </div>
                <div className="mt-12 flex w-full justify-center border-t border-dashed border-neutral-300 pt-4 text-[10px] font-bold tracking-widest text-neutral-400">
                  MINILLM / CAPABILITIES / 03
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==============================================================
            DISTRIBUTION SECTION
            ============================================================== */}
        <div ref={distributionRef} className="mx-auto flex max-w-[1400px] flex-col px-4 sm:px-8 mt-24 border-t border-neutral-300 pt-8">

          <p className="text-xs font-bold tracking-widest text-neutral-400 mt-8">
            FIG. 05 / DISTRIBUTION
          </p>
          <h2 className="mt-2 font-tavern text-6xl font-black uppercase leading-[0.8] tracking-tighter text-neutral-900 md:text-[80px] lg:text-[100px]">
            EVERY<br />
            MACHINE<span className="text-red-600">.</span>
          </h2>

          {/* Distribution Cards Grid */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: MACOS */}
            <div className="relative flex flex-col p-6 pt-8 text-left">
              <div className="stamp-bg"></div>
              <div className="flex w-full items-center justify-between">
                <span className="text-xl text-neutral-900">◆</span>
                <span className="bg-[#cc3333] text-[#F7F2E4] text-[10px] font-bold px-2 py-0.5 tracking-widest border border-[#cc3333]">READY</span>
              </div>
              <h3 className="font-tavern text-5xl lg:text-[65px] font-black uppercase tracking-tighter text-neutral-900 mt-16 mb-8 leading-[0.85]">
                MACOS
              </h3>
              <p className="text-xs font-bold leading-relaxed tracking-widest text-neutral-600 w-full">
                APPLE SILICON NATIVE.<br />
                M1 AND LATER.
              </p>
              <div className="mt-16 flex w-full items-center justify-between border-t border-dashed border-neutral-300 pt-4 text-[10px] font-bold tracking-widest text-neutral-400">
                <span>MINILLM / macOS / v1.0</span>
                <svg viewBox="0 0 384 512" fill="currentColor" className="h-4 w-4 text-neutral-900"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.8 15.6 273.9c-15.5 162.6 37.7 221.7 82.2 221.7 21.6 0 32.2-13.6 60.5-13.6 28.3 0 38 13.6 61.4 13.6 44.5 0 91.8-54 105.8-115.8-37.5-16.5-56.7-51-56.8-91.1zm-114.6-228c25.3-30.8 22.2-61.9 21.1-69.3-25.3 1.1-57 14.5-74.8 35.3-23.7 27.6-29 60.7-27.1 76.5 28.5 2.2 55.4-11.7 80.8-42.5z" /></svg>
              </div>
            </div>

            {/* Card 2: WINDOWS */}
            <div className="relative flex flex-col p-6 pt-8 text-left">
              <div className="stamp-bg"></div>
              <div className="flex w-full items-center justify-between">
                <span className="text-xl text-neutral-900">◆</span>
                <span className="bg-[#cc3333] text-[#F7F2E4] text-[10px] font-bold px-2 py-0.5 tracking-widest border border-[#cc3333]">READY</span>
              </div>
              <h3 className="font-tavern text-5xl lg:text-[65px] font-black uppercase tracking-tighter text-neutral-900 mt-16 mb-8 leading-[0.85]">
                WINDOWS
              </h3>
              <p className="text-xs font-bold leading-relaxed tracking-widest text-neutral-600 w-full">
                NATIVE BUILD.<br />
                CUDA / DIRECTML.
              </p>
              <div className="mt-16 flex w-full items-center justify-between border-t border-dashed border-neutral-300 pt-4 text-[10px] font-bold tracking-widest text-neutral-400">
                <span>MINILLM / win32 / v1.0</span>
                <svg viewBox="0 0 448 512" fill="currentColor" className="h-4 w-4 text-neutral-900"><path d="M0 93.6l183.6-25.3v177.4H0V93.6zm203.3-28L448 32v213.7H203.3V65.6zM0 265.8h183.6v177.4L0 417.9V265.8zm203.3 0H448v213.7l-244.7-33.6V265.8z" /></svg>
              </div>
            </div>

            {/* Card 3: IOS */}
            <div className="relative flex flex-col p-6 pt-8 text-left">
              <div className="stamp-bg"></div>
              <div className="flex w-full items-center justify-between">
                <span className="text-xl text-neutral-900">◆</span>
                <span className="bg-transparent text-neutral-900 text-[10px] font-bold px-2 py-0.5 tracking-widest border border-neutral-900">SOON</span>
              </div>
              <h3 className="font-tavern text-5xl lg:text-[65px] font-black uppercase tracking-tighter text-neutral-900 mt-16 mb-8 leading-[0.85]">
                IOS
              </h3>
              <p className="text-xs font-bold leading-relaxed tracking-widest text-neutral-600 w-full">
                IN YOUR POCKET.<br />
                IPHONE 15 PRO+.
              </p>
              <div className="mt-16 flex w-full items-center justify-between border-t border-dashed border-neutral-300 pt-4 text-[10px] font-bold tracking-widest text-neutral-400">
                <span>MINILLM / iOS / SOON</span>
                <svg viewBox="0 0 384 512" fill="currentColor" className="h-4 w-4 text-neutral-900"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.8 15.6 273.9c-15.5 162.6 37.7 221.7 82.2 221.7 21.6 0 32.2-13.6 60.5-13.6 28.3 0 38 13.6 61.4 13.6 44.5 0 91.8-54 105.8-115.8-37.5-16.5-56.7-51-56.8-91.1zm-114.6-228c25.3-30.8 22.2-61.9 21.1-69.3-25.3 1.1-57 14.5-74.8 35.3-23.7 27.6-29 60.7-27.1 76.5 28.5 2.2 55.4-11.7 80.8-42.5z" /></svg>
              </div>
            </div>

            {/* Card 4: ANDROID */}
            <div className="relative flex flex-col p-6 pt-8 text-left">
              <div className="stamp-bg"></div>
              <div className="flex w-full items-center justify-between">
                <span className="text-xl text-neutral-900">◆</span>
                <span className="bg-transparent text-neutral-900 text-[10px] font-bold px-2 py-0.5 tracking-widest border border-neutral-900">SOON</span>
              </div>
              <h3 className="font-tavern text-5xl lg:text-[65px] font-black uppercase tracking-tighter text-neutral-900 mt-16 mb-8 leading-[0.85]">
                ANDROID
              </h3>
              <p className="text-xs font-bold leading-relaxed tracking-widest text-neutral-600 w-full">
                ON THE GO.<br />
                FLAGSHIP DEVICES.
              </p>
              <div className="mt-16 flex w-full items-center justify-between border-t border-dashed border-neutral-300 pt-4 text-[10px] font-bold tracking-widest text-neutral-400">
                <span>MINILLM / android / SOON</span>
                <svg viewBox="0 0 512 512" fill="currentColor" className="h-4 w-4 text-neutral-900"><path d="M325.3 234.3c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm-138.6 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zM512 368c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V208c0-44.2 35.8-80 80-80h352c44.2 0 80 35.8 80 80v160zm-256-208C132.7 160 33.5 253.5 17.5 373.1c1.5-3.3 3.3-6.4 5.3-9.4L64 304h384l41.2 59.7c2 3 3.8 6.1 5.3 9.4C478.5 253.5 379.3 160 256 160z" /></svg>
              </div>
            </div>
          </div>

          {/* CTA Area */}
          <div className="mt-24 flex flex-col items-center border-t border-neutral-300 pt-16 text-center">
            <h2 className="font-tavern text-7xl font-black uppercase tracking-tighter text-neutral-900 md:text-[90px]">
              YOUR TURN<span className="text-[#cc3333]">.</span>
            </h2>
            <p className="mt-4 font-mono text-xs font-bold tracking-widest text-neutral-600">
              EARLY ACCESS ROLLING OUT IN WAVES. JOIN BEFORE THE QUEUE GROWS.
            </p>
            <div className="mt-8 flex w-full max-w-[600px] flex-col md:flex-row items-center gap-4 font-mono text-sm font-bold">
              <div className="flex-1 border-2 border-neutral-900 bg-transparent px-6 py-4 text-neutral-600 text-left w-full relative">
                ENTER_EMAIL &gt;
              </div>
              <button className="bg-[#cc3333] px-8 py-4 text-[#F7F2E4] transition-colors hover:bg-red-800 w-full md:w-auto shrink-0">
                &rarr; JOIN WAITLIST
              </button>
            </div>
            <p className="mt-4 font-mono text-[10px] font-bold tracking-widest text-neutral-400">
              NO SPAM. ONE EMAIL WHEN YOUR BUILD IS READY.
            </p>
          </div>
        </div>

        {/* Global Static Footer */}
        <div className="mt-24 border-t border-neutral-300 pb-16 pt-8 font-mono text-xs font-bold tracking-widest text-neutral-600 bg-[#F7F2E4]">
          <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 px-4 sm:px-8 md:flex-row md:items-start">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <div className="flex items-center gap-2 text-neutral-900 justify-center md:justify-start">
                <span className="text-sm">◆</span>
                <span className="text-sm font-black uppercase">MINILLM</span>
              </div>
              <span>BY MEGALLM / 2026</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              <span>DOCS</span><span>|</span><span>GITHUB</span><span>|</span><span>DISCORD</span><span>|</span><span>PRIVACY</span>
            </div>

            <div className="flex items-center gap-4 text-right justify-center md:justify-end">
              <span>file://minillm.app/index</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-neutral-900">
                <path d="M3 3h8v8H3zM5 5v4h4V5zM13 3h8v8h-8zM15 5v4h4V5zM3 13h8v8H3zM5 15v4h4v-4zM13 13h2v2h-2zM15 13h2v2h-2zM17 13h2v2h-2zM19 13h2v2h-2zM13 15h2v2h-2zM17 15h2v2h-2zM13 17h2v2h-2zM15 17h2v2h-2zM19 17h2v2h-2zM13 19h2v2h-2zM17 19h2v2h-2zM19 19h2v2h-2z" />
              </svg>
            </div>
          </div>
          <div className="mt-16 text-center text-[10px] text-neutral-400">
            END OF DOCUMENT. / PAGE 05 OF 05.
          </div>
        </div>
      </section>

      {/* Global Fixed Footer */}
      <div
        className={`fixed bottom-0 left-0 z-50 w-full border-t border-neutral-300 bg-[#F7F2E4] transition-all duration-500 ease-in-out ${showFixedFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
          }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 font-mono text-xs font-bold tracking-widest text-neutral-600 sm:px-8">
          <span>© MEGALLM / 2026</span>
          <span>file://minillm.app</span>
        </div>
      </div>
    </div>
    </>
  )
}
