'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function Navbar() {
  const items = useCartStore(state => state.items)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link href="/" className="text-xl font-bold text-gray-900">
          loja
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors">
            Produtos
          </Link>
          <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 transition-colors">
            Entrar
          </Link>
          <Link href="/cart" className="relative text-gray-600 hover:text-gray-900 transition-colors">
            Carrinho
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  )
}