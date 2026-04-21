'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string | null
}

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const addItem = useCartStore(state => state.addItem)

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => {
        toast.error('Produto não encontrado')
        router.push('/products')
      })
      .finally(() => setLoading(false))
  }, [id])

  function handleAddToCart() {
    if (!product) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl
    })
    toast.success(`${product.name} adicionado ao carrinho!`)
  }

  if (loading) return (
    <div className="flex justify-center py-32">
      <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!product) return null

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => router.back()} className="mb-8 -ml-2">
        ← Voltar
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card>
          <CardContent className="p-4">
            <div className="w-full h-80 bg-muted rounded-lg flex items-center justify-center">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-muted-foreground">Sem imagem</span>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          <span className="text-3xl font-bold">
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <span className="text-sm text-muted-foreground">{product.stock} em estoque</span>

          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
              -
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
            >
              +
            </Button>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-2"
          >
            {product.stock === 0 ? 'Sem estoque' : 'Adicionar ao carrinho'}
          </Button>
        </div>
      </div>
    </div>
  )
}