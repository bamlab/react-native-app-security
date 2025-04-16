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

    public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        if(isPreventRecentScreenshotsEnabled()) {
            application.ignoreSnapshotOnNextApplicationLaunch()
        }

        if(isDisablingCacheEnabled()){
            clearAndDisableCache()
        }


        return true
    }

    private func clearAndDisableCache() {
        URLCache.shared.removeAllCachedResponses()
        URLCache.shared = URLCache(memoryCapacity: 0, diskCapacity: 0, diskPath: nil)
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

func isDisablingCacheEnabled() -> Bool {
    if let value = Bundle.main.object(forInfoDictionaryKey: "RNAS_DISABLE_CACHE") as? Bool {
        return value
    }
    return false
}
