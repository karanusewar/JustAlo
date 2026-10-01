import 'package:flutter/material.dart';
import 'theme/app_theme.dart';
import 'models/models.dart';
import 'screens/login_screen.dart';
import 'screens/home_search_screen.dart';
import 'screens/city_selection_screen.dart';
import 'screens/search_results_screen.dart';
import 'screens/seat_map_stoppage_screen.dart';
import 'screens/passenger_details_screen.dart';
import 'screens/eticket_confirmation_screen.dart';
import 'screens/live_tracking_screen.dart';
import 'screens/rent_fleet_screen.dart';
import 'screens/parcel_express_screen.dart';
import 'screens/driver_manifest_screen.dart';
import 'screens/vendor_dashboard_screen.dart';
import 'screens/franchisee_dashboard_screen.dart';
import 'screens/admin_governance_screen.dart';

import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  } catch (e) {
    debugPrint('Firebase initialization error: $e');
  }
  runApp(const JustaloApp());
}

class JustaloApp extends StatelessWidget {
  const JustaloApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'JUSTALO - Bus Ticketing, Fleet Rental & Parcel',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: '/home',
      onGenerateRoute: (settings) {
        final args = settings.arguments as Map<String, dynamic>?;

        switch (settings.name) {
          case '/login':
            return MaterialPageRoute(builder: (_) => const LoginScreen());
          case '/home':
            return MaterialPageRoute(builder: (_) => const HomeSearchScreen());
          case '/city':
            return MaterialPageRoute(builder: (_) => const CitySelectionScreen());
          case '/search':
            return MaterialPageRoute(
              builder: (_) => SearchResultsScreen(
                from: args?['from'] ?? 'Indore',
                to: args?['to'] ?? 'Bhopal',
                date: args?['date'] ?? 'Today, 28 Sep',
              ),
            );
          case '/seat':
            final trip = args?['trip'] as BusTrip? ??
                BusTrip(
                  id: 'TRIP_101',
                  operator: 'Bagdi Travels Kinetic Express',
                  busType: '2+2 Volvo AC Multi-Axle Sleeper',
                  capacity: 40,
                  rating: 4.8,
                  reviewsCount: 342,
                  origin: 'Indore',
                  destination: 'Bhopal',
                  departureTime: '08:00 AM',
                  arrivalTime: '11:30 AM',
                  duration: '3h 30m',
                  baseFare: 450.0,
                  amenities: ['AC', 'WiFi', 'Water Bottle'],
                  cancellationPolicy: 'Free cancellation up to 25 mins before departure',
                );
            return MaterialPageRoute(builder: (_) => SeatMapStoppageScreen(trip: trip));
          case '/passenger':
            final trip = args?['trip'] as BusTrip? ??
                BusTrip(
                  id: 'TRIP_101',
                  operator: 'Bagdi Travels Kinetic Express',
                  busType: '2+2 Volvo AC Multi-Axle Sleeper',
                  capacity: 40,
                  rating: 4.8,
                  reviewsCount: 342,
                  origin: 'Indore',
                  destination: 'Bhopal',
                  departureTime: '08:00 AM',
                  arrivalTime: '11:30 AM',
                  duration: '3h 30m',
                  baseFare: 450.0,
                  amenities: ['AC', 'WiFi', 'Water Bottle'],
                  cancellationPolicy: 'Free cancellation up to 25 mins before departure',
                );
            return MaterialPageRoute(
              builder: (_) => PassengerDetailsScreen(
                trip: trip,
                seats: List<String>.from(args?['seats'] ?? ['B1', 'B2']),
                baseFare: (args?['baseFare'] ?? 900.0).toDouble(),
                pickupStop: args?['pickupStop'] ?? 'Geeta Bhawan Square (08:15 AM)',
                dropStop: args?['dropStop'] ?? 'Bhopal ISBT Terminal (11:30 AM)',
              ),
            );
          case '/eticket':
            return MaterialPageRoute(
              builder: (_) => ETicketConfirmationScreen(bookingData: args),
            );
          case '/tracking':
            return MaterialPageRoute(
              builder: (_) => LiveTrackingScreen(bookingId: args?['bookingId'] ?? 'JUST-884920'),
            );
          case '/rent':
            return MaterialPageRoute(builder: (_) => const RentFleetScreen());
          case '/parcel':
            return MaterialPageRoute(builder: (_) => const ParcelExpressScreen());
          case '/driver':
            return MaterialPageRoute(builder: (_) => const DriverManifestScreen());
          case '/vendor':
            return MaterialPageRoute(builder: (_) => const VendorDashboardScreen());
          case '/franchisee':
            return MaterialPageRoute(builder: (_) => const FranchiseeDashboardScreen());
          case '/admin':
            return MaterialPageRoute(builder: (_) => const AdminGovernanceScreen());
          default:
            return MaterialPageRoute(builder: (_) => const HomeSearchScreen());
        }
      },
    );
  }
}
