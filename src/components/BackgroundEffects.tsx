import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'heart' | 'sparkle' | 'butterfly';
  color: string;
  wingAngle?: number;
  wingSpeed?: number;
}

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(248, 187, 208, 0.75)', // primary pink
      'rgba(252, 228, 236, 0.85)', // light blush
      'rgba(236, 64, 122, 0.65)',  // rose pink
      'rgba(173, 20, 87, 0.45)',   // deep pink
      'rgba(255, 255, 255, 0.8)',  // dreamy white
    ];

    const particleCount = window.innerWidth < 768 ? 32 : 55;
    const particles: Particle[] = [];

    const createParticle = (initialY?: number): Particle => {
      const rand = Math.random();
      let type: 'petal' | 'heart' | 'sparkle' | 'butterfly' = 'petal';
      if (rand < 0.4) type = 'petal';
      else if (rand < 0.75) type = 'heart';
      else if (rand < 0.92) type = 'sparkle';
      else type = 'butterfly';

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        size: type === 'sparkle' ? Math.random() * 4 + 2 : Math.random() * 12 + 10,
        speedY: type === 'heart' ? -(Math.random() * 0.8 + 0.3) : Math.random() * 1.1 + 0.5,
        speedX: (Math.random() - 0.5) * 0.9,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.6 + 0.35,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
        wingAngle: 0,
        wingSpeed: Math.random() * 0.15 + 0.1,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const drawHeart = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // top left curve
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      // bottom left curve
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.1);
      // bottom right curve
      c.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      // top right curve
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
    };

    const drawPetal = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.9, size * 0.5, 0, size);
      c.bezierCurveTo(-size * 0.9, size * 0.5, -size * 0.8, -size * 0.5, 0, -size);
      c.closePath();
      c.fill();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        c.lineTo(0, size);
        c.lineTo(size * 0.25, size * 0.25);
        c.rotate(Math.PI / 2);
      }
      c.closePath();
      c.fill();
    };

    const drawButterfly = (c: CanvasRenderingContext2D, size: number, wingAngle: number) => {
      const wingSpread = Math.cos(wingAngle) * (size * 0.8);
      c.beginPath();
      // left wing
      c.ellipse(-size * 0.4, 0, Math.abs(wingSpread), size * 0.7, -Math.PI / 6, 0, Math.PI * 2);
      // right wing
      c.ellipse(size * 0.4, 0, Math.abs(wingSpread), size * 0.7, Math.PI / 6, 0, Math.PI * 2);
      c.fill();

      // little body
      c.fillStyle = 'rgba(173, 20, 87, 0.6)';
      c.fillRect(-1.5, -size * 0.5, 3, size);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.type === 'heart') {
          drawHeart(ctx, p.size);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p.size);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.size);
        } else if (p.type === 'butterfly') {
          p.wingAngle = (p.wingAngle || 0) + (p.wingSpeed || 0.1);
          drawButterfly(ctx, p.size, p.wingAngle);
        }

        ctx.restore();

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around smoothly
        if (p.speedY > 0 && p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.speedY < 0 && p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Click/touch burst of hearts
    const handleTap = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 5; i++) {
        particles.push({
          x: clientX + (Math.random() - 0.5) * 30,
          y: clientY + (Math.random() - 0.5) * 30,
          size: Math.random() * 10 + 10,
          speedY: -(Math.random() * 2 + 1),
          speedX: (Math.random() - 0.5) * 2,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
          opacity: 0.9,
          type: 'heart',
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Limit particle array size
      if (particles.length > 80) {
        particles.splice(0, particles.length - 80);
      }
    };

    window.addEventListener('click', handleTap);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleTap);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
