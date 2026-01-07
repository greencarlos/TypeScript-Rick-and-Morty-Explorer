import { Link } from "react-router-dom";
import type {CharacterProps} from './interfaces'

const CharacterCard: React.FC<CharacterProps> = ({ character }) => {
  return (
    <article className="card">
      <img src={character.image} alt={character.name} />
      <h3 className="title">{character.name}</h3>
      <p className="meta">
        <strong>Status: </strong> {character.status}
        <br />
        <strong>Species:</strong> {character.species}
        <br />
      </p>
      <Link to={`/character/${character.id}`} className="btn">
        View Details
      </Link>
    </article>
  );
};

export default CharacterCard;
