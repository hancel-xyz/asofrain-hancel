"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FocalPointPicker } from "@/components/FocalPointPicker";

/**
 * File input + framing picker for any admin image that gets cropped on the
 * public site.
 *
 * Submits two fields: `<id>` (the file) and `<id>_encuadre` (an
 * `object-position` string). The preview switches to the freshly picked file
 * right away, so the framing is chosen against the photo about to be saved.
 */
export function ImagenConEncuadreField({
  name,
  label = "Imagen",
  help,
  currentUrl,
  currentFocal,
  currentOscuridad,
  aspectClassName = "aspect-[16/10]",
}: {
  /** Field name of the file input; the framing is submitted as `${name}_encuadre`. */
  name: string;
  label?: string;
  help?: string;
  currentUrl?: string;
  currentFocal?: string;
  /** When given, a slider for the dark layer over the photo is shown too. */
  currentOscuridad?: number;
  aspectClassName?: string;
}) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [oscuridad, setOscuridad] = useState(currentOscuridad ?? 0);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const preview = objectUrl || currentUrl || undefined;

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_280px] md:items-start">
      <div className="flex flex-col gap-3">
        <Label htmlFor={name}>{label}</Label>
        <Input
          id={name}
          name={name}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            setObjectUrl(file ? URL.createObjectURL(file) : null);
          }}
        />
        {help && <p className="text-xs text-muted-foreground">{help}</p>}

        {currentOscuridad !== undefined && (
          <div className="flex flex-col gap-2 pt-2">
            <input type="hidden" name={`${name}_oscuridad`} value={oscuridad} readOnly />
            <Label htmlFor={`${name}_oscuridad_range`} className="flex items-center justify-between">
              <span>Capa oscura sobre la imagen</span>
              <span className="font-normal text-muted-foreground tabular-nums">{oscuridad}%</span>
            </Label>
            <input
              id={`${name}_oscuridad_range`}
              type="range"
              min={0}
              max={100}
              step={5}
              value={oscuridad}
              onChange={(e) => setOscuridad(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-xs text-muted-foreground">
              Sube el porcentaje si el texto encima no se lee bien; bájalo para que la foto se aprecie más.
            </p>
          </div>
        )}
      </div>

      <FocalPointPicker
        // Remount on a new file so the picker starts centred for that photo
        // instead of inheriting the previous image's framing.
        key={preview || "vacio"}
        name={`${name}_encuadre`}
        src={preview}
        defaultValue={objectUrl ? "50% 50%" : currentFocal || "50% 50%"}
        aspectClassName={aspectClassName}
      />
    </div>
  );
}
