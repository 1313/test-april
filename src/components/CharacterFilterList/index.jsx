import React from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { useFavorite } from "../../context/FavoriteContext";
import { useFilter } from "../../hooks/useFilter";
import Button from "../Button";
import CharacterGrid from "../CharacterGrid";
import OutlineButton from "../OutlineButton";
import Loading from "../Loading";

export default function CharacterList({ characters, loading, error }) {
  const perPage = 12;
  const {
    amount,
    term,
    setTerm,
    setAmount,
    showOnlyFavorites,
    setShowOnlyFavorites,
    filteredCharacters,
  } = useFilter(characters);

  const { favorites } = useFavorite();

  if (loading) {
    return <Loading />;
  }

  if (error || !characters) {
    return null; // Error handling
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.filterButtonsWrapper}>
          <OutlineButton
            icon="cards"
            isActive={!showOnlyFavorites}
            onClick={() => {
              window.scrollTo(0, 0);
              setShowOnlyFavorites(false);
            }}
          >
            All
          </OutlineButton>
          <OutlineButton
            icon="star"
            isActive={showOnlyFavorites}
            onClick={() => {
              window.scrollTo(0, 0);
              setShowOnlyFavorites(true);
            }}
          >
            Favorites
          </OutlineButton>
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            disabled={showOnlyFavorites}
            type="text"
            value={term}
            onChange={(e) => {
              window.scrollTo(0, 0);
              setTerm(e.target.value);
            }}
          />
        </div>
      </header>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <CharacterGrid
          characters={
            showOnlyFavorites
              ? filteredCharacters
              : filteredCharacters.slice(0, amount)
          }
        />
      </motion.div>
      {showOnlyFavorites && (
        <div className={styles.favoritesCount}>
          You have {favorites.length} favorites.
        </div>
      )}
      {!showOnlyFavorites && amount < filteredCharacters.length && (
        <div className={styles.buttonWrapper}>
          <Button
            onClick={() => {
              setAmount((prevState) => prevState + perPage);
            }}
          >
            Show more
          </Button>
        </div>
      )}
    </>
  );
}
