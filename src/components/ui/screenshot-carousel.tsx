"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ScreenshotCarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    title: React.ReactNode;
    subtitle?: string;
    images: { src: string; alt: string; icon?: string; description?: string; }[];
}

export const ScreenshotCarousel = React.forwardRef<HTMLDivElement, ScreenshotCarouselProps>(
    ({ title, subtitle, images, className, ...props }, ref) => {
        const [currentIndex, setCurrentIndex] = React.useState(Math.floor(images.length / 2));
        const currentImage = images[currentIndex];

        const handleNext = React.useCallback(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, [images.length]);

        const handlePrev = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        };

        React.useEffect(() => {
            const timer = setInterval(() => {
                handleNext();
            }, 4000);
            return () => clearInterval(timer);
        }, [handleNext]);

        return (
            <div
                ref={ref}
                className={cn(
                    'relative w-full py-20 flex flex-col items-center justify-center overflow-x-hidden px-4',
                    className
                )}
                {...props}
            >

                {/* Content */}
                <div className="z-10 flex w-full flex-col items-center text-center space-y-8 md:space-y-12">
                    {/* Header Section */}
                    <div className="space-y-4" dir="rtl">
                        <div className="w-16 h-1 bg-teal-500 rounded-full mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-4xl">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="max-w-2xl mx-auto text-gray-600 md:text-xl">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Main Showcase Section */}
                    <div className="relative w-full h-[550px] md:h-[700px] flex items-center justify-center">
                        {/* Carousel Wrapper */}
                        <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
                            {images.map((image, index) => {
                                const offset = index - currentIndex;
                                const total = images.length;
                                let pos = (offset + total) % total;
                                if (pos > Math.floor(total / 2)) {
                                    pos = pos - total;
                                }

                                const isCenter = pos === 0;
                                const isAdjacent = Math.abs(pos) === 1;

                                return (
                                    <div
                                        key={index}
                                        className={cn(
                                            'absolute w-48 md:w-64 transition-all duration-500 ease-in-out',
                                            'flex flex-col items-center'
                                        )}
                                        style={{
                                            transform: `
                        translateX(${(pos) * 55}%) 
                        scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7})
                        rotateY(${(pos) * -10}deg)
                      `,
                                            zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                                            opacity: isCenter ? 1 : isAdjacent ? 0.5 : 0,
                                            filter: isCenter ? 'blur(0px)' : 'blur(3px)',
                                            visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
                                        }}
                                    >
                                        {/* Title and Description - Moves with card */}
                                        <div className="flex flex-col items-center gap-1 mb-4" dir="rtl">
                                            {image.icon && (
                                                <Image
                                                    src={image.icon}
                                                    alt={image.alt}
                                                    width={80}
                                                    height={80}
                                                    className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-xl mb-1"
                                                />
                                            )}
                                            <p className="text-white text-base md:text-lg font-bold max-w-xs text-center drop-shadow-md">
                                                {image.alt}
                                            </p>
                                            {image.description && (
                                                <p className="text-gray-300 text-xs md:text-sm max-w-xs text-center drop-shadow-md">
                                                    {image.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Screenshot */}
                                        <div className="w-full h-96 md:h-[500px]">
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                width={256}
                                                height={500}
                                                className="object-cover w-full h-full rounded-3xl shadow-2xl"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation Buttons */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-gray-800/50 backdrop-blur-sm border-white/20 text-white hover:bg-gray-700/50 hover:text-white"
                            onClick={handlePrev}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-gray-800/50 backdrop-blur-sm border-white/20 text-white hover:bg-gray-700/50 hover:text-white"
                            onClick={handleNext}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
);

ScreenshotCarousel.displayName = 'ScreenshotCarousel';
