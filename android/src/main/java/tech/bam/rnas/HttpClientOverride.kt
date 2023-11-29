package tech.bam.rnas

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;

import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

import org.json.JSONObject

public class SSLPinning : OkHttpClientFactory {
  override fun createNewNetworkModuleClient(): OkHttpClient {
    val config = parseConfig()

    val certificatePinnerBuilder = CertificatePinner.Builder()

    for((hostName, certificates) in config) {
      for (certificate in certificates) {
        //Certificates must start with 'sha256/' for android
        certificatePinnerBuilder.add(hostName, "sha256/$certificate")
      }
    }

    val certificatePinner = certificatePinnerBuilder.build()

    val clientBuilder = OkHttpClientProvider.createClientBuilder()

    return clientBuilder
      .certificatePinner(certificatePinner)
      .build()
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

  return resultMap // Map<String, List<String>>
}
