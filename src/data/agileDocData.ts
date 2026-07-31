import { TeamMember, AgilityImprovement } from '../types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Carlos Mendoza',
    role: 'Product Owner Senior',
    specialty: 'E-commerce International Strategy & Product Growth',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    functions: [
      'Definir y priorizar el Product Backlog según valor de negocio.',
      'Representar los intereses del cliente y usuarios finales.',
      'Aprobar los incrementos entregados en cada Sprint.'
    ],
    responsibilities: [
      'Maximizar el retorno de inversión (ROI) de LIMONBEER.',
      'Garantizar alineación estratégica entre diseño, tecnología y ventas.',
      'Gestionar stakeholders y métricas clave de éxito (KPIs).'
    ],
    deliverables: [
      'Product Backlog priorizado mediante técnica MoSCoW.',
      'Criterios de Aceptación para Historias de Usuario.',
      'Roadmap del Producto E-commerce LimonBeer.'
    ]
  },
  {
    id: 'tm-2',
    name: 'Sofía Benítez',
    role: 'Scrum Master Lead',
    specialty: 'Agile Coaching & Cross-functional Facilitation',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    functions: [
      'Facilitar los eventos de Scrum (Daily, Review, Retro, Planning).',
      'Eliminar impedimentos técnicos y organizacionales.',
      'Fomentar la cultura de mejora continua en el equipo.'
    ],
    responsibilities: [
      'Asegurar el cumplimiento estricto del marco de trabajo Scrum.',
      'Proteger al equipo de interferencias externas durante los Sprints.',
      'Monitorizar la velocidad del equipo y diagramas de Burndown.'
    ],
    deliverables: [
      'Sprint Backlog y tableros Kanban actualizados.',
      'Reportes de Métricas Ágiles y Velocidad del Equipo.',
      'Planes de Acción derivados de las Retrospectivas.'
    ]
  },
  {
    id: 'tm-3',
    name: 'Ing. Alejandro Silva',
    role: 'Software Architect Senior',
    specialty: 'Cloud Microservices & High-Scale Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    functions: [
      'Diseñar la arquitectura del sistema Frontend, Backend y JSON Store.',
      'Establecer estándares de seguridad, escalabilidad y rendimiento.',
      'Definir la estructura de componentes y patrones de diseño.'
    ],
    responsibilities: [
      'Garantizar la estabilidad y mantenibilidad de la plataforma.',
      'Seleccionar el stack tecnológico idóneo (React 19, TypeScript, Vite, Express).',
      'Asegurar el cumplimiento de normativas de seguridad e i18n.'
    ],
    deliverables: [
      'Diagramas de Arquitectura de Software y Diagramas de Componentes.',
      'Guía de Estándares de Código y Seguridad.',
      'Especificación de Interfaces API y estructuras JSON.'
    ]
  },
  {
    id: 'tm-4',
    name: 'Mateo Morales',
    role: 'Frontend Developer Senior',
    specialty: 'React, TypeScript, Tailwind CSS & Motion UI',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    functions: [
      'Construir interfaces interactivas, responsivas y accesibles.',
      'Implementar el catálogo de productos, carrito, ruleta y checkout.',
      'Integrar animaciones fluidas con Framer Motion y Tailwind.'
    ],
    responsibilities: [
      'Asegurar un renderizado de alta velocidad y optimización de assets.',
      'Garantizar experiencia óptima en dispositivos móviles, tablets y desktop.',
      'Mantener un código modular, tipado fuertemente y sin errores.'
    ],
    deliverables: [
      'Componentes React modularizados y limpios.',
      'Módulo interactivo Ruleta Ganadora y Carrito con LocalStorage.',
      'Diseño Glassmorphism y Dark/Light Mode adaptativo.'
    ]
  },
  {
    id: 'tm-5',
    name: 'Valeria Restrepo',
    role: 'Backend Developer Senior',
    specialty: 'NodeJS, Express, JSON Stores & Rest APIs',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    functions: [
      'Desarrollar el servidor de backend en Express con TypeScript.',
      'Construir los controladores y rutas para productos, pedidos y cupones.',
      'Gestión de archivos JSON persistentes e integración de utilidades.'
    ],
    responsibilities: [
      'Garantizar respuestas veloces de la API (<50ms).',
      'Implementar validaciones robustas para la recepción de pedidos y datos.',
      'Optimizar el flujo de datos entre el servidor y el cliente React.'
    ],
    deliverables: [
      'Servidor Express optimizado con middleware de compresión y seguridad.',
      'Endpoints RESTful bien documentados.',
      'Sistema de persistencia en archivos JSON locales.'
    ]
  },
  {
    id: 'tm-6',
    name: 'Camila Torres',
    role: 'QA Engineer Lead',
    specialty: 'Automated & Manual Cross-Browser Testing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    functions: [
      'Diseñar y ejecutar casos de prueba funcionales, UI/UX y regresión.',
      'Validar el flujo de checkout, pasarelas simuladas y rastreo LimonFast.',
      'Auditar accesibilidad (WCAG) y rendimiento con Lighthouse.'
    ],
    responsibilities: [
      'Garantizar cero defectos críticos en el despliegue a producción.',
      'Asegurar compatibilidad fluida en navegadores modernos y móviles.',
      'Documentar hallazgos y colaborar con desarrolladores para corrección rápida.'
    ],
    deliverables: [
      'Matriz de Casos de Prueba con cobertura del 100% del MVP.',
      'Reportes de Rendimiento, Seguridad y Accesibilidad.',
      'Certificación de Calidad para el Incremento del Producto.'
    ]
  }
];

export const FIVE_AGILITY_IMPROVEMENTS: AgilityImprovement[] = [
  {
    id: 1,
    category: 'Metodología',
    title: 'Adopción de Sprints Cortos de 1 Semana e Integración de BDD (Behavior-Driven Development)',
    advantages: [
      'Retroalimentación ultrarrápida del cliente sobre funcionalidades de e-commerce.',
      'Reducción drástica del desperdicio al ajustar prioridades semanalmente.',
      'Especificaciones de negocio escritas en lenguaje Gherkin que actúan como pruebas automatizadas.'
    ],
    disadvantages: [
      'Mayor sobrecarga de reuniones de planificación si no se gestionan con rigor.',
      'Exige disciplina alta del Product Owner para mantener historias refinadas continuamente.'
    ],
    practicalApplication: 'En LIMONBEER, permitió validar en la primera semana la experiencia del flujo de carrito y la animación de la Ruleta Ganadora con usuarios reales antes de construir la integración de pagos.'
  },
  {
    id: 2,
    category: 'Arquitectura',
    title: 'Arquitectura Modular Basada en Micro-Frontends e Inyección de Archivos JSON Livianos',
    advantages: [
      'Independencia total entre módulos (Carrito, Catálogo, Delivery Tracker, Admin Panel).',
      'Despliegue y carga progresiva sin bloquear la interfaz principal.',
      'Cero latencia de bases de datos externas pesadas al utilizar esquemas JSON locales indexados.'
    ],
    disadvantages: [
      'Requiere gobernanza estricta en los tipos compartidos de TypeScript.',
      'Mayor complejidad de configuración inicial en Vite y bundling.'
    ],
    practicalApplication: 'El panel administrativo de LIMONBEER opera de forma desacoplada del checkout del cliente, permitiendo modificar precios y banners en tiempo real sin reiniciar la aplicación.'
  },
  {
    id: 3,
    category: 'Automatización',
    title: 'Pipelines CI/CD Automatizados con Linter Estricto y Pruebas Unitarias Continuas',
    advantages: [
      'Detección inmediata de regresiones en lógica de promociones y cálculos de IVA.',
      'Compilación automática de bundles con esbuild en menos de 2 segundos.',
      'Despliegues sin intervención manual directamente a entorno de prueba Cloud Run.'
    ],
    disadvantages: [
      'Inversión inicial de tiempo configurando scripts de compilación.',
      'Necesidad de mantener los tests actualizados cuando cambian requisitos.'
    ],
    practicalApplication: 'Cada commit en el repositorio ejecuta verificaciones de tipos TypeScript y pruebas de cálculos de carrito antes de generar la build final del servidor Express.'
  },
  {
    id: 4,
    category: 'Infraestructura',
    title: 'Contenerización Ligera con Docker en Cloud Run y Caché Efímera de Assets en Memoria',
    advantages: [
      'Escalabilidad instantánea de 0 a múltiples instancias según tráfico de promociones.',
      'Costos de infraestructura mínimos al apagar recursos inactivosa.',
      'Entrega ultrarrápida de imágenes de cerveza y banners gracias al servido estático compilado.'
    ],
    disadvantages: [
      'Tiempo de arranque inicial en frío (Cold Start) de la instancia si pasa tiempo inactiva.',
      'Gestión de memoria compartida para los archivos JSON persistentes.'
    ],
    practicalApplication: 'LIMONBEER se despliega en un contenedor ligero Node.js con Express que responde a peticiones en menos de 20ms en el preview de Google AI Studio.'
  },
  {
    id: 5,
    category: 'Tecnología',
    title: 'Uso de React 19, TypeScript 5.8, Vite 6 y Framer Motion para Rendering Ultrarrápido',
    advantages: [
      'Manejo optimizado de estado con React 19 y Server Side Rendering preparado.',
      'Cero errores en tiempo de ejecución gracias a tipado estricto en interfaces.',
      'Experiencia de usuario fluida estilo app nativa con animaciones de 60 FPS.'
    ],
    disadvantages: [
      'Curva de aprendizaje ligera en nuevas APIs de React 19.',
      'Necesidad de auditar peso de librerías para evitar sobrecargar el bundle inicial.'
    ],
    practicalApplication: 'Permite que la ruleta interactiva, el mega menú responsivo y el seguimiento GPS simulado de LimonFast corran suavemente en cualquier smartphone o navegador desktop.'
  }
];

export const SCRUM_4_WEEK_SPRINT_SCHEDULE = [
  {
    week: 'Semana 1 (01 Ago - 07 Ago 2026)',
    phase: 'Planificación, Ideación & Arquitectura Base',
    activities: [
      'Sprint Planning: Definición de visión, roles y refinamiento del Product Backlog.',
      'Arquitectura inicial: Configuración de Vite, Express, TypeScript y Tailwind CSS.',
      'Diseño UX/UI: Creación de Wireframes, Paleta de colores (Rojo, Negro, Dorado) y Tipografía.',
      'Definición de modelos de datos JSON para Productos, Categorías, Cupones y Pedidos.'
    ]
  },
  {
    week: 'Semana 2 (08 Ago - 14 Ago 2026)',
    phase: 'Desarrollo Core Frontend & Endpoints Backend',
    activities: [
      'Construcción del Header, Mega Menú, Hero Carousel y Banners Promocionales.',
      'Implementación del Catálogo de Productos con Filtros, Búsqueda y Ordenamiento.',
      'Desarrollo del Backend Express con API REST de Productos, Categorías y Archivos JSON.',
      'Modales de Detalles de Producto con información cervecera (ABV %, Origen, Maridaje).'
    ]
  },
  {
    week: 'Semana 3 (15 Ago - 21 Ago 2026)',
    phase: 'Módulos Interactivos: Ruleta, Carrito, Delivery & Checkout',
    activities: [
      'Desarrollo de la Ruleta Ganadora interactiva con acreditación de Puntos y Cupones.',
      'Carrito de Compras persistente en LocalStorage con cálculo de IVA, Subtotal y Cupones.',
      'Módulo LIMONFAST Delivery con simulación de mapa interactivo y motorizado en tiempo real.',
      'Formulario de Checkout con pasarelas de pago simuladas (Visa/Mastercard, QR, Transferencia).'
    ]
  },
  {
    week: 'Semana 4 (22 Ago - 31 Ago 2026)',
    phase: 'Panel de Administración, QA, Pruebas Integrales & Despliegue',
    activities: [
      'Construcción del Panel Administrativo (Gestión CRUD de Productos, Banners, Pedidos).',
      'Módulo de Documentación Técnica Integrada con metodología Scrum y Ciclo de Vida.',
      'Pruebas de QA: Cobertura Cross-Browser, Tests de Rendimiento Lighthouse, Accesibilidad WCAG.',
      'Despliegue final en producción con Docker en Cloud Run y verificación de entrega de Incremento.'
    ]
  }
];
