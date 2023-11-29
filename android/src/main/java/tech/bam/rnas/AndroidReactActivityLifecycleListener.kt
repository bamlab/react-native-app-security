package tech.bam.rnas

import android.app.Activity
import android.os.Bundle
import expo.modules.core.interfaces.ReactActivityLifecycleListener

import com.facebook.react.modules.network.OkHttpClientProvider;

class AndroidReactActivityLifecycleListener : ReactActivityLifecycleListener {
  override fun onCreate(activity: Activity, savedInstanceState: Bundle?) {
    super.onCreate(activity, savedInstanceState)
    OkHttpClientProvider.setOkHttpClientFactory(SSLPinning())
  }
}
