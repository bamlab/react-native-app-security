import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { RNASViewProps } from './RNAS.types';

const NativeView: React.ComponentType<RNASViewProps> =
  requireNativeViewManager('RNAS');

export default function RNASView(props: RNASViewProps) {
  return <NativeView {...props} />;
}
