import { useEffect, useState } from "react";

export interface SheetPayload {
  tab: string;
  headers: string[];
  rows: Record<string, string>[];
  demo?: boolean;
}

/** In-memory client cache: one fetch per tab per page load. */
const cache = new Map<string, SheetPayload>();

export async function fetchSheet(tab: string): Promise<SheetPayload> {
  const hit = cache.get(tab);
  if (hit) return hit;
  const res = await fetch(`/api/sheet?tab=${encodeURIComponent(tab)}`);
  if (!res.ok) {
    let detail = "";
    try {
      const j = await res.json();
      detail = j?.error ? `: ${j.error}` : "";
    } catch {
      /* ignore */
    }
    throw new Error(`Could not load "${tab}" (HTTP ${res.status})${detail}`);
  }
  const payload = (await res.json()) as SheetPayload;
  cache.set(tab, payload);
  return payload;
}

export interface SheetState {
  data: SheetPayload | null;
  loading: boolean;
  error: string;
}

export function useSheet(tab: string): SheetState {
  const [data, setData] = useState<SheetPayload | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    fetchSheet(tab)
      .then((d) => {
        if (live) setData(d);
      })
      .catch((e: unknown) => {
        if (live) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      live = false;
    };
  }, [tab]);

  return { data, loading: !data && !error, error };
}
