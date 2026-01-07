import { useEffect, useMemo, useState } from "react";
import CharacterCard from "../comps/CharacterCard";

export default function Characters() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        if (!res.ok) throw new Error("Network error!");
        const json = await res.json();
        setData(json.results || []);
      } catch (err) {
        setError(err.message);
        console.log("Characters err:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((c) => c.name.toLowerCase().includes(q));
  }, [data, query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error: {error}</p>;

  return (
    <main>
      <div className="toolbar">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name..."
        />
        <span className="count">{filtered.length}</span>
      </div>

      {filtered.length === 0 ? (
        <p>No results, try a different search</p>
      ) : (
        <section className="grid">
          {filtered.map((ch) => (
            <CharacterCard key={ch.id} character={ch} />
          ))}
        </section>
      )}

      <div className="pager">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => Math.max(1, p + 1))}>Next</button>
      </div>
    </main>
  );
}
