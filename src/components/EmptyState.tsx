import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

type Props = {
    message: string;
    icon?: string;
};

export function EmptyState({ message, icon = '◻' }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background,
        gap: theme.spacing.sm,
    },
    icon: {
        fontSize: 40,
        color: theme.colors.border,
    },
    text: {
        color: theme.colors.textMuted,
        fontSize: theme.font.md,
        textAlign: 'center',
        lineHeight: 22,
    },
});