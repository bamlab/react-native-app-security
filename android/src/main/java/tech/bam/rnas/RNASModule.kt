package tech.bam.rnas

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Context
import android.view.inputmethod.InputMethodManager
import android.provider.Settings


class RNASModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("RNAS")

    Function("showInputMethodPicker") {
      val inputMethodManager = context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
      inputMethodManager.showInputMethodPicker()
    }


    Function("isCurrentKeyboardSafe") { customPackagesList: Array<String>? ->
      val currentKeyboardId =
        Settings.Secure.getString(context.contentResolver, Settings.Secure.DEFAULT_INPUT_METHOD)

      return@Function isKeyboardSafe(currentKeyboardId, customPackagesList)
    }
  }
  private val context
  get() = requireNotNull(appContext.reactContext)
}

val defaultAllowedKeyboardPackagesList = arrayOf("com.touchtype.swiftkey", "com.samsung.android", "com.google.android")


/**
 * Check whether the package name provided as `input` matches any of the allowed packages

 * Examples:
 * Input: com.myPackage.android.latin/id
 * Array: ['com.myPackage.android']
 * Output: true
 *
 * Input: android.com.myPackage.android.latin/id
 * Array: ['com.myPackage.android']
 * Output: false
 *
 * Input: com.randomPackage/com.myPackage.android.latin
 * Array: ['com.myPackage.android']
 * Output: false
 */
fun doesPackageNameMatch(input: String, allowedPackagesList: Array<String>): Boolean {
  val packageName = input.substringBefore('/')
  return allowedPackagesList.any { packageName.matches("${Regex.escape(it)}.*".toRegex()) }
}

fun isKeyboardSafe(keyboardID: String, customAllowedKeyboardPackagesList: Array<String>? = defaultAllowedKeyboardPackagesList): Boolean {
  val allowedPackagesList = customAllowedKeyboardPackagesList ?: defaultAllowedKeyboardPackagesList
  return doesPackageNameMatch(keyboardID, allowedPackagesList)
}
