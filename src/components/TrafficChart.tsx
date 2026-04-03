import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Props {
  packetRate: number;
  snr: number;
}

const history: { time: string; packet_rate: number; snr: number }[] = [];

export default function TrafficChart({ packetRate, snr }: Props) {
  const now = new Date().toLocaleTimeString();
  if (history.length === 0 || history[history.length - 1].time !== now) {
    history.push({ time: now, packet_rate: packetRate, snr });
    if (history.length > 20) history.shift();
  }

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h2 className="text-white font-semibold mb-3">Traffic & SNR</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={[...history]}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" tick={{ fill: "#9CA3AF", fontSize: 10 }} />
          <YAxis tick={{ fill: "#9CA3AF", fontSize: 10 }} />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none" }} />
          <Line type="monotone" dataKey="packet_rate" stroke="#3B82F6" dot={false} name="Packet Rate" />
          <Line type="monotone" dataKey="snr" stroke="#10B981" dot={false} name="SNR" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
