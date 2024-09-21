import React, { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard';
import Pagination from './components/Pagination';
import './styles/App.css';

// Main App Component
const App = () => {
  // State for storing Pokémon data, current page, and search query
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  // Fetch Pokémon data from the API
  useEffect(() => {
    fetchPokemonData();
  }, [currentPage]);

  const fetchPokemonData = async () => {
    const limit = 12; // Set the limit of Pokémon per page
    const offset = (currentPage - 1) * limit; // Calculate the offset
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    setTotalPages(Math.ceil(data.count / limit)); // Calculate total pages for pagination
    setPokemonData(data.results); // Set the Pokémon data in state
  };

  // Handle search query and filter Pokémon based on the name
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter Pokémon data based on the search query
  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.includes(searchQuery)
  );

  return (
    <div className="app-container">
      <h1 className="app-title">Pokémon Browser</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Pokémon"
        className="search-input"
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Pokémon Cards Display */}
      <div className="pokemon-cards">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))
        ) : (
          <p>No Pokémon found.</p>
        )}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
