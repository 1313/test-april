import React, { useState, useEffect, useContext } from 'react';

const FavoriteContext = React.createContext();

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const localStorageFavorites = window.localStorage.getItem('favorites')
      ? JSON.parse(window.localStorage.getItem('favorites'))
      : [];

    setFavorites(localStorageFavorites);
  }, []);

  const toggleFavorite = (id) => {
    let _favorites = [...favorites];
    if (_favorites.includes(id)) {
      _favorites = favorites.filter((item) => {
        return item !== id;
      });
    } else {
      _favorites.push(id);
    }
    setFavorites(_favorites);
    window.localStorage.setItem('favorites', JSON.stringify(_favorites));
  };

  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  return (
    <FavoriteContext.Provider
      value={{
        toggleFavorite,
        isFavorite,
        favorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

const useFavorite = () => useContext(FavoriteContext);

export { FavoriteProvider, useFavorite };
