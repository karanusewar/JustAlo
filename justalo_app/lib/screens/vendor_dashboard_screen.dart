import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class VendorDashboardScreen extends StatelessWidget {
  const VendorDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      appBar: AppBar(
        title: const Text('Vendor Partner Fleet Console'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => Navigator.pushReplacementNamed(context, '/login'),
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Vendor Header Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [Color(0xFF00C2CB), Color(0xFF00696E)]),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      JustaloLogo(height: 34),
                      Text('KYC VERIFIED PARTNER', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  SizedBox(height: 8),
                  Text('Bagdi Travels Fleet Agency', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 4),
                  Text('Indore & Malwa Corridor Operations', style: TextStyle(color: Colors.white70, fontSize: 12)),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Key Metrics Grid
            Row(
              children: [
                Expanded(
                  child: _metricCard('Today Earnings', '₹68,450', Icons.payments, AppTheme.successGreen),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _metricCard('Active Trips', '8 Trips', Icons.directions_bus, AppTheme.primaryTeal),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _metricCard('Total Fleet', '12 Buses', Icons.directions_car, AppTheme.inkBlack),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _metricCard('Occupancy', '84.2%', Icons.event_seat, AppTheme.accentRed),
                ),
              ],
            ),
            const SizedBox(height: 24),

            const Text('TODAY\'S TRIP SCHEDULES', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
            const SizedBox(height: 10),

            _tripRow('TRIP_101', 'Indore  to  Bhopal', '08:00 AM - 11:30 AM', '38 / 40 Booked', '₹17,100'),
            const SizedBox(height: 10),
            _tripRow('TRIP_102', 'Indore  to  Bhopal', '09:30 AM - 01:00 PM', '42 / 50 Booked', '₹15,960'),
            const SizedBox(height: 10),
            _tripRow('TRIP_103', 'Indore  to  Ujjain', '07:00 AM - 08:15 AM', '40 / 40 Booked', '₹7,200'),
          ],
        ),
      ),
    );
  }

  Widget _metricCard(String title, String val, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(height: 8),
          Text(title, style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
          Text(val, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: color)),
        ],
      ),
    );
  }

  Widget _tripRow(String id, String route, String time, String booked, String revenue) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(route, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
              Text(time, style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(revenue, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: AppTheme.successGreen)),
              Text(booked, style: const TextStyle(fontSize: 11, color: AppTheme.primaryDark)),
            ],
          ),
        ],
      ),
    );
  }
}
