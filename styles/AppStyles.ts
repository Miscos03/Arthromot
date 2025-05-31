import { Colors } from './GlobalStyles';

export const AppStyles = {
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.textMuted,
    style: {
      backgroundColor: Colors.surface,
      borderTopColor: Colors.accent,
      borderTopWidth: 1,
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: '500',
    },
  },
};