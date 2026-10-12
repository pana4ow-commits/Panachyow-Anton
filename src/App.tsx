import { useEffect, useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import JapaneseBannerRibbon from './components/JapaneseBannerRibbon';

export default function App() {
  const [dateTime, setDateTime] = useState({
    date: '12/10/2026',
    time: '02:36pm'
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('panachyow_theme');
      if (saved) return saved === 'dark';
    }
    return false; // Default to light mode matching the original site
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync dark class on html and body
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('panachyow_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('panachyow_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format en-GB: DD/MM/YYYY
      const dateStr = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(now);

      // Format en-US: hh:mma lowercase without space (e.g. 02:36pm)
      const timeStr = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
        .format(now)
        .replace(/\s+/g, '')
        .toLowerCase();

      setDateTime({ date: dateStr, time: timeStr });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ensure autoplay works reliably
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <main
        className={`min-h-screen w-full relative flex flex-col items-center justify-start px-2 py-2 sm:px-6 sm:py-6 pb-10 sm:pb-12 select-text transition-colors duration-200 overflow-x-hidden ${
          isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'
        }`}
      >
        {/* 390px Content Container matching Framer layout */}
        <div className="w-full max-w-[390px] flex flex-col items-center gap-[32px] pt-1 sm:pt-0 relative z-10">
          
          {/* SECTION 1: HEADER (Logo, RadioAlice, Live Timings & Theme Switcher) */}
          <header className="w-full flex flex-col gap-[10px]">
            {/* Top Row: Logo on left, RadioAlice with equalizer on right */}
            <div className="w-full flex flex-row justify-between items-center h-[22px]">
              {/* SVG Red Box Logo "panachyow" */}
              <div className="w-[84px] h-[22px] flex-none select-none" aria-label="Logo">
              <svg
                width="84"
                height="22"
                viewBox="0 0 84 22"
                fill="none"
                className="w-[84px] h-[22px] block"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="84" height="21.9675" fill="#FF0009" />
                <path
                  d="M8.0342 11.1557L7.32066 15.5652H4.98975L6.87668 3.77526H10.048C11.2108 3.77526 12.1041 3.99938 12.7277 4.44763C13.362 4.88545 13.6791 5.59431 13.6791 6.5742C13.6791 6.84524 13.6527 7.13191 13.5999 7.43422C13.4096 8.67472 12.9339 9.6077 12.1728 10.2332C11.4222 10.8482 10.4285 11.1557 9.19173 11.1557H8.0342ZM8.90632 5.68292L8.33548 9.24806H8.81118C9.56172 9.24806 10.122 9.12297 10.492 8.87278C10.8725 8.6226 11.1209 8.13786 11.2372 7.41858C11.2584 7.25179 11.2689 7.09542 11.2689 6.94948C11.2689 6.43869 11.1051 6.0999 10.7774 5.9331C10.4603 5.76631 9.97399 5.68292 9.31859 5.68292H8.90632Z"
                  fill="white"
                />
                <path
                  d="M21.2636 7.88768L20.0268 15.5652H17.8386L17.9496 14.8616H17.9179C17.6325 15.1639 17.2889 15.3984 16.8872 15.5652C16.4855 15.732 16.0786 15.8154 15.6663 15.8154C14.7149 15.8154 13.9749 15.4975 13.4464 14.8616C12.9284 14.2153 12.6694 13.423 12.6694 12.4848C12.6694 12.2242 12.6905 11.9584 12.7328 11.6874C12.8174 11.1766 12.9812 10.6814 13.2244 10.2019C13.4675 9.71194 13.7741 9.27412 14.1441 8.88842C14.514 8.50272 14.9369 8.20041 15.4126 7.9815C15.8883 7.75216 16.3957 7.63749 16.9348 7.63749C17.3471 7.63749 17.7329 7.72089 18.0923 7.88768C18.4518 8.05447 18.7425 8.29423 18.9644 8.60696L19.0754 7.88768H21.2636ZM16.475 13.8765C16.7498 13.8765 17.0141 13.8139 17.2678 13.6888C17.5215 13.5638 17.7435 13.397 17.9338 13.1885C18.1346 12.98 18.2985 12.7507 18.4253 12.5005C18.5522 12.2399 18.6367 11.9792 18.679 11.7186C18.7002 11.5935 18.7107 11.4685 18.7107 11.3434C18.7107 10.8638 18.5733 10.4521 18.2985 10.1081C18.0236 9.75364 17.6484 9.57643 17.1727 9.57643C16.8978 9.57643 16.6335 9.63897 16.3798 9.76407C16.1367 9.87873 15.9147 10.0403 15.7139 10.2488C15.5236 10.4573 15.365 10.6918 15.2382 10.9524C15.1113 11.2026 15.0267 11.458 14.9845 11.7186C14.9633 11.8437 14.9527 11.9688 14.9527 12.0939C14.9527 12.5839 15.0849 13.006 15.3492 13.3605C15.624 13.7045 15.9993 13.8765 16.475 13.8765Z"
                  fill="white"
                />
                <path
                  d="M24.4576 7.88768L24.3466 8.59132H24.3783C24.6426 8.26817 24.965 8.02841 25.3456 7.87204C25.7262 7.71567 26.1279 7.63749 26.5507 7.63749C27.3541 7.63749 27.9302 7.84077 28.2791 8.24732C28.6385 8.64345 28.8182 9.19594 28.8182 9.9048C28.8182 10.1967 28.7918 10.5198 28.7389 10.8743L27.9778 15.5652H25.7579L26.408 11.4997L26.4238 11.3903C26.4978 10.9524 26.5348 10.6345 26.5348 10.4364C26.5348 10.1133 26.4608 9.85789 26.3128 9.67025C26.1649 9.48261 25.9111 9.38879 25.5517 9.38879C25.2346 9.38879 24.9703 9.46697 24.7589 9.62334C24.5475 9.76928 24.3836 9.96213 24.2673 10.2019C24.1511 10.4312 24.0612 10.671 23.9978 10.9212C23.9344 11.1609 23.8815 11.4424 23.8392 11.7655L23.2208 15.5652H21.0009L22.2377 7.88768H24.4576Z"
                  fill="white"
                />
                <path
                  d="M37.524 7.88768L36.2872 15.5652H34.099L34.21 14.8616H34.1783C33.8929 15.1639 33.5493 15.3984 33.1476 15.5652C32.7459 15.732 32.339 15.8154 31.9267 15.8154C30.9753 15.8154 30.2353 15.4975 29.7068 14.8616C29.1888 14.2153 28.9298 13.423 28.9298 12.4848C28.9298 12.2242 28.9509 11.9584 28.9932 11.6874C29.0778 11.1766 29.2416 10.6814 29.4848 10.2019C29.7279 9.71194 30.0345 9.27412 30.4045 8.88842C30.7744 8.50272 31.1973 8.20041 31.673 7.9815C32.1487 7.75216 32.6561 7.63749 33.1952 7.63749C33.6075 7.63749 33.9933 7.72089 34.3527 7.88768C34.7122 8.05447 35.0029 8.29423 35.2248 8.60696L35.3358 7.88768H37.524ZM32.7354 13.8765C33.0102 13.8765 33.2745 13.8139 33.5282 13.6888C33.7819 13.5638 34.0039 13.397 34.1942 13.1885C34.395 12.98 34.5589 12.7507 34.6857 12.5005C34.8126 12.2399 34.8971 11.9792 34.9394 11.7186C34.9606 11.5935 34.9711 11.4685 34.9711 11.3434C34.9711 10.8638 34.8337 10.4521 34.5589 10.1081C34.284 9.75364 33.9088 9.57643 33.4331 9.57643C33.1582 9.57643 32.8939 9.63897 32.6402 9.76407C32.3971 9.87873 32.1751 10.0403 31.9743 10.2488C31.784 10.4573 31.6254 10.6918 31.4986 10.9524C31.3717 11.2026 31.2871 11.458 31.2449 11.7186C31.2237 11.8437 31.2131 11.9688 31.2131 12.0939C31.2131 12.5839 31.3453 13.006 31.6096 13.3605C31.8844 13.7045 32.2597 13.8765 32.7354 13.8765Z"
                  fill="white"
                />
                <path
                  d="M43.7466 8.12223L43.4136 10.2332C43.2022 9.98298 42.9749 9.79534 42.7318 9.67025C42.4993 9.54515 42.2244 9.48261 41.9073 9.48261C41.3047 9.48261 40.7867 9.71194 40.3533 10.1706C39.9305 10.6293 39.6715 11.1609 39.5764 11.7655C39.5446 11.9115 39.5288 12.0522 39.5288 12.1877C39.5288 12.709 39.6821 13.1364 39.9886 13.4699C40.2952 13.8035 40.718 13.9703 41.2571 13.9703C41.5531 13.9703 41.8438 13.9078 42.1293 13.7827C42.4253 13.6471 42.6948 13.4647 42.9379 13.2354L42.5891 15.3463C41.9654 15.6591 41.3047 15.8154 40.607 15.8154C39.5922 15.8154 38.7782 15.4871 38.1651 14.8303C37.8691 14.528 37.6419 14.1736 37.4833 13.767C37.3353 13.3501 37.2613 12.907 37.2613 12.4379C37.2613 12.219 37.2824 11.9897 37.3247 11.7499C37.4093 11.187 37.589 10.6554 37.8639 10.155C38.1493 9.65461 38.5034 9.21679 38.9262 8.84151C39.3491 8.46623 39.8248 8.17435 40.3533 7.96586C40.8924 7.74695 41.4474 7.63749 42.0183 7.63749C42.6948 7.63749 43.2709 7.79907 43.7466 8.12223Z"
                  fill="white"
                />
                <path
                  d="M45.4258 2.30542H47.6457L46.6468 8.52878H46.6785C46.9533 8.22647 47.281 8.00235 47.6616 7.8564C48.0421 7.71046 48.4386 7.63749 48.8508 7.63749C49.6542 7.63749 50.2304 7.84077 50.5792 8.24732C50.9386 8.64345 51.1183 9.19594 51.1183 9.9048C51.1183 10.1967 51.0919 10.5198 51.039 10.8743L50.2779 15.5652H48.058L48.7081 11.4997L48.724 11.3903C48.798 10.9524 48.835 10.6345 48.835 10.4364C48.835 10.1133 48.761 9.85789 48.613 9.67025C48.465 9.48261 48.2113 9.38879 47.8519 9.38879C47.5347 9.38879 47.2705 9.46697 47.059 9.62334C46.8476 9.76928 46.6838 9.96213 46.5675 10.2019C46.4512 10.4312 46.3614 10.671 46.2979 10.9212C46.2345 11.1609 46.1816 11.4424 46.1394 11.7655L45.521 15.5652H43.301L45.4258 2.30542Z"
                  fill="white"
                />
                <path
                  d="M53.656 14.3925L51.3885 7.88768H53.9097L55.0672 12.2503L57.7628 7.88768H60.2365L52.6887 19.662H50.2468L53.656 14.3925Z"
                  fill="white"
                />
                <path
                  d="M63.654 7.63749C64.7323 7.63749 65.5833 7.94501 66.2069 8.56005C66.8412 9.16466 67.1583 9.96734 67.1583 10.9681C67.1583 11.2183 67.1372 11.4737 67.0949 11.7343C66.9998 12.318 66.8148 12.8601 66.5399 13.3605C66.2651 13.8608 65.9162 14.2987 65.4934 14.674C65.0706 15.0388 64.5896 15.3203 64.0504 15.5183C63.5113 15.7164 62.9458 15.8154 62.3538 15.8154C61.2756 15.8154 60.4193 15.5131 59.785 14.9085C59.1614 14.2935 58.8495 13.4908 58.8495 12.5005C58.8495 12.2503 58.8706 11.9949 58.9129 11.7343C59.0081 11.1401 59.1931 10.5928 59.4679 10.0924C59.7428 9.59206 60.0916 9.15945 60.5144 8.7946C60.9478 8.41932 61.4288 8.13265 61.9574 7.93459C62.4965 7.73652 63.0621 7.63749 63.654 7.63749ZM63.3528 9.57643C63.0779 9.57643 62.8136 9.63897 62.5599 9.76407C62.3168 9.87873 62.0948 10.0403 61.894 10.2488C61.7037 10.4573 61.5451 10.6918 61.4183 10.9524C61.2914 11.2026 61.2068 11.4632 61.1646 11.7343C61.1434 11.8594 61.1328 11.9845 61.1328 12.1096C61.1328 12.5891 61.265 13.006 61.5293 13.3605C61.8041 13.7045 62.1794 13.8765 62.6551 13.8765C62.9299 13.8765 63.1889 13.8139 63.432 13.6888C63.6857 13.5638 63.9077 13.4022 64.098 13.2041C64.2989 12.9956 64.4627 12.7663 64.5896 12.5161C64.7164 12.2555 64.801 11.9949 64.8433 11.7343C64.8644 11.5988 64.875 11.4685 64.875 11.3434C64.875 10.843 64.7376 10.426 64.4627 10.0924C64.1984 9.74843 63.8285 9.57643 63.3528 9.57643Z"
                  fill="white"
                />
                <path
                  d="M69.471 7.88768L70.3749 12.3128L73.0229 7.63749H74.0853L75.2428 12.3754L77.6213 7.88768H80.0315L75.1477 15.7216H74.0219L73.118 11.0463L70.5017 15.7216H69.36L67.045 7.88768H69.471Z"
                  fill="white"
                />
              </svg>
            </div>

            {/* RadioAlice with equalizer */}
            <a
              href="https://pana4ow-commits.github.io/radi-alice/"
              target="_blank"
              rel="noopener noreferrer"
              className={`framer-link-tag flex items-center gap-[4px] px-[3px] select-none ${
                isDark ? '!text-white' : '!text-black'
              }`}
              title="RadioAlice"
            >
              <span className="eq-bars" aria-hidden="true">
                <span className="eq-bar eq-bar-1" />
                <span className="eq-bar eq-bar-2" />
                <span className="eq-bar eq-bar-3" />
              </span>
              <span className="leading-none">RadioAlice</span>
            </a>
          </div>

          {/* Bottom Row: Live Clock Timings on left, Mini Theme Switcher on right */}
          <div className="w-full flex flex-row justify-between items-center h-[16px]">
            {/* Date & Time display */}
            <div
              className={`flex flex-row items-center gap-[16px] text-[12px] font-['Courier_New',monospace] tracking-[-0.06em] leading-none transition-colors duration-200 select-none ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              <span className="whitespace-pre">{dateTime.date}</span>
              <span className="whitespace-pre">{dateTime.time}</span>
            </div>

            {/* Mini Theme Switcher */}
            <div className="flex items-center">
              <button
                onClick={toggleTheme}
                type="button"
                role="switch"
                aria-checked={isDark}
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                title={isDark ? "Light mode" : "Dark mode"}
                className="cursor-pointer flex items-center justify-center outline-none select-none p-0 group"
              >
                <div
                  className={`w-[24px] h-[13px] rounded-full p-[1px] transition-colors duration-200 flex items-center ${
                    isDark ? 'bg-[#FF0009]' : 'bg-neutral-300 group-hover:bg-neutral-400'
                  }`}
                >
                  <div
                    className={`w-[11px] h-[11px] rounded-full bg-white flex items-center justify-center transition-transform duration-200 shadow-xs ${
                      isDark ? 'translate-x-[11px]' : 'translate-x-0'
                    }`}
                  >
                    {isDark ? (
                      <Moon className="w-[6.5px] h-[6.5px] text-[#FF0009]" strokeWidth={2.5} />
                    ) : (
                      <Sun className="w-[7px] h-[7px] text-neutral-800" strokeWidth={2.5} />
                    )}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </header>

          {/* SECTION 2: VIDEO */}
          <section
            className={`w-full h-[223px] relative overflow-hidden transition-colors duration-200 ${
              isDark ? 'bg-white/5' : 'bg-black/5'
            }`}
          >
            <video
              ref={videoRef}
              src="https://framerusercontent.com/assets/os27pIvff782S6PLnHzigVQIEM.mp4"
              poster="https://framerusercontent.com/images/i9Q8wE5wS80Reo4uAB29ExJJGg.png"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover block"
            />
          </section>

          {/* SECTION 3: SKILLS & 'MY WORK' LINK */}
          <section className="w-full min-h-[43px] flex flex-row justify-between items-end">
            {/* Left: Design capabilities */}
            <div
              className={`flex flex-col gap-0 justify-center text-[12px] font-bold tracking-[-0.03em] leading-none transition-colors duration-200 ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              <p className="whitespace-pre leading-[14px]">UI/UX Design</p>
              <p className="whitespace-pre leading-[14px]">Design Systems</p>
              <p className="whitespace-pre leading-[14px]">Mobile &amp; Desktop Interfaces</p>
            </div>

            {/* Right: Work link and Visual Design */}
            <div className="flex flex-col items-end gap-[1px]">
              <a
                href="https://www.image2url.com/r2/default/documents/1791533489250-6b67487b-510b-4142-aa67-d956f2404240.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`framer-link-tag ${isDark ? '!text-white' : '!text-black'}`}
              >
                my work
              </a>
              <span
                className={`text-[12px] font-bold tracking-[-0.03em] leading-none whitespace-pre transition-colors duration-200 ${
                  isDark ? 'text-[#737373]' : 'text-[#ababab]'
                }`}
              >
                Visual Design
              </span>
            </div>
          </section>

          {/* SECTION 4: WORK EXPERIENCE (7 roles, 18 lines) */}
          <section
            className={`w-full flex flex-col gap-0 text-[12px] font-bold tracking-[-0.03em] transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            {/* Item 1 */}
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">User Interface Designer / Fintech</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">Xdata · Amio Bank</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">2025 - 2026</p>

            {/* Item 2 */}
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">User Interface Designer / Fintech</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">Xdata</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">2023 - 2026</p>

            {/* Item 3 */}
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">Digital Product Designer / Creative Design</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">Geecko</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">2022 - 2023</p>

            {/* Item 4 */}
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">Digital Product Designer / Creative Design</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">Dolphin</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">2021 - 2022</p>

            {/* Item 5 */}
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">Digital Product Designer</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">24.Online</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">2019 - 2022</p>

            {/* Item 6 */}
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">Digital Product Designer / Creative Design</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">Landau Interactive</p>
            <p className="w-[252px] leading-[15px] whitespace-pre-wrap break-words">2017 - 2019</p>
          </section>

          {/* SECTION 5: BIO, PHILOSOPHY & CONTACT INFO */}
          <section
            className={`w-full flex flex-col gap-[16px] text-[12px] font-bold tracking-[-0.03em] transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            {/* Paragraph 1 */}
            <div className="w-full max-w-[342px]">
              <p className="w-full leading-[15px] whitespace-pre-wrap break-words">
                I'm looking for a job in Product Design / UX/UI Design. I have designed mobile and desktop banking applications, worked in design studios and am able to combine strong visual presentation with thoughtful user scenarios
              </p>
            </div>

            {/* Paragraph 2 */}
            <div className="w-full max-w-[342px]">
              <p className="w-full leading-[15px] whitespace-pre-wrap break-words">
                It's all about the style, the gear, the team, the sound, and the raw progress. No illusions. Not a render. Not a prompt. Cut deep, wear hard, move unit, play loud.
              </p>
            </div>

            {/* Contact Details Block */}
            <div className="w-full max-w-[342px] flex flex-col gap-[4px]">
              <p className="w-[193px] leading-[15px] whitespace-pre-wrap break-words">
                User Interface Designer / Fintech
              </p>

              <div className="w-full flex flex-col">
                <p className="w-[193px] leading-[15px] whitespace-pre-wrap break-words">
                  panachyow@gmail.com
                </p>

                {/* Offset right-aligned sub-block for Telegram & Linkedin */}
                <div className="w-full flex flex-col items-end">
                  <p
                    className={`w-[193px] leading-[15px] whitespace-pre-wrap break-words transition-colors duration-200 ${
                      isDark ? 'text-[#737373]' : 'text-[#ababab]'
                    }`}
                  >
                    telegram: @Ant98tgh
                  </p>
                  <p
                    className={`w-[193px] leading-[15px] whitespace-pre-wrap break-words transition-colors duration-200 ${
                      isDark ? 'text-[#737373]' : 'text-[#ababab]'
                    }`}
                  >
                    linkedin.com/in/panachyow
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: FOOTER LINKS */}
          <footer className="w-full flex flex-row justify-between items-center z-10 pt-1">
            <a
              href="mailto:pana4ow@gmail.com"
              className={`framer-link-tag ${isDark ? '!text-white' : '!text-black'}`}
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/anton-panachyow-863aa7261"
              target="_blank"
              rel="noopener noreferrer"
              className={`framer-link-tag ${isDark ? '!text-white' : '!text-black'}`}
            >
              Linkedin
            </a>
            <a
              href="https://t.me/Ant98tgh"
              target="_blank"
              rel="noopener noreferrer"
              className={`framer-link-tag ${isDark ? '!text-white' : '!text-black'}`}
            >
              Telegram
            </a>
            <a
              href="https://www.image2url.com/r2/default/documents/1790938000326-e057e91f-04f0-45ea-ad0c-5a5bcb78cd59.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`framer-link-tag ${isDark ? '!text-white' : '!text-black'}`}
            >
              summary
            </a>
          </footer>

          {/* SECTION 7: RETRO 2000s JAPANESE WEB BANNERS (Unpinned at the very bottom / scrolls naturally) */}
          <JapaneseBannerRibbon isDark={isDark} />

        </div>
      </main>
    </div>
  );
}
