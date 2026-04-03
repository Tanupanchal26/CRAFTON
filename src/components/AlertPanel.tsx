import { Alert } from "../hooks/useSimulation";

interface Props {
  alerts: Alert[];
}

export default function AlertPanel({ alerts }: Props) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 h-full">
      <h2 className="text-white font-semibold mb-3">Alerts</h2>
      {alerts.length === 0 ? (
        <p className="text-gray-500 text-sm">No alerts yet.</p>
      ) : (
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {alerts.map((a) => (
            <li key={a.id} className="bg-red-900/40 border border-red-500 rounded p-2 text-sm text-red-300">
              <span className="text-gray-400 text-xs mr-2">{a.time}</span>
              {a.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
