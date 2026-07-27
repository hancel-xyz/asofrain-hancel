"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { HomeIcon, UsersIcon, Settings2Icon, TruckIcon, MegaphoneIcon, CalendarDaysIcon, PanelBottomIcon, FileTextIcon, Building2Icon } from "lucide-react"
import { isRealImageUrl } from "@/components/ImageSlot"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Inicio",
      url: "/admin/inicio",
      icon: (
        <HomeIcon
        />
      ),
      isActive: true,
      items: [
        {
          title: "Hero",
          url: "/admin/inicio/hero",
        },
        {
          title: "Métricas",
          url: "/admin/inicio/metricas",
        },
        {
          title: "Servicios",
          url: "/admin/inicio/servicios",
        },
        {
          title: "Frase",
          url: "/admin/inicio/frase",
        },
      ],
    },
    {
      title: "Nosotros",
      url: "/admin/nosotros",
      icon: (
        <UsersIcon
        />
      ),
      items: [
        {
          title: "Hero",
          url: "/admin/nosotros/hero",
        },
        {
          title: "Quiénes somos",
          url: "/admin/nosotros/quienes-somos",
        },
        {
          title: "Historia",
          url: "/admin/nosotros/historia",
        },
        {
          title: "Misión",
          url: "/admin/nosotros/mision",
        },
        {
          title: "Visión",
          url: "/admin/nosotros/vision",
        },
        {
          title: "Valores",
          url: "/admin/nosotros/valores",
        },
        {
          title: "Objeto Social",
          url: "/admin/nosotros/objeto-social",
        },
        {
          title: "Objeto Ambiental",
          url: "/admin/nosotros/objeto-ambiental",
        },
        {
          title: "Frase 1",
          url: "/admin/nosotros/frase-1",
        },
        {
          title: "Entidades aliadas",
          url: "/admin/nosotros/entidades-aliadas",
        },
        {
          title: "Menú de navegación",
          url: "/admin/nosotros/menu-navegacion",
        },
      ],
    },
    {
      title: "Servicios",
      url: "/admin/servicios",
      icon: (
        <TruckIcon
        />
      ),
      items: [
        {
          title: "Hero",
          url: "/admin/servicios/hero",
        },
        {
          title: "Servicios",
          url: "/admin/servicios/servicios",
        },
        {
          title: "Servicio destacado (Plus)",
          url: "/admin/servicios/servicio-destacado-plus",
        },
        {
          title: "Rutas, localidades y horarios",
          url: "/admin/servicios/rutas-localidades-horarios",
        },
        {
          title: "Sectores atendidos",
          url: "/admin/servicios/sectores-atendidos",
        },
        {
          title: "Tarifas y productos",
          url: "/admin/servicios/tarifas-y-productos",
        },
        {
          title: "CTA final",
          url: "/admin/servicios/cta-final",
        },
        {
          title: "Menú de navegación",
          url: "/admin/servicios/menu-navegacion",
        },
      ],
    },
    {
      title: "Sensibilización",
      url: "/admin/sensibilizacion",
      icon: (
        <MegaphoneIcon
        />
      ),
      items: [
        {
          title: "Encabezado",
          url: "/admin/sensibilizacion/encabezado",
        },
        {
          title: "Tipos de sensibilización",
          url: "/admin/sensibilizacion/tipos-sensibilizacion",
        },
        {
          title: "Galería",
          url: "/admin/sensibilizacion/galeria",
        },
        {
          title: "Menú de navegación",
          url: "/admin/sensibilizacion/menu-navegacion",
        },
      ],
    },
    {
      title: "Eventos",
      url: "/admin/eventos",
      icon: (
        <CalendarDaysIcon
        />
      ),
      items: [
        {
          title: "Listado de eventos",
          url: "/admin/eventos/listado-eventos",
        },
        {
          title: "Menú de navegación",
          url: "/admin/eventos/menu-navegacion",
        },
      ],
    },
    {
      title: "Documentos",
      url: "/admin/documentos",
      icon: (
        <FileTextIcon
        />
      ),
    },
    {
      title: "Footer",
      url: "/admin/footer",
      icon: (
        <PanelBottomIcon
        />
      ),
      items: [
        {
          title: "Fondo",
          url: "/admin/footer/fondo",
        },
        {
          title: "General",
          url: "/admin/footer/general",
        },
        {
          title: "Contacto",
          url: "/admin/footer/contacto",
        },
      ],
    },
    {
      title: "Configuración",
      url: "/admin/settings",
      icon: (
        <Settings2Icon
        />
      ),
      items: [
        {
          title: "General",
          url: "/admin/settings/general",
        },
        {
          title: "Administradores",
          url: "/admin/settings/administradores",
        },
      ],
    },
  ],
}
export function AppSidebar({
  user,
  org,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user?: { name: string; email: string }
  org?: { nombre: string; logoUrl: string }
}) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <a href="#" className="flex items-center px-2 py-1.5">
          <Image src="/hancel-logo.svg" alt="Hancel" width={398} height={83} className="h-6 w-auto" />
        </a>
        {org && (
          <div className="flex items-center gap-2 rounded-lg border px-2 py-1.5 mx-2 bg-sidebar-accent/40">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
              {isRealImageUrl(org.logoUrl) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={org.logoUrl} alt={org.nombre} className="h-full w-full object-cover" />
              ) : (
                <Building2Icon className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
            <span className="truncate text-sm font-medium">{org.nombre}</span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user ?? data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
