import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';
import '../services/api_service.dart';

class PassengerDetailsScreen extends StatefulWidget {
  final BusTrip trip;
  final List<String> seats;
  final double baseFare;
  final String pickupStop;
  final String dropStop;

  const PassengerDetailsScreen({
    super.key,
    required this.trip,
    required this.seats,
    required this.baseFare,
    required this.pickupStop,
    required this.dropStop,
  });

  @override
  State<PassengerDetailsScreen> createState() => _PassengerDetailsScreenState();
}

class _PassengerDetailsScreenState extends State<PassengerDetailsScreen> {
  final TextEditingController p1Name = TextEditingController(text: 'Rahul Sharma');
  final TextEditingController p1Age = TextEditingController(text: '28');
  String p1Gender = 'M';

  final TextEditingController p2Name = TextEditingController(text: 'Priya Sharma');
  final TextEditingController p2Age = TextEditingController(text: '26');
  String p2Gender = 'F';

  final TextEditingController phoneController = TextEditingController(text: '98260 41290');
  final TextEditingController emailController = TextEditingController(text: 'rahul.sharma@example.com');
  bool whatsappOptIn = true;
  bool insuranceOpted = true;

  double get seatTotal => widget.baseFare;
  double get convenienceFee => 25.0;
  double get insuranceFee => insuranceOpted ? (15.0 * widget.seats.length) : 0.0;
  double get gstFee => (seatTotal + convenienceFee + insuranceFee) * 0.05;
  double get totalPayable => seatTotal + convenienceFee + insuranceFee + gstFee;

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
            Text('Checkout & Payment', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
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
                // BUS BOOKING Summary Card Header
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(colors: [Color(0xFFE0F7FA), Color(0xFFE0F2F1)]),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppTheme.primaryTeal.withOpacity(0.3)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(color: AppTheme.primaryTeal, borderRadius: BorderRadius.circular(6)),
                                child: const Text('BUS BOOKING', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
                              ),
                              const SizedBox(width: 6),
                              const Row(
                                children: [
                                  Icon(Icons.verified, size: 12, color: AppTheme.successGreen),
                                  SizedBox(width: 2),
                                  Text('Confirmed Operator', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                                ],
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Text('${widget.trip.origin}  to  ${widget.trip.destination}', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
                          Text('${widget.trip.operator} - 24 Oct - Seats: ${widget.seats.join(', ')}', style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(color: Colors.white.withOpacity(0.8), shape: BoxShape.circle),
                        child: const Icon(Icons.directions_bus, color: AppTheme.primaryTeal, size: 24),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // PASSENGER DETAILS SECTION
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.group_outlined, size: 18, color: AppTheme.primaryTeal),
                        SizedBox(width: 6),
                        Text('Passenger Details', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(color: AppTheme.surfaceContainerHigh, borderRadius: BorderRadius.circular(10)),
                      child: Text('${widget.seats.length} Travellers', style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                    ),
                  ],
                ),
                const SizedBox(height: 10),

                // Passenger 1 Card
                _buildPassengerInputCard('1', widget.seats.isNotEmpty ? widget.seats[0] : '3A', p1Name, p1Age, p1Gender, (g) => setState(() => p1Gender = g)),
                const SizedBox(height: 12),

                // Passenger 2 Card
                _buildPassengerInputCard('2', widget.seats.length > 1 ? widget.seats[1] : '3B', p2Name, p2Age, p2Gender, (g) => setState(() => p2Gender = g)),
                const SizedBox(height: 16),

                // CONTACT INFORMATION CARD
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.grey.shade200),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Row(
                        children: [
                          Icon(Icons.contact_mail_outlined, color: AppTheme.primaryTeal, size: 18),
                          SizedBox(width: 6),
                          Text('Contact Information', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      const SizedBox(height: 2),
                      const Text('Your ticket, live tracking, and departure gate details will be sent here.', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                      const SizedBox(height: 12),

                      // Mobile Field
                      const Text('Mobile Number', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                      const SizedBox(height: 2),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                        child: Row(
                          children: [
                            const Text('+91  ', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                            Expanded(
                              child: TextField(
                                controller: phoneController,
                                keyboardType: TextInputType.phone,
                                style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                                decoration: const InputDecoration(isDense: true, border: InputBorder.none, contentPadding: EdgeInsets.zero),
                              ),
                            ),
                            const Icon(Icons.check_circle, color: AppTheme.successGreen, size: 18),
                          ],
                        ),
                      ),
                      const SizedBox(height: 10),

                      // Email Field
                      const Text('Email Address', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                      const SizedBox(height: 2),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                        child: Row(
                          children: [
                            const Icon(Icons.email_outlined, size: 16, color: AppTheme.textMuted),
                            const SizedBox(width: 8),
                            Expanded(
                              child: TextField(
                                controller: emailController,
                                keyboardType: TextInputType.emailAddress,
                                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                                decoration: const InputDecoration(isDense: true, border: InputBorder.none, contentPadding: EdgeInsets.zero),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),

                      // WhatsApp Opt-in Checkbox Row
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                        child: Row(
                          children: [
                            Checkbox(
                              value: whatsappOptIn,
                              activeColor: AppTheme.successGreen,
                              onChanged: (val) => setState(() => whatsappOptIn = val ?? true),
                            ),
                            const SizedBox(width: 4),
                            const Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Icon(Icons.chat_bubble_outline, size: 14, color: AppTheme.successGreen),
                                      SizedBox(width: 4),
                                      Text('WhatsApp Instant Updates', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                    ],
                                  ),
                                  Text('Send booking confirmation & live bus tracking link on WhatsApp', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // OPTIONAL PROTECTION CARD
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.grey.shade200),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('OPTIONAL PROTECTION', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.primaryDark, letterSpacing: 0.5)),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(color: AppTheme.surfaceContainerHigh, borderRadius: BorderRadius.circular(6)),
                            child: const Text('Non-mandatory', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
                            child: const Icon(Icons.health_and_safety_outlined, color: AppTheme.primaryTeal, size: 22),
                          ),
                          const SizedBox(width: 12),
                          const Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Travel & Accidental Insurance ₹15 / person', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                                Text('Covers accidental hospitalisation up to ₹2,00,000 & baggage loss during transit.', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Row(
                              children: [
                                Icon(Icons.shield_outlined, size: 14, color: AppTheme.successGreen),
                                SizedBox(width: 6),
                                Text('Powered by Tata AIG General Insurance', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                              ],
                            ),
                            Switch(
                              value: insuranceOpted,
                              activeColor: AppTheme.primaryTeal,
                              onChanged: (val) => setState(() => insuranceOpted = val),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // FARE BREAKDOWN CARD
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.grey.shade200),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Row(
                            children: [
                              Icon(Icons.receipt_long, color: AppTheme.primaryTeal, size: 18),
                              SizedBox(width: 6),
                              Text('Fare Breakdown', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                            ],
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.12), borderRadius: BorderRadius.circular(8)),
                            child: const Text('Instant Invoice', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 14),

                      _buildFareRow('Base Fare (₹380 × 2 passengers)', '₹${seatTotal.toStringAsFixed(2)}'),
                      _buildFareRow('Admin Convenience Charge ⓘ', '₹${convenienceFee.toStringAsFixed(2)}'),
                      if (insuranceOpted) _buildFareRow('Accidental Insurance (Optional)', '₹${insuranceFee.toStringAsFixed(2)}', isHighlight: true),
                      _buildFareRow('Goods & Services Tax (GST 5%)', '₹${gstFee.toStringAsFixed(2)}'),
                      const Divider(height: 20),

                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Total Net Payable', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900)),
                              Text('All taxes inclusive', style: TextStyle(fontSize: 9, color: AppTheme.textMuted)),
                            ],
                          ),
                          Text('₹${totalPayable.toStringAsFixed(2)}', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: AppTheme.accentRed)),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // Free Cancellation Notice Box
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.grey.shade200)),
                  child: const Row(
                    children: [
                      Icon(Icons.published_with_changes, color: AppTheme.accentRed, size: 24),
                      SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Free cancellation available', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                            Text('Cancel until 25 mins prior to departure (07:05 AM) for a 100% instant refund to original source account.', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // Trust Badges
                const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.lock_outline, size: 12, color: AppTheme.successGreen),
                        SizedBox(width: 4),
                        Text('256-Bit SSL Secured', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                      ],
                    ),
                    SizedBox(width: 16),
                    Row(
                      children: [
                        Icon(Icons.bolt, size: 12, color: AppTheme.primaryTeal),
                        SizedBox(width: 4),
                        Text('Instant Refund via UPI', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                      ],
                    ),
                  ],
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
                      Text('Due Amount', style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                      Row(
                        children: [
                          Text('₹${totalPayable.toStringAsFixed(2)}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppTheme.inkBlack)),
                          const SizedBox(width: 6),
                          Text('${widget.seats.length} Seats', style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: SizedBox(
                      height: 48,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(backgroundColor: AppTheme.accentRed),
                        onPressed: () async {
                          final booking = await ApiService.createBooking({
                            'tripId': widget.trip.id,
                            'passengerName': p1Name.text,
                            'passengerPhone': phoneController.text,
                            'passengerEmail': emailController.text,
                            'seats': widget.seats,
                            'pickupStop': widget.pickupStop,
                            'dropStop': widget.dropStop,
                            'baseFare': widget.baseFare,
                            'insuranceOpted': insuranceOpted,
                            'whatsappOptIn': whatsappOptIn,
                          });

                          if (mounted) {
                            Navigator.pushNamed(context, '/eticket', arguments: booking['booking']);
                          }
                        },
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text('Proceed to Pay ₹${totalPayable.toStringAsFixed(2)}', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                            const SizedBox(width: 6),
                            const Icon(Icons.arrow_forward, size: 16),
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

  Widget _buildPassengerInputCard(String num, String seatCode, TextEditingController nameCtrl, TextEditingController ageCtrl, String gender, ValueChanged<String> onGenderChanged) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.grey.shade200)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    width: 20,
                    height: 20,
                    decoration: const BoxDecoration(color: AppTheme.primaryDark, shape: BoxShape.circle),
                    child: Center(child: Text(num, style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold))),
                  ),
                  const SizedBox(width: 6),
                  Text('Passenger $num', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(color: AppTheme.surfaceContainerHigh, borderRadius: BorderRadius.circular(6)),
                child: Text('Seat $seatCode', style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
              ),
            ],
          ),
          const SizedBox(height: 10),

          // Name
          const Text('Full Name (as per Govt. ID)', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
          const SizedBox(height: 2),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(10)),
            child: Row(
              children: [
                const Icon(Icons.person_outline, size: 16, color: AppTheme.textMuted),
                const SizedBox(width: 8),
                Expanded(
                  child: TextField(
                    controller: nameCtrl,
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                    decoration: const InputDecoration(isDense: true, border: InputBorder.none, contentPadding: EdgeInsets.zero),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),

          // Age & Gender Row
          Row(
            children: [
              Expanded(
                flex: 2,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Age', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                    const SizedBox(height: 2),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(10)),
                      child: TextField(
                        controller: ageCtrl,
                        keyboardType: TextInputType.number,
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                        decoration: const InputDecoration(isDense: true, border: InputBorder.none, contentPadding: EdgeInsets.zero),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                flex: 4,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Gender', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                    const SizedBox(height: 2),
                    Row(
                      children: ['M', 'F', 'Other'].map((g) {
                        final isSel = gender == g;
                        return Expanded(
                          child: InkWell(
                            onTap: () => onGenderChanged(g),
                            child: Container(
                              margin: const EdgeInsets.only(right: 4),
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              decoration: BoxDecoration(
                                color: isSel ? AppTheme.primaryTeal : AppTheme.surfaceContainerLow,
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Center(
                                child: Text(g, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isSel ? Colors.white : AppTheme.inkBlack)),
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFareRow(String label, String val, {bool isHighlight = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(fontSize: 11, color: isHighlight ? AppTheme.primaryDark : AppTheme.inkBlack, fontWeight: isHighlight ? FontWeight.bold : FontWeight.normal)),
          Text(val, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isHighlight ? AppTheme.primaryDark : AppTheme.inkBlack)),
        ],
      ),
    );
  }
}
