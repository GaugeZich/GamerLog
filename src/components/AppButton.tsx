import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

type Props = {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
};

export function AppButton({
    label,
    onPress,
    variant = 'primary',
    fullWidth = true,
}: Props) {
    return (
        <TouchableOpacity
            style={[
                styles.btn,
                variant === 'secondary' && styles.secondary,
                fullWidth && styles.fullWidth,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text
                style={[
                    styles.text,
                    variant === 'secondary' && styles.textSecondary,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: theme.colors.neon,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.radius.md,
        alignItems: 'center',
    },
    secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.cyan,
    },
    fullWidth: {
        width: '100%',
    },
    text: {
        color: theme.colors.textDark,
        fontSize: theme.font.md,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    textSecondary: {
        color: theme.colors.cyan,
    },
});