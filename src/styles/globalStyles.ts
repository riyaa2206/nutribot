import { StyleSheet } from 'react-native';

// Color palette
export const colors = {
    primary: '#3b82f6',
    primaryLight: '#dbeafe',
    secondary: '#6b7280',
    danger: '#ef4444',
    background: '#f9fafb',
    white: '#fff',
    text: {
        primary: '#1f2937',
        secondary: '#6b7280',
        tertiary: '#374151',
    },
    border: {
        light: '#d1d5db',
        medium: '#e5e7eb',
    },
};

// Global styles used across multiple screens
export const globalStyles = StyleSheet.create({
    // Container styles
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },

    // Typography
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text.primary,
        textAlign: 'center',
        marginBottom: 8,
    },
    titleLarge: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.text.secondary,
        textAlign: 'center',
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text.primary,
        textAlign: 'center',
        marginBottom: 12,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: colors.text.secondary,
        textAlign: 'center',
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text.tertiary,
        marginBottom: 8,
    },

    // Form elements
    form: {
        width: '100%',
    },
    input: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border.light,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        color: colors.text.primary,
    },
    textArea: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border.light,
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: colors.text.primary,
        minHeight: 120,
        textAlignVertical: 'top',
    },

    // Buttons
    button: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border.light,
    },
    secondaryButtonText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '600',
    },
    dangerButton: {
        backgroundColor: colors.danger,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    dangerButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },

    // Cards
    card: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border.medium,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: colors.text.secondary,
        lineHeight: 20,
    },

    // Hero section
    hero: {
        backgroundColor: colors.primaryLight,
        padding: 24,
        paddingTop: 40,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 16,
    },
    heroSubtitle: {
        fontSize: 16,
        color: colors.text.secondary,
        marginBottom: 24,
        lineHeight: 24,
    },

    // Section
    section: {
        padding: 24,
    },

    // Text helpers
    textCenter: {
        textAlign: 'center',
    },
    textBold: {
        fontWeight: 'bold',
    },
    brandText: {
        color: colors.primary,
    },

    // Link/navigation styles
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    linkText: {
        color: colors.text.secondary,
        fontSize: 14,
    },
    link: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },

    // Layout helpers
    buttonContainer: {
        gap: 12,
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexRowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gap8: {
        gap: 8,
    },
    gap12: {
        gap: 12,
    },
    gap16: {
        gap: 16,
    },

    // Feature cards
    featuresGrid: {
        gap: 16,
    },
    featureIcon: {
        fontSize: 32,
        marginBottom: 12,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 8,
    },

    // Stats section
    statsSection: {
        backgroundColor: '#f3f4f6',
        padding: 24,
        gap: 16,
    },
    statIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: colors.text.secondary,
        textAlign: 'center',
    },

    // CTA section
    ctaSection: {
        padding: 24,
        paddingVertical: 40,
        alignItems: 'center',
    },
    ctaTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text.primary,
        textAlign: 'center',
        marginBottom: 12,
    },
    ctaSubtitle: {
        fontSize: 14,
        color: colors.text.secondary,
        textAlign: 'center',
        marginBottom: 24,
    },

    // Header styles
    header: {
        padding: 24,
        alignItems: 'center',
    },
    headerWithPaddingBottom: {
        padding: 24,
        paddingBottom: 12,
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text.primary,
        textAlign: 'center',
        marginBottom: 12,
    },
    headerSubtitle: {
        fontSize: 14,
        color: colors.text.secondary,
        textAlign: 'center',
    },

    // Choice/selection cards
    choiceContainer: {
        flex: 1,
        padding: 16,
    },
    choiceButtons: {
        gap: 16,
        marginTop: 24,
    },
    choiceCard: {
        backgroundColor: colors.white,
        padding: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.border.medium,
        alignItems: 'center',
    },
    choiceIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    choiceTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 8,
        textAlign: 'center',
    },

    // Input section
    inputSection: {
        padding: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 8,
    },
    singleItemContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    singleItemInput: {
        flex: 1,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border.light,
        borderRadius: 8,
        padding: 12,
    },
    addButton: {
        backgroundColor: colors.primary,
        width: 48,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold',
    },

    // Items display
    itemsSection: {
        padding: 16,
        backgroundColor: colors.white,
        margin: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border.medium,
    },
    itemsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 4,
    },
    itemsSubtitle: {
        fontSize: 13,
        color: colors.text.secondary,
        marginBottom: 16,
    },
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    itemBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 8,
    },
    itemText: {
        fontSize: 14,
        color: colors.text.primary,
    },
    removeText: {
        fontSize: 20,
        color: colors.danger,
        fontWeight: 'bold',
    },

    // Action buttons
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    clearButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border.light,
        alignItems: 'center',
    },
    clearButtonText: {
        color: colors.text.primary,
        fontSize: 16,
        fontWeight: '600',
    },
    continueButton: {
        flex: 2,
        backgroundColor: colors.primary,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    continueButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },

    // Progress bar
    progressContainer: {
        padding: 16,
        backgroundColor: colors.white,
        margin: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border.medium,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressText: {
        fontSize: 13,
        color: colors.text.secondary,
        fontWeight: '500',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#f3f4f6',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
    },

    // Step container
    stepContainer: {
        padding: 16,
    },
    stepTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 8,
    },
    stepSubtitle: {
        fontSize: 14,
        color: colors.text.secondary,
        marginBottom: 20,
    },

    // Slider section
    sliderSection: {
        marginBottom: 24,
    },
    sliderButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    sliderButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border.light,
        backgroundColor: colors.white,
    },
    sliderButtonActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    sliderButtonText: {
        fontSize: 14,
        color: colors.text.primary,
        fontWeight: '500',
    },
    sliderButtonTextActive: {
        color: colors.white,
    },

    // Option cards
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border.medium,
        marginBottom: 12,
    },
    optionCardActive: {
        borderColor: colors.primary,
        backgroundColor: '#eff6ff',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.border.light,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 2,
    },

    // Checkbox
    checkboxGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '47%',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.text.primary,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkmark: {
        fontSize: 14,
        color: colors.text.primary,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        fontSize: 14,
        color: colors.text.primary,
    },

    // Navigation buttons
    navigationButtons: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    navButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    previousButton: {
        borderWidth: 1,
        borderColor: colors.border.light,
        backgroundColor: colors.white,
    },
    nextButton: {
        backgroundColor: colors.primary,
    },
    disabledButton: {
        opacity: 0.5,
    },
    previousButtonText: {
        color: colors.text.primary,
        fontSize: 16,
        fontWeight: '600',
    },
    nextButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },

    // Summary
    summarySection: {
        padding: 16,
        backgroundColor: colors.white,
        margin: 16,
        marginTop: 0,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border.medium,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 12,
    },
    summaryText: {
        fontSize: 14,
        color: colors.text.secondary,
        marginBottom: 4,
    },

    // Status card
    statusCard: {
        backgroundColor: '#eff6ff',
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 8,
        padding: 16,
        margin: 16,
    },
    statusTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
        marginBottom: 8,
    },
    statusDescription: {
        fontSize: 13,
        color: colors.text.secondary,
        marginBottom: 12,
    },
    statusMetrics: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    metricText: {
        fontSize: 12,
        color: colors.text.secondary,
    },

    // Recipe cards
    recipeCard: {
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border.medium,
        padding: 16,
        marginBottom: 16,
    },
    recipeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    recipeHeaderText: {
        flex: 1,
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 4,
    },
    recipeRating: {
        fontSize: 13,
        color: colors.text.secondary,
    },
    difficultyBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    difficultyText: {
        fontSize: 12,
        color: colors.white,
        fontWeight: '600',
    },
    recipeMetrics: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 12,
    },
    metricItem: {
        fontSize: 12,
        color: colors.text.secondary,
    },
    recipeTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 12,
    },
    tag: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    tagText: {
        fontSize: 11,
        color: colors.text.primary,
    },
    nutritionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: colors.border.medium,
        marginBottom: 12,
    },
    nutritionItem: {
        alignItems: 'center',
    },
    nutritionValue: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text.primary,
    },
    nutritionLabel: {
        fontSize: 11,
        color: colors.text.secondary,
    },
    viewButton: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border.light,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    viewButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text.primary,
    },

    // Modal
    modalContainer: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text.primary,
        flex: 1,
    },
    closeButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        fontSize: 32,
        color: colors.text.secondary,
    },
    modalSection: {
        marginBottom: 24,
    },
    modalSectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 12,
    },
    modalListItem: {
        fontSize: 14,
        color: colors.text.primary,
        marginBottom: 8,
        lineHeight: 20,
    },
});
