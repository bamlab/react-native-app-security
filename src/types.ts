export type SafeKeyboardDetectorInterface = {
  /**
   * Compare the current keyboard package name with a list of default safe keyboard package names on Android
   * Will always return true on iOS
   *
   * @example
   * const { isInDefaultSafeList, inputMethodId } = getCurrentInputMethodInfo();
   * if (!isInDefaultSafeList) {
   *  console.warn(`Your current keyboard (${inputMethodId}) is not safe`);
   * }
   */
  getCurrentInputMethodInfo: () => {
    isInDefaultSafeList: boolean;
    inputMethodId: string;
  };
  /**
   * Prompt the user to change his current keyboard to a safe one.
   * Will throw an error if used on iOS
   */
  showInputMethodPicker: () => void;
};
