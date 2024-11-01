'use client';

import { useTheme } from "next-themes";
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
// import { SpacingToken } from '../types';


interface MaskOptions {
    none: 'none';
    cursor: 'cursor';
    topLeft: 'topLeft';
    topRight: 'topRight';
    bottomLeft: 'bottomLeft';
    bottomRight: 'bottomRight';
}

type MaskType = keyof MaskOptions;

interface BackgroundProps {
    position?: CSSProperties['position'];
    gradient?: GradientProps;
    dots?: DotsProps;
    lines?: LinesProps;
    mask?: MaskType;
    className?: string;
    style?: React.CSSProperties;
}

interface GradientProps {
    display?: boolean;
    opacity?: number;
}

interface DotsProps {
    display?: boolean;
    opacity?: number;
    color?: string;
    size?: any;
}

interface LinesProps {
    display?: boolean;
    opacity?: number;
    size?: any;
}

export default function Background({
    position = 'fixed',
    gradient = {},
    dots = {},
    lines = {},
    mask = 'none',
    className,
    style
}: BackgroundProps) {
    const [mounted, setMounted] = useState(false)
    const { theme, resolvedTheme } = useTheme()

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true)
    }, [theme])

    const colors: any = {
        dot: {
            dark: '#b4d6fb',
            light: '#1a1b1c'
        },
        gradient: {
            light: ['#ffd3d3', "#a19fc5", "#ad71df"],
            dark: ['#0a0a0a', '#0d0b44', '#7d04e4']
        },
        line: {
            dark: '#b4d6fb',
            light: '#1a1b1c'
        }
    }

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (backgroundRef.current) {
                const rect = backgroundRef.current.getBoundingClientRect();
                setCursorPosition({
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const updateSmoothPosition = () => {
            setSmoothPosition((prev) => {
                const dx = cursorPosition.x - prev.x;
                const dy = cursorPosition.y - prev.y;
                const easingFactor = 0.05;

                return {
                    x: Math.round(prev.x + dx * easingFactor),
                    y: Math.round(prev.y + dy * easingFactor),
                };
            });
            animationFrameId = requestAnimationFrame(updateSmoothPosition);
        };

        if (mask === 'cursor') {
            animationFrameId = requestAnimationFrame(updateSmoothPosition);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [cursorPosition, mask]);

    if (!mounted || !resolvedTheme) return <></>
    let dotsColor = dots.color || colors.dot[resolvedTheme];
    let dotsSize = dots.size || '16';

    let maskSize = 1200;

    // setRef(forwardedRef, backgroundRef.current);


    let commonStyles: CSSProperties = {
        // @ts-ignore
        position,
        // @ts-ignore
        top: 0,
        // @ts-ignore
        left: '0',
        // @ts-ignore
        zIndex: -1,
        // @ts-ignore
        width: '100%',
        // @ts-ignore
        height: '100%',
        // @ts-ignore
        pointerEvents: 'none',
        ...style,
    };

    let maskStyle = (): CSSProperties => {
        switch (mask) {
            case 'none':
                return { maskImage: 'none' };
            case 'cursor':
                return {
                    maskImage: `radial-gradient(circle ${maskSize / 2}px at ${smoothPosition.x}px ${smoothPosition.y}px, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                    maskSize: '100% 100%',
                };
            case 'topLeft':
                return {
                    maskImage: `radial-gradient(circle ${maskSize / 2}px at 0% 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                    maskSize: '100% 100%',
                };
            case 'topRight':
                return {
                    maskImage: `radial-gradient(circle ${maskSize / 2}px at 100% 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                    maskSize: '100% 100%',
                };
            case 'bottomLeft':
                return {
                    maskImage: `radial-gradient(circle ${maskSize / 2}px at 0% 100%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                    maskSize: '100% 100%',
                };
            case 'bottomRight':
                return {
                    maskImage: `radial-gradient(circle ${maskSize / 2}px at 100% 100%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                    maskSize: '100% 100%',
                };
            default:
                return {};
        }
    };

    return (
        <>
            {gradient.display && (
                <div
                    ref={backgroundRef}
                    className={className}
                    style={{
                        ...commonStyles,
                        opacity: (gradient.opacity || 0.4)*(resolvedTheme=="dark"?1.2:.7),
                        background: `radial-gradient(100% 100% at 49.99% 0%, transparent 0%, ${colors.gradient[resolvedTheme][0]} 100%), radial-gradient(87.4% 84.04% at 6.82% 16.24%, ${colors.gradient[resolvedTheme][1]} 0%, transparent 100%), radial-gradient(217.89% 126.62% at 48.04% 0%, ${colors.gradient[resolvedTheme][2]} 0%, transparent 100%)`,
                        ...maskStyle(),
                    }}
                />
            )}
            {dots.display && (
                <div
                    ref={backgroundRef}
                    className={className}
                    style={{
                        ...commonStyles,
                        opacity: (dots.opacity || 0.4)*(resolvedTheme=="light"?1.2:1),
                        backgroundImage: `radial-gradient(${dotsColor} 0.8px, #00000000 0.8px)`,
                        backgroundSize: `1.3rem 1.3rem`,
                        ...maskStyle(),
                    }}
                />
            )}
            {lines.display && (
                <div
                    ref={backgroundRef}
                    className={className}
                    style={{
                        ...commonStyles,
                        opacity: lines.opacity || 0.4,
                        backgroundImage: `repeating-linear-gradient(45deg, #b4d6fb 0, #b4d6fb 0.5px, transparent 0.5px ${dotsSize}px) `,
                        ...maskStyle(),
                    }}
                />
            )}
        </>
    );
}