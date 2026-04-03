import { useSimulation } from "../hooks/useSimulation";
import TrafficChart from "../components/TrafficChart";
import AlertPanel from "../components/AlertPanel";
import RiskIndicator from "../components/RiskIndicator";
import ControlPanel from "../components/ControlPanel";

export default function Dashboard() {
  const { data, alerts, loading, injectAttack } = useSimulation();

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!data) return <div className="text-red-400 text-center mt-20">Backend not reachable.</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-400">Network Signal Monitor</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <TrafficChart packetRate={data.packet_rate} snr={data.snr} />
          <ControlPanel onInject={injectAttack} />
        </div>
        <div className="flex flex-col gap-4">
          <RiskIndicator risk={data.risk} attack={data.attack} packetLoss={data.packet_loss} />
          <AlertPanel alerts={alerts} />
        </div>
      </div>
    </div>
  );
}
