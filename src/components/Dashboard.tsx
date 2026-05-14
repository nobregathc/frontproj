import { useTheme } from "../context/ThemeContext";
import { useStatistics } from "../context/StatisticsContext";
import Header from "./Header";
import Footer from "./Footer";
import BarChartComponent from "./BarChartComponent";
import "../css/Dashboard.css";

function Dashboard() {
  const { dark } = useTheme();
  const { aiUsageCount, chatCountHistory, loadingTimes } = useStatistics();

  const averageLoadingTime = loadingTimes.length > 0 ? loadingTimes.reduce((a, b) => a + b, 0) / loadingTimes.length : 0;

  const chartData = [
    { name: "Nº de Pedidos", value: aiUsageCount },
    { name: "Tempo Médio (ms)", value: Math.round(averageLoadingTime) }
  ];

  return (
    <div className={`dashboard-page ${dark ? "dark" : ""}`}>
      <Header />

      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <h4>Total de Chats Criados</h4>
            <p className="stat-number">{chatCountHistory.length}</p>
          </div>

          <div className="stat-card">
            <h4>Total de Mensagens</h4>
            <p className="stat-number">{aiUsageCount}</p>
          </div>
        </div>

        <section className="dashboard-chart-section">
          <h3>Estatísticas de Pedidos e Tempo</h3>
          <BarChartComponent data={chartData} xKey="name" vKey="value" />
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
