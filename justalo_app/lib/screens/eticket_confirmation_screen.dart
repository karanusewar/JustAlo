import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';

class ETicketConfirmationScreen extends StatelessWidget {
  final Map<String, dynamic>? bookingData;

  const ETicketConfirmationScreen({super.key, this.bookingData});

  @override
  Widget build(BuildContext context) {
    final Map<String, dynamic> data = bookingData ?? {
      'id': 'JUST-884920',
      'operator': 'Bagdi Travels Kinetic Express',
      'busType': '2+2 Volvo AC Multi-Axle Sleeper',
      'userName': 'Aman Sharma',
      'userPhone': '+91 98765 43210',
      'seats': ['B1', 'B2'],
      'pickupStop': 'Geeta Bhawan Square (08:15 AM)',
      'dropStop': 'Bhopal ISBT Terminal (11:30 AM)',
      'totalFare': 950.0,
      'status': 'CONFIRMED',
      'bookingTime': '2026-09-28 08:00 AM',
      'qrCodeData': 'JUSTALO-TICKET-JUST-884920',
    };

    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      appBar: AppBar(
        title: const Text('E-Ticket Confirmation'),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {},
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Success Confirmation Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.successGreen.withOpacity(0.12),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.successGreen),
              ),
              child: const Row(
                children: [
                  Icon(Icons.check_circle, color: AppTheme.successGreen, size: 36),
                  SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Booking Confirmed!', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                        Text('Ticket sent to your WhatsApp & Email', style: TextStyle(fontSize: 12, color: AppTheme.inkBlack)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // E-Ticket Card Branded JUSTALO
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(color: Colors.black.withOpacity(0.06), blurRadius: 12, offset: const Offset(0, 4)),
                ],
              ),
              child: Column(
                children: [
                  // Ticket Header
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: const BoxDecoration(
                      color: AppTheme.primaryTeal,
                      borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Row(
                          children: [
                            JustaloLogo(height: 34),
                            SizedBox(width: 8),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('E-TICKET', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                                Text('Verified Digital Pass', style: TextStyle(color: Colors.white70, fontSize: 10)),
                              ],
                            ),
                          ],
                        ),
                        Text(data['id'] ?? 'JUST-884920', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 14)),
                      ],
                    ),
                  ),

                  // Ticket Content Body
                  Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      children: [
                        // Simulated QR Code Box
                        Container(
                          width: 130,
                          height: 130,
                          decoration: BoxDecoration(
                            color: Colors.grey.shade100,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: Colors.grey.shade300),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Icon(Icons.qr_code_2, size: 80, color: AppTheme.inkBlack),
                              Text('SCAN AT BOARDING', style: TextStyle(fontSize: 8, fontWeight: FontWeight.bold, color: Colors.grey.shade700)),
                            ],
                          ),
                        ),
                        const SizedBox(height: 16),

                        Text(data['operator'] ?? '', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                        Text(data['busType'] ?? '', style: const TextStyle(fontSize: 12, color: AppTheme.textMuted)),

                        const Divider(height: 24),

                        // Route details
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('PASSENGER', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                                Text(data['userName'] ?? 'Rider', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                              ],
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                const Text('SEATS', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                                Text((data['seats'] as List).join(', '), style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: AppTheme.accentRed)),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('BOARDING POINT', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                                Text(data['pickupStop'] ?? '', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                              ],
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                const Text('TOTAL PAID', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                                Text('₹${(data['totalFare'] as num).toInt()}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: AppTheme.successGreen)),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Action Buttons
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.download),
                    label: const Text('DOWNLOAD PDF'),
                    style: OutlinedButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 14)),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      Navigator.pushNamed(
                        context,
                        '/tracking',
                        arguments: {'bookingId': data['id']},
                      );
                    },
                    icon: const Icon(Icons.near_me),
                    label: const Text('LIVE TRACK BUS'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.primaryTeal,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            TextButton(
              onPressed: () => Navigator.pushReplacementNamed(context, '/home'),
              child: const Text('RETURN TO HOME FEED'),
            ),
          ],
        ),
      ),
    );
  }
}
