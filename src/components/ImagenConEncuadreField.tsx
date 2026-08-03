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
  aspectClassName = "aspect-[16/10]",
}: {
  /** Field name of the file input; the framing is submitted as `${name}_encuadre`. */
  name: string;
  label?: string;
  help?: string;
  currentUrl?: string;
  currentFocal?: string;
  aspectClassName?: string;
}) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

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
