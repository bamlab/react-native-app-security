import ExpoModulesCore

public class RNASModule: Module {
  public func definition() -> ModuleDefinition {
    Name("RNAS")
    // There's nothing here because we use TrustKit's "auto-setup" via the config in `Info.plist`
  }
}
