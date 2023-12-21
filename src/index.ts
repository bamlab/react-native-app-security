import RNASModule from "./RNASModule";
import { SafeKeyboardDetectorInterface } from "./types";

export const SafeKeyboardDetector: SafeKeyboardDetectorInterface = {
  isCurrentKeyboardSafe: RNASModule.isCurrentKeyboardSafe,
  showInputMethodPicker: RNASModule.showInputMethodPicker,
};
