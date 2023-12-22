import ExpoModulesCore

public class RNASModule: Module {
  public func definition() -> ModuleDefinition {
    Name("RNAS")
    // There's nothing here related to SSL pinning because we use TrustKit's "auto-setup" via the config in `Info.plist`
    
    Function("showInputMethodPicker") {() in
          throw InputMethodPickerUnavailableException()
        }

    Function("isCurrentKeyboardSafe") {() in
          return true
    }
  }
}


internal class InputMethodPickerUnavailableException: Exception {
  override var reason: String {
    return "Method not implemented on iOS since third-party keyboards security issues are not relevant on iOS."
  }
}