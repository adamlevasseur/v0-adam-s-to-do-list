import type React from "react"
import type { Metadata } from "next"
import { Courier_Prime } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const courier = Courier_Prime({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Adam's To-Do List",
  description: "A to-do list app with recurring tasks",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={courier.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
