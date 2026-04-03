import { useState, useEffect } from "react";

export interface SimulationData {
  packet_rate: number;
  snr: number;
  packet_loss: number;
  attack: string | null;
  risk: number;
}

export interface Alert {
  id: number;
  message: string;
  time: string;
}

const BASE_URL = "http://localhost:8000";

export function useSimulation(pollInterval = 3000) {
  const [data, setData] = useState<SimulationData | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [simRes, alertRes] = await Promise.all([
        fetch(`${BASE_URL}/simulate`),
        fetch(`${BASE_URL}/alerts`),
      ]);
      setData(await simRes.json());
      setAlerts(await alertRes.json());
    } catch {
      // backend not ready yet
    } finally {
      setLoading(false);
    }
  };

  const injectAttack = async (type: "jamming" | "spoofing") => {
    await fetch(`${BASE_URL}/inject/${type}`, { method: "POST" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, pollInterval);
    return () => clearInterval(id);
  }, []);

  return { data, alerts, loading, injectAttack };
}
