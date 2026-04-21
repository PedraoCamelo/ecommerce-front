import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="text-center py-32 flex flex-col items-center gap-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-green-600 text-2xl">✓</span>
      </div>
      <h1 className="text-2xl font-bold">Pedido realizado!</h1>
      <p className="text-gray-500">Seu pedido foi confirmado com sucesso.</p>
      <Link
        href="/products"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Continuar comprando
      </Link>
    </div>
  )
}