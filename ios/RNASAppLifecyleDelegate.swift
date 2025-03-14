import ExpoModulesCore
import UIKit

public class RNASAppLifecycleDelegate: ExpoAppDelegateSubscriber {
    private lazy var launchScreenWindow: UIWindow? = {
        let window = UIWindow(frame: UIScreen.main.bounds)
        let launchScreen = UIStoryboard(name: "SplashScreen", bundle: nil).instantiateInitialViewController()!
        window.rootViewController = launchScreen
        window.windowLevel = .alert + 2 // React Native alert uses .alert + 1
        return window
    }()

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
        
        launchScreenWindow?.makeKeyAndVisible()
    }
        
    public func applicationDidBecomeActive(_ application: UIApplication) {
        launchScreenWindow?.isHidden = true
    }
}


func isPreventRecentScreenshotsEnabled() -> Bool {
    if let value = Bundle.main.object(forInfoDictionaryKey: "RNAS_PREVENT_RECENT_SCREENSHOTS") as? Bool {
        return value
    }
    return false
}

