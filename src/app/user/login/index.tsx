import { LoginForm } from "@/components/login-form"
import { motion } from "framer-motion"
import { Atom } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left column - Login form */}
      <div className="relative flex flex-col p-6 md:p-10">
        
        {/* Header with logo */}
        <div className="relative z-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-2 md:justify-start"
          >
            <div className="bg-blue-600 text-white flex size-8 items-center justify-center rounded-lg shadow-sm">
              <Atom size={18} />
            </div>
            <a href="#" className="flex items-center gap-2.5 font-medium">
              <span className="text-xl font-semibold tracking-tight">Trade Technology</span>
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
              <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao Rewards</h1>
              <p className="text-muted-foreground">
                Entre para acompanhar seu progresso e conquistas
              </p>
            </div>
            
            <div className="bg-card rounded-xl shadow-lg p-6 border">
              <LoginForm />
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
      
      {/* Right column - Hero image */}
      <div className="bg-gradient-to-br from-primary/90 to-blue-600/90 relative hidden lg:block">
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
              <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm backdrop-blur mb-4">
                Novo sistema de recompensas
              </div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Conquiste, acumule e troque</h2>
              <p className="text-lg text-white/80">
                Transforme seu esforço em reconhecimento. O Trade Rewards permite que você acompanhe seu desempenho e receba recompensas pelo seu trabalho.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
