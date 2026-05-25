import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedGame } from '../types/game';

const STORAGE_KEY = 'gamerlog_list';

// Trae todos los juegos guardados
export async function getSavedGames(): Promise<SavedGame[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Guarda o actualiza un juego en la lista
export async function saveGame(game: SavedGame): Promise<void> {
  const list = await getSavedGames();
  const index = list.findIndex(g => g.gameId === game.gameId);

  if (index >= 0) {
    list[index] = game; // actualiza si ya existe
  } else {
    list.unshift(game); // agrega al principio
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Elimina un juego de la lista
export async function removeGame(gameId: string): Promise<void> {
  const list = await getSavedGames();
  const filtered = list.filter(g => g.gameId !== gameId);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}