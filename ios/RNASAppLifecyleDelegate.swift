import ExpoModulesCore
import UIKit

public class RNASAppLifecycleDelegate: ExpoAppDelegateSubscriber {
    public func applicationDidFinishLaunching(_ application: UIApplication) {
        application.ignoreSnapshotOnNextApplicationLaunch()
    }
    
    public func applicationWillResignActive(_ application: UIApplication) {
        // https://developer.apple.com/documentation/uikit/app_and_environment/scenes/preparing_your_ui_to_run_in_the_background
        
        // TODO: better error handling in case there's an issue with the splashscreen (instead of !)
        let launchScreen = UIStoryboard(name: "SplashScreen", bundle: nil).instantiateInitialViewController()!
        launchScreen.modalPresentationStyle = .overFullScreen
        
        UIApplication.shared.windows.first?.rootViewController?.present(launchScreen, animated: false)
    }
        
    public func applicationDidBecomeActive(_ application: UIApplication) {
        UIApplication.shared.windows.first?.rootViewController?.dismiss(animated: false)
    }
}
