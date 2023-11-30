package tech.bam.rnas

import android.os.Build
import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;

import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

import com.appmattus.certificatetransparency.CTInterceptorBuilder

import org.json.JSONObject

public class SSLPinning : OkHttpClientFactory {
  override fun createNewNetworkModuleClient(): OkHttpClient {
    val config = parseConfig()

    val clientBuilder = OkHttpClientProvider.createClientBuilder()

    // -- SSL pinning --

    val certificatePinnerBuilder = CertificatePinner.Builder()

    for((hostName, certificates) in config) {
      for (certificate in certificates) {
        //Certificates must start with 'sha256/' for android
        certificatePinnerBuilder.add(hostName, "sha256/$certificate")
      }
    }

    clientBuilder.certificatePinner(certificatePinnerBuilder.build())

    // -- Certificate Transparency --

    /*
     * The library for certificate transparency does not support Android sdk version < 26 (Android 8.0) without setting up "desugaring"
     * See more : https://github.com/appmattus/certificatetransparency#getting-started
     */
    if (Build.VERSION.SDK_INT >= 26) {
      clientBuilder.addNetworkInterceptor(CTInterceptorBuilder().build())
    }

    return clientBuilder.build()
  }

}


fun parseConfig() : Map<String, List<String>> {
  val jsonString: String = BuildConfig.RNAS_PINNING_CONFIG

  val jsonObject = JSONObject(jsonString)
  val resultMap = mutableMapOf<String, List<String>>()

  jsonObject.keys().forEach { key ->
      val jsonArray = jsonObject.getJSONArray(key)
      val valuesList = mutableListOf<String>()
      for (i in 0 until jsonArray.length()) {
          valuesList.add(jsonArray.getString(i))
      }
      resultMap[key] = valuesList
  }

  return resultMap
}
