import { Outlet } from 'react-router'

// Layout do painel do administrador, usado principalmente no desktop
export default function PainelLayout() {
  return (
    <div className="min-h-screen md:flex">
      <main id="conteudo" className="flex-1 min-w-0 px-4 py-6 md:px-8">
        <Outlet />
      </main>
    </div>
  )
}
