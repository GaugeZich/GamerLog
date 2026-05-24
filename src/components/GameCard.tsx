import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

// Tipo local solo para diseño — en la rama de programación
// esto vendrá del archivo src/types/game.ts
type GamePreview = {
    id: string;
    name: string;
    background_image: string | null;
    rating: number;
    genres: { name: string }[];
};

type Props = {
    game: GamePreview;
    onPress: () => void;
};

export function GameCard({ game, onPress }: Props) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.85}
        >
            {game.background_image ? (
                <Image
                    source={{ uri: game.background_image }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.placeholderText}>Sin imagen</Text>
                </View>
            )}
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                    {game.name}
                </Text>
                <View style={styles.row}>
                    <Text style={styles.rating}>★ {game.rating.toFixed(1)}</Text>
                    <Text style={styles.genre} numberOfLines={1}>
                        {game.genres?.map(g => g.name).join(' · ')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
        marginHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.neon,
    },
    image: {
        width: '100%',
        height: 130,
    },
    imagePlaceholder: {
        width: '100%',
        height: 130,
        backgroundColor: theme.colors.surfaceAlt,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        color: theme.colors.textMuted,
        fontSize: theme.font.sm,
    },
    info: {
        padding: theme.spacing.sm,
        gap: theme.spacing.xs,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    title: {
        color: theme.colors.text,
        fontSize: theme.font.md,
        fontWeight: '500',
    },
    rating: {
        color: theme.colors.neon,
        fontSize: theme.font.sm,
        fontWeight: '600',
    },
    genre: {
        color: theme.colors.textMuted,
        fontSize: theme.font.sm,
        flex: 1,
    },
});