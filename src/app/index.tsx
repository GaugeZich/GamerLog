import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getSavedGames } from '../services/storage.service';
import { SavedGame } from '../types/game';
import { AppButton } from '../components/AppButton';
import { theme } from '../constants/theme';

export default function HomeScreen() {
    const router = useRouter();
    const [recent, setRecent] = useState<SavedGame[]>([]);

    // Se ejecuta cada vez que el usuario vuelve a ver esta pantalla
    useFocusEffect(
        useCallback(() => {
            getSavedGames().then(all => setRecent(all.slice(0, 3))); // Muestra los 3 más recientes
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <svg xmlns="http://www.w3.org/2000/svg" height="12vh" viewBox="0 -960 960 960" width="12vh" fill="#00ff88"><path d="M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm16-86 114-114h336l114 114q2 2 16 6 11 0 17.5-6.5T800-304l-44-308q-4-29-26-48.5T678-680H282q-30 0-52 19.5T204-612l-44 308q-2 11 4.5 17.5T182-280q2 0 16-6Zm510.5-165.5Q720-463 720-480t-11.5-28.5Q697-520 680-520t-28.5 11.5Q640-497 640-480t11.5 28.5Q663-440 680-440t28.5-11.5Zm-80-120Q640-583 640-600t-11.5-28.5Q617-640 600-640t-28.5 11.5Q560-617 560-600t11.5 28.5Q583-560 600-560t28.5-11.5ZM310-440h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Zm170-40Z" /></svg>
                <Text style={styles.title}>GamerLog</Text>
                <Text style={styles.sub}>Tu biblioteca de juegos definitiva</Text>
            </View>

            <View style={styles.buttons}>
                <AppButton
                    label="Explorar juegos"
                    onPress={() => router.push('/games')}
                />
                <AppButton
                    label="Mi lista"
                    onPress={() => router.push('/mylist')}
                    variant="secondary"
                />
            </View>

            <View style={styles.recentBox}>
                <Text style={styles.recentTitle}>RECIENTE</Text>

                {recent.length === 0 ? (
                    <Text style={styles.recentSub}>No hay juegos guardados recientemente.</Text>
                ) : (
                    recent.map(item => (
                        <View key={item.gameId} style={styles.recentItem}>

                            <View style={styles.recentIcon}>
                                {item.background_image ? (
                                    <Image
                                        source={{ uri: item.background_image }}
                                        style={styles.imageThumb}
                                    />
                                ) : (
                                    // Placeholder por si algún juego viejo no guardó URL de imagen
                                    <View style={styles.placeholderThumb}>
                                        <Text style={styles.placeholderText}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="6vh" viewBox="0 -960 960 960" width="6vh" fill="#666666"><path d="M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm16-86 114-114h336l114 114q2 2 16 6 11 0 17.5-6.5T800-304l-44-308q-4-29-26-48.5T678-680H282q-30 0-52 19.5T204-612l-44 308q-2 11 4.5 17.5T182-280q2 0 16-6Zm510.5-165.5Q720-463 720-480t-11.5-28.5Q697-520 680-520t-28.5 11.5Q640-497 640-480t11.5 28.5Q663-440 680-440t28.5-11.5Zm-80-120Q640-583 640-600t-11.5-28.5Q617-640 600-640t-28.5 11.5Q560-617 560-600t11.5 28.5Q583-560 600-560t28.5-11.5ZM310-440h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Zm170-40Z" /></svg>
                                        </Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.recentInfo}>
                                <Text style={styles.recentName}>{item.gameName}</Text>
                                <Text style={styles.recentSub}>
                                    {item.savedAt
                                        ? `Guardado: ${new Date(item.savedAt).toLocaleDateString()}`
                                        : 'Sin fecha'}
                                </Text>
                            </View>

                            <Text style={[styles.recentScore, (!item.score || item.score === 0) && styles.recentScoreMuted]}>
                                {item.score && item.score > 0 ? `★ ${item.score}` : '—'}
                            </Text>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
        justifyContent: 'center',
        gap: theme.spacing.lg,
    },
    hero: {
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    logo: {
        width: 72,
        height: 72,
        borderRadius: 16,
    },
    title: {
        color: theme.colors.neon,
        fontSize: theme.font.xxl,
        fontWeight: '700',
        letterSpacing: 6,
    },
    sub: {
        color: theme.colors.textMuted,
        fontSize: theme.font.sm,
        letterSpacing: 2,
    },
    buttons: {
        gap: theme.spacing.sm,
    },
    recentBox: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: 0,
    },
    recentTitle: {
        color: theme.colors.textMuted,
        fontSize: theme.font.xs,
        letterSpacing: 3,
        fontWeight: '500',
        marginBottom: theme.spacing.sm,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    recentIcon: {
        width: 40,
        height: 40,
        backgroundColor: theme.colors.border,
        borderRadius: 8,
        overflow: 'hidden',
    },
    imageThumb: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderThumb: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.surfaceAlt,
    },
    placeholderText: {
        color: theme.colors.textMuted,
        fontSize: 14,
    },
    recentInfo: {
        flex: 1,
        gap: 2,
    },
    recentName: {
        color: theme.colors.text,
        fontSize: theme.font.sm,
        fontWeight: '500',
    },
    recentSub: {
        color: theme.colors.textMuted,
        fontSize: 11,
    },
    recentScore: {
        color: theme.colors.neon,
        fontSize: theme.font.sm,
        fontWeight: '600',
    },
    recentScoreMuted: {
        color: theme.colors.border,
    },
});