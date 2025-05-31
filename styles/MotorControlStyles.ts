import { StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from './GlobalStyles';

export const MotorControlStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.md,
  },
  headerTitle: {
    ...Typography.h3,
  },
  headerButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.accentLight,
  },
  connectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.secondaryLight,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.sm,
  },
  connectionText: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginLeft: Spacing.sm,
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: 30,
  },
  motorCard: {
    backgroundColor: Colors.accentLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primaryMedium,
  },
  disabledCard: {
    backgroundColor: Colors.surfaceAlpha,
    borderColor: Colors.surface,
  },
  motorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  motorTitle: {
    ...Typography.h3,
    marginLeft: Spacing.md,
    flex: 1,
  },
  disabledText: {
    color: Colors.surface,
  },
  speedBadge: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  disabledBadge: {
    backgroundColor: Colors.surface,
  },
  speedText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '700',
  },
  sliderContainer: {
    marginBottom: 10,
  },
  speedLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  speedLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  presetContainer: {
    backgroundColor: Colors.accentLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primaryMedium,
  },
  presetTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.lg,
  },
  presetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  presetButton: {
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minWidth: 50,
    alignItems: 'center',
  },
  presetText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
  advancedContainer: {
    backgroundColor: Colors.accentLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primaryMedium,
  },
  fineAdjustContainer: {
    marginBottom: Spacing.xl,
  },
  fineAdjustTitle: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    marginBottom: 10,
  },
  fineAdjustButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fineAdjustButton: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fineAdjustText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  statusContainer: {
    backgroundColor: Colors.secondaryLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
  },
  statusTitle: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusLabel: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
  statusValue: {
    ...Typography.bodyMedium,
    fontWeight: '600',
  },
  quickControls: {
    paddingVertical: Spacing.xl,
  },
  emergencyButton: {
    backgroundColor: Colors.success,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  emergencyText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: Spacing.md,
  },
});