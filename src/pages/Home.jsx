// Importações necessárias
import { Link } from 'react-router-dom'; // Para navegação entre páginas
import { motion } from 'framer-motion'; // Para animações suaves
import { Shield, Zap, Users, Calendar, Activity, FileText } from 'lucide-react'; // Ícones vetoriais
import { Button } from '../components/Button'; // Botão customizado do projeto

// Página inicial (Home)
export const Home = () => {

// Lista de problemas que a plataforma busca resolver
const problems = [
  'Gestão ineficaz e falta de clareza na marcação de horários', 
  'Escassez de psicólogos para participar de programas de apoio voluntário',
  'Limitação na análise de dados para mapear riscos',
  'Inexistência de soluções para análise e supervisão'
];

// Lista de soluções propostas
const solutions = [
  'Ferramenta digital integrada com gerenciamento de agendamentos automatizado',
  'Arquivo estruturado com proteção de todas as sessões',
  'Interface de controle com visão completa dos horários',
  'Análise automatizada de perfis comportamentais por meio de Machine Learning',
  'Plataforma intuitiva, acessível e pensada para bem-estar emocional'
];

  return (
    <div>
      {/* ================= HERO SECTION ================= */}

      <section className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row-reverse items-center md:items-start gap-12 max-w-6xl mx-auto px-6"
        >
          {/* Logo */}
          <div className="w-82 h-82 md:w-[1050px] md:h-[550px] rounded-3x1 flex items-center justify-center overflow-hidden -mt-15 ">
            <img
              src="/logo2.svg"
              alt="InsideOut"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Texto */}
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-dark mb-6">
              Ajudando crianças a se desenvolverem desde 2008
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-dark mb-6">
              Sistema de Agendamento Psicológico
            </h2>
            <p className="text-xl text-darkness mb-8 leading-relaxed">
              Plataforma digital que otimiza o agendamento e a gestão de atendimentos
              psicológicos voluntários, com foco em acessibilidade e inclusão...
            </p>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Começar Agora
                </Button>
              </Link>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("features").scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Conhecer Recursos
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="min-h-screen flex items-center py-20">
        <div className="w-full">
          {/* Título da seção */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} // Só anima quando o usuário vê no scroll
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6">
                Tecnologia a Serviço do Cuidado
              </h2>
              <p className="text-xl text-dark max-w-3xl mx-auto">
                Ferramentas inteligentes para organizar, acompanhar e potencializar atendimentos voluntários
              </p>
            </motion.div>
          </div>

          {/* Grid com os recursos (features) */}
          <section className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark text-center mb-8">Problemas que Resolvemos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Lista de problemas */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-xl font-semibold text-dark mb-4">Desafios Identificados</h3>
              <ul className="space-y-3">
                {problems.map((problem, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    {/* Bolinha decorativa */}
                    <div className="w-2 h-2 bg-medium rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-dark/70 text-sm">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Lista de soluções */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-xl font-semibold text-dark mb-4">Nossas Soluções</h3>
              <ul className="space-y-3">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    {/* Bolinha decorativa */}
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-dark/70 text-sm">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
        </div>
      </section>

      {/* ================= CTA (CALL TO ACTION) SECTION ================= */}
      <section className="min-h-screen flex items-center py-20">
        <div className="w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} // Aparece com scroll
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-8">
              Faça Parte desta Transformação Social
            </h2>
            <p className="text-xl text-darkness mb-12 max-w-3xl mx-auto leading-relaxed">
              Uma tecnologia e responsabilidade social. Ajude a democratizar o acesso
              à saúde mental através de uma plataforma pensada para o bem-estar coletivo.
            </p>
            {/* Botão para criar conta */}
            <Link to="/register">
              <Button size="lg" className="text-xl px-12 py-5 rounded-2xl font-semibold">
                Criar Conta Gratuita
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
