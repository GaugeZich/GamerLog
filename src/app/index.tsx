import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getSavedGames } from '../services/storage.service';
import { SavedGame } from '../types/game';
import { AppButton } from '../components/AppButton'; // Asegurate de que la ruta a tus componentes sea correcta
import { theme } from '../constants/theme'; // Asegurate de que la ruta a tu tema sea correcta

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
                <Text style={styles.title}>GameLog</Text>
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
                                {/* Podés poner la portada del juego acá con un <Image source={{ uri: item.imageUrl }} /> */}
                            </View>
                            
                            <View style={styles.recentInfo}>
                                {/* Ajustado a item.gameName según tus indicaciones */}
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
        width: 36,
        height: 36,
        backgroundColor: theme.colors.border,
        borderRadius: 8,
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