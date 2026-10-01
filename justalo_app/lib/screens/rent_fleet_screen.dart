import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../services/api_service.dart';

class RentFleetScreen extends StatefulWidget {
  const RentFleetScreen({super.key});

  @override
  State<RentFleetScreen> createState() => _RentFleetScreenState();
}

class _RentFleetScreenState extends State<RentFleetScreen> {
  // Navigation level: 'landing', 'category', 'details'
  String activeView = 'landing';
  String selectedCategoryTitle = 'Wedding & Vintage Cars';

  // Selected Vehicle State for Details View
  Map<String, dynamic> selectedVehicle = {
    'title': 'Vintage Rolls Royce Silver Cloud',
    'subtitle': 'White Ivory & Royal Chrome Finishing',
    'rating': '4.9',
    'reviews': '142',
    'price': 16000,
    'vendor': 'Bagdi Luxury Rentals',
    'vendorTag': 'Super Vendor - Nagpur Region',
    'imageUrl': 'assets/vehicle_rolls_royce.jpg',
  };

  // Details Package & Addon State
  String selectedPackage = 'Full Day Wedding Package';
  double packagePrice = 16000;
  bool addBonnetDecor = true; // +1500
  bool addRedCarpet = true;  // +800
  bool addExtraMileage = false; // +1200

  double get estimatedTotal {
    double total = packagePrice;
    if (addBonnetDecor) total += 1500;
    if (addRedCarpet) total += 800;
    if (addExtraMileage) total += 1200;
    return total;
  }

  // Vehicles Data per Category
  final List<Map<String, dynamic>> weddingCars = [
    {
      'title': 'Vintage Rolls Royce Silver Cloud',
      'subtitle': 'White Ivory & Royal Chrome Finishing',
      'badge': 'Most Popular for Groom Entry',
      'badgeColor': AppTheme.accentRed,
      'rating': '4.9',
      'reviews': '140+ weddings',
      'seats': '4 Seats',
      'price': '₹ 12,000',
      'priceNum': 16000.0,
      'unit': '/ day',
      'note': '+ Fuel & Toll included upto 80km',
      'greenTag': 'Floral Decor Included',
      'imageUrl': 'assets/vehicle_rolls_royce.jpg',
      'vendor': 'Bagdi Luxury Rentals',
    },
    {
      'title': 'Mercedes-Benz E-Class Luxury',
      'subtitle': 'Obsidian Black with Ambient Interior Lighting',
      'badge': 'Executive & Bridal',
      'badgeColor': AppTheme.primaryTeal,
      'rating': '4.8',
      'reviews': '98 bookings',
      'seats': '4 Seats',
      'price': '₹ 9,500',
      'priceNum': 9500.0,
      'unit': '/ day',
      'note': 'Flexible 12hr slot - Driver allowance included',
      'greenTag': 'Sanitized',
      'imageUrl': 'assets/vehicle_mercedes.jpg',
      'vendor': 'Star Fleet Agency',
    },
    {
      'title': 'Open Top Vintage Convertible',
      'subtitle': 'Ruby Red & Cream Two-Tone Classic',
      'badge': 'Baraat Grand Entry',
      'badgeColor': AppTheme.accentRed,
      'rating': '5.0',
      'reviews': '52 bookings',
      'seats': '2+2 Seats',
      'price': '₹ 15,000',
      'priceNum': 15000.0,
      'unit': '/ day',
      'note': 'Includes driver in traditional royal attire',
      'greenTag': 'PA Speaker Ready',
      'imageUrl': 'assets/vehicle_convertible.jpg',
      'vendor': 'Royal Malwa Heritage Fleet',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      appBar: AppBar(
        titleSpacing: 0,
        leading: activeView != 'landing'
            ? IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: () {
                  setState(() {
                    if (activeView == 'details') {
                      activeView = 'category';
                    } else {
                      activeView = 'landing';
                    }
                  });
                },
              )
            : null,
        title: Row(
          children: [
            const JustaloLogo(height: 34),
            const SizedBox(width: 8),
            Text(
              activeView == 'landing'
                  ? 'Rent Vehicles'
                  : activeView == 'category'
                      ? selectedCategoryTitle
                      : 'Vehicle Details',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(Icons.search), onPressed: () {}),
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
      body: activeView == 'landing'
          ? _buildLandingView()
          : activeView == 'category'
              ? _buildCategoryListingView()
              : _buildVehicleDetailsView(),
    );
  }

  // --- VIEW 1: RENT VEHICLES LANDING HUB (Image 2: media_1790578923866.png) ---
  Widget _buildLandingView() {
    return SingleChildScrollView(
      padding: const EdgeInsets.only(left: 16.0, right: 16.0, top: 10.0, bottom: 30.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Special Occasion Banner Box
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [Color(0xFFE0F7FA), Color(0xFFE0F2F1)]),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppTheme.primaryTeal.withOpacity(0.3)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.explore, size: 12, color: AppTheme.primaryDark),
                            SizedBox(width: 4),
                            Text('Ab Safar Mein, No Sufferings', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                          ],
                        ),
                      ),
                      const SizedBox(height: 6),
                      const Text('Special Occasion &\nCommercial Rentals', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, height: 1.1)),
                      const SizedBox(height: 4),
                      const Text('Cars, Baraat Buses, Luxury Fleets & Goods Carriers tailored for MP & Maharashtra trips.', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                    ],
                  ),
                ),
                const Icon(Icons.directions_bus_outlined, size: 48, color: AppTheme.primaryTeal),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Search Form Card with Segmented Tabs
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: Column(
              children: [
                // Segmented Tabs
                Container(
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                  child: Row(
                    children: [
                      Expanded(child: _buildSegmentTab('Hourly / Local', false)),
                      Expanded(child: _buildSegmentTab('Outstation', false)),
                      Expanded(child: _buildSegmentTab('Wedding Pkg', true)),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // Pickup Location
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                  child: const Row(
                    children: [
                      Icon(Icons.near_me, color: AppTheme.primaryTeal, size: 20),
                      SizedBox(width: 10),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('PICKUP LOCATION', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                          Text('Sitabuldi, Nagpur (Wardha Rd)', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),

                // Dates & Duration Row
                Row(
                  children: [
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                        decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('RENTAL DATES', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                            Text('24 - 25 May', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                        decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('DURATION', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                            Text('2 Full Days', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),

                // Search CTA Button
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: ElevatedButton.icon(
                    onPressed: () {
                      setState(() {
                        activeView = 'category';
                        selectedCategoryTitle = 'Wedding & Vintage Cars';
                      });
                    },
                    icon: const Icon(Icons.search),
                    label: const Text('Search Available Fleets', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Trust Badges Bar
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildTrustItem(Icons.verified_user_outlined, 'Verified Drivers'),
              _buildTrustItem(Icons.timer_outlined, '100% On-Time'),
              _buildTrustItem(Icons.event_available_outlined, '24h Free Cancel'),
              _buildTrustItem(Icons.account_balance_wallet_outlined, 'Zero Hidden Tolls'),
            ],
          ),
          const SizedBox(height: 24),

          // Explore Rental Categories
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Explore Rental Categories', style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold)),
                  Text('Selected vehicles for celebrations, trips & transport', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.12), borderRadius: BorderRadius.circular(8)),
                child: const Text('4 CATEGORIES', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // 2x2 Categories Grid
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 0.9,
            children: [
              _buildCategoryCard('Wedding & Vintage Cars', 'Classic Rolls Royce, Jag...', 'From ₹9,999/day', 'Luxury', 'assets/vehicle_rolls_royce.jpg'),
              _buildCategoryCard('Buses for Weddings & Baraat', 'AC Coaches, Pushback...', 'From ₹18,000/day', '25-50 Seats', 'assets/vehicle_volvo_bus.jpg'),
              _buildCategoryCard('Cars & Buses for Tours', 'Innova, Crysta & Urbania', 'From ₹3,500/day', '7-17 Seats', 'assets/vehicle_tempo_traveller.jpg'),
              _buildCategoryCard('Mini-Trucks for Goods', 'Tata Ace, Bolero Maxx...', 'From ₹1,200/trip', 'Luggage/Cargo', 'assets/vehicle_mercedes.jpg'),
            ],
          ),
          const SizedBox(height: 24),

          // Featured Premium Fleet Section
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Featured Premium Fleet', style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold)),
                  Text('Curated top-tier rides with verified chauffeurs', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                ],
              ),
              TextButton(onPressed: () {}, child: const Text('View All >', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryTeal))),
            ],
          ),
          const SizedBox(height: 12),

          _buildFeaturedCard(weddingCars[0]),
          const SizedBox(height: 12),
          _buildFeaturedCard({
            'title': 'Force Urbania Luxury Van',
            'subtitle': 'Family & VIP Tourer - Individual Recliners',
            'rating': '4.8',
            'price': '₹ 7,500',
            'unit': '/ day',
            'pills': ['12 Seater', 'Luggage Deck', 'USB Charger'],
            'imageUrl': 'assets/vehicle_tempo_traveller.jpg',
          }),
          const SizedBox(height: 12),
          _buildFeaturedCard({
            'title': 'BharatBenz AC Coach',
            'subtitle': 'Baraat & Corporate - Air Suspension',
            'rating': '4.7',
            'price': '₹ 22,000',
            'unit': '/ day',
            'pills': ['45 Seater', 'Dual AC', 'Mic & Audio'],
            'imageUrl': 'assets/vehicle_volvo_bus.jpg',
          }),

          const SizedBox(height: 20),

          // Bottom Custom Quote Banner
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(16)),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: const BoxDecoration(color: AppTheme.primaryDark, shape: BoxShape.circle),
                  child: const Icon(Icons.headset_mic_outlined, color: Colors.white, size: 20),
                ),
                const SizedBox(width: 12),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Need a Custom Fleet Quote?', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                      Text('Baraat coordination, multicity logistics', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                    ],
                  ),
                ),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.white, foregroundColor: AppTheme.inkBlack),
                  child: const Text('Call Team', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // --- VIEW 2: CATEGORY VEHICLE LISTING (Image 3: media_1790578992681.png) ---
  Widget _buildCategoryListingView() {
    return Stack(
      children: [
        SingleChildScrollView(
          padding: const EdgeInsets.only(left: 16.0, right: 16.0, top: 10.0, bottom: 80.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header Subtitle & Filter Pills
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(selectedCategoryTitle, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(color: AppTheme.successGreen.withOpacity(0.15), borderRadius: BorderRadius.circular(8)),
                            child: const Text('Verified', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                          ),
                        ],
                      ),
                      const Text('Nagpur - 24 May - 25 May (2 Days)', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                    ],
                  ),
                  OutlinedButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.tune, size: 14, color: AppTheme.inkBlack),
                    label: const Text('Filter', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                    style: OutlinedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), minimumSize: Size.zero),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Filter Chips Row
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildListingFilterChip('All (14)', true),
                    const SizedBox(width: 6),
                    _buildListingFilterChip('Vintage', false, icon: Icons.stars),
                    const SizedBox(width: 6),
                    _buildListingFilterChip('Luxury Sedan', false, icon: Icons.directions_car),
                    const SizedBox(width: 6),
                    _buildListingFilterChip('SUV', false, icon: Icons.airport_shuttle),
                  ],
                ),
              ),
              const SizedBox(height: 14),

              // Special Season Offer Banner
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.12), borderRadius: BorderRadius.circular(14)),
                child: const Row(
                  children: [
                    Icon(Icons.campaign_outlined, color: AppTheme.primaryDark, size: 22),
                    SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Wedding Season Special', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                          Text('Complimentary red carpet & ribbon setup on all wedding packages.', style: TextStyle(fontSize: 10, color: AppTheme.inkBlack)),
                        ],
                      ),
                    ),
                    Text('FREE DECOR', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.accentRed)),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Vehicle List Cards
              Column(
                children: weddingCars.map((v) => _buildCategoryVehicleCard(v)).toList(),
              ),

              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: AppTheme.successGreen.withOpacity(0.1), borderRadius: BorderRadius.circular(14)),
                child: const Row(
                  children: [
                    Icon(Icons.verified_user_outlined, color: AppTheme.successGreen, size: 20),
                    SizedBox(width: 8),
                    Expanded(
                      child: Text('JUSTALO Assured Rentals: Punctuality guaranteed or 100% refund. Replacement ready on standby.', style: TextStyle(fontSize: 10, color: AppTheme.primaryDark, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),

        // Floating Bottom Pill Bar
        Positioned(
          left: 20,
          right: 20,
          bottom: 16,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: AppTheme.inkBlack,
              borderRadius: BorderRadius.circular(30),
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.2), blurRadius: 10)],
            ),
            child: const Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(Icons.circle, size: 8, color: AppTheme.successGreen),
                    SizedBox(width: 8),
                    Text('Showing 14 vehicles available in Nagpur', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                  ],
                ),
                Text('Modify ^', style: TextStyle(color: AppTheme.primaryTeal, fontSize: 11, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
        ),
      ],
    );
  }

  // --- VIEW 3: VEHICLE DETAILS & CUSTOM BOOKING SHEET (Image 4: media_1790579010312.png) ---
  Widget _buildVehicleDetailsView() {
    return Stack(
      children: [
        SingleChildScrollView(
          padding: const EdgeInsets.only(left: 16.0, right: 16.0, top: 10.0, bottom: 90.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Hero Image Box & Thumbnails
              Stack(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(20),
                    child: Container(
                      height: 200,
                      width: double.infinity,
                      color: AppTheme.surfaceContainerHigh,
                      child: _buildVehicleImage(selectedVehicle['imageUrl'], height: 200, width: double.infinity, fit: BoxFit.cover),
                    ),
                  ),
                  Positioned(
                    top: 12,
                    left: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(color: Colors.black.withOpacity(0.7), borderRadius: BorderRadius.circular(12)),
                      child: const Row(
                        children: [
                          Icon(Icons.stars, color: Colors.amber, size: 14),
                          SizedBox(width: 4),
                          Text('WEDDING FAVORITE', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 12,
                    right: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(color: Colors.black.withOpacity(0.7), borderRadius: BorderRadius.circular(10)),
                      child: const Text('1 / 5 Photos', style: TextStyle(color: Colors.white, fontSize: 10)),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Title & Rating Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('VERIFIED CLASSIC FLEET', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.primaryTeal, letterSpacing: 0.5)),
                        Text(selectedVehicle['title'], style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
                        Text(selectedVehicle['subtitle'] ?? '1965 Heritage Series - Nagpur Hub', style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
                    child: const Row(
                      children: [
                        Icon(Icons.star, size: 14, color: Colors.amber),
                        SizedBox(width: 4),
                        Text('4.9 (142)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),

              // Vendor Info Card
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: Colors.grey.shade200)),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), shape: BoxShape.circle),
                          child: const Icon(Icons.business, color: AppTheme.primaryDark, size: 20),
                        ),
                        const SizedBox(width: 10),
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Text('Bagdi Luxury Rentals', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                                SizedBox(width: 4),
                                Icon(Icons.verified, size: 14, color: AppTheme.primaryTeal),
                              ],
                            ),
                            Text('Super Vendor - Nagpur Region', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                          ],
                        ),
                      ],
                    ),
                    OutlinedButton(
                      onPressed: () {},
                      style: OutlinedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), minimumSize: Size.zero),
                      child: const Text('Profile', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),

              // Specs Grid 2x2
              Row(
                children: [
                  Expanded(child: _buildSpecTile('CAPACITY', '4 Passengers', Icons.group_outlined)),
                  const SizedBox(width: 8),
                  Expanded(child: _buildSpecTile('SERVICE', 'Uniformed Chauffeur', Icons.badge_outlined)),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(child: _buildSpecTile('CLIMATE', 'Vintage AC', Icons.ac_unit)),
                  const SizedBox(width: 8),
                  Expanded(child: _buildSpecTile('ALLOWANCE', '80 km / 8 hr', Icons.speed)),
                ],
              ),
              const SizedBox(height: 20),

              // Select Event Package Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Select Event Package', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  const Text('Tap to customize', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                ],
              ),
              const SizedBox(height: 10),

              _buildPackageOption('Groom Baraat Entry', '4 Hours - 40 km limit - Baraat slow-crawl ready', 8000),
              const SizedBox(height: 8),
              _buildPackageOption('Full Day Wedding Package', '12 Hours - 100 km included - Photography halts allowed', 16000, badge: 'Most Popular'),
              const SizedBox(height: 8),
              _buildPackageOption('Multi-Day Celebration', '2 Consecutive Days - 220 km - Sangeet & Reception', 28000),
              const SizedBox(height: 20),

              // Curated Add-ons Section
              const Text('Curated Wedding Add-Ons', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              const Text('Prepared directly by florist & event crew', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
              const SizedBox(height: 10),

              _buildAddonCheckbox('Fresh Rose & Orchid Bonnet Decor', 'Handcrafted garland with side mirror accents', 1500, addBonnetDecor, (v) => setState(() => addBonnetDecor = v ?? false)),
              const SizedBox(height: 8),
              _buildAddonCheckbox('Red Carpet Arrival Setup', '25 ft luxury royal aisle runner at venue step-down', 800, addRedCarpet, (v) => setState(() => addRedCarpet = v ?? false)),
              const SizedBox(height: 8),
              _buildAddonCheckbox('Extra Mileage Priority Tier', 'Prepaid 20 km overflow protection (+₹60/km after)', 1200, addExtraMileage, (v) => setState(() => addExtraMileage = v ?? false)),
              const SizedBox(height: 20),

              // Standard Inclusions & Policies
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.grey.shade200)),
                child: const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Standard Inclusions & Policies', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                    SizedBox(height: 10),
                    Row(
                      children: [
                        Icon(Icons.check_circle_outline, size: 16, color: AppTheme.successGreen),
                        SizedBox(width: 8),
                        Text('Fuel & Lubricants Included', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    SizedBox(height: 6),
                    Row(
                      children: [
                        Icon(Icons.check_circle_outline, size: 16, color: AppTheme.successGreen),
                        SizedBox(width: 8),
                        Text('Certified Master Chauffeur', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    SizedBox(height: 6),
                    Row(
                      children: [
                        Icon(Icons.info_outline, size: 16, color: AppTheme.primaryTeal),
                        SizedBox(width: 8),
                        Text('Toll, State Taxes & Parking', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),

              // Garage Base Info
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(14)),
                child: const Row(
                  children: [
                    Icon(Icons.storefront_outlined, color: AppTheme.primaryTeal, size: 20),
                    SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Garage Base: Civil Lines, Nagpur', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                          Text('Dispatched 60 mins before reporting time', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                        ],
                      ),
                    ),
                    Text('Active', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                  ],
                ),
              ),
            ],
          ),
        ),

        // Sticky Bottom Bar
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
                    Text('₹${estimatedTotal.toInt()}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: AppTheme.inkBlack)),
                    const Text('Incl. Decor, Chauffeur & GST', style: TextStyle(fontSize: 9, color: AppTheme.successGreen, fontWeight: FontWeight.bold)),
                  ],
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: SizedBox(
                    height: 48,
                    child: ElevatedButton(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Fleet Quotation generated for ${selectedVehicle['title']} (₹${estimatedTotal.toInt()})! Partner will connect.'),
                            backgroundColor: AppTheme.successGreen,
                          ),
                        );
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text('Proceed to Quotation', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                          SizedBox(width: 6),
                          Icon(Icons.arrow_forward, size: 16),
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

  // --- HELPER WIDGETS ---
  Widget _buildSegmentTab(String title, bool isSel) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8),
      decoration: BoxDecoration(
        color: isSel ? Colors.white : Colors.transparent,
        borderRadius: BorderRadius.circular(10),
        boxShadow: isSel ? [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4)] : null,
      ),
      child: Center(
        child: Text(
          title,
          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isSel ? AppTheme.primaryTeal : AppTheme.textMuted),
        ),
      ),
    );
  }

  Widget _buildTrustItem(IconData icon, String label) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.12), shape: BoxShape.circle),
          child: Icon(icon, color: AppTheme.primaryTeal, size: 18),
        ),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
      ],
    );
  }

  Widget _buildCategoryCard(String title, String desc, String price, String tag, String imgUrl) {
    return InkWell(
      onTap: () {
        setState(() {
          activeView = 'category';
          selectedCategoryTitle = title;
        });
      },
      borderRadius: BorderRadius.circular(16),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.grey.shade200),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 6)],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Stack(
              children: [
                ClipRRect(
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
                  child: _buildVehicleImage(imgUrl, height: 95, width: double.infinity, fit: BoxFit.cover),
                ),
                Positioned(
                  top: 6,
                  left: 6,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(color: Colors.black.withOpacity(0.7), borderRadius: BorderRadius.circular(8)),
                    child: Text(tag, style: const TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold), maxLines: 1, overflow: TextOverflow.ellipsis),
                  Text(desc, style: const TextStyle(fontSize: 9, color: AppTheme.textMuted), maxLines: 1, overflow: TextOverflow.ellipsis),
                  const SizedBox(height: 4),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(price, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.primaryTeal)),
                      const Icon(Icons.arrow_forward_ios, size: 10, color: AppTheme.primaryTeal),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFeaturedCard(Map<String, dynamic> v) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.grey.shade200)),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: _buildVehicleImage(v['imageUrl'], height: 85, width: 85, fit: BoxFit.cover),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(child: Text(v['title'], style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold), maxLines: 1, overflow: TextOverflow.ellipsis)),
                    Row(
                      children: [
                        const Icon(Icons.star, size: 12, color: Colors.amber),
                        const SizedBox(width: 2),
                        Text(v['rating'], style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ],
                ),
                Text(v['subtitle'] ?? '', style: const TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                const SizedBox(height: 6),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('${v['price']} ${v['unit'] ?? ''}', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w900, color: AppTheme.inkBlack)),
                    ElevatedButton(
                      onPressed: () {
                        setState(() {
                          selectedVehicle = v;
                          activeView = 'details';
                        });
                      },
                      style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), minimumSize: Size.zero),
                      child: const Text('Book Now', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
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

  Widget _buildListingFilterChip(String label, bool isSel, {IconData? icon}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: isSel ? AppTheme.primaryTeal : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isSel ? AppTheme.primaryTeal : Colors.grey.shade300),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 12, color: isSel ? Colors.white : AppTheme.inkBlack),
            const SizedBox(width: 4),
          ],
          Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isSel ? Colors.white : AppTheme.inkBlack)),
        ],
      ),
    );
  }

  Widget _buildCategoryVehicleCard(Map<String, dynamic> v) {
    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
                child: _buildVehicleImage(v['imageUrl'], height: 160, width: double.infinity, fit: BoxFit.cover),
              ),
              Positioned(
                top: 10,
                left: 10,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(color: v['badgeColor'] ?? AppTheme.accentRed, borderRadius: BorderRadius.circular(10)),
                  child: Text(v['badge'], style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
                ),
              ),
              Positioned(
                bottom: 10,
                right: 10,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(color: Colors.white.withOpacity(0.9), borderRadius: BorderRadius.circular(10)),
                  child: Row(
                    children: [
                      const Icon(Icons.star, size: 12, color: Colors.amber),
                      const SizedBox(width: 4),
                      Text('${v['rating']} (${v['reviews']})', style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(v['title'], style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                Text(v['subtitle'], style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(8)),
                      child: Text(v['seats'], style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
                    ),
                    const SizedBox(width: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(color: AppTheme.successGreen.withOpacity(0.12), borderRadius: BorderRadius.circular(8)),
                      child: Text(v['greenTag'], style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
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
                        Text('${v['price']} ${v['unit']}', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: AppTheme.inkBlack)),
                        Text(v['note'], style: const TextStyle(fontSize: 9, color: AppTheme.textMuted)),
                      ],
                    ),
                    ElevatedButton(
                      onPressed: () {
                        setState(() {
                          selectedVehicle = v;
                          activeView = 'details';
                        });
                      },
                      child: const Text('Book Now  to ', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
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

  Widget _buildSpecTile(String title, String val, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
      child: Row(
        children: [
          Icon(icon, color: AppTheme.primaryTeal, size: 20),
          const SizedBox(width: 8),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontSize: 8, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
              Text(val, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPackageOption(String title, String desc, double price, {String? badge}) {
    final isSel = selectedPackage == title;
    return InkWell(
      onTap: () {
        setState(() {
          selectedPackage = title;
          packagePrice = price;
        });
      },
      borderRadius: BorderRadius.circular(14),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isSel ? AppTheme.primaryTeal.withOpacity(0.08) : Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: isSel ? AppTheme.primaryTeal : Colors.grey.shade300, width: isSel ? 1.5 : 1),
        ),
        child: Row(
          children: [
            Radio<String>(
              value: title,
              groupValue: selectedPackage,
              activeColor: AppTheme.primaryTeal,
              onChanged: (val) {
                if (val != null) {
                  setState(() {
                    selectedPackage = val;
                    packagePrice = price;
                  });
                }
              },
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                      if (badge != null) ...[
                        const SizedBox(width: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                          decoration: BoxDecoration(color: AppTheme.primaryTeal, borderRadius: BorderRadius.circular(6)),
                          child: Text(badge, style: const TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ],
                  ),
                  Text(desc, style: const TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                ],
              ),
            ),
            Text('₹${price.toInt()}', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: isSel ? AppTheme.primaryTeal : AppTheme.inkBlack)),
          ],
        ),
      ),
    );
  }

  Widget _buildAddonCheckbox(String title, String desc, double price, bool val, ValueChanged<bool?> onChanged) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: Colors.grey.shade200)),
      child: Row(
        children: [
          Checkbox(
            value: val,
            activeColor: AppTheme.primaryTeal,
            onChanged: onChanged,
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                Text(desc, style: const TextStyle(fontSize: 10, color: AppTheme.textMuted)),
              ],
            ),
          ),
          Text('+ ₹${price.toInt()}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.primaryTeal)),
        ],
      ),
    );
  }

  Widget _buildVehicleImage(String imgUrl, {double? height, double? width, BoxFit fit = BoxFit.cover}) {
    if (imgUrl.startsWith('assets/')) {
      return Image.asset(
        imgUrl,
        height: height,
        width: width,
        fit: fit,
        errorBuilder: (_, __, ___) => Container(
          height: height,
          width: width,
          color: AppTheme.surfaceContainerHigh,
          child: const Icon(Icons.directions_car, color: AppTheme.primaryTeal),
        ),
      );
    } else {
      return Image.network(
        imgUrl,
        height: height,
        width: width,
        fit: fit,
        errorBuilder: (_, __, ___) => Image.asset(
          'assets/vehicle_rolls_royce.jpg',
          height: height,
          width: width,
          fit: fit,
          errorBuilder: (_, __, ___) => Container(
            height: height,
            width: width,
            color: AppTheme.surfaceContainerHigh,
          ),
        ),
      );
    }
  }

}
