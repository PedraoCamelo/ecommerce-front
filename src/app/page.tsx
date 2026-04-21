import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Bem-vindo à loja</h1>
      <p className="text-gray-500 text-lg max-w-md">
        Encontre os melhores produtos com os melhores preços
      </p>
      <Link
        href="/products"
        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
      >
        Ver produtos
      </Link>
    </div>
  )
}