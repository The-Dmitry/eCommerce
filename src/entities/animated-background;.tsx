'use client';

import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Sparkle {
      x: number;
      y: number;
      size: number;
      alpha: number;
      decreasing: boolean;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5;
        this.decreasing = Math.random() > 0.5;
      }

      update() {
        if (this.decreasing) {
          this.alpha -= 0.005;
          if (this.alpha <= 0) {
            this.decreasing = false;
          }
        } else {
          this.alpha += 0.005;
          if (this.alpha >= 0.5) {
            this.decreasing = true;
          }
        }
      }

      draw() {
        if (!ctx) return;

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 2
        );
        gradient.addColorStop(0, `rgba(255, 140, 0, ${this.alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 140, 0, ${this.alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 140, 0, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const sparkles: Sparkle[] = [];
    for (let i = 0; i < 50; i++) {
      sparkles.push(new Sparkle());
    }

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = 'rgba(10, 10, 12, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      sparkles.forEach((sparkle) => {
        sparkle.update();
        sparkle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className='fixed inset-0 -z-10 bg-[#0a0a0c]'>
      <canvas
        ref={canvasRef}
        className='size-full'
        style={{ background: '#0a0a0c' }}
      />
    </div>
  );
};

export default AnimatedBackground;
