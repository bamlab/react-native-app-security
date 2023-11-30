package tech.bam.rnas

import android.app.Activity
import android.os.Build
import android.view.WindowManager
import android.os.Bundle
import expo.modules.core.interfaces.ReactActivityLifecycleListener

import com.facebook.react.modules.network.OkHttpClientProvider;

class AndroidReactActivityLifecycleListener : ReactActivityLifecycleListener {
  override fun onResume(activity: Activity) {
    super.onResume(activity)

    if(BuildConfig.RNAS_PREVENT_RECENT_SCREENSHOTS && Build.VERSION.SDK_INT < 33) {
      activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
    }
  }

  override fun onPause(activity: Activity) {
    super.onPause(activity)

    if(BuildConfig.RNAS_PREVENT_RECENT_SCREENSHOTS && Build.VERSION.SDK_INT < 33) {
      activity.window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
    }
  }

  override fun onCreate(activity: Activity, savedInstanceState: Bundle?) {
    super.onCreate(activity, savedInstanceState)
    OkHttpClientProvider.setOkHttpClientFactory(SSLPinning())

    if(BuildConfig.RNAS_PREVENT_RECENT_SCREENSHOTS && Build.VERSION.SDK_INT >= 33) {
      activity.setRecentsScreenshotEnabled(false)
    }
  }
}
