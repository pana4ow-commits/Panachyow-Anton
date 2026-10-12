import { useState, useMemo, useEffect } from 'react';
import { BannerItem, getBannerPool } from '../data/japaneseBanners';

interface JapaneseBannerRibbonProps {
  isDark?: boolean;
}

export default function JapaneseBannerRibbon({ isDark }: JapaneseBannerRibbonProps) {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1000));
  const [isPaused, setIsPaused] = useState(false);

  // Pool of authentic 88x31 vintage Web 1.0 GIF buttons
  const banners = useMemo(() => {
    return getBannerPool(seed);
  }, [seed]);

  // Periodic rotation of fresh authentic buttons into the ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setSeed(prev => (prev + 1) % 10000);
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      aria-label="Retro 88x31 Web Banners"
      className="w-full max-w-[390px] select-none flex justify-center relative z-10 pt-4 pb-2 transition-colors duration-200"
    >
      {/* Cropped strictly to the width of the main composition block (max-w-[390px]) */}
      <div
        className="w-full max-w-[390px] overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Infinite Horizontal Running Marquee */}
        <div className="w-full overflow-hidden relative py-[1px]">
          <div
            className={`flex items-center gap-1.5 whitespace-nowrap ${
              isPaused ? '' : 'animate-marquee-x'
            }`}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {/* Duplicated array for seamless continuous loop */}
            {[...banners, ...banners].map((banner, idx) => (
              <div key={`bottom-ribbon-${banner.id}-${idx}`} className="flex-none">
                <BannerBadge banner={banner} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// BANNER BADGE: Authentic 88x31 vintage GIF buttons (e.g. cabnow.gif, etc.)
// =========================================================================
interface BannerBadgeProps {
  banner: BannerItem;
}

function BannerBadge({ banner }: BannerBadgeProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return null;
  }

  return (
    <div
      title={banner.title}
      className="block flex-none w-[88px] h-[31px] p-0 border-0 outline-none bg-transparent overflow-hidden select-none cursor-default retro-bevel"
    >
      <img
        src={banner.gifUrl}
        alt={banner.title}
        loading="lazy"
        onError={() => setImgError(true)}
        className="w-[88px] h-[31px] object-cover block [image-rendering:pixelated]"
      />
    </div>
  );
}
