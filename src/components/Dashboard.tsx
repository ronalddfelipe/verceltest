import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface DashboardData {
  stats: {
    total_conversations: number;
    total_conversions: number;
    avg_response_time: number;
    unanswered_count: number;
    conversion_rate: number;
    unanswered_rate: number;
  };
  conversion_data: Array<{
    name: string;
    interactions: number;
    conversions: number;
  }>;
  attachment_data: Array<{
    name: string;
    value: number;
  }>;
  effectiveness_data: Array<{
    name: string;
    rate: number;
  }>;
  pain_points_data: Array<{
    name: string;
    count: number;
  }>;
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData>({
    stats: {
      total_conversations: 0,
      total_conversions: 0,
      avg_response_time: 0,
      unanswered_count: 0,
      conversion_rate: 0,
      unanswered_rate: 0
    },
    conversion_data: [],
    attachment_data: [],
    effectiveness_data: [],
    pain_points_data: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/dashboard_data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Carregando dados do dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500">Erro ao carregar dados: {error}</div>;
  }

  // Find story effectiveness data safely
  const storyEffectiveness = data.effectiveness_data.find(item => 
    typeof item === 'object' && item !== null && 'name' in item && item.name === 'story'
  );
  const storyRate = storyEffectiveness && 'rate' in storyEffectiveness ? storyEffectiveness.rate : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <p className="text-muted-foreground">
        Visão geral das métricas de conversação e desempenho da CareerCraft Europe no Instagram.
      </p>
      
      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total de Conversas</h3>
          <p className="mt-2 text-3xl font-semibold">{data.stats.total_conversations}</p>
          <div className="mt-1 text-green-600 text-sm">
            Leads potenciais
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Taxa de Conversão</h3>
          <p className="mt-2 text-3xl font-semibold">{data.stats.conversion_rate}%</p>
          <div className="mt-1 text-green-600 text-sm">
            {data.stats.total_conversions} conversões
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Tempo Médio de Resposta</h3>
          <p className="mt-2 text-3xl font-semibold">{data.stats.avg_response_time?.toFixed(1)}h</p>
          <div className="mt-1 text-amber-600 text-sm">
            Oportunidade de melhoria
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Conversas Não Respondidas</h3>
          <p className="mt-2 text-3xl font-semibold">{data.stats.unanswered_rate}%</p>
          <div className="mt-1 text-red-600 text-sm">
            {data.stats.unanswered_count} conversas
          </div>
        </div>
      </div>
      
      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Conversões por Mês</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data.conversion_data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="interactions" name="Interações" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="conversions" name="Conversões" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Distribuição de Anexos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.attachment_data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.attachment_data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} anexos`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Eficácia por Tipo de Anexo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data.effectiveness_data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rate" name="Taxa de Conversão (%)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Principais Dores dos Clientes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data.pain_points_data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Frequência" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Insights e Recomendações</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-md">
            <h4 className="font-medium text-blue-800">Oportunidades de Melhoria</h4>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Reduzir o tempo médio de resposta de {data.stats.avg_response_time?.toFixed(1)}h para menos de 24h</li>
              <li>Responder às {data.stats.unanswered_count} conversas pendentes para aumentar engajamento</li>
              <li>Aumentar o uso de stories, que têm a maior taxa de conversão ({storyRate}%)</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-md">
            <h4 className="font-medium text-green-800">Estratégias Recomendadas</h4>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Focar conteúdo em soluções para as principais dores: currículo, entrevista e visto</li>
              <li>Implementar mensagens automáticas de boas-vindas para todas as novas conversas</li>
              <li>Criar campanhas específicas para reengajamento de leads não respondidos</li>
              <li>Estabelecer fluxos de trabalho para qualificação e conversão de leads</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
