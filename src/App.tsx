import { Routes, Route, Link } from 'react-router-dom';
import { 
  BarChartIcon, 
  MessageSquareIcon, 
  RocketIcon, 
  HomeIcon,
  FileTextIcon,
  PieChartIcon,
  TrendingUpIcon,
  ZapIcon
} from 'lucide-react';

// Componentes principais
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">CareerCraft BI</h1>
        </div>
        <nav className="mt-8">
          <ul>
            <li className="mb-2">
              <Link
                to="/"
                className="flex items-center px-4 py-3 bg-indigo-700"
              >
                <HomeIcon className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/conversations"
                className="flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors duration-200"
              >
                <MessageSquareIcon className="w-5 h-5 mr-3" />
                <span>Análise de Conversas</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/campaigns"
                className="flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors duration-200"
              >
                <RocketIcon className="w-5 h-5 mr-3" />
                <span>Análise de Campanhas</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/attachments"
                className="flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors duration-200"
              >
                <FileTextIcon className="w-5 h-5 mr-3" />
                <span>Análise de Anexos</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/lead-journey"
                className="flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors duration-200"
              >
                <TrendingUpIcon className="w-5 h-5 mr-3" />
                <span>Jornada do Lead</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/pain-points"
                className="flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors duration-200"
              >
                <PieChartIcon className="w-5 h-5 mr-3" />
                <span>Análise de Dores</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/message-effectiveness"
                className="flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors duration-200"
              >
                <BarChartIcon className="w-5 h-5 mr-3" />
                <span>Eficácia de Mensagens</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/automation"
                className="flex items-center px-4 py-3 hover:bg-indigo-700 transition-colors duration-200"
              >
                <ZapIcon className="w-5 h-5 mr-3" />
                <span>Sugestões de Automação</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Análise de Mensagens do Instagram
            </h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/conversations" element={<div>Análise de Conversas</div>} />
            <Route path="/campaigns" element={<div>Análise de Campanhas</div>} />
            <Route path="/attachments" element={<div>Análise de Anexos</div>} />
            <Route path="/lead-journey" element={<div>Jornada do Lead</div>} />
            <Route path="/pain-points" element={<div>Análise de Dores</div>} />
            <Route path="/message-effectiveness" element={<div>Eficácia de Mensagens</div>} />
            <Route path="/automation" element={<div>Sugestões de Automação</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
