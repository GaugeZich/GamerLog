import { Game } from '../types/game';

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = process.env.EXPO_PUBLIC_RAWG_KEY;

// Trae la lista de juegos populares. Si hay búsqueda, filtra por nombre.
export async function getGames(search?: string): Promise<Game[]> {
  const params = new URLSearchParams({
    key: API_KEY!,
    page_size: '20',
    ordering: '-rating',
  });

  if (search) params.append('search', search);

  const response = await fetch(`${BASE_URL}/games?${params}`);
  if (!response.ok) throw new Error('Error al cargar juegos');

  const data = await response.json();
  return data.results as Game[];
}

// Trae el detalle de un juego por su ID.
export async function getGameById(id: string): Promise<Game> {
  const params = new URLSearchParams({ key: API_KEY! });

  const response = await fetch(`${BASE_URL}/games/${id}?${params}`);
  if (!response.ok) throw new Error('Error al cargar el juego');

  return response.json() as Promise<Game>;
}