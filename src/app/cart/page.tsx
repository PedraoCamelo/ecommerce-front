'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore()

  function handleRemove(id: string, name: string) {
    removeItem(id)
    toast.info(`${name} removido do carrinho`)
  }

  if (items.length === 0) return (
    <div className="text-center py-32 flex flex-col items-center gap-6">
      <p className="text-muted-foreground">Seu carrinho está vazio</p>
      <Button asChild>
        <Link href="/products">Ver produtos</Link>
      </Button>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Carrinho</h1>

      <div className="flex flex-col gap-4 mb-6">
        {items.map(item => (
          <Card key={item.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-muted-foreground text-xs">Sem foto</span>
                )}
              </div>

              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground text-sm">
                  {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="w-7 h-7"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </Button>
                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                <Button variant="outline" size="icon" className="w-7 h-7"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </Button>
              </div>

              <p className="font-semibold w-20 text-right">
                {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleRemove(item.id, item.name)}
              >
                ✕
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total</span>
            <span className="text-2xl font-bold">
              {total().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6">
          <Button asChild className="w-full">
            <Link href="/checkout">Finalizar pedido</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}