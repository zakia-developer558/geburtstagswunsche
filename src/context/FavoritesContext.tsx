"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface FavoriteItem {
  id: string; // or title if id is not available, but let's assume we can generate one or use title
  title: string;
  price: string;
  image: string;
  alt: string;
  href?: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (title: string) => void; // Using title as ID for now since ProductCard uses title
  isFavorite: (title: string) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Hydrate from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Failed to parse favorites from local storage");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (newItem: FavoriteItem) => {
    setFavorites((prevItems) => {
      if (prevItems.some((item) => item.title === newItem.title)) {
        return prevItems;
      }
      return [...prevItems, newItem];
    });
  };

  const removeFromFavorites = (title: string) => {
    setFavorites((prevItems) => prevItems.filter((item) => item.title !== title));
  };

  const isFavorite = (title: string) => {
    return favorites.some((item) => item.title === title);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.title)) {
      removeFromFavorites(item.title);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
