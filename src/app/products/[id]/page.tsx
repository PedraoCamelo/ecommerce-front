'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'

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
  const [added, setAdded] = useState(false)

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => router.push('/products'))
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
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div className="flex justify-center py-32">
      <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!product) return null

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="text-gray-500 hover:text-gray-900 mb-8 flex items-center gap-2 transition-colors"
      >
        ← Voltar
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-xl" />
          ) : (
            <span className="text-gray-400">Sem imagem</span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 leading-relaxed">{product.description}</p>
          <span className="text-3xl font-bold">
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <span className="text-sm text-gray-400">{product.stock} em estoque</span>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {added ? 'Adicionado!' : 'Adicionar ao carrinho'}
          </button>
        </div>
      </div>
    </div>
  )
}