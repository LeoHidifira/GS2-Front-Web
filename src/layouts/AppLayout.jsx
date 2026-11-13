import { Outlet } from 'react-router'

// Layout do cidadão: conteúdo central pensado para celular e navegação inferior fixa
export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main id="conteudo" className="flex-1 w-full max-w-2xl mx-auto px-4 pt-4 pb-28 md:pb-10">
        <Outlet />
      </main>
    </div>
  )
}
