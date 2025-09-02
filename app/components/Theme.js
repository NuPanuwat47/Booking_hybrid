import { Dimensions, PixelRatio } from 'react-native';

export const Colors = {
  background: '#F4F7FF',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  primary: '#2563EB', // modern blue
  primaryDark: '#1D4ED8',
  accent: '#7C83FF',
  text: '#0B1220',
  muted: '#6B7280',
  border: '#E6EEF8',
  danger: '#EF4444',
  subtle: '#F1F5F9',
  destructive: '#EF4444',
  inputBackground: '#FFFFFF',
};

// Responsive helpers: scale sizes based on device width
const { width: DEVICE_WIDTH } = Dimensions.get('window');
const GUIDELINE_BASE_WIDTH = 375; // iPhone 8 baseline
const scale = DEVICE_WIDTH / GUIDELINE_BASE_WIDTH;

const scaleSize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

export const Spacing = {
  pagePadding: scaleSize(22),
  gap: scaleSize(14),
  radius: scaleSize(12),
};

export const Shadows = {
  soft: { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: scaleSize(12), elevation: 3 },
  strong: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: scaleSize(18), elevation: 6 },
};

export const Typography = {
  h1: scaleSize(28),
  h2: scaleSize(20),
  body: scaleSize(16),
};

// Export the raw helper so components can compute custom responsive sizes
export const responsive = {
  scale: scaleSize,
  deviceWidth: DEVICE_WIDTH,
};

// Expo Router treats every file in `app/` as a route. This module is a utility
// module (not a page), so export a harmless default React component stub to
// prevent the router from warning about a missing default export.
import React from 'react';
export default function ThemeModuleStub() {
  return null;
}
