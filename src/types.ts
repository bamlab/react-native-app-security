export type SafeKeyboardDetectorInterface ={
  /**
   * Compare the current keyboard package name with a list of safe keyboard package names on Android
   * Will always return true on iOS
   *
   * @param customAllowedKeyboardList a list keyboard package names. If not provided, a default list is used.
   *
   * @example
   * const isSafe = isCurrentKeyboardSafe(["com.touchtype.swiftkey", "com.samsung.android", "com.google.android"])
   */
  isCurrentKeyboardSafe: (customAllowedKeyboardList?: string[]) => boolean;
  /**
   * Prompt the user to change his current keyboard to a safe one.
   * Will throw an error if used on iOS
   */
  showInputMethodPicker: () => void;
}
