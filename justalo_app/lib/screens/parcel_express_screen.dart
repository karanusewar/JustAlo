import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../services/api_service.dart';

class ParcelExpressScreen extends StatefulWidget {
  const ParcelExpressScreen({super.key});

  @override
  State<ParcelExpressScreen> createState() => _ParcelExpressScreenState();
}

class _ParcelExpressScreenState extends State<ParcelExpressScreen> {
  // Mode: 'book' or 'track'
  String activeMode = 'book';

  // Booking Form State
  String pickupMethod = 'doorstep'; // 'doorstep' or 'self_drop'
  String selectedCategory = 'Clothes / Personal';
  String selectedTier = 'Medium'; // 'Small', 'Medium', 'Bulk'
  
  final TextEditingController weightController = TextEditingController(text: '3.5');
  final TextEditingController valueController = TextEditingController(text: '2500');
  final TextEditingController descController = TextEditingController(text: 'Personal wardrobe & traditional sweets box');

  // Calculated Pricing
  double get baseFreight => selectedTier == 'Small' ? 120.0 : selectedTier == 'Medium' ? 250.0 : 550.0;
  double get pickupFee => pickupMethod == 'doorstep' ? 30.0 : 0.0;
  double get trackingFee => 20.0;
  double get totalPayable => baseFreight + pickupFee + trackingFee;

  // Waybill Code for Tracking
  String currentWaybill = 'JA123456789';

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
            Text(
              activeMode == 'book' ? 'Send Courier / Book Parcel' : 'Live Parcel Tracking',
              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(activeMode == 'book' ? Icons.history : Icons.add_box_outlined),
            onPressed: () {
              setState(() {
                activeMode = activeMode == 'book' ? 'track' : 'book';
              });
            },
          ),
          IconButton(icon: const Icon(Icons.help_outline), onPressed: () {}),
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
      body: activeMode == 'book' ? _buildBookParcelView() : _buildLiveTrackingView(),
    );
  }

  // --- VIEW 1: BOOK A PARCEL FLOW (Matching Screenshot 1) ---
  Widget _buildBookParcelView() {
    return Stack(
      children: [
        SingleChildScrollView(
          padding: const EdgeInsets.only(left: 16.0, right: 16.0, top: 12.0, bottom: 90.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Title & Stepper Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Book a Parcel', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: AppTheme.inkBlack)),
                      Row(
                        children: [
                          const Icon(Icons.location_on, size: 12, color: AppTheme.primaryTeal),
                          const SizedBox(width: 4),
                          const Text('Nagpur Hub - ', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(color: AppTheme.successGreen.withOpacity(0.12), borderRadius: BorderRadius.circular(8)),
                            child: const Text('Intercity Express', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                          ),
                        ],
                      ),
                    ],
                  ),
                  OutlinedButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.help_outline, size: 14, color: AppTheme.textMuted),
                    label: const Text('Guide', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                    style: OutlinedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), minimumSize: Size.zero),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // 4-Step Progress Indicator
              Row(
                children: [
                  _buildStepNode(1, 'Pickup', true),
                  _buildStepConnector(true),
                  _buildStepNode(2, 'Details', false),
                  _buildStepConnector(false),
                  _buildStepNode(3, 'Address', false),
                  _buildStepConnector(false),
                  _buildStepNode(4, 'Payment', false),
                ],
              ),
              const SizedBox(height: 20),

              // STEP 1 CARD: PICKUP METHOD
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.grey.shade200),
                  boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10, offset: const Offset(0, 2))],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Container(
                              width: 22,
                              height: 22,
                              decoration: const BoxDecoration(color: AppTheme.primaryTeal, shape: BoxShape.circle),
                              child: const Center(child: Text('1', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold))),
                            ),
                            const SizedBox(width: 8),
                            const Text('Pickup method', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.12), borderRadius: BorderRadius.circular(12)),
                          child: const Text('Recommended', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    const Text('Schedule a doorstep pickup or self-drop at bus hub', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                    const SizedBox(height: 14),

                    // Option A: Doorstep Pickup
                    InkWell(
                      onTap: () => setState(() => pickupMethod = 'doorstep'),
                      borderRadius: BorderRadius.circular(14),
                      child: Container(
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: pickupMethod == 'doorstep' ? AppTheme.successGreen.withOpacity(0.1) : AppTheme.surfaceContainerLow,
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: pickupMethod == 'doorstep' ? AppTheme.successGreen : Colors.transparent, width: 1.5),
                        ),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
                              child: const Icon(Icons.two_wheeler, color: AppTheme.primaryDark, size: 22),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      const Text('Doorstep Pickup', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                                      const SizedBox(width: 6),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                                        decoration: BoxDecoration(color: AppTheme.successGreen.withOpacity(0.2), borderRadius: BorderRadius.circular(8)),
                                        child: const Text('+ ₹30 convenience', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 2),
                                  const Text('Our agent collects directly from your home, office or shop in Nagpur.', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                                  const SizedBox(height: 6),
                                  const Row(
                                    children: [
                                      Icon(Icons.access_time, size: 12, color: AppTheme.primaryTeal),
                                      SizedBox(width: 4),
                                      Text('Pickup Slot: Today, within 45 mins', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                            if (pickupMethod == 'doorstep')
                              const Icon(Icons.check_circle, color: AppTheme.primaryTeal, size: 22),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),

                    // Option B: Self-Drop
                    InkWell(
                      onTap: () => setState(() => pickupMethod = 'self_drop'),
                      borderRadius: BorderRadius.circular(14),
                      child: Container(
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: pickupMethod == 'self_drop' ? AppTheme.primaryTeal.withOpacity(0.1) : AppTheme.surfaceContainerLow,
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: pickupMethod == 'self_drop' ? AppTheme.primaryTeal : Colors.transparent, width: 1.5),
                        ),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(color: AppTheme.surfaceContainerHigh, borderRadius: BorderRadius.circular(10)),
                              child: const Icon(Icons.store, color: AppTheme.inkBlack, size: 22),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Row(
                                    children: [
                                      Text('Self-Drop at Bus Stoppage / Hub', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                                      SizedBox(width: 6),
                                      Text('Free', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                                    ],
                                  ),
                                  const SizedBox(height: 2),
                                  const Text('Handover directly at Sitabuldi Bus Depot or nearest JUSTALO counter.', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                                  const SizedBox(height: 4),
                                  const Row(
                                    children: [
                                      Icon(Icons.pin_drop_outlined, size: 12, color: AppTheme.textMuted),
                                      SizedBox(width: 4),
                                      Text('Sitabuldi Main Hub (1.2 km away)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                            if (pickupMethod == 'self_drop')
                              const Icon(Icons.check_circle, color: AppTheme.primaryTeal, size: 22),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // STEP 2 CARD: PARCEL DETAILS
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.grey.shade200),
                  boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10, offset: const Offset(0, 2))],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 22,
                          height: 22,
                          decoration: const BoxDecoration(color: AppTheme.surfaceContainerHigh, shape: BoxShape.circle),
                          child: const Center(child: Text('2', style: TextStyle(color: AppTheme.inkBlack, fontSize: 12, fontWeight: FontWeight.bold))),
                        ),
                        const SizedBox(width: 8),
                        const Text('Parcel details', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                      ],
                    ),
                    const SizedBox(height: 2),
                    const Text('Size, weight and item classification', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                    const SizedBox(height: 14),

                    // Category Chips
                    const Text('Category', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                    const SizedBox(height: 6),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: ['Documents', 'Clothes / Personal', 'Electronics', 'Food / Sweets'].map((cat) {
                          final isSel = selectedCategory == cat;
                          return Padding(
                            padding: const EdgeInsets.only(right: 8.0),
                            child: InkWell(
                              onTap: () => setState(() => selectedCategory = cat),
                              borderRadius: BorderRadius.circular(20),
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                                decoration: BoxDecoration(
                                  color: isSel ? AppTheme.primaryTeal : AppTheme.surfaceContainerLow,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text(cat, style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: isSel ? Colors.white : AppTheme.inkBlack)),
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                    const SizedBox(height: 14),

                    // Package Size & Pricing Tier Cards
                    const Text('Package Size & Pricing tier', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Expanded(child: _buildTierCard('Small', 'Up to 1 kg', '₹120', selectedTier == 'Small', () => setState(() => selectedTier = 'Small'))),
                        const SizedBox(width: 8),
                        Expanded(child: _buildTierCard('Medium', '1 to 5 kg', '₹250', selectedTier == 'Medium', () => setState(() => selectedTier = 'Medium'), badge: 'MOST CHOSEN')),
                        const SizedBox(width: 8),
                        Expanded(child: _buildTierCard('Bulk', '5 to 20 kg', '₹550', selectedTier == 'Bulk', () => setState(() => selectedTier = 'Bulk'))),
                      ],
                    ),
                    const SizedBox(height: 14),

                    // Weight & Value Row
                    Row(
                      children: [
                        Expanded(
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Approx Weight (kg)', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                                TextField(
                                  controller: weightController,
                                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                                  decoration: const InputDecoration(isDense: true, border: InputBorder.none, contentPadding: EdgeInsets.zero, suffixText: 'KG'),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Declared Value', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                                TextField(
                                  controller: valueController,
                                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                                  decoration: const InputDecoration(isDense: true, border: InputBorder.none, contentPadding: EdgeInsets.zero, prefixText: '₹ '),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    // Parcel Description Notes
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Parcel Description / Special Notes', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                          TextField(
                            controller: descController,
                            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                            decoration: const InputDecoration(isDense: true, border: InputBorder.none, contentPadding: EdgeInsets.zero),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // STEP 3 CARD: ADDRESSES
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.grey.shade200),
                  boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10, offset: const Offset(0, 2))],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Container(
                              width: 22,
                              height: 22,
                              decoration: const BoxDecoration(color: AppTheme.surfaceContainerHigh, shape: BoxShape.circle),
                              child: const Center(child: Text('3', style: TextStyle(color: AppTheme.inkBlack, fontSize: 12, fontWeight: FontWeight.bold))),
                            ),
                            const SizedBox(width: 8),
                            const Text('Addresses', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                          ],
                        ),
                        TextButton(onPressed: () {}, child: const Text('Change', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.primaryTeal))),
                      ],
                    ),
                    const Text('Sender, receiver and partner transit', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                    const SizedBox(height: 14),

                    // Pickup Address
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), shape: BoxShape.circle),
                          child: const Icon(Icons.arrow_upward, size: 14, color: AppTheme.primaryTeal),
                        ),
                        const SizedBox(width: 10),
                        const Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text('PICKUP (NAGPUR)', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                                  Text('Rahul Sharma', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                                ],
                              ),
                              Text('Sitabuldi, Wardha Road, Nagpur 440012', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                              Text('+91 98765 43210', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const Padding(
                      padding: EdgeInsets.only(left: 13, top: 4, bottom: 4),
                      child: SizedBox(height: 16, child: VerticalDivider(thickness: 1.5, color: AppTheme.surfaceContainerHigh)),
                    ),

                    // Delivery Address
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(color: AppTheme.accentRed.withOpacity(0.15), shape: BoxShape.circle),
                          child: const Icon(Icons.location_on, size: 14, color: AppTheme.accentRed),
                        ),
                        const SizedBox(width: 10),
                        const Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text('DELIVERY (PUNE)', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                                  Text('Amit Verma', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                                ],
                              ),
                              Text('Shivaji Nagar, Near Metro Station, Pune 411005', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                              Text('+91 98234 56789', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),

                    // Assigned Bus Fleet Box
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(14)),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10)),
                            child: const Icon(Icons.directions_bus, color: AppTheme.primaryTeal, size: 20),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Text('Shree Travels Express', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                      decoration: BoxDecoration(color: AppTheme.successGreen.withOpacity(0.15), borderRadius: BorderRadius.circular(8)),
                                      child: const Text('Next Bus: 07:30 PM', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                                    ),
                                  ],
                                ),
                                const Text('Nagpur Hub  to  Pune Swargate (Expected 05:45 AM arrival)', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
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

              // STEP 4 CARD: REVIEW & PAY
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.grey.shade200),
                  boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10, offset: const Offset(0, 2))],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Container(
                              width: 22,
                              height: 22,
                              decoration: const BoxDecoration(color: AppTheme.surfaceContainerHigh, shape: BoxShape.circle),
                              child: const Center(child: Text('4', style: TextStyle(color: AppTheme.inkBlack, fontSize: 12, fontWeight: FontWeight.bold))),
                            ),
                            const SizedBox(width: 8),
                            const Text('Review & pay', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                          ],
                        ),
                        const Icon(Icons.receipt_long, color: AppTheme.textMuted, size: 20),
                      ],
                    ),
                    const Text('Transparent intercity courier pricing', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                    const SizedBox(height: 14),

                    _buildFareRow('Standard Intercity Freight (1-5 kg)', '₹${baseFreight.toInt()}'),
                    if (pickupMethod == 'doorstep') _buildFareRow('Doorstep Pickup Service v', '₹${pickupFee.toInt()}'),
                    _buildFareRow('Live GPS & WhatsApp Tracking', '₹${trackingFee.toInt()}'),
                    _buildFareRow('Digital Transit Insurance (Up to ₹5,000)', 'FREE INCLUDED', isHighlight: true),
                    const Divider(height: 20),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Total Payable', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: AppTheme.inkBlack)),
                            Text('Inclusive of all taxes & toll permits', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                          ],
                        ),
                        Text('₹${totalPayable.toInt()}', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: AppTheme.primaryTeal)),
                      ],
                    ),
                    const SizedBox(height: 14),

                    // Trust Safe-Lock Box
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                      child: const Row(
                        children: [
                          Icon(Icons.gpp_good_outlined, color: AppTheme.successGreen, size: 24),
                          SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('JUSTALO Safe-Lock Transit', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                                Text('Tamper-evident sealed barcode bag provided during pickup. Automated milestone OTP verification at delivery.', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
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

              // Bulk requirements help
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.inventory_2_outlined, size: 16, color: AppTheme.textMuted),
                      SizedBox(width: 6),
                      Text('Have custom pallet or bulk requirements?', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                    ],
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text('Contact Fleet Desk', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryTeal)),
                  ),
                ],
              ),
            ],
          ),
        ),

        // Sticky Bottom Payment Bar
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
                    const Text('ESTIMATED TOTAL', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                    Row(
                      children: [
                        Text('₹${totalPayable.toInt()}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppTheme.inkBlack)),
                        const SizedBox(width: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
                          decoration: BoxDecoration(color: AppTheme.successGreen.withOpacity(0.15), borderRadius: BorderRadius.circular(4)),
                          child: const Text('Save ₹40 online', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: SizedBox(
                    height: 48,
                    child: ElevatedButton(
                      onPressed: () {
                        setState(() {
                          activeMode = 'track';
                        });
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Payment Successful! Waybill JA123456789 generated.'),
                            backgroundColor: AppTheme.successGreen,
                          ),
                        );
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text('Continue to Pay', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
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
    );
  }

  // --- VIEW 2: LIVE PARCEL TRACKING SCREEN (Matching Screenshot 2) ---
  Widget _buildLiveTrackingView() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Waybill Header Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('WAYBILL - COURIER', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted, letterSpacing: 0.5)),
                    const SizedBox(height: 2),
                    Row(
                      children: [
                        Text(currentWaybill, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppTheme.inkBlack)),
                        const SizedBox(width: 6),
                        const Icon(Icons.copy, size: 16, color: AppTheme.primaryTeal),
                      ],
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), borderRadius: BorderRadius.circular(20)),
                  child: const Row(
                    children: [
                      Icon(Icons.circle, size: 8, color: AppTheme.primaryTeal),
                      SizedBox(width: 6),
                      Text('In Transit', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),

          // Route & Fleet Summary Box
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
                      child: const Icon(Icons.inventory_2_outlined, color: AppTheme.primaryDark, size: 22),
                    ),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text('Nagpur', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                              SizedBox(width: 6),
                              Icon(Icons.arrow_forward, size: 16, color: AppTheme.primaryTeal),
                              SizedBox(width: 6),
                              Text('Pune', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                            ],
                          ),
                          Text('Intercity Express Bus Courier', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(8)),
                      child: const Text('3.5 kg', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Delivery Estimate & Fleet Row
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                  child: const Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Estimated Delivery', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                            SizedBox(height: 2),
                            Text('Tomorrow, 01:15 PM', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                          ],
                        ),
                      ),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Assigned Fleet', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                            SizedBox(height: 2),
                            Text('Shree Travels (8820)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),
                const Row(
                  children: [
                    Icon(Icons.devices, size: 14, color: AppTheme.textMuted),
                    SizedBox(width: 6),
                    Text('Medium Box - Electronics / Laptop Accessories', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // LIVE SHIPMENT JOURNEY TIMELINE
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
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Live Shipment Journey', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    Row(
                      children: [
                        Icon(Icons.sensors, size: 14, color: AppTheme.primaryTeal),
                        SizedBox(width: 4),
                        Text('Telemetry Sync', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryTeal)),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                _buildTimelineNode(
                  title: 'Picked Up',
                  time: '24 May, 10:30 AM',
                  desc: 'Collected from Sitabuldi, Nagpur hub by field executive Ramesh K.',
                  isDone: true,
                ),
                _buildTimelineNode(
                  title: 'Dispatched via Bus',
                  time: '24 May, 01:45 PM',
                  desc: 'Loaded securely onto Shree Travels Sleeper Bus (Nagpur  to  Pune).',
                  isDone: true,
                ),
                _buildTimelineNode(
                  title: 'In Transit ●',
                  time: '24 May, 04:20 PM',
                  desc: 'Bus en route near Amravati Bypass - Speed 68 km/h',
                  isActive: true,
                  customBox: Container(
                    margin: const EdgeInsets.only(top: 8),
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Row(
                          children: [
                            Icon(Icons.directions_bus, color: AppTheme.primaryTeal, size: 20),
                            SizedBox(width: 8),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Carrier: MH 31 FC 8820', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                Text('On Schedule - Live GPS active', style: TextStyle(fontSize: 9, color: AppTheme.successGreen, fontWeight: FontWeight.bold)),
                              ],
                            ),
                          ],
                        ),
                        ElevatedButton.icon(
                          onPressed: () => Navigator.pushNamed(context, '/tracking'),
                          icon: const Icon(Icons.open_in_new, size: 12),
                          label: const Text('View Map', style: TextStyle(fontSize: 10)),
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            minimumSize: Size.zero,
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                _buildTimelineNode(
                  title: 'Out for Delivery',
                  time: '25 May, 09:00 AM',
                  desc: 'Arrival at Shivaji Nagar Hub, Pune - Last-mile assignment',
                  isLast: false,
                ),
                _buildTimelineNode(
                  title: 'Delivered',
                  time: '25 May, 01:15 PM',
                  desc: 'Secure handover to Amit Verma with recipient OTP verification',
                  isLast: true,
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Recipient Details Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Recipient Details', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                    Row(
                      children: [
                        Icon(Icons.shield_outlined, size: 14, color: AppTheme.successGreen),
                        SizedBox(width: 4),
                        Text('OTP Protected', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                const Row(
                  children: [
                    Icon(Icons.person_outline, size: 18, color: AppTheme.primaryTeal),
                    SizedBox(width: 8),
                    Text('Amit Verma', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                    SizedBox(width: 8),
                    Text('(+91 98231 *****)', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                  ],
                ),
                const SizedBox(height: 6),
                const Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Icon(Icons.location_on_outlined, size: 18, color: AppTheme.textMuted),
                    SizedBox(width: 8),
                    Expanded(
                      child: Text('Flat 402, Green Park Apartments, Near Shivaji Nagar Bus Terminal, Pune - 411005', style: TextStyle(fontSize: 12, color: AppTheme.inkBlack)),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(color: AppTheme.successGreen.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
                  child: const Row(
                    children: [
                      Icon(Icons.verified, size: 16, color: AppTheme.successGreen),
                      SizedBox(width: 8),
                      Expanded(
                        child: Text('Delivery code will be dispatched to receiver via SMS & WhatsApp upon vehicle hub touchdown.', style: TextStyle(fontSize: 10, color: AppTheme.primaryDark, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Action Buttons
          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton.icon(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Live Tracking link copied to clipboard! Share on WhatsApp.')),
                );
              },
              icon: const Icon(Icons.share),
              label: const Text('Share Live Tracking Link', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
            ),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.phone_in_talk, size: 16),
                  label: const Text('Call Hub Desk', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.receipt, size: 16),
                  label: const Text('Waybill Slip', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),

          const Center(
            child: Text('Queries about this consignment? 24×7 JUSTALO Desk: 1800-JUSTALO', style: TextStyle(fontSize: 10, color: AppTheme.textMuted, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  // --- HELPER WIDGETS ---
  Widget _buildStepNode(int step, String label, bool isActive) {
    return Column(
      children: [
        Container(
          width: 28,
          height: 28,
          decoration: BoxDecoration(
            color: isActive ? AppTheme.primaryTeal : AppTheme.surfaceContainerHigh,
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Text(
              '$step',
              style: TextStyle(color: isActive ? Colors.white : AppTheme.inkBlack, fontWeight: FontWeight.bold, fontSize: 12),
            ),
          ),
        ),
        const SizedBox(height: 2),
        Text(label, style: TextStyle(fontSize: 10, fontWeight: isActive ? FontWeight.bold : FontWeight.normal, color: isActive ? AppTheme.primaryTeal : AppTheme.textMuted)),
      ],
    );
  }

  Widget _buildStepConnector(bool isActive) {
    return Expanded(
      child: Container(
        height: 2,
        margin: const EdgeInsets.only(bottom: 12),
        color: isActive ? AppTheme.primaryTeal : AppTheme.surfaceContainerHigh,
      ),
    );
  }

  Widget _buildTierCard(String name, String cap, String price, bool isSel, VoidCallback onTap, {String? badge}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(14),
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: isSel ? AppTheme.primaryTeal.withOpacity(0.08) : AppTheme.surfaceContainerLow,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: isSel ? AppTheme.primaryTeal : Colors.transparent, width: 1.5),
            ),
            child: Column(
              children: [
                Icon(name == 'Small' ? Icons.mail_outline : name == 'Medium' ? Icons.view_in_ar : Icons.shopping_bag_outlined, color: isSel ? AppTheme.primaryTeal : AppTheme.inkBlack, size: 22),
                const SizedBox(height: 4),
                Text(name, style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: isSel ? AppTheme.primaryTeal : AppTheme.inkBlack)),
                Text(cap, style: const TextStyle(fontSize: 9, color: AppTheme.textMuted)),
                const SizedBox(height: 4),
                Text(price, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: isSel ? AppTheme.primaryTeal : AppTheme.inkBlack)),
              ],
            ),
          ),
          if (badge != null)
            Positioned(
              top: -8,
              left: 0,
              right: 0,
              child: Center(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                  decoration: BoxDecoration(color: AppTheme.primaryTeal, borderRadius: BorderRadius.circular(6)),
                  child: Text(badge, style: const TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.bold)),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildFareRow(String label, String val, {bool isHighlight = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(fontSize: 12, color: isHighlight ? AppTheme.successGreen : AppTheme.inkBlack, fontWeight: isHighlight ? FontWeight.bold : FontWeight.normal)),
          Text(val, style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: isHighlight ? AppTheme.successGreen : AppTheme.inkBlack)),
        ],
      ),
    );
  }

  Widget _buildTimelineNode({required String title, required String time, required String desc, bool isDone = false, bool isActive = false, bool isLast = false, Widget? customBox}) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Container(
              width: 24,
              height: 24,
              decoration: BoxDecoration(
                color: isDone ? AppTheme.primaryDark : isActive ? AppTheme.primaryTeal : AppTheme.surfaceContainerHigh,
                shape: BoxShape.circle,
              ),
              child: Icon(
                isDone ? Icons.check : isActive ? Icons.directions_bus : Icons.circle,
                size: 14,
                color: (isDone || isActive) ? Colors.white : AppTheme.textMuted,
              ),
            ),
            if (!isLast)
              Container(
                width: 2,
                height: customBox != null ? 100 : 50,
                color: (isDone || isActive) ? AppTheme.primaryTeal : AppTheme.surfaceContainerHigh,
              ),
          ],
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(title, style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: isActive ? AppTheme.primaryDark : AppTheme.inkBlack)),
                  Text(time, style: const TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                ],
              ),
              const SizedBox(height: 2),
              Text(desc, style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
              if (customBox != null) customBox,
              const SizedBox(height: 14),
            ],
          ),
        ),
      ],
    );
  }
}
