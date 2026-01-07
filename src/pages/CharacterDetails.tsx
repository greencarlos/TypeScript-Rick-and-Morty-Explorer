import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type {CharacterProps} from '../comps/interfaces'

export default function CharacterDetails() {
  const { id } = useParams();
  const [item, setItem] = useState<CharacterProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch character");
        const json = await res.json();
        setItem(json);
      } catch (err) {
        setError(err.message);
        console.log("err:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Loading Character</p>;
  if (error) return <p> Error: {error}</p>;
  if (!item) return <p>Character not found</p>;

  console.log("item", item);

  return (
    <main className="details">
      <img src={item.image} alt={item.name} />
      <div>
        <h2>{item.name}</h2>
        <p>
          <strong>Status:</strong> {item.status}
        </p>
        <p>
          <strong>Species:</strong> {item.species}
        </p>
        {item.type && (
          <p>
            <strong>Type:</strong>
            {item.type}
          </p>
        )}
        <p>
          <strong>Gender:</strong>
          {item.gender}
        </p>
        <p>
          <strong>Origin:</strong> {item.origin?.name}
        </p>
        <p>
          <strong>Location:</strong> {item.location?.name}
        </p>
        <Link to="/" className="btn">
          Back to Characters
        </Link>
      </div>
    </main>
  );
}
