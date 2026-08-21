'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const SLIDES = [
  { src: '/hero/slide-partner.jpg', alt: 'Your IT Partner' },
  { src: '/hero/slide-system-integration.jpg', alt: 'System Integration' },
  { src: '/hero/slide-distribution.jpg', alt: 'Distribution Center' },
  { src: '/hero/slide-services.jpg', alt: 'Services Center' },
];

const SLIDE_INTERVAL = 5000;

export default function HeroSlideshow({ overlayClassName }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((i) => (i + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className={overlayClassName} />
    </div>
  );
}
