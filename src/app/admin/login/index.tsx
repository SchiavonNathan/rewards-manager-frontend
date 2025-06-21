import { AdminLoginForm } from "@/components/admin-login-form"
import { motion } from "framer-motion"
import { Shield, Lock } from "lucide-react"

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative flex flex-col p-6 md:p-10">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Header with logo */}
        <div className="relative z-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-2 md:justify-start"
          >
            <a href="#" className="flex items-center gap-2.5 font-medium">
              <div className="bg-red-600 text-white flex size-8 items-center justify-center rounded-lg shadow-sm">
                <Shield size={18} />
              </div>
              <span className="text-xl font-semibold tracking-tight">Trade Technology <span className="text-red-600">Admin</span></span>
            </a>
          </motion.div>
        </div>
        
        {/* Main content area */}
        <div className="relative flex flex-1 items-center justify-center z-10">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8 space-y-2">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-red-100 rounded-full">
                  <Lock className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
              <p className="text-muted-foreground">
                Área restrita para administradores do sistema
              </p>
            </div>
            
            <div className="bg-card rounded-xl shadow-lg p-6 border-slate-200">
              <AdminLoginForm />
            </div>
            
            <div className="mt-4 text-center">
              <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Voltar para login de usuário
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Footer */}
        <div className="relative mt-8 text-center text-sm text-muted-foreground z-10">
          <p>© 2025 Trade Technology. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Suporte</a>
          </div>
        </div>
      </div>
      
      {/* Right column */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 relative hidden lg:block">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
        
        {/* Content overlay */}
        <div className="relative h-full flex flex-col justify-center p-12 text-white">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-lg"
          >
            <div className="mb-6">
              <div className="inline-block rounded-lg bg-red-500/20 px-3 py-1 text-sm backdrop-blur mb-4">
                Painel administrativo
              </div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Gerencie todos os aspectos do sistema</h2>
              <p className="text-lg text-white/80">
                Configure missões, gerencie recompensas e monitore o desempenho das equipes em um só lugar.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">Gestão</div>
                <div className="text-sm text-white/70">Administre usuários e equipes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">Métricas</div>
                <div className="text-sm text-white/70">Acompanhe estatísticas em tempo real</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}