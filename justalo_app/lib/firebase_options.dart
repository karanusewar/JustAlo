// File generated manually with user's Firebase credentials for JustAlo project.
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart' show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return web;
      case TargetPlatform.linux:
        return web;
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyBKKopjUH9Oq6MP-9hyRmv-opbjMaYx8Hw',
    appId: '1:534733579332:web:8c81986a4db9bc1cd1c811',
    messagingSenderId: '534733579332',
    projectId: 'justalo-34bcb',
    authDomain: 'justalo-34bcb.firebaseapp.com',
    storageBucket: 'justalo-34bcb.firebasestorage.app',
    measurementId: 'G-6STDJTJ3G2',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyBKKopjUH9Oq6MP-9hyRmv-opbjMaYx8Hw',
    appId: '1:534733579332:web:8c81986a4db9bc1cd1c811',
    messagingSenderId: '534733579332',
    projectId: 'justalo-34bcb',
    authDomain: 'justalo-34bcb.firebaseapp.com',
    storageBucket: 'justalo-34bcb.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyBKKopjUH9Oq6MP-9hyRmv-opbjMaYx8Hw',
    appId: '1:534733579332:web:8c81986a4db9bc1cd1c811',
    messagingSenderId: '534733579332',
    projectId: 'justalo-34bcb',
    authDomain: 'justalo-34bcb.firebaseapp.com',
    storageBucket: 'justalo-34bcb.firebasestorage.app',
    iosBundleId: 'com.justalo.app',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyBKKopjUH9Oq6MP-9hyRmv-opbjMaYx8Hw',
    appId: '1:534733579332:web:8c81986a4db9bc1cd1c811',
    messagingSenderId: '534733579332',
    projectId: 'justalo-34bcb',
    authDomain: 'justalo-34bcb.firebaseapp.com',
    storageBucket: 'justalo-34bcb.firebasestorage.app',
  );
}
