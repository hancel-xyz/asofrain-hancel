"use client";

import { useCallback, useRef, useState } from "react";
import { CrosshairIcon, ImageIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function parse(value: string) {
  const [x, y] = value.split(/\s+/).map((n) => parseFloat(n));
  return {
    x: Number.isFinite(x) ? Math.min(100, Math.max(0, x)) : 50,
    y: Number.isFinite(y) ? Math.min(100, Math.max(0, y)) : 50,
  };
}

/**
 * Lets an editor pick which part of a photo survives the crop.
 *
 * Cards on the public site show photos at a fixed aspect ratio, so a tall
 * photo of a group loses its heads and a wide one loses its sides. Clicking
 * (or dragging) on the preview stores an `object-position` string that the
 * site then applies to that image everywhere it's cropped.
 */
export function FocalPointPicker({
  name,
  src,
  defaultValue = "50% 50%",
  aspectClassName = "aspect-[16/10]",
  className,
  hint = "Haz clic sobre la zona que siempre debe verse.",
}: {
  /** Field name for the hidden input submitted with the form. */
  name: string;
  src?: string;
  defaultValue?: string;
  aspectClassName?: string;
  className?: string;
  hint?: string;
}) {
  const [point, setPoint] = useState(() => parse(defaultValue));
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromEvent = useCallback((clientX: number, clientY: number) => {
    const box = boxRef.current?.getBoundingClientRect();
    if (!box || box.width === 0 || box.height === 0) return;
    setPoint({
      x: Math.round(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100))),
      y: Math.round(Math.min(100, Math.max(0, ((clientY - box.top) / box.height) * 100))),
    });
  }, []);

  const value = `${point.x}% ${point.y}%`;

  return (
    <div className={cn("space-y-2", className)}>
      <input type="hidden" name={name} value={value} readOnly />

      <div
        ref={boxRef}
        role="application"
        aria-label="Selector de encuadre. Usa las flechas para mover el punto."
        tabIndex={0}
        className={cn(
          "relative w-full overflow-hidden rounded-lg border bg-muted select-none touch-none",
          src ? "cursor-crosshair" : "cursor-not-allowed",
          aspectClassName
        )}
        onPointerDown={(e) => {
          if (!src) return;
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromEvent(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromEvent(e.clientX, e.clientY);
        }}
        onPointerUp={(e) => {
          dragging.current = false;
          e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 10 : 2;
          const moves: Record<string, [number, number]> = {
            ArrowLeft: [-step, 0],
            ArrowRight: [step, 0],
            ArrowUp: [0, -step],
            ArrowDown: [0, step],
          };
          const move = moves[e.key];
          if (!move) return;
          e.preventDefault();
          setPoint((p) => ({
            x: Math.min(100, Math.max(0, p.x + move[0])),
            y: Math.min(100, Math.max(0, p.y + move[1])),
          }));
        }}
      >
        {src ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: value }} />
            {/* Rule-of-thirds guides, only while the control has focus/hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity hover:opacity-100">
              <div className="absolute inset-y-0 left-1/3 w-px bg-white/50" />
              <div className="absolute inset-y-0 left-2/3 w-px bg-white/50" />
              <div className="absolute inset-x-0 top-1/3 h-px bg-white/50" />
              <div className="absolute inset-x-0 top-2/3 h-px bg-white/50" />
            </div>
            <div
              className="pointer-events-none absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/35 shadow-[0_0_0_2px_rgba(0,0,0,0.25)] backdrop-blur-[1px]"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <CrosshairIcon className="h-4 w-4 text-white" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageIcon className="h-6 w-6 opacity-40" />
            <span className="text-xs">Sube una imagen para elegir el encuadre</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">{hint}</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 px-2 text-xs"
          onClick={() => setPoint({ x: 50, y: 50 })}
          disabled={!src}
        >
          <RotateCcwIcon className="h-3.5 w-3.5" />
          Centrar
        </Button>
      </div>
    </div>
  );
}
