"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { HomeIcon, UsersIcon, Settings2Icon, LifeBuoyIcon, SendIcon, FrameIcon, PieChartIcon, MapIcon, TruckIcon, MegaphoneIcon, CalendarDaysIcon } from "lucide-react"

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
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: (
        <LifeBuoyIcon
        />
      ),
    },
    {
      title: "Feedback",
      url: "#",
      icon: (
        <SendIcon
        />
      ),
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: (
        <FrameIcon
        />
      ),
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: (
        <PieChartIcon
        />
      ),
    },
    {
      name: "Travel",
      url: "#",
      icon: (
        <MapIcon
        />
      ),
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <a href="#" className="flex items-center px-2 py-1.5">
          <Image src="/hancel-logo.svg" alt="Hancel" width={398} height={83} className="h-6 w-auto" />
        </a>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
