// Importações necessárias
import { Link } from 'react-router-dom'; // Usado para navegação entre páginas sem recarregar o site
import { Button } from '../components/Button'; // Importa um botão reutilizável
import { ShieldCheck, Target, Award, Scale, PersonStanding, Bot, Zap, Calendar, Activity, FileText, LogOut, LucideFileCog2 } from 'lucide-react'; // Biblioteca de ícones SVG

// Componente funcional "About"
export const About = () => {
  // Array que define os valores da empresa/plataforma
  const values = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-light" />, // Ícone estilizado com cor e tamanho
      title: 'Segurança',
      description: 'Proteção rigorosa com dados sensíveis de pacientes'
    },
    {
      icon: <PersonStanding className="w-12 h-12 text-dark" />,
      title: 'Acessibilidade',
      description: 'Interface acolhedora, responsiva e compatível com tecnologias assistivas'
    },
    {
      icon: <Bot className="w-12 h-12 text-light" />,
      title: 'Chat AI',
      description: 'Machine Learning para identificar padrões emocionais e apoiar decisões clínicas'
    },
    {
      icon: <Scale className="w-12 h-12 text-dark" />,
      title: 'Equilibrío',
      description: 'Focamos em projetos voluntários que promovem saúde mental para comunidades vulneráveis'
    }
  ];

  // Array de funcionalidades principais
  const features = [
    {
      icon: <Calendar className="w-5 h-5 text-dark" />,
      title: 'Agendamento Dinâmico',
      description: 'Sistema automatizado com visualização de horários disponíveis e lembretes por e-mail'
    },
    {
      icon: <Activity className="w-5 h-5 text-dark" />,
      title: 'Análise Preditiva',
      description: 'Algoritmos de clustering para agrupar perfis de pacientes e identificar riscos emocionais'
    },
    {
      icon: <FileText className="w-5 h-5 text-dark" />,
      title: 'Histórico Completo',
      description: 'Registro estruturado de sessões com temas, recomendações e evolução do tratamento'
    },
    {
      icon: <Zap className="w-5 h-5 text-dark" />,
      title: 'Interface Intuitiva',
      description: 'Design pensado para conforto emocional com navegação simples e acolhedora'

    }
  ];

  // Lista de problemas que a plataforma busca resolver
  const problems = [
    'Falta de controle e organização nos agendamentos', 
    'Dificuldade de busca psicólogos dispostos a realizar acompanhamentos voluntários',
    'Impossibilidade de mapear perfis de risco com dados',
    'Ausência de ferramentas de análise e acompanhamento'
  ];

  // Lista de soluções propostas
  const solutions = [
    'Sistema digital centralizado com agendamento automatizado',
    'Registro estruturado e seguro de todas as sessões',
    'Painel administrativo com visão completa da agenda',
    'Machine Learning para agrupamento de perfis comportamentais',
    'Interface responsiva, acessível e emocionalmente confortável'
  ];

  return (
    <div className="py-12 space-y-16"> {/* Container principal com espaçamento entre seções */}

      {/* Seção Hero (introdução com logo e descrição) */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          {/* Logo centralizado */}
          <div className="w-54 h-24 rounded-3x1 flex items-center justify-center mx-auto mb-15 ">
            <img src="/logo.svg" alt="InsideOut" className="w-404 h-404 rounded-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">Sobre o InsideOut</h1>
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl">
            <p className="text-lg text-darkness leading-relaxed mb-6">
              Somos uma plataforma que une tecnologia e responsabilidade social...
            </p>
            <p className="text-base text-darkness leading-relaxed">
              Desenvolvido especificamente para instituições que oferecem apoio psicológico gratuito...
            </p>
          </div>
        </div>
      </section>

      {/* Seção Missão e Visão */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Missão */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl">
            <h2 className="text-2xl font-bold text-dark mb-4">Nossa Missão</h2>
            <p className="text-dark/70 leading-relaxed mb-4">
            Promover saúde mental com empatia, inclusão e ciência, valorizando a diversidade neurológica e fortalecendo vínculos entre pacientes, psicólogos e a comunidade.
            </p>
            <p className="text-dark/60 leading-relaxed text-sm">
              Nosso objetivo é democratizar o acesso a ferramentas tecnológicas...
            </p>
          </div>
          {/* Visão */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl">
            <h2 className="text-2xl font-bold text-dark mb-4">Nossa Visão</h2>
            <p className="text-dark/70 leading-relaxed mb-4">
            Ser referência em cuidado psicológico para neurodivergentes, oferecendo um sistema digital inovador que une tecnologia e humanização no acompanhamento terapêutico.
            </p>
            <p className="text-dark/60 leading-relaxed text-sm">
              Queremos transformar a forma como projetos sociais gerenciam seus atendimentos...
            </p>
          </div>
        </div>
      </section>

      {/* Seção Problemas e Soluções */}
      

      {/* Seção Funcionalidades */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark text-center mb-8">Funcionalidades Principais</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-start space-x-4">
                  {/* Ícone com fundo colorido */}
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-light to-accent rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark mb-2">{feature.title}</h3>
                    <p className="text-dark/70 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Valores */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark text-center mb-8">Nossos Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg text-center">
                {/* Ícone centralizado com fundo */}
                <div className="w-12 h-12 bg-gradient-to-b rounded-xl flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-dark mb-3">{value.title}</h3>
                <p className="text-dark/70 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
