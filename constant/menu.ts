import { Home, Milk, QrCode, User } from 'lucide-react'

export const menu = [
  {
    icon: Home,
    title: 'Home',
    href: '/',
  },
  {
    icon: Milk,
    title: 'Milk',
    href: '/milk',
  },
  {
    icon: User,
    title: 'Sellers',
    href: '/sellers',
  },
  {
    icon: QrCode,
    title: 'Qr Codes',
    href: '/qrcodes',
  },
]

export type Menu = (typeof menu)[number]
