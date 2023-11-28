import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to RNAS.web.ts
// and on native platforms to RNAS.ts
import RNASModule from './RNASModule';
import RNASView from './RNASView';
import { ChangeEventPayload, RNASViewProps } from './RNAS.types';

// Get the native constant value.
export const PI = RNASModule.PI;

export function hello(): string {
  return RNASModule.hello();
}

export async function setValueAsync(value: string) {
  return await RNASModule.setValueAsync(value);
}

const emitter = new EventEmitter(RNASModule ?? NativeModulesProxy.RNAS);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { RNASView, RNASViewProps, ChangeEventPayload };
