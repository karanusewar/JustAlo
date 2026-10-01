import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';
import '../services/api_service.dart';

class SearchResultsScreen extends StatefulWidget {
  final String from;
  final String to;
  final String date;

  const SearchResultsScreen({
    super.key,
    required this.from,
    required this.to,
    required this.date,
  });

  @override
  State<SearchResultsScreen> createState() => _SearchResultsScreenState();
}

class _SearchResultsScreenState extends State<SearchResultsScreen> {
  String selectedFilter = 'AC Sleeper';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      appBar: AppBar(
        titleSpacing: 0,
        title: Row(
          children: [
            const JustaloLogo(height: 34),
            const SizedBox(width: 8),
            Text('${widget.from}  to  ${widget.to}', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none, size: 22),
            onPressed: () => AppTheme.showNotificationsSheet(context),
          ),
          Padding(
            padding: const EdgeInsets.only(right: 14.0),
            child: InkWell(
              onTap: () => AppTheme.showAccountProfileSheet(context),
              borderRadius: BorderRadius.circular(16),
              child: const CircleAvatar(
                radius: 15,
                backgroundColor: AppTheme.surfaceContainerHigh,
                child: Icon(Icons.person, size: 18, color: AppTheme.inkBlack),
              ),
            ),
          ),
        ],
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.only(left: 16.0, right: 16.0, top: 10.0, bottom: 80.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Route Subtitle Row
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('${widget.from}  to  ${widget.to}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppTheme.inkBlack)),
                        Row(
                          children: [
                            const Icon(Icons.calendar_month, size: 12, color: AppTheme.primaryTeal),
                            const SizedBox(width: 4),
                            Text('${widget.date} - ', style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                            const Text('32 Buses available', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                          ],
                        ),
                      ],
                    ),
                    OutlinedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.tune, size: 14, color: AppTheme.inkBlack),
                      label: const Text('Filters', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                      style: OutlinedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), minimumSize: Size.zero),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Horizontal Filter Chips
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: ['AC Sleeper', 'Seater', 'After 6 PM', 'AC Seater'].map((f) {
                      final isSel = selectedFilter == f;
                      return Padding(
                        padding: const EdgeInsets.only(right: 8.0),
                        child: InkWell(
                          onTap: () => setState(() => selectedFilter = f),
                          borderRadius: BorderRadius.circular(20),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                            decoration: BoxDecoration(
                              color: isSel ? AppTheme.primaryTeal : Colors.white,
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(color: isSel ? AppTheme.primaryTeal : Colors.grey.shade300),
                            ),
                            child: Row(
                              children: [
                                Icon(f == 'AC Sleeper' ? Icons.king_bed : f == 'Seater' ? Icons.chair : Icons.access_time, size: 14, color: isSel ? Colors.white : AppTheme.inkBlack),
                                const SizedBox(width: 6),
                                Text(f, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isSel ? Colors.white : AppTheme.inkBlack)),
                              ],
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ),
                const SizedBox(height: 14),

                // High Reliability Route Badge Box
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: Colors.grey.shade200),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), shape: BoxShape.circle),
                        child: const Icon(Icons.verified, size: 16, color: AppTheme.primaryTeal),
                      ),
                      const SizedBox(width: 10),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('High Reliability Route', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                            Text('Express Highway NH-46 - Avg delay < 5m', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(color: AppTheme.successGreen.withOpacity(0.15), borderRadius: BorderRadius.circular(8)),
                        child: const Text('ON TIME', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // OPERATOR CARD 1: Bagdi Travels
                _buildOperatorCard(
                  context,
                  BusTrip(
                    id: 'TRIP_101',
                    operator: 'Bagdi Travels',
                    busType: 'Royal Star Class - 2+1 Sleeper/Seater',
                    capacity: 40,
                    rating: 4.6,
                    reviewsCount: 1240,
                    origin: widget.from,
                    destination: widget.to,
                    departureTime: '07:30 AM',
                    arrivalTime: '11:15 AM',
                    duration: '3h 45m',
                    baseFare: 380.0,
                    amenities: ['AC', 'WiFi', 'Water', 'USB Port', 'SOS'],
                    cancellationPolicy: 'Free cancel till 25m before departure',
                  ),
                  isVerified: true,
                  badge: 'JUSTALO Assured',
                  seatsLeft: '18 Seats Left',
                  originalFare: '₹450',
                  pickupTerminal: 'AICTSL, Indore',
                  dropTerminal: 'Bhopal ISBT',
                ),

                // OPERATOR CARD 2: Hans Travels
                _buildOperatorCard(
                  context,
                  BusTrip(
                    id: 'TRIP_102',
                    operator: 'Hans Travels',
                    busType: 'Multi-Axle Volvo B11R AC Sleeper',
                    capacity: 50,
                    rating: 4.8,
                    reviewsCount: 2810,
                    origin: widget.from,
                    destination: widget.to,
                    departureTime: '09:00 AM',
                    arrivalTime: '12:45 PM',
                    duration: '3h 45m',
                    baseFare: 520.0,
                    amenities: ['Sleeper', 'Personal LCD', 'Snacks', 'Blanket'],
                    cancellationPolicy: '100% refund before 30 mins',
                  ),
                  badge: 'PREMIUM',
                  badgeColor: AppTheme.primaryTeal,
                  seatsLeft: '⚡ 12 Seats Left',
                  isUrgency: true,
                  pickupTerminal: 'Vijay Nagar',
                  dropTerminal: 'Nadra Bus Stand',
                ),

                // OPERATOR CARD 3: Chartered Bus
                _buildOperatorCard(
                  context,
                  BusTrip(
                    id: 'TRIP_103',
                    operator: 'Chartered Bus',
                    busType: 'Intercity Point-to-Point AC Seater',
                    capacity: 40,
                    rating: 4.4,
                    reviewsCount: 3980,
                    origin: widget.from,
                    destination: widget.to,
                    departureTime: '10:15 AM',
                    arrivalTime: '02:00 PM',
                    duration: '3h 45m',
                    baseFare: 340.0,
                    amenities: ['AC', 'Pushback', 'Heavy Luggage Box'],
                    cancellationPolicy: 'Non-refundable within 15 mins',
                  ),
                  isVerified: true,
                  badge: 'Saver Deal',
                  badgeColor: AppTheme.successGreen,
                  seatsLeft: '24 Seats Left',
                  pickupTerminal: 'Sarwate Station',
                  dropTerminal: 'Habibganj Station',
                ),

                const SizedBox(height: 14),

                // Return Savings Banner
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryTeal.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppTheme.primaryTeal.withOpacity(0.3)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: const BoxDecoration(color: AppTheme.primaryTeal, shape: BoxShape.circle),
                        child: const Icon(Icons.swap_horiz, color: Colors.white, size: 20),
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Book Return & Save 10%', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                            Text('Add Bhopal  to  Indore return trip for same day', style: TextStyle(fontSize: 10, color: AppTheme.inkBlack)),
                          ],
                        ),
                      ),
                      OutlinedButton(
                        onPressed: () {},
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          minimumSize: Size.zero,
                          side: const BorderSide(color: AppTheme.primaryTeal),
                        ),
                        child: const Text('Add Return', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryTeal)),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Bottom Sorting Bar
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, -2))],
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Row(
                    children: [
                      Icon(Icons.swap_vert, size: 16, color: AppTheme.primaryTeal),
                      SizedBox(width: 4),
                      Text('Price: Low to High', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                    ],
                  ),
                  Row(
                    children: [
                      Icon(Icons.access_time, size: 16, color: AppTheme.textMuted),
                      SizedBox(width: 4),
                      Text('Earliest First', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                    ],
                  ),
                  Row(
                    children: [
                      Icon(Icons.local_offer, size: 16, color: AppTheme.accentRed),
                      SizedBox(width: 4),
                      Text('Offers', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
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

  Widget _buildOperatorCard(
    BuildContext context,
    BusTrip trip, {
    bool isVerified = false,
    String? badge,
    Color? badgeColor,
    String? originalFare,
    required String seatsLeft,
    bool isUrgency = false,
    required String pickupTerminal,
    required String dropTerminal,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2))],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Operator Name & Rating Row
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Text(trip.operator, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
                        if (isVerified) ...[
                          const SizedBox(width: 4),
                          const Icon(Icons.verified, size: 16, color: AppTheme.primaryTeal),
                        ],
                        if (badge != null) ...[
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(color: (badgeColor ?? AppTheme.primaryTeal).withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                            child: Text(badge, style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: badgeColor ?? AppTheme.primaryDark)),
                          ),
                        ],
                      ],
                    ),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text('₹${trip.baseFare.toInt()}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: AppTheme.accentRed)),
                        if (originalFare != null) ...[
                          const SizedBox(width: 4),
                          Text(originalFare, style: const TextStyle(fontSize: 12, color: AppTheme.textMuted, decoration: TextDecoration.lineThrough)),
                        ],
                      ],
                    ),
                  ],
                ),
                Text(trip.busType, style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                const SizedBox(height: 8),

                // Rating & Reviews Pill
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(color: AppTheme.primaryDark, borderRadius: BorderRadius.circular(6)),
                      child: Row(
                        children: [
                          const Icon(Icons.star, size: 12, color: Colors.white),
                          const SizedBox(width: 2),
                          Text('${trip.rating}', style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                    const SizedBox(width: 6),
                    Text('${trip.reviewsCount} reviews', style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                  ],
                ),
                const SizedBox(height: 14),

                // Departure & Arrival Timeline Row
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(14)),
                  child: Row(
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(trip.departureTime, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900)),
                          Text(pickupTerminal, style: const TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                        ],
                      ),
                      Expanded(
                        child: Column(
                          children: [
                            Text(trip.duration, style: const TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                            Row(
                              children: [
                                Container(width: 6, height: 6, decoration: const BoxDecoration(color: AppTheme.primaryTeal, shape: BoxShape.circle)),
                                const Expanded(child: Divider(thickness: 1.5, color: AppTheme.primaryTeal)),
                                const Icon(Icons.directions_bus, size: 14, color: AppTheme.primaryTeal),
                                const Expanded(child: Divider(thickness: 1.5, color: AppTheme.primaryTeal)),
                                Container(width: 6, height: 6, decoration: const BoxDecoration(color: AppTheme.accentRed, shape: BoxShape.circle)),
                              ],
                            ),
                            const Text('Direct Route', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                          ],
                        ),
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(trip.arrivalTime, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900)),
                          Text(dropTerminal, style: const TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),

                // Amenity Chips Row
                Wrap(
                  spacing: 6,
                  children: trip.amenities.map((a) {
                    return Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(8)),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(a == 'AC' ? Icons.ac_unit : a == 'WiFi' ? Icons.wifi : Icons.water_drop, size: 12, color: AppTheme.inkBlack),
                          const SizedBox(width: 4),
                          Text(a, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                        ],
                      ),
                    );
                  }).toList(),
                ),
                const SizedBox(height: 10),

                // Free Cancel Policy Text
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.check_circle_outline, size: 14, color: AppTheme.successGreen),
                        const SizedBox(width: 4),
                        Text(trip.cancellationPolicy, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                      ],
                    ),
                    const Text('Policy', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.primaryTeal, decoration: TextDecoration.underline)),
                  ],
                ),
                const SizedBox(height: 14),

                // Seats Left & Select Seats CTA Row
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          decoration: BoxDecoration(color: isUrgency ? AppTheme.accentRed : AppTheme.successGreen, shape: BoxShape.circle),
                        ),
                        const SizedBox(width: 6),
                        Text(seatsLeft, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isUrgency ? AppTheme.accentRed : AppTheme.successGreen)),
                      ],
                    ),
                    SizedBox(
                      height: 38,
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.pushNamed(context, '/seat', arguments: {'trip': trip});
                        },
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text('Select Seats', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                            SizedBox(width: 4),
                            Icon(Icons.arrow_forward, size: 16),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
