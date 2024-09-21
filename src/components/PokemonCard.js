import React, { useState, useEffect } from 'react';
import '../styles/PokemonCard.css';

// Component for each Pokémon Card
const PokemonCard = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for image

  useEffect(() => {
    // Fetch details for each Pokémon, like the image
    const fetchPokemonDetails = async () => {
      setLoading(true); // Start loading when the fetch begins
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setPokemonDetails(data);
      setLoading(false); // Stop loading once data is fetched
    };
    fetchPokemonDetails();
  }, [pokemon]);

  return (
    <div className="pokemon-card">
      {/* Show spinner/loader while the data is being fetched */}
      {loading ? (
        <div className="loader"></div> // Loading spinner
      ) : (
        pokemonDetails && (
          <>
            <img
              className="pokemon-image"
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
            />
            <h3>{pokemonDetails.name}</h3>
          </>
        )
      )}
    </div>
  );
};

export default PokemonCard;
