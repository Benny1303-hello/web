'use client';

import { useEffect, useRef, useState } from 'react';

// Facebook's Page Plugin renders at a fixed pixel width passed in the URL
// (180–500) and does not reflow inside a narrower iframe, so the width is
// measured from the container instead of hardcoded — otherwise the plugin
// is clipped on phones.
const MIN_WIDTH = 180;
const MAX_WIDTH = 500;
const HEIGHT = 600;

export default function FacebookPagePlugin({ pageUrl, title, locale = 'vi_VN' }) {
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () => {
      const next = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, Math.floor(el.clientWidth)));
      setWidth((prev) => (prev === next ? prev : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const src =
    width > 0
      ? `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}` +
        `&tabs=timeline&width=${width}&height=${HEIGHT}&small_header=false` +
        `&adapt_container_width=true&hide_cover=false&show_facepile=true&locale=${locale}`
      : null;

  return (
    <div ref={wrapRef} className="w-full max-w-[500px]" style={{ minHeight: HEIGHT }}>
      {src && (
        <iframe
          key={src}
          title={title}
          src={src}
          width={width}
          height={HEIGHT}
          loading="lazy"
          scrolling="no"
          allow="encrypted-media; web-share"
          className="block overflow-hidden rounded-2xl border-0 bg-white shadow-card ring-1 ring-black/5"
        />
      )}
    </div>
  );
}
