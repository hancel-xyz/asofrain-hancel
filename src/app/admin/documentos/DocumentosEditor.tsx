"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileTextIcon, PlusIcon, TrashIcon, Loader2Icon, UploadCloudIcon } from "lucide-react";
import { uploadDocumento } from "./actions";

interface DocumentoData {
  id: string;
  titulo: string;
  url: string;
  key?: string;
}

interface DocumentoState extends DocumentoData {
  status: "ready" | "uploading" | "error" | "empty";
}

function generateDocId() {
  return `documento_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function DocumentosEditor({ initialDocumentos }: { initialDocumentos: DocumentoData[] }) {
  const [documentos, setDocumentos] = useState<DocumentoState[]>(
    initialDocumentos.map((d) => ({ ...d, status: d.url ? "ready" : "empty" }))
  );
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function addDocumento() {
    setDocumentos((prev) => [...prev, { id: generateDocId(), titulo: "", url: "", status: "empty" }]);
  }

  function removeDocumento(id: string) {
    setDocumentos((prev) => prev.filter((d) => d.id !== id));
  }

  function updateTitulo(id: string, titulo: string) {
    setDocumentos((prev) => prev.map((d) => (d.id === id ? { ...d, titulo } : d)));
  }

  async function uploadFile(id: string, file: File) {
    setDocumentos((prev) => prev.map((d) => (d.id === id ? { ...d, status: "uploading" } : d)));
    try {
      const fd = new FormData();
      fd.append("file", file);
      const uploaded = await uploadDocumento(fd);
      setDocumentos((prev) =>
        prev.map((d) =>
          d.id === id
            ? uploaded
              ? { ...d, url: uploaded.url, key: uploaded.key, status: "ready" }
              : { ...d, status: "error" }
            : d
        )
      );
      if (!uploaded) toast.error("No se pudo subir el documento.");
    } catch (error) {
      console.error(error);
      setDocumentos((prev) => prev.map((d) => (d.id === id ? { ...d, status: "error" } : d)));
      toast.error("No se pudo subir el documento.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          {documentos.length} {documentos.length === 1 ? "documento" : "documentos"}
        </span>
        <Button type="button" className="gap-2" onClick={addDocumento}>
          <PlusIcon className="h-4 w-4" />
          Agregar documento
        </Button>
      </div>

      {documentos.length === 0 && (
        <p className="text-sm text-muted-foreground border border-dashed rounded-lg p-6 text-center">
          Todavía no hay documentos. Agrega el primero con el botón de arriba.
        </p>
      )}

      {documentos.map((doc, i) => (
        <div key={doc.id} className="space-y-4 border p-4 rounded-lg relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive h-8 w-8"
              onClick={() => removeDocumento(doc.id)}
              aria-label="Eliminar este documento"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
          <h3 className="font-medium text-lg">Documento {i + 1}</h3>

          {/* Only submitted once it actually has an uploaded url, so an
              in-progress or failed upload can never save a blank entry. */}
          {doc.url && (
            <>
              <input type="hidden" name="documentos_id" value={doc.id} />
              <input type="hidden" name={`${doc.id}_url`} value={doc.url} />
              {doc.key && <input type="hidden" name={`${doc.id}_key`} value={doc.key} />}
            </>
          )}
          <input type="hidden" name={`${doc.id}_titulo`} value={doc.titulo} readOnly />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${doc.id}_titulo_input`}>
                Título <span className="font-normal text-muted-foreground text-xs">(aparece en LEGAL en el footer)</span>
              </Label>
              <Input
                id={`${doc.id}_titulo_input`}
                value={doc.titulo}
                onChange={(e) => updateTitulo(doc.id, e.target.value)}
                placeholder="Ej. Normatividad legal"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Archivo PDF</Label>
              <input
                ref={(el) => { fileInputRefs.current[doc.id] = el; }}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadFile(doc.id, file);
                  e.target.value = "";
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="gap-2 justify-start"
                onClick={() => fileInputRefs.current[doc.id]?.click()}
                disabled={doc.status === "uploading"}
              >
                {doc.status === "uploading" ? (
                  <>
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                    Subiendo...
                  </>
                ) : doc.url ? (
                  <>
                    <FileTextIcon className="h-4 w-4" />
                    Reemplazar PDF
                  </>
                ) : (
                  <>
                    <UploadCloudIcon className="h-4 w-4" />
                    Subir PDF
                  </>
                )}
              </Button>
              {doc.status === "error" && (
                <p className="text-xs text-destructive">Error al subir. Intenta de nuevo.</p>
              )}
              {doc.url && doc.status === "ready" && (
                <a
                  href={`/api/documentos/view?url=${encodeURIComponent(doc.url)}&filename=${encodeURIComponent(doc.titulo || "documento")}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground underline break-all"
                >
                  Ver documento actual
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground text-center">
        Los documentos se suben apenas eliges el archivo. Los cambios de título, orden o eliminación
        se aplican al hacer clic en &quot;Guardar Cambios&quot;.
      </p>
    </div>
  );
}
