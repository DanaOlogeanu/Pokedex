import React, { useEffect, useState } from "react";
import PokeCard from "./PokeCard";
import ReactPaginate from 'react-paginate';
  
function PokemonCardList() {
  const [allPokemons, setAllPokemons] = useState([]);
 
  const getAllPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const data = await res.json();
   
  
    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
    await console.log(allPokemons);
  };
  useEffect(() => {
    getAllPokemons();
  },[]);

///pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPokemons.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }) => {
     setCurrentPage(selected + 1);
  };


////
  
  return (
    <div className="app-container">
      <h1>Pokemon DEX</h1>
  
      <div className="pokemon-container">
        <div className="all-container">
           {currentPosts.map((pokemon, index) => (
            <PokeCard
              id={pokemon.id}
              name={pokemon.name}
              image=
      {pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
              height={pokemon.height}
              weight={pokemon.weight}
              stat1={pokemon.stats[0].stat.name}
              stat2={pokemon.stats[1].stat.name}
              stat3={pokemon.stats[2].stat.name}
              stat4={pokemon.stats[3].stat.name}
              stat5={pokemon.stats[4].stat.name}
              stat6={pokemon.stats[5].stat.name}
              bs1={pokemon.stats[0].base_stat}
              bs2={pokemon.stats[1].base_stat}
              bs3={pokemon.stats[2].base_stat}
              bs4={pokemon.stats[3].base_stat}
              bs5={pokemon.stats[4].base_stat}
              bs6={pokemon.stats[5].base_stat}
            />
          ))} 
        </div >
        <div class='pagination'>
        <ReactPaginate 
                  onPageChange={paginate}
                  pageCount={Math.ceil(allPokemons.length / postsPerPage)}
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  containerClassName={'pagination'}
                  pageLinkClassName={'page-number'}
                  previousLinkClassName={'page-number'}
                  nextLinkClassName={'page-number'}
                  activeLinkClassName={'active'}
               />
        
        </div>
      </div>
    </div>
  );
}
  
export default PokemonCardList;