import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class DriverManifestScreen extends StatefulWidget {
  const DriverManifestScreen({super.key});

  @override
  State<DriverManifestScreen> createState() => _DriverManifestScreenState();
}

class _DriverManifestScreenState extends State<DriverManifestScreen> {
  bool isBroadcasting = true;

  final List<Map<String, dynamic>> manifest = [
    {'name': 'Aman Sharma', 'seats': 'B1, B2', 'pickup': 'Geeta Bhawan (08:15 AM)', 'phone': '+91 98765 43210', 'status': 'CONFIRMED'},
    {'name': 'Vikramaditya S.', 'seats': 'A1, A2', 'pickup': 'Indore Junction (08:00 AM)', 'phone': '+91 98260 99887', 'status': 'BOARDED'},
    {'name': 'Pooja Verma', 'seats': 'C3', 'pickup': 'Palasia Bus Hub (08:25 AM)', 'phone': '+91 94250 11223', 'status': 'CONFIRMED'},
    {'name': 'Rahul Gupta', 'seats': 'D4, D5', 'pickup': 'Vijay Nagar (08:40 AM)', 'phone': '+91 91111 55443', 'status': 'CONFIRMED'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      appBar: AppBar(
        title: const Text('Driver App - Trip Manifest'),
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
            // Live GPS Broadcast Switcher Header
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isBroadcasting ? AppTheme.successGreen.withOpacity(0.12) : Colors.amber.withOpacity(0.12),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: isBroadcasting ? AppTheme.successGreen : Colors.amber),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Icon(Icons.gps_fixed, color: isBroadcasting ? AppTheme.successGreen : Colors.amber, size: 28),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            isBroadcasting ? 'LIVE GPS BROADCAST ACTIVE' : 'GPS BROADCAST PAUSED',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: isBroadcasting ? AppTheme.successGreen : Colors.amber.shade900),
                          ),
                          const Text('Riders can track bus location in real-time', style: TextStyle(fontSize: 11, color: AppTheme.inkBlack)),
                        ],
                      ),
                    ],
                  ),
                  Switch(
                    value: isBroadcasting,
                    onChanged: (val) => setState(() => isBroadcasting = val),
                    activeColor: AppTheme.successGreen,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Assigned Trip Details
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('TODAY\'S ASSIGNED TRIP', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                      Text('BUS: MP-09-FA-8890', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                    ],
                  ),
                  SizedBox(height: 6),
                  Text('Indore  to  Bhopal Express', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  Text('Departure: 08:00 AM - Total Booked: 12 / 40 Passengers', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                ],
              ),
            ),
            const SizedBox(height: 20),

            const Text('PASSENGER MANIFEST & BOARDING STATUS', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
            const SizedBox(height: 10),

            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: manifest.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (context, index) {
                final p = manifest[index];
                return Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14)),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(p['name'], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                              const SizedBox(width: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(color: AppTheme.accentRed.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                                child: Text('Seat: ${p['seats']}', style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.accentRed)),
                              ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Text('Pickup: ${p['pickup']}', style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                          Text('Phone: ${p['phone']}', style: const TextStyle(fontSize: 11, color: AppTheme.primaryDark)),
                        ],
                      ),
                      IconButton(
                        icon: const Icon(Icons.call, color: AppTheme.successGreen),
                        onPressed: () {},
                      )
                    ],
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
