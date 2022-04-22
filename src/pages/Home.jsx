import React from 'react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterFilterList from '../components/CharacterFilterList';

export default function Home() {
  const { error, loading, data } = useCharacters();

  return (
    <div>
      <CharacterFilterList
        loading={loading}
        error={error}
        characters={data?.allPeople?.people}
      />
    </div>
  );
}
