import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';

class SeatMapStoppageScreen extends StatefulWidget {
  final BusTrip trip;

  const SeatMapStoppageScreen({super.key, required this.trip});

  @override
  State<SeatMapStoppageScreen> createState() => _SeatMapStoppageScreenState();
}

class _SeatMapStoppageScreenState extends State<SeatMapStoppageScreen> {
  final List<String> selectedSeats = ['3A', '3B'];
  final List<String> bookedSeats = ['1A', '1B', '2C', '2D', '4C', '5A'];

  String selectedPickup = 'Vijay Nagar Square (07:15 AM)';
  String selectedDrop = 'Halalpura Bus Stand (11:00 AM)';

  double get seatPrice => widget.trip.baseFare > 0 ? widget.trip.baseFare : 380.0;
  double get totalPrice => selectedSeats.length * seatPrice;

  void _toggleSeat(String seatCode) {
    if (bookedSeats.contains(seatCode)) return;
    setState(() {
      if (selectedSeats.contains(seatCode)) {
        selectedSeats.remove(seatCode);
      } else {
        selectedSeats.add(seatCode);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      appBar: AppBar(
        titleSpacing: 0,
        title: const Row(
          children: [
            JustaloLogo(height: 34),
            SizedBox(width: 8),
            Text('Seat Selection', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          const Padding(
            padding: EdgeInsets.only(right: 14.0),
            child: CircleAvatar(
              radius: 15,
              backgroundColor: AppTheme.surfaceContainerHigh,
              child: Icon(Icons.person, size: 18, color: AppTheme.inkBlack),
            ),
          ),
        ],
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.only(left: 16.0, right: 16.0, top: 10.0, bottom: 90.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Operator Trip Summary Header Card
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.grey.shade200),
                    boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2))],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Text(widget.trip.operator, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
                              const SizedBox(width: 6),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                                child: const Text('AC 2+2', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                              ),
                            ],
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              const Text('PER SEAT', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                              Text('₹${seatPrice.toInt()}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppTheme.accentRed)),
                            ],
                          ),
                        ],
                      ),
                      Text('${widget.trip.origin}  to  ${widget.trip.destination} - ${widget.trip.departureTime}', style: const TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                      const SizedBox(height: 10),
                      const Row(
                        children: [
                          Row(
                            children: [
                              Icon(Icons.check_circle_outline, size: 14, color: AppTheme.successGreen),
                              SizedBox(width: 4),
                              Text('Sanitized Bus', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                            ],
                          ),
                          SizedBox(width: 12),
                          Row(
                            children: [
                              Icon(Icons.bolt, size: 14, color: AppTheme.primaryTeal),
                              SizedBox(width: 4),
                              Text('Mobile Charging', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                            ],
                          ),
                          SizedBox(width: 12),
                          Row(
                            children: [
                              Icon(Icons.wifi, size: 14, color: AppTheme.primaryTeal),
                              SizedBox(width: 4),
                              Text('Free Wi-Fi', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // Seat Legend Row
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: Colors.grey.shade200)),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildLegendItem('Available', AppTheme.surfaceContainerLow, Colors.grey.shade400, Icons.event_seat),
                      _buildLegendItem('Selected', AppTheme.primaryTeal, Colors.white, Icons.check),
                      _buildLegendItem('Booked', AppTheme.surfaceContainerHigh, Colors.grey.shade400, Icons.lock_outline),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // Seat Grid Layout Box
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: Colors.grey.shade200)),
                  child: Column(
                    children: [
                      // Deck Header & Driver
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Row(
                            children: [
                              Icon(Icons.directions_bus, size: 18, color: AppTheme.primaryTeal),
                              SizedBox(width: 6),
                              Text('Lower Deck', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                            ],
                          ),
                          Row(
                            children: [
                              const Text('DRIVER', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                              const SizedBox(width: 4),
                              Container(
                                padding: const EdgeInsets.all(4),
                                decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(6)),
                                child: const Icon(Icons.videogame_asset_outlined, size: 16, color: AppTheme.inkBlack),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 14),

                      // Column Headers
                      const Row(
                        children: [
                          Expanded(child: Center(child: Text('A', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted)))),
                          Expanded(child: Center(child: Text('B', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted)))),
                          SizedBox(width: 24, child: Center(child: Text('AISLE', style: TextStyle(fontSize: 8, fontWeight: FontWeight.bold, color: AppTheme.textMuted)))),
                          Expanded(child: Center(child: Text('C', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted)))),
                          Expanded(child: Center(child: Text('D', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted)))),
                        ],
                      ),
                      const SizedBox(height: 8),

                      // Grid Rows (1 to 5)
                      ...List.generate(5, (rIndex) {
                        final row = rIndex + 1;
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 8.0),
                          child: Row(
                            children: [
                              Expanded(child: _buildSeatCell('${row}A')),
                              Expanded(child: _buildSeatCell('${row}B')),
                              const SizedBox(width: 24, child: Center(child: Text('-', style: TextStyle(color: AppTheme.textMuted)))),
                              Expanded(child: _buildSeatCell('${row}C')),
                              Expanded(child: _buildSeatCell('${row}D')),
                            ],
                          ),
                        );
                      }),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // In-City Stoppages Section
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('In-City Stoppages', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                        Text('Tap stops to confirm exact boarding & deboarding', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(color: AppTheme.successGreen.withOpacity(0.15), borderRadius: BorderRadius.circular(12)),
                      child: const Row(
                        children: [
                          Icon(Icons.location_on, size: 12, color: AppTheme.successGreen),
                          SizedBox(width: 4),
                          Text('Live Route', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Stoppage Map Container
                ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Stack(
                    children: [
                      Container(
                        height: 140,
                        width: double.infinity,
                        color: const Color(0xFFE2EBE5),
                        child: Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.map_outlined, size: 40, color: AppTheme.primaryTeal.withOpacity(0.7)),
                              const SizedBox(height: 4),
                              const Text('Indore  to  Bhopal Stoppage Map Corridor', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                            ],
                          ),
                        ),
                      ),
                      Positioned(
                        left: 12,
                        bottom: 12,
                        right: 12,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(color: Colors.black.withOpacity(0.75), borderRadius: BorderRadius.circular(10)),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text('Pickup Stop: Vijay Nagar (07:15 AM)', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                              Text('Route Verified', style: TextStyle(color: AppTheme.successGreen, fontSize: 10, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // Pickup Point Dropdown
                const Row(
                  children: [
                    Icon(Icons.explore_outlined, size: 16, color: AppTheme.primaryTeal),
                    SizedBox(width: 6),
                    Text('Select In-City Pickup Point (Indore)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                  ],
                ),
                const SizedBox(height: 4),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                  decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(selectedPickup, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                      const Icon(Icons.keyboard_arrow_down, size: 20, color: AppTheme.textMuted),
                    ],
                  ),
                ),
                const SizedBox(height: 12),

                // Drop Point Dropdown
                const Row(
                  children: [
                    Icon(Icons.location_on_outlined, size: 16, color: AppTheme.accentRed),
                    SizedBox(width: 6),
                    Text('Select In-City Drop Point (Bhopal)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                  ],
                ),
                const SizedBox(height: 4),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                  decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(selectedDrop, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                      const Icon(Icons.keyboard_arrow_down, size: 20, color: AppTheme.textMuted),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // Instant Guarantee Box
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.grey.shade200)),
                  child: const Row(
                    children: [
                      Icon(Icons.verified, color: AppTheme.primaryTeal, size: 28),
                      SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Instant Confirmation Guarantee', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                            Text('M-Ticket and Live GPS tracking link will be sent to your WhatsApp immediately.', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Bottom Sticky Bar
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, -2))],
              ),
              child: Row(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text('${selectedSeats.length} Seats Selected (${selectedSeats.join(', ')})', style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                      Row(
                        children: [
                          const Text('Total: ', style: TextStyle(fontSize: 12, color: AppTheme.inkBlack)),
                          Text('₹${totalPrice.toInt()}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppTheme.accentRed)),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: SizedBox(
                      height: 48,
                      child: ElevatedButton(
                        onPressed: selectedSeats.isEmpty
                            ? null
                            : () {
                                Navigator.pushNamed(
                                  context,
                                  '/passenger',
                                  arguments: {
                                    'trip': widget.trip,
                                    'seats': selectedSeats,
                                    'baseFare': totalPrice,
                                    'pickupStop': selectedPickup,
                                    'dropStop': selectedDrop,
                                  },
                                );
                              },
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text('Continue', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                            SizedBox(width: 6),
                            Icon(Icons.arrow_forward, size: 18),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLegendItem(String label, Color bg, Color iconColor, IconData icon) {
    return Row(
      children: [
        Container(
          width: 22,
          height: 22,
          decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(6), border: Border.all(color: Colors.grey.shade300)),
          child: Icon(icon, size: 12, color: iconColor),
        ),
        const SizedBox(width: 6),
        Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
      ],
    );
  }

  Widget _buildSeatCell(String code) {
    final isBooked = bookedSeats.contains(code);
    final isSel = selectedSeats.contains(code);

    return InkWell(
      onTap: () => _toggleSeat(code),
      child: Container(
        height: 44,
        margin: const EdgeInsets.symmetric(horizontal: 2),
        decoration: BoxDecoration(
          color: isSel ? AppTheme.primaryTeal : isBooked ? AppTheme.surfaceContainerLow : Colors.white,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: isSel ? AppTheme.primaryTeal : isBooked ? Colors.grey.shade200 : Colors.grey.shade300),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(code, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: isSel ? Colors.white : isBooked ? Colors.grey.shade400 : AppTheme.inkBlack)),
            Icon(
              isSel ? Icons.check : isBooked ? Icons.lock_outline : Icons.event_seat_outlined,
              size: 12,
              color: isSel ? Colors.white : isBooked ? Colors.grey.shade400 : AppTheme.primaryTeal,
            ),
          ],
        ),
      ),
    );
  }
}
