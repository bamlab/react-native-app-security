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


    Function("getCurrentInputMethodInfo") {
      val currentKeyboardId =
        Settings.Secure.getString(context.contentResolver, Settings.Secure.DEFAULT_INPUT_METHOD)
      val isInDefaultSafeList = isKeyboardSafe(currentKeyboardId)

      return@Function mapOf(
        "isInDefaultSafeList" to isInDefaultSafeList,
        "inputMethodId" to currentKeyboardId.substringBefore('/')
      )
    }
  }
  private val context
  get() = requireNotNull(appContext.reactContext)
}

val defaultAllowedKeyboardPackagesList = arrayOf("com.touchtype.swiftkey", "com.samsung.android", "com.google.android", "com.sec.android.inputmethod")


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

fun isKeyboardSafe(keyboardID: String): Boolean {
  return doesPackageNameMatch(keyboardID, defaultAllowedKeyboardPackagesList)
}