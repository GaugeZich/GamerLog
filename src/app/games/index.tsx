import { FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { GameCard } from '../../components/GameCard';
import { theme } from '../../constants/theme';

// Datos mock para diseño — en programación vendrán de la API
const GAMES_MOCK = [
    { id: '1', name: 'Elden Ring', background_image: null, rating: 9.5, genres: [{ name: 'RPG' }, { name: 'Acción' }] },
    { id: '2', name: 'Hades II', background_image: null, rating: 9.1, genres: [{ name: 'Roguelike' }] },
    { id: '3', name: 'Starfield', background_image: null, rating: 7.0, genres: [{ name: 'RPG' }, { name: 'Aventura' }] },
    { id: '4', name: 'Forza Horizon 5', background_image: null, rating: 8.9, genres: [{ name: 'Carreras' }] },
    { id: '5', name: 'Cyberpunk 2077', background_image: null, rating: 8.5, genres: [{ name: 'RPG' }, { name: 'Acción' }] },
];

export default function GamesScreen() {
    const router = useRouter();

    return (
        <FlatList
            data={GAMES_MOCK}
            keyExtractor={(item) => item.id}
            style={styles.list}
            contentContainerStyle={styles.content}
            renderItem={({ item }) => (
                <GameCard
                    game={item}
                    onPress={() => router.push('/games/id')}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.xl,
    },
});