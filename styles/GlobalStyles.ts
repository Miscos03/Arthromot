import { StyleSheet } from 'react-native';

export const Colors = {
  primary: '#DDC4DD',        
  secondary: '#DCCFEC',      
  accent: '#A997DF',         
  dark: '#4F517D',           
  darkest: '#2C363F',        
  
  background: '#2C363F',     
  surface: '#4F517D',        
  surfaceLight: '#A997DF',   
  
  white: '#FFFFFF',
  black: '#000000',
  textPrimary: '#FFFFFF',
  textSecondary: '#DDC4DD',
  textMuted: '#DCCFEC',
  
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  
  primaryLight: 'rgba(221, 196, 221, 0.1)',
  primaryMedium: 'rgba(221, 196, 221, 0.2)',
  secondaryLight: 'rgba(220, 207, 236, 0.1)',
  accentLight: 'rgba(169, 151, 223, 0.1)',
  surfaceAlpha: 'rgba(79, 81, 125, 0.3)',
};

export const Typography = {
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: Colors.textPrimary,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.textPrimary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: Colors.textSecondary,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export const Shadows = {
  small: {
    elevation: 2,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  medium: {
    elevation: 4,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  large: {
    elevation: 8,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
};

export const GlobalStyles = StyleSheet.create({
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
  headerTitle: {
    ...Typography.h3,
  },
  headerButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryLight,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.md,
  },
  card: {
    backgroundColor: Colors.accentLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primaryMedium,
  },
  button: {
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
  },
  buttonAccent: {
    backgroundColor: Colors.accent,
  },
  buttonDanger: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    ...Typography.bodyMedium,
    fontWeight: '700',
  },
  buttonTextPrimary: {
    color: Colors.background,
  },
  buttonTextSecondary: {
    color: Colors.background,
  },
  buttonTextAccent: {
    color: Colors.white,
  },
  buttonTextDanger: {
    color: Colors.white,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.secondaryLight,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.sm,
  },
  infoText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44, 54, 63, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.bodyMedium,
    color: Colors.primary,
    marginTop: Spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  flex1: {
    flex: 1,
  },
  mt_sm: { marginTop: Spacing.sm },
  mt_md: { marginTop: Spacing.md },
  mt_lg: { marginTop: Spacing.lg },
  mt_xl: { marginTop: Spacing.xl },
  mb_sm: { marginBottom: Spacing.sm },
  mb_md: { marginBottom: Spacing.md },
  mb_lg: { marginBottom: Spacing.lg },
  mb_xl: { marginBottom: Spacing.xl },
  mx_sm: { marginHorizontal: Spacing.sm },
  mx_md: { marginHorizontal: Spacing.md },
  mx_lg: { marginHorizontal: Spacing.lg },
  mx_xl: { marginHorizontal: Spacing.xl },
  p_sm: { padding: Spacing.sm },
  p_md: { padding: Spacing.md },
  p_lg: { padding: Spacing.lg },
  p_xl: { padding: Spacing.xl },
  px_sm: { paddingHorizontal: Spacing.sm },
  px_md: { paddingHorizontal: Spacing.md },
  px_lg: { paddingHorizontal: Spacing.lg },
  px_xl: { paddingHorizontal: Spacing.xl },
  py_sm: { paddingVertical: Spacing.sm },
  py_md: { paddingVertical: Spacing.md },
  py_lg: { paddingVertical: Spacing.lg },
  py_xl: { paddingVertical: Spacing.xl },
});