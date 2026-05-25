import { useState } from 'react';
import { useRouter } from 'expo-router';
import { saveGame } from '../services/storage.service';
import { SavedGame } from '../types/game';

type Params = {
  gameId: string;
  gameName: string;
  background_image: string | null;
};

export function useReviewForm({ gameId, gameName, background_image }: Params) {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('');
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    // Validación
    const e: Record<string, string> = {};
    if (score === 0) e.score = 'Seleccioná un puntaje';
    if (!status) e.status = 'Seleccioná un estado';
    if (!review.trim()) e.review = 'Escribí tu reseña';
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // Guardado
    setLoading(true);
    try {
      const saved: SavedGame = {
        gameId,
        gameName,
        score,
        status,
        review: review.trim(),
        savedAt: Date.now(),
        background_image,
      };
      await saveGame(saved);
      router.replace('/mylist'); // vuelve a la lista después de guardar
    } catch {
      setErrors({ general: 'No se pudo guardar. Intentá de nuevo.' });
    } finally {
      setLoading(false);
    }
  }
<<<<<<< HEAD

  return { score, setScore, status, setStatus, review, setReview, errors, loading, handleSubmit };
=======
 return { score, setScore, status, setStatus, review, setReview, errors, loading, handleSubmit };
>>>>>>> 319c8785d2e084864a7f525e1bd6d79d0ff38d63
}