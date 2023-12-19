import ExpoModulesCore

public class RNASModule: Module {
  public func definition() -> ModuleDefinition {
    Name("RNAS")
    // There's nothing here related to SSL pinning because we use TrustKit's "auto-setup" via the config in `Info.plist`
    
    Function("showInputMethodPicker") {() in
          throw RNASModuleError.methodNotImplemented
        }

    Function("isCurrentKeyboardSafe") {() in
          return true
    }
  }
}

enum RNASModuleError: Error {
    case methodNotImplemented
}
