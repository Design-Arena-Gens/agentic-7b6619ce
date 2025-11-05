"use client";

import type { CourtGroup } from "@/app/page";

export default function SearchForm({
  query,
  setQuery,
  selectedGroups,
  setSelectedGroups,
  onSubmit,
}: {
  query: string;
  setQuery: (q: string) => void;
  selectedGroups: CourtGroup[];
  setSelectedGroups: (g: CourtGroup[]) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const groups: CourtGroup[] = ["ALL", "STF", "STJ", "TST", "TRFs", "TRTs", "TJs"];

  function toggleGroup(group: CourtGroup) {
    if (group === "ALL") {
      setSelectedGroups(["ALL"]);
      return;
    }
    const withoutAll = selectedGroups.filter((g) => g !== "ALL");
    const exists = withoutAll.includes(group);
    const next = exists ? withoutAll.filter((g) => g !== group) : [...withoutAll, group];
    setSelectedGroups(next.length === 0 ? ["ALL"] : next);
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <label className="label" htmlFor="q">Informe o tema/assunto:</label>
      <input
        id="q"
        className="input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ex.: tema 123, decis?o vinculante, estabilidade gestante em contrato tempor?rio"
      />
      <div className="groups">
        {groups.map((g) => (
          <label key={g} className="checkbox">
            <input
              type="checkbox"
              checked={selectedGroups.includes(g)}
              onChange={() => toggleGroup(g)}
            />
            <span>{g}</span>
          </label>
        ))}
      </div>
      <button className="button" type="submit">Pesquisar</button>
    </form>
  );
}
