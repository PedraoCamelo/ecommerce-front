'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { api } from '@/lib/api'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) router.push('/auth/login')
    if (items.length === 0) router.push('/cart')
  }, [])

  async function handleCheckout() {
    setLoading(true)
    setError('')

    try {
      await api.post('/orders', {
        items: items.map(i => ({
          productId: i.id,
          quantity: i.quantity
        }))
      })
      clearCart()
      router.push('/checkout/success')
    } catch {
      setError('Erro ao finalizar pedido. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Finalizar pedido</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold mb-4">Resumo</h2>
        <div className="flex flex-col gap-3">
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.name} × {item.quantity}</span>
              <span className="font-medium">
                {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>{total().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-medium"
      >
        {loading ? 'Processando...' : 'Confirmar pedido'}
      </button>
    </div>
  )
}