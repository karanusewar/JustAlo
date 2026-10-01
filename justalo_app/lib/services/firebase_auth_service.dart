import 'package:flutter/foundation.dart';
import 'package:firebase_auth/firebase_auth.dart';

class FirebaseAuthService {
  // Singleton instance
  static final FirebaseAuthService _instance = FirebaseAuthService._internal();
  factory FirebaseAuthService() => _instance;
  FirebaseAuthService._internal();

  final FirebaseAuth _auth = FirebaseAuth.instance;
  ConfirmationResult? _webConfirmationResult;
  String? _verificationId;

  /// Returns current logged in user
  User? get currentUser => _auth.currentUser;

  /// Send Phone OTP via Firebase Auth
  Future<void> sendPhoneOTP({
    required String phoneNumber,
    required Function(String verificationId) onCodeSent,
    required Function(String error) onError,
    required Function() onAutoVerified,
  }) async {
    try {
      if (kIsWeb) {
        debugPrint('Sending Firebase Web OTP to $phoneNumber...');
        _webConfirmationResult = await _auth.signInWithPhoneNumber(phoneNumber);
        _verificationId = _webConfirmationResult?.verificationId ?? 'web_verification';
        onCodeSent(_verificationId!);
      } else {
        await _auth.verifyPhoneNumber(
          phoneNumber: phoneNumber,
          verificationCompleted: (PhoneAuthCredential credential) async {
            await _auth.signInWithCredential(credential);
            onAutoVerified();
          },
          verificationFailed: (FirebaseAuthException e) {
            onError(e.message ?? 'Phone verification failed (${e.code})');
          },
          codeSent: (String verificationId, int? resendToken) {
            _verificationId = verificationId;
            onCodeSent(verificationId);
          },
          codeAutoRetrievalTimeout: (String verificationId) {
            _verificationId = verificationId;
          },
        );
      }
    } catch (e) {
      debugPrint('Firebase sendPhoneOTP error: $e');
      onError(e.toString());
    }
  }

  /// Verify OTP entered by user
  Future<UserCredential?> verifyOTP({
    required String verificationId,
    required String smsCode,
  }) async {
    try {
      if (kIsWeb && _webConfirmationResult != null) {
        UserCredential userCredential = await _webConfirmationResult!.confirm(smsCode);
        return userCredential;
      } else {
        PhoneAuthCredential credential = PhoneAuthProvider.credential(
          verificationId: verificationId.isNotEmpty ? verificationId : (_verificationId ?? ''),
          smsCode: smsCode,
        );
        UserCredential userCredential = await _auth.signInWithCredential(credential);
        return userCredential;
      }
    } catch (e) {
      debugPrint('Firebase verifyOTP error: $e');
      rethrow;
    }
  }

  /// Sign In with Email & Password
  Future<UserCredential?> signInWithEmail(String email, String password) async {
    try {
      UserCredential userCredential = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return userCredential;
    } catch (e) {
      debugPrint('Firebase Email Sign-In Error: $e');
      rethrow;
    }
  }

  /// Sign Up with Email & Password
  Future<UserCredential?> signUpWithEmail(String email, String password) async {
    try {
      UserCredential userCredential = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      // Send verification email
      await userCredential.user?.sendEmailVerification();
      return userCredential;
    } catch (e) {
      debugPrint('Firebase Email Sign-Up Error: $e');
      rethrow;
    }
  }

  /// Sign In with Google Provider
  Future<UserCredential?> signInWithGoogle() async {
    try {
      if (kIsWeb) {
        GoogleAuthProvider googleProvider = GoogleAuthProvider();
        UserCredential userCredential = await _auth.signInWithPopup(googleProvider);
        return userCredential;
      } else {
        GoogleAuthProvider googleProvider = GoogleAuthProvider();
        UserCredential userCredential = await _auth.signInWithProvider(googleProvider);
        return userCredential;
      }
    } catch (e) {
      debugPrint('Google Sign-In Error: $e');
      rethrow;
    }
  }

  /// Sign Out
  Future<void> signOut() async {
    await _auth.signOut();
  }
}
