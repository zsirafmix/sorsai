"use client";

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  direction: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palette for cosmic stars
    const starColors = [
      'rgba(245, 219, 139, ', // Gold
      'rgba(216, 180, 254, ', // Purple
      'rgba(196, 181, 253, ', // Violet
      'rgba(254, 240, 138, ', // Light gold
      'rgba(255, 255, 255, ', // Pure starlight
    ];

    // Generate stars
    const starCount = Math.min(Math.floor((width * height) / 7000), 160);
    const stars: Star[] = Array.from({ length: starCount }, () => {
      const baseAlpha = Math.random() * 0.6 + 0.3;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        baseAlpha,
        alpha: baseAlpha,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        direction: Math.random() > 0.5 ? 1 : -1,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      };
    });

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.008) {
        shootingStars.push({
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 6 + 7,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          alpha: 1,
          active: true,
        });
      }
    };

    // Render loop
    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // 1. Drifting Cosmic Nebulae (Soft purple & gold glowing clusters)
      const nebula1X = width * 0.3 + Math.sin(time * 0.5) * 60;
      const nebula1Y = height * 0.35 + Math.cos(time * 0.4) * 40;
      const grad1 = ctx.createRadialGradient(nebula1X, nebula1Y, 10, nebula1X, nebula1Y, Math.max(width * 0.4, 300));
      grad1.addColorStop(0, 'rgba(96, 43, 168, 0.14)');
      grad1.addColorStop(0.5, 'rgba(38, 18, 77, 0.08)');
      grad1.addColorStop(1, 'rgba(6, 8, 17, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const nebula2X = width * 0.75 + Math.cos(time * 0.6) * 50;
      const nebula2Y = height * 0.65 + Math.sin(time * 0.5) * 50;
      const grad2 = ctx.createRadialGradient(nebula2X, nebula2Y, 10, nebula2X, nebula2Y, Math.max(width * 0.35, 250));
      grad2.addColorStop(0, 'rgba(212, 175, 55, 0.09)');
      grad2.addColorStop(0.5, 'rgba(131, 66, 214, 0.06)');
      grad2.addColorStop(1, 'rgba(6, 8, 17, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Sacred Constellation Lines (Connecting nearby stars)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 95) {
            const lineAlpha = (1 - dist / 95) * 0.12 * Math.min(stars[i].alpha, stars[j].alpha);
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Stars Drawing & Twinkling
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed * star.direction;
        if (star.alpha > star.baseAlpha + 0.3 || star.alpha > 0.95) {
          star.direction = -1;
        } else if (star.alpha < star.baseAlpha - 0.25 || star.alpha < 0.15) {
          star.direction = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${star.alpha})`;
        ctx.shadowBlur = star.radius * 4;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
        ctx.fill();

        // Extra cross-shimmer for brightest stars
        if (star.radius > 1.4 && star.alpha > 0.7) {
          ctx.strokeStyle = `rgba(255, 235, 160, ${star.alpha * 0.35})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 2.5, star.y);
          ctx.lineTo(star.x + star.radius * 2.5, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 2.5);
          ctx.lineTo(star.x, star.y + star.radius * 2.5);
          ctx.stroke();
        }
      });

      // 4. Shooting Stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        if (!s.active) continue;

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const shootGrad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        shootGrad.addColorStop(0, `rgba(255, 245, 200, ${s.alpha})`);
        shootGrad.addColorStop(0.3, `rgba(212, 175, 55, ${s.alpha * 0.7})`);
        shootGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.strokeStyle = shootGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.018;

        if (s.alpha <= 0 || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80"
    />
  );
};
