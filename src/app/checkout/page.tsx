'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Faça login para continuar')
      router.push('/auth/login')
      return
    }
    if (items.length === 0) router.push('/cart')
  }, [])

  async function handleCheckout() {
    setLoading(true)

    try {
      await api.post('/orders', {
        items: items.map(i => ({
          productId: i.id,
          quantity: i.quantity
        }))
      })
      clearCart()
      toast.success('Pedido realizado com sucesso!')
      router.push('/checkout/success')
    } catch (err: any) {
      toast.error(err.response?.data?.error ?? 'Erro ao finalizar pedido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Finalizar pedido</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Resumo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
              <span className="font-medium">
                {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>{total().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCheckout} disabled={loading} className="w-full">
            {loading ? 'Processando...' : 'Confirmar pedido'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}