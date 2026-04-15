import ExpoModulesCore
import UIKit

public class RNASAppLifecycleDelegate: ExpoAppDelegateSubscriber {
    private var becomeActiveObserver: NSObjectProtocol?

    private lazy var launchScreenWindow: UIWindow? = {
        let window = UIWindow(frame: UIScreen.main.bounds)
        let launchScreen = UIStoryboard(name: "SplashScreen", bundle: nil).instantiateInitialViewController()!
        window.rootViewController = launchScreen
        window.windowLevel = .alert + 2 // React Native alert uses .alert + 1
        _ = launchScreen.view // Force view load so it renders correctly on first show
        return window
    }()

    public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        if(isPreventRecentScreenshotsEnabled()) {
            application.ignoreSnapshotOnNextApplicationLaunch()

            // Subscribe directly to UIKit's notification instead of relying solely on the
            // Expo delegate chain, which can delay or drop didBecomeActive during launch.
            becomeActiveObserver = NotificationCenter.default.addObserver(
                forName: UIApplication.didBecomeActiveNotification,
                object: nil,
                queue: .main
            ) { [weak self] _ in
                self?.launchScreenWindow?.isHidden = true
            }
        }

        if(isDisablingCacheEnabled()){
            clearAndDisableCache()
        }

        return true
    }

    deinit {
        if let observer = becomeActiveObserver {
            NotificationCenter.default.removeObserver(observer)
        }
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
        // Use isHidden instead of makeKeyAndVisible to avoid stealing key window status,
        // which can cause cascading willResignActive events and a stuck visible overlay.
        launchScreenWindow?.isHidden = false
    }

    public func applicationDidBecomeActive(_ application: UIApplication) {
        // Belt-and-suspenders: also hide via delegate in case the notification observer
        // wasn't set up in time (e.g. preventRecentScreenshots disabled then re-enabled).
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
