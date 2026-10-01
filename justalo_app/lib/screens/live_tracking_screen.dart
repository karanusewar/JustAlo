import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class LiveTrackingScreen extends StatefulWidget {
  final String bookingId;
  const LiveTrackingScreen({super.key, this.bookingId = 'JUST-884920'});

  @override
  State<LiveTrackingScreen> createState() => _LiveTrackingScreenState();
}

class _LiveTrackingScreenState extends State<LiveTrackingScreen> {
  double busProgress = 0.45; // 45% along route
  int speed = 62;
  String nextStop = 'Dewas Bypass Junction';
  String eta = '12 mins';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Where is My Bus? (Live GPS)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Text('Booking Ref: ${widget.bookingId}', style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
          ],
        ),
      ),
      body: Column(
        children: [
          // Simulated Map Container
          Expanded(
            flex: 5,
            child: Stack(
              children: [
                Container(
                  width: double.infinity,
                  color: const Color(0xFFE5E3DF), // Map background color
                  child: CustomPaint(
                    painter: MapPainter(progress: busProgress),
                  ),
                ),
                // Floating Live Speed Banner
                Positioned(
                  top: 16,
                  left: 16,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 8)],
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          decoration: const BoxDecoration(color: AppTheme.successGreen, shape: BoxShape.circle),
                        ),
                        const SizedBox(width: 8),
                        Text('LIVE GPS - $speed km/h', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                ),
                // Driver Floating Card
                Positioned(
                  top: 16,
                  right: 16,
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 8)],
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.directions_bus, color: AppTheme.primaryTeal),
                        SizedBox(width: 6),
                        Text('MP-09-FA-8890', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Bottom Live Stoppage Status Card
          Expanded(
            flex: 4,
            child: Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 10)],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('NEXT STOPPAGE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                          Text(nextStop, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
                        child: Text('ETA $eta', style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primaryDark, fontSize: 13)),
                      ),
                    ],
                  ),
                  const Divider(height: 24),

                  // Route Stoppages Timeline
                  Row(
                    children: [
                      _timelineDot('Indore', '08:15 AM', true),
                      Expanded(child: Container(height: 3, color: AppTheme.primaryTeal)),
                      _timelineDot('Dewas', 'ETA 09:30', true),
                      Expanded(child: Container(height: 3, color: Colors.grey.shade300)),
                      _timelineDot('Bhopal', '11:30 AM', false),
                    ],
                  ),

                  const Spacer(),

                  // Driver Details & Call Action
                  Row(
                    children: [
                      const CircleAvatar(
                        backgroundColor: AppTheme.primaryTeal,
                        child: Icon(Icons.person, color: Colors.white),
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Ramesh Kumar (Driver)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                            Text('+91 98260 12345 - Rating 4.9', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                          ],
                        ),
                      ),
                      ElevatedButton.icon(
                        onPressed: () {},
                        icon: const Icon(Icons.call, size: 16),
                        label: const Text('CALL DRIVER'),
                        style: ElevatedButton.styleFrom(backgroundColor: AppTheme.successGreen),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _timelineDot(String label, String time, bool isPassed) {
    return Column(
      children: [
        Container(
          width: 14,
          height: 14,
          decoration: BoxDecoration(
            color: isPassed ? AppTheme.primaryTeal : Colors.white,
            shape: BoxShape.circle,
            border: Border.all(color: isPassed ? AppTheme.primaryTeal : Colors.grey),
          ),
        ),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
        Text(time, style: const TextStyle(fontSize: 8, color: AppTheme.textMuted)),
      ],
    );
  }
}

// Custom Painter for Map Route Visualization
class MapPainter extends CustomPainter {
  final double progress;
  MapPainter({required this.progress});

  @override
  void paint(Canvas canvas, Size size) {
    final routePaint = Paint()
      ..color = AppTheme.primaryTeal.withOpacity(0.5)
      ..strokeWidth = 6
      ..style = PaintingStyle.stroke;

    final path = Path();
    path.moveTo(size.width * 0.1, size.height * 0.8);
    path.cubicTo(size.width * 0.3, size.height * 0.7, size.width * 0.4, size.height * 0.3, size.width * 0.85, size.height * 0.2);

    canvas.drawPath(path, routePaint);

    // Draw bus marker at progress location
    final busPaint = Paint()..color = AppTheme.accentRed;
    final busX = size.width * (0.1 + progress * 0.75);
    final busY = size.height * (0.8 - progress * 0.6);

    canvas.drawCircle(Offset(busX, busY), 10, busPaint);
    canvas.drawCircle(Offset(busX, busY), 16, Paint()..color = AppTheme.accentRed.withOpacity(0.3));
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
