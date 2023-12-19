import ExpoModulesCore
import UIKit

public class RNASAppLifecycleDelegate: ExpoAppDelegateSubscriber {
    private var launchScreenViewController: UIViewController?

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
                
        if let launchScreen = UIStoryboard(name: "SplashScreen", bundle: nil).instantiateInitialViewController() {
            launchScreen.modalPresentationStyle = .overFullScreen
            getTopMostViewController().present(launchScreen, animated: false)
            launchScreenViewController = launchScreen
        }
    }
        
    public func applicationDidBecomeActive(_ application: UIApplication) {
        launchScreenViewController?.dismiss(animated: false) {
            self.launchScreenViewController = nil
        }
    }
}


func isPreventRecentScreenshotsEnabled() -> Bool {
    if let value = Bundle.main.object(forInfoDictionaryKey: "RNAS_PREVENT_RECENT_SCREENSHOTS") as? Bool {
        return value
    }
    return false
}


func getTopMostViewController() -> UIViewController {
    // We want to display the overlay over any content currently presented, including modals
    
    var topController: UIViewController = UIApplication.shared.windows.first!.rootViewController!
    
    while (topController.presentedViewController != nil) {
        topController = topController.presentedViewController!
    }
    
    return topController
}
