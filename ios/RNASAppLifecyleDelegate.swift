import ExpoModulesCore
import UIKit

public class RNASAppLifecycleDelegate: ExpoAppDelegateSubscriber {
    public func applicationDidFinishLaunching(_ application: UIApplication) {
        if(!isPreventRecentScreenshotsEnabled()) {
            return
        }
            application.ignoreSnapshotOnNextApplicationLaunch()
    }
    
    public func applicationWillResignActive(_ application: UIApplication) {
        if(!isPreventRecentScreenshotsEnabled()) {
            return
        }
        
        // https://developer.apple.com/documentation/uikit/app_and_environment/scenes/preparing_your_ui_to_run_in_the_background
        
        // TODO: better error handling in case there's an issue with the splashscreen (instead of !)
        let launchScreen = UIStoryboard(name: "SplashScreen", bundle: nil).instantiateInitialViewController()!
        launchScreen.modalPresentationStyle = .overFullScreen
        
        UIApplication.shared.windows.first?.rootViewController?.present(launchScreen, animated: false)
    }
        
    public func applicationDidBecomeActive(_ application: UIApplication) {
        if(!isPreventRecentScreenshotsEnabled()) {
            return
        }

        UIApplication.shared.windows.first?.rootViewController?.dismiss(animated: false)
    }
}


func isPreventRecentScreenshotsEnabled() -> Bool {
    if let value = Bundle.main.object(forInfoDictionaryKey: "RNAS_PREVENT_RECENT_SCREENSHOTS") as? Bool {
        return value
    }
    return false
}
