import type { SearchResult } from "@/app/page";

export default function ResultsList({ results }: { results: SearchResult[] }) {
  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.domain]) acc[r.domain] = [];
    acc[r.domain].push(r);
    return acc;
  }, {});

  const domains = Object.keys(grouped).sort();

  return (
    <div className="results">
      {domains.map((domain) => (
        <section key={domain} className="card">
          <h3>{domain}</h3>
          <ul>
            {grouped[domain].map((r, idx) => (
              <li key={domain + idx} className="result">
                <a href={r.url} target="_blank" rel="noreferrer" className="title">{r.title}</a>
                <div className="link">{r.url}</div>
                <p className="snippet">{r.snippet}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
