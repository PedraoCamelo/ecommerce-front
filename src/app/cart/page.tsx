'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore()

  if (items.length === 0) return (
    <div className="text-center py-32">
      <p className="text-gray-500 mb-6">Seu carrinho está vazio</p>
      <Link
        href="/products"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Ver produtos
      </Link>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Carrinho</h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map(item => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-gray-400 text-xs">Sem foto</span>
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500 text-sm">
                {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-sm"
              >
                -
              </button>
              <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-sm"
              >
                +
              </button>
            </div>

            <p className="font-semibold w-20 text-right">
              {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>

            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500">Total</span>
          <span className="text-2xl font-bold">
            {total().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <Link
          href="/checkout"
          className="block w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-center"
        >
          Finalizar pedido
        </Link>
      </div>
    </div>
  )
}