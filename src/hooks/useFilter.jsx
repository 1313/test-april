import { useEffect, useState, useRef } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useFavorite } from "../context/FavoriteContext";

export const useFilter = (characters) => {
  const urlUpdateTimer = useRef(); // A timer to prevent the url to update on every keypress when terms are entered in input

  const initialAmount = 24;
  const [amount, setAmount] = useState(initialAmount);
  const [term, setTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const { favorites } = useFavorite();
  const [searchParams, setSearchParams] = useSearchParams();
  const [paramsInitiated, setParamsInitiated] = useState(false);

  const handleFilter = () => {
    updateUrl();
    if (showOnlyFavorites) {
      const results = characters.filter((item) => {
        return favorites.includes(item.id);
      });
      setFilteredCharacters(results);
      return;
    }

    if (!term || term.length < 1) {
      setFilteredCharacters(characters);
      return;
    } else {
      // This can of course be made much more advanced, but I chose to do a simpler version for the demo.
      const _term = term.toLowerCase().replace(" ", "").replace("-", "");
      const results = characters.filter((item) => {
        const name = item.name.toLowerCase().replace(" ", "").replace("-", "");
        return name.includes(_term);
      });
      setFilteredCharacters(results);
    }
  };

  const updateUrl = () => {
    clearTimeout(urlUpdateTimer.current);
    urlUpdateTimer.current = setTimeout(() => {
      const data = {};

      if (showOnlyFavorites) {
        data.favorites = true;
      }

      if (term.length > 0 && !showOnlyFavorites) {
        data.term = term;
      }

      if (amount > initialAmount && !showOnlyFavorites) {
        data.amount = amount;
      }

      setSearchParams(createSearchParams(data), { replace: true });
    }, 500);
  };

  useEffect(() => {
    if (!characters) return;

    handleFilter();
  }, [term, characters, showOnlyFavorites, favorites]);

  useEffect(() => {
    updateUrl();
  }, [amount]);

  useEffect(() => {
    if (paramsInitiated) {
      setAmount(initialAmount);
    }
  }, [term]);

  useEffect(() => {
    const paramsAmount = searchParams.get("amount");
    const paramsTerm = searchParams.get("term");
    const paramsFavorites = searchParams.get("favorites");

    if (paramsFavorites && paramsFavorites === "true") {
      setShowOnlyFavorites(true, setParamsInitiated(true));
    } else {
      if (paramsAmount) setAmount(+paramsAmount);
      if (paramsTerm) setTerm(paramsTerm, setParamsInitiated(true));
    }

    return () => {
      clearTimeout(urlUpdateTimer.current);
    };
  }, []);

  return {
    amount,
    setAmount,
    term,
    setTerm,
    showOnlyFavorites,
    setShowOnlyFavorites,
    filteredCharacters,
  };
};
