// Un juego tal como viene de la API RAWG
export type Game = {
  id: number;
  name: string;
  background_image: string | null;
  rating: number;
  released: string;
  description_raw: string;
  genres: { id: number; name: string }[];
  platforms: { platform: { id: number; name: string } }[];
};

// Lo que se guarda en el storage del dispositivo
export type SavedGame = {
  gameId: string;
  gameName: string;
  score: number;       // 1-5 estrellas
  status: string;      // 'Jugando' | 'Terminado' | 'Pendiente' | 'Abandonado'
  review: string;
  savedAt: number;     // Date.now() para ordenar por reciente
  background_image: string | null;
};