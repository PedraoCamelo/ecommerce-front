'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'

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
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(() => setError('Erro ao carregar produtos'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex justify-center py-32">
      <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="text-center py-32 text-gray-500">{error}</div>
  )

  if (products.length === 0) return (
    <div className="text-center py-32 text-gray-500">Nenhum produto encontrado</div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-gray-400 text-sm">Sem imagem</span>
                )}
              </div>
              <h2 className="font-semibold text-gray-900 mb-1">{product.name}</h2>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <span className="text-xs text-gray-400">{product.stock} em estoque</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}