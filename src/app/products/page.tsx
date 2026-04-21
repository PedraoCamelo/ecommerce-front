'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(() => toast.error('Erro ao carregar produtos'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex justify-center py-32">
      <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (products.length === 0) return (
    <div className="text-center py-32 text-muted-foreground">Nenhum produto encontrado</div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4">
                <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-muted-foreground text-sm">Sem imagem</span>
                  )}
                </div>
                <h2 className="font-semibold mb-1">{product.name}</h2>
                <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter className="px-4 pb-4 flex justify-between items-center">
                <span className="text-lg font-bold">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <span className="text-xs text-muted-foreground">{product.stock} em estoque</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}