import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  Calendar, 
  Layers, 
  Zap, 
  CheckCircle2, 
  ShieldAlert, 
  Code, 
  Cpu, 
  Cloud, 
  Activity,
  ChevronRight,
  Printer,
  Sparkles
} from 'lucide-react';
import { TEAM_MEMBERS, FIVE_AGILITY_IMPROVEMENTS, SCRUM_4_WEEK_SPRINT_SCHEDULE } from '../data/agileDocData';

interface AgileDocsViewerProps {
  onClose: () => void;
}

export const AgileDocsViewer: React.FC<AgileDocsViewerProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'team' | 'scrum' | 'lifecycle' | 'improvements'>('team');

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Documentation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-neutral-900 via-red-950/40 to-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-extrabold text-xs border border-amber-500/30 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> DOCUMENTACIÓN TÉCNICA OFICIAL
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            LIMONBEER - Ciclo de Vida Ágil & Metodología Scrum
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Plataforma E-commerce de Cerveza Tradicional y Bebidas Alcohólicas. Documento técnico exhaustivo para el desarrollo de la aplicación Web, Android e iOS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Exportar / Imprimir
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs transition"
          >
            Volver a la Tienda
          </button>
        </div>
      </div>

      {/* Docs Navigation Bar */}
      <div className="flex gap-2 border-b border-neutral-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('team')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs transition whitespace-nowrap ${
            activeTab === 'team' ? 'bg-amber-500 text-black shadow-lg' : 'bg-neutral-900 text-neutral-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> 1. Equipo de Desarrollo (6 Integrantes)
        </button>

        <button
          onClick={() => setActiveTab('scrum')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs transition whitespace-nowrap ${
            activeTab === 'scrum' ? 'bg-amber-500 text-black shadow-lg' : 'bg-neutral-900 text-neutral-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" /> 2. Metodología Scrum & Cronograma 4 Semanas
        </button>

        <button
          onClick={() => setActiveTab('lifecycle')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs transition whitespace-nowrap ${
            activeTab === 'lifecycle' ? 'bg-amber-500 text-black shadow-lg' : 'bg-neutral-900 text-neutral-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" /> 3. Documentación del Ciclo de Vida (Etapas 1-5)
        </button>

        <button
          onClick={() => setActiveTab('improvements')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs transition whitespace-nowrap ${
            activeTab === 'improvements' ? 'bg-amber-500 text-black shadow-lg' : 'bg-neutral-900 text-neutral-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" /> 4. 5 Maneras de Mejorar la Agilidad
        </button>
      </div>

      {/* SECTION 1: TEAM PROFILES */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="text-sm text-neutral-400">
            Perfiles profesionales del equipo de 6 especialistas de más de 20 años de experiencia internacional:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((m) => (
              <div key={m.id} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition">
                <div className="flex items-center gap-4">
                  <img src={m.avatar} alt={m.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/40" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="font-extrabold text-base text-white">{m.name}</h3>
                    <div className="text-xs font-bold text-amber-400">{m.role}</div>
                    <div className="text-[10px] text-neutral-400">{m.specialty}</div>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-neutral-800 text-xs">
                  <div>
                    <span className="font-bold text-red-500 uppercase text-[10px] block">Funciones</span>
                    <ul className="list-disc list-inside text-neutral-300 space-y-1 mt-1">
                      {m.functions.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-amber-400 uppercase text-[10px] block">Responsabilidades</span>
                    <ul className="list-disc list-inside text-neutral-300 space-y-1 mt-1">
                      {m.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-emerald-400 uppercase text-[10px] block">Entregables Clave</span>
                    <ul className="list-disc list-inside text-neutral-300 space-y-1 mt-1">
                      {m.deliverables.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: SCRUM & SCHEDULE */}
      {activeTab === 'scrum' && (
        <div className="space-y-8">
          
          {/* Scrum Framework Concepts */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <h2 className="text-xl font-black text-amber-400">Marco de Trabajo Scrum Aplicado a LIMONBEER</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-300">
              <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 space-y-1">
                <span className="font-bold text-amber-400 text-sm">Sprint (4 Semanas)</span>
                <p>Bloque de tiempo fijo de 1 mes (01 Ago - 31 Ago 2026) durante el cual se crea un Incremento del producto utilizable y potencialmente desplegable.</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 space-y-1">
                <span className="font-bold text-amber-400 text-sm">Product Backlog & MoSCoW</span>
                <p>Lista ordenada de todas las funcionalidades, requisitos funcionales y mejoras (Historias de Usuario) priorizadas por el Product Owner.</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 space-y-1">
                <span className="font-bold text-amber-400 text-sm">Daily Scrum (15 Minutos)</span>
                <p>Sincronización diaria del equipo para responder: ¿Qué se logró ayer?, ¿Qué se hará hoy? y ¿Existe algún impedimento en LIMONBEER?</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 space-y-1">
                <span className="font-bold text-amber-400 text-sm">Incremento Entregable</span>
                <p>La suma de todos los elementos del Product Backlog completados durante el Sprint más el valor de los incrementos anteriores.</p>
              </div>
            </div>
          </div>

          {/* 4-Week Sprint Schedule */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-white">Cronograma del Sprint de 4 Semanas (Agosto 2026)</h2>
            
            <div className="space-y-4">
              {SCRUM_4_WEEK_SPRINT_SCHEDULE.map((sch, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                    <span className="text-amber-400 font-extrabold text-sm">{sch.week}</span>
                    <span className="text-xs font-bold text-white bg-red-600/30 text-red-400 px-3 py-1 rounded-full border border-red-600/40">
                      {sch.phase}
                    </span>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {sch.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SECTION 3: AGILE LIFECYCLE STAGES 1 TO 5 */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-8">
          
          {/* Stage 1: Ideation */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-black text-sm uppercase">
              <span className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">1</span>
              Etapa 1: Generación de Ideas & Análisis Estratégico
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-300">
              <div className="space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">Problema & Solución</h4>
                <p><strong>Problema:</strong> Dificultad para encontrar cervezas artesanales locales e importadas con entrega rápida a temperatura ideal en Cuenca y Ecuador.</p>
                <p><strong>Solución LIMONBEER:</strong> Plataforma E-commerce omnicanal con entregas en 30 minutos (LimonFast), gamificación con Ruleta Ganadora y stock garantizado en archivos JSON.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">Análisis FODA</h4>
                <p>• <strong>Fortalezas:</strong> Identidad visual premium (Rojo/Negro/Dorado), Ruleta de premios, tracking GPS de motorizados.</p>
                <p>• <strong>Oportunidades:</strong> Mercado creciente de microcervecerías artesanales en Ecuador.</p>
                <p>• <strong>Debilidades:</strong> Dependencia inicial de entrega física en zona urbana.</p>
                <p>• <strong>Amenazas:</strong> Competencia de grandes cadenas de supermercados.</p>
              </div>
            </div>
          </div>

          {/* Stage 2: Development */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold">2</span>
              Etapa 2: Desarrollo & Arquitectura
            </div>

            <div className="text-xs text-neutral-300 space-y-2">
              <p><strong>Arquitectura Frontend:</strong> React 19 + TypeScript + Tailwind CSS v4 + Framer Motion. Organización en componentes modulares, custom hooks (`useCart`, `useWishlist`) y Vite para HMR ultrarrápido.</p>
              <p><strong>Arquitectura Backend:</strong> Node.js con Express 4 en TypeScript (`server.ts`). Endpoints RESTful con persistencia local en archivos JSON (`/data/products.json`, `/data/orders.json`).</p>
              <p><strong>Flujo GitFlow:</strong> Ramas `main` (Producción), `develop` (Integración) y `feature/*` (Desarrollo de componentes).</p>
            </div>
          </div>

          {/* Stage 3: Testing */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase">
              <span className="w-7 h-7 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold">3</span>
              Etapa 3: Pruebas & Calidad (QA)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
              <div className="p-3 bg-black/60 rounded-xl border border-neutral-800">
                <span className="font-bold text-white block">Pruebas Funcionales</span>
                Validación de cálculo de IVA (12%), aplicación de cupones y reducción de stock.
              </div>
              <div className="p-3 bg-black/60 rounded-xl border border-neutral-800">
                <span className="font-bold text-white block">Pruebas Responsive</span>
                Verificación de vista móvil Android/iOS y layouts desktop en 4K.
              </div>
              <div className="p-3 bg-black/60 rounded-xl border border-neutral-800">
                <span className="font-bold text-white block">Pruebas de Seguridad</span>
                Sanitización de entradas de texto y protección contra inyección en APIs Express.
              </div>
            </div>
          </div>

          {/* Stage 4: Deployment */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-black text-sm uppercase">
              <span className="w-7 h-7 rounded-full bg-blue-500 text-black flex items-center justify-center font-bold">4</span>
              Etapa 4: Despliegue en Cloud Run
            </div>

            <p className="text-xs text-neutral-300">
              Compilación de bundle de servidor CommonJS con `esbuild` y activos de Vite en `dist/`. Despliegue automatizado en contenedores Docker supervisados en Cloud Run sobre el puerto 3000.
            </p>
          </div>

          {/* Stage 5: Operations */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-purple-400 font-black text-sm uppercase">
              <span className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">5</span>
              Etapa 5: Operaciones & Mantenimiento Continuo
            </div>

            <p className="text-xs text-neutral-300">
              Monitoreo de logs de Express, respaldos diarios de archivos JSON de pedidos y actualización semanal del catálogo de microcervecerías artesanales.
            </p>
          </div>

        </div>
      )}

      {/* SECTION 4: 5 AGILITY IMPROVEMENTS */}
      {activeTab === 'improvements' && (
        <div className="space-y-6">
          <div className="text-sm text-neutral-400">
            5 Maneras de mejorar la Agilidad aplicadas específicamente en el proyecto LIMONBEER:
          </div>

          <div className="space-y-4">
            {FIVE_AGILITY_IMPROVEMENTS.map((imp) => (
              <div key={imp.id} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="font-extrabold text-amber-400 text-base">
                    {imp.id}. [{imp.category}] {imp.title}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-300">
                  <div className="space-y-1 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                    <span className="font-bold text-emerald-400">✅ Ventajas principales:</span>
                    <ul className="list-disc list-inside space-y-1">
                      {imp.advantages.map((adv, idx) => <li key={idx}>{adv}</li>)}
                    </ul>
                  </div>

                  <div className="space-y-1 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                    <span className="font-bold text-red-400">⚠️ Desventajas / Retos:</span>
                    <ul className="list-disc list-inside space-y-1">
                      {imp.disadvantages.map((dis, idx) => <li key={idx}>{dis}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 text-xs">
                  <span className="font-bold text-amber-400">💡 Aplicación Práctica en LIMONBEER:</span>
                  <p className="text-neutral-300 mt-1 italic">{imp.practicalApplication}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
