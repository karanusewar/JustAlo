import 'package:flutter/material.dart';

class AppTheme {
  // Brand Color System from Logo & Design Tokens
  static const Color primaryTeal = Color(0xFF00C2CB);
  static const Color primaryDark = Color(0xFF00696E);
  static const Color accentRed = Color(0xFFFE1617);
  static const Color inkBlack = Color(0xFF0A0A0A);
  static const Color surfaceWhite = Color(0xFFFFFFFF);
  static const Color surfaceLight = Color(0xFFFAFAFA);
  static const Color surfaceContainerLow = Color(0xFFF6F3F2);
  static const Color surfaceContainerHigh = Color(0xFFEBE7E7);
  static const Color successGreen = Color(0xFF1FAE59);
  static const Color warningAmber = Color(0xFFFFA726);
  static const Color textMuted = Color(0xFF6C7A7A);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      primaryColor: primaryTeal,
      scaffoldBackgroundColor: surfaceLight,
      colorScheme: const ColorScheme.light(
        primary: primaryTeal,
        secondary: accentRed,
        surface: surfaceWhite,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: inkBlack,
      ),
      fontFamily: 'Inter',
      appBarTheme: const AppBarTheme(
        backgroundColor: surfaceWhite,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: inkBlack),
        titleTextStyle: TextStyle(
          color: inkBlack,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryTeal,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      cardTheme: CardTheme(
        color: surfaceWhite,
        elevation: 1,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
    );
  }

  // ─── Notification Sheet ───────────────────────────────────────
  static void showNotificationsSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return Container(
          padding: const EdgeInsets.all(20),
          height: MediaQuery.of(ctx).size.height * 0.6,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade300,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.notifications_active, color: primaryTeal, size: 22),
                      SizedBox(width: 8),
                      Text('Notifications & Alerts',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: inkBlack)),
                    ],
                  ),
                  TextButton(
                    onPressed: () => Navigator.pop(ctx),
                    child: const Text('Clear All', style: TextStyle(color: textMuted, fontSize: 12)),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Expanded(
                child: ListView(
                  children: [
                    _notifTile(
                      icon: Icons.confirmation_number_outlined,
                      iconColor: primaryTeal,
                      title: 'Booking Confirmed! (TRIP #101)',
                      subtitle: 'Indore to Bhopal Volvo AC Sleeper - Departs 08:00 AM',
                      time: '10 mins ago',
                    ),
                    _notifTile(
                      icon: Icons.local_offer_outlined,
                      iconColor: accentRed,
                      title: 'Festival Offer: Get 20% OFF!',
                      subtitle: 'Use code JUSTALO20 for wedding luxury fleet rentals.',
                      time: '1 hour ago',
                    ),
                    _notifTile(
                      icon: Icons.local_shipping_outlined,
                      iconColor: successGreen,
                      title: 'Parcel Out for Delivery',
                      subtitle: 'Same-day courier express dispatched to Bhopal ISBT Hub.',
                      time: '3 hours ago',
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  static Widget _notifTile({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String subtitle,
    required String time,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: surfaceLight,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFE5E7EB)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: iconColor.withOpacity(0.12),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: iconColor, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: inkBlack)),
                const SizedBox(height: 2),
                Text(subtitle, style: const TextStyle(fontSize: 11, color: textMuted)),
                const SizedBox(height: 4),
                Text(time, style: const TextStyle(fontSize: 10, color: Color(0xFF9CA3AF))),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ─── Account Profile Sheet ────────────────────────────────────
  static void showAccountProfileSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return Container(
          padding: const EdgeInsets.all(20),
          height: MediaQuery.of(ctx).size.height * 0.65,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade300,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  const CircleAvatar(
                    radius: 26,
                    backgroundColor: primaryTeal,
                    child: Icon(Icons.person, color: Colors.white, size: 28),
                  ),
                  const SizedBox(width: 14),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text('JUSTALO Member',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: inkBlack)),
                      SizedBox(height: 2),
                      Row(
                        children: [
                          Icon(Icons.verified, color: successGreen, size: 14),
                          SizedBox(width: 4),
                          Text('Verified Phone User', style: TextStyle(fontSize: 12, color: textMuted)),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 20),
              const Divider(),
              const SizedBox(height: 8),
              ListTile(
                leading: const Icon(Icons.login_outlined, color: primaryTeal),
                title: const Text('Sign In / Switch Account',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                subtitle: const Text('Access Phone OTP or Firebase Login'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {
                  Navigator.pop(ctx);
                  Navigator.pushNamed(ctx, '/login');
                },
              ),
              ListTile(
                leading: const Icon(Icons.confirmation_number_outlined, color: primaryTeal),
                title: const Text('My Bookings & E-Tickets',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                subtitle: const Text('View active bus & rental reservations'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {
                  Navigator.pop(ctx);
                  Navigator.pushNamed(ctx, '/eticket');
                },
              ),
              ListTile(
                leading: const Icon(Icons.business_outlined, color: accentRed),
                title: const Text('Partner & Vendor Console',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                subtitle: const Text('Manage agency fleet & bus trips'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {
                  Navigator.pop(ctx);
                  Navigator.pushNamed(ctx, '/vendor');
                },
              ),
              ListTile(
                leading: const Icon(Icons.dashboard_outlined, color: Colors.purple),
                title: const Text('Complete Codebase Platform',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                subtitle: const Text('Launch React / TS Governance Suite'),
                trailing: const Icon(Icons.open_in_new),
                onTap: () {
                  Navigator.pop(ctx);
                  Navigator.pushNamed(ctx, '/admin');
                },
              ),
            ],
          ),
        );
      },
    );
  }
}

// ─── JustaloLogo Widget ───────────────────────────────────────────
class JustaloLogo extends StatelessWidget {
  final double height;
  final bool showText;

  const JustaloLogo({super.key, this.height = 34, this.showText = true});

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      'assets/justalo_logo.png',
      height: height,
      fit: BoxFit.contain,
      errorBuilder: (context, error, stackTrace) {
        return Image.asset(
          'assets/project_logo.png',
          height: height,
          fit: BoxFit.contain,
          errorBuilder: (_, __, ___) => Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.directions_bus, color: AppTheme.primaryTeal, size: height * 0.7),
              const SizedBox(width: 6),
              Text(
                'JUSTALO',
                style: TextStyle(
                  color: AppTheme.primaryDark,
                  fontWeight: FontWeight.w900,
                  fontSize: height * 0.45,
                  letterSpacing: -0.5,
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
