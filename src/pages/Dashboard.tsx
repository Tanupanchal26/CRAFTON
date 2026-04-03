import { useSimulation } from "../hooks/useSimulation";
import TrafficChart from "../components/TrafficChart";
import AlertPanel from "../components/AlertPanel";
import RiskIndicator from "../components/RiskIndicator";
import ControlPanel from "../components/ControlPanel";

export default function Dashboard() {
  const { data, alerts, loading, error, injectAttack } = useSimulation();

  if (loading) return <div className="text-white text-center mt-20 text-lg">Loading...</div>;
  if (error) return <div className="text-red-400 text-center mt-20">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-400">Network Signal Monitor</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <TrafficChart data={data} />
          <ControlPanel onInject={injectAttack} />
        </div>
        <div className="flex flex-col gap-4">
          <RiskIndicator risk={data?.risk ?? 0} attack={data?.attack ?? null} packetLoss={data?.packet_loss ?? 0} />
          <AlertPanel alerts={alerts} />
        </div>
      </div>
    </div>
  );
}
