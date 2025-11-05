"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import ResultsList from "@/components/ResultsList";

export type CourtGroup = "STF" | "STJ" | "TST" | "TRFs" | "TRTs" | "TJs" | "ALL";

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  domain: string;
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<CourtGroup[]>(["ALL"]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!query.trim()) return;
    setError(null);
    setLoading(true);
    setResults([]);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, groups: selectedGroups }),
      });
      if (!res.ok) throw new Error("Falha na busca");
      const data: { results: SearchResult[] } = await res.json();
      setResults(data.results);
    } catch (err: any) {
      setError(err?.message ?? "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SearchForm
        query={query}
        setQuery={setQuery}
        selectedGroups={selectedGroups}
        setSelectedGroups={setSelectedGroups}
        onSubmit={handleSearch}
      />
      {loading && <p>Buscando?</p>}
      {error && <p className="error">{error}</p>}
      {!loading && results.length > 0 && <ResultsList results={results} />}
    </div>
  );
}
