"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "@/lib/auth/actions"
import { ResetPasswordForm } from "@/components/reset-password-form"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  // A locked-out admin has to be able to recover from this very screen; there
  // is nowhere else to send them.
  const [recuperando, setRecuperando] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await signIn(formData)
      if (result?.error) setError(result.error)
    })
  }

  if (recuperando) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 shadow-sm">
            <Image src="/hancel-logo.svg" alt="Hancel" width={398} height={83} className="h-6 w-auto" />
          </div>
          <h1 className="text-xl font-bold mt-2">Recuperar contraseña</h1>
          <FieldDescription>Te enviamos un código al correo de tu cuenta.</FieldDescription>
        </div>
        <ResetPasswordForm onCancel={() => setRecuperando(false)} onDone={() => setRecuperando(false)} />
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 shadow-sm">
              <Image src="/hancel-logo.svg" alt="Hancel" width={398} height={83} className="h-6 w-auto" />
            </div>
            <h1 className="text-xl font-bold mt-2">Panel de administración</h1>
            <FieldDescription>Inicia sesión para continuar.</FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isPending}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={isPending}
            />
          </Field>
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Ingresando..." : "Ingresar"}
            </Button>
            <FieldDescription className="text-center">
              <button
                type="button"
                className="underline underline-offset-4 hover:text-foreground"
                onClick={() => setRecuperando(true)}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
