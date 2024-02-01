import RNASModule from "./RNASModule";
import { SafeKeyboardDetectorInterface } from "./types";

export const SafeKeyboardDetector: SafeKeyboardDetectorInterface = {
  showInputMethodPicker: RNASModule.showInputMethodPicker,
  getCurrentInputMethodInfo: RNASModule.getCurrentInputMethodInfo,
};
