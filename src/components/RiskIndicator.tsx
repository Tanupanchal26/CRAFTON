interface Props {
  risk: number;
  attack: string | null;
  packetLoss: number;
}

function getRiskColor(risk: number) {
  if (risk >= 70) return "text-red-500";
  if (risk >= 40) return "text-yellow-400";
  return "text-green-400";
}

export default function RiskIndicator({ risk, attack, packetLoss }: Props) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 flex flex-col gap-3">
      <h2 className="text-white font-semibold">Risk Indicator</h2>
      <div className={`text-5xl font-bold ${getRiskColor(risk)}`}>{risk}%</div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${
            risk >= 70 ? "bg-red-500" : risk >= 40 ? "bg-yellow-400" : "bg-green-400"
          }`}
          style={{ width: `${risk}%` }}
        />
      </div>
      <div className="text-sm text-gray-400">
        <span>Attack: </span>
        <span className={attack ? "text-red-400 font-semibold" : "text-green-400"}>
          {attack ?? "None"}
        </span>
      </div>
      <div className="text-sm text-gray-400">
        Packet Loss: <span className="text-white">{(packetLoss * 100).toFixed(1)}%</span>
      </div>
    </div>
  );
}
