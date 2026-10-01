import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'city_selection_screen.dart';

class HomeSearchScreen extends StatefulWidget {
  const HomeSearchScreen({super.key});

  @override
  State<HomeSearchScreen> createState() => _HomeSearchScreenState();
}

class _HomeSearchScreenState extends State<HomeSearchScreen> {
  int _currentIndex = 0;
  String currentCity = 'Indore';
  TextEditingController originController = TextEditingController(text: 'Indore Junction / AICTSL');
  TextEditingController destController = TextEditingController(text: 'Bhopal ISBT / Nadra');
  String selectedDate = 'Today';

  void _swapLocations() {
    setState(() {
      final temp = originController.text;
      originController.text = destController.text;
      destController.text = temp;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      appBar: AppBar(
        titleSpacing: 16,
        title: Row(
          children: [
            const JustaloLogo(height: 34),
            const SizedBox(width: 8),
            GestureDetector(
              onTap: () async {
                final res = await Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => CitySelectionScreen(currentCity: currentCity)),
                );
                if (res != null) setState(() => currentCity = res);
              },
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceContainerLow,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: Colors.grey.shade300),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.location_on, size: 14, color: AppTheme.primaryTeal),
                    const SizedBox(width: 4),
                    Text(currentCity, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                    const Icon(Icons.arrow_drop_down, size: 16, color: AppTheme.textMuted),
                  ],
                ),
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Stack(
              children: [
                const Icon(Icons.notifications_none, size: 24),
                Positioned(
                  right: 2,
                  top: 2,
                  child: Container(width: 8, height: 8, decoration: const BoxDecoration(color: AppTheme.accentRed, shape: BoxShape.circle)),
                ),
              ],
            ),
            onPressed: () => AppTheme.showNotificationsSheet(context),
          ),
          Padding(
            padding: const EdgeInsets.only(right: 16.0),
            child: InkWell(
              onTap: () => AppTheme.showAccountProfileSheet(context),
              borderRadius: BorderRadius.circular(20),
              child: const CircleAvatar(
                radius: 16,
                backgroundColor: AppTheme.surfaceContainerHigh,
                child: Icon(Icons.person, size: 18, color: AppTheme.inkBlack),
              ),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // City Auto-Detected Status Bar
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: const Color(0xFFF9F6F5),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), shape: BoxShape.circle),
                        child: const Icon(Icons.near_me, size: 16, color: AppTheme.primaryTeal),
                      ),
                      const SizedBox(width: 10),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(currentCity, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900)),
                              const SizedBox(width: 6),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.15), borderRadius: BorderRadius.circular(8)),
                                child: const Text('AUTO-DETECTED', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                              ),
                            ],
                          ),
                          const Text('AICTSL Hub, Geeta Bhawan Square', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                        ],
                      ),
                    ],
                  ),
                  OutlinedButton(
                    onPressed: () async {
                      final res = await Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => CitySelectionScreen(currentCity: currentCity)),
                      );
                      if (res != null) setState(() => currentCity = res);
                    },
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      minimumSize: Size.zero,
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('Switch', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                        SizedBox(width: 2),
                        Icon(Icons.unfold_more, size: 14, color: AppTheme.textMuted),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Tri-Service Options Grid
            Row(
              children: [
                Expanded(
                  child: _buildServiceCard(
                    title: 'Book Ticket',
                    subtitle: 'AC / Sleeper',
                    icon: Icons.directions_bus_outlined,
                    isPopular: true,
                    onTap: () {},
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _buildServiceCard(
                    title: 'Rent Fleet',
                    subtitle: 'Wedding & Tour',
                    icon: Icons.airport_shuttle_outlined,
                    onTap: () => Navigator.pushNamed(context, '/rent'),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _buildServiceCard(
                    title: 'Parcel Express',
                    subtitle: 'Fast Intra-State',
                    icon: Icons.local_shipping_outlined,
                    onTap: () => Navigator.pushNamed(context, '/parcel'),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Core Search Widget Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10, offset: const Offset(0, 3))],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Stack(
                    children: [
                      Column(
                        children: [
                          // Leaving From
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                            decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(14)),
                            child: Row(
                              children: [
                                const Icon(Icons.circle, size: 10, color: AppTheme.primaryTeal),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      const Text('LEAVING FROM', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted, letterSpacing: 0.5)),
                                      TextField(
                                        controller: originController,
                                        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900),
                                        decoration: const InputDecoration(isDense: true, border: InputBorder.none, contentPadding: EdgeInsets.zero),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 8),
                          // Going To
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                            decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(14)),
                            child: Row(
                              children: [
                                const Icon(Icons.circle, size: 10, color: AppTheme.accentRed),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      const Text('GOING TO', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted, letterSpacing: 0.5)),
                                      TextField(
                                        controller: destController,
                                        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900),
                                        decoration: const InputDecoration(isDense: true, border: InputBorder.none, contentPadding: EdgeInsets.zero),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      Positioned(
                        right: 12,
                        top: 26,
                        child: InkWell(
                          onTap: _swapLocations,
                          child: Container(
                            width: 34,
                            height: 34,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              shape: BoxShape.circle,
                              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 6)],
                            ),
                            child: const Icon(Icons.swap_vert, color: AppTheme.primaryTeal, size: 20),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // Quick Add Chips
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        const Text('Quick Add:', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                        const SizedBox(width: 6),
                        _buildQuickChip('Ujjain Mahakal', () => destController.text = 'Ujjain Mahakal'),
                        const SizedBox(width: 6),
                        _buildQuickChip('Dewas Bypass', () => destController.text = 'Dewas Bypass'),
                        const SizedBox(width: 6),
                        _buildQuickChip('Omkareshwar', () => destController.text = 'Omkareshwar'),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),

                  // Journey Date Selector Row
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(14)),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Row(
                          children: [
                            Icon(Icons.calendar_today_outlined, color: AppTheme.primaryTeal, size: 20),
                            SizedBox(width: 10),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Journey Date', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                                Text('24 Oct, Thu', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900)),
                              ],
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            InkWell(
                              onTap: () => setState(() => selectedDate = 'Today'),
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                decoration: BoxDecoration(
                                  color: selectedDate == 'Today' ? AppTheme.primaryTeal : Colors.white,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text('Today', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: selectedDate == 'Today' ? Colors.white : AppTheme.inkBlack)),
                              ),
                            ),
                            const SizedBox(width: 6),
                            InkWell(
                              onTap: () => setState(() => selectedDate = 'Tomorrow'),
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                decoration: BoxDecoration(
                                  color: selectedDate == 'Tomorrow' ? AppTheme.primaryTeal : Colors.white,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text('Tomorrow', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: selectedDate == 'Tomorrow' ? Colors.white : AppTheme.inkBlack)),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Search CTA Button
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton.icon(
                      onPressed: () {
                        Navigator.pushNamed(
                          context,
                          '/search',
                          arguments: {
                            'from': originController.text,
                            'to': destController.text,
                            'date': selectedDate == 'Today' ? 'Wed, 24 Oct' : 'Thu, 25 Oct',
                          },
                        );
                      },
                      icon: const Icon(Icons.search, size: 22),
                      label: const Text('Search Buses', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    ),
                  ),
                  const SizedBox(height: 14),

                  // Trust Badges
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.verified_outlined, size: 14, color: AppTheme.successGreen),
                          SizedBox(width: 4),
                          Text('Free Cancellation', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                        ],
                      ),
                      Row(
                        children: [
                          Icon(Icons.location_on_outlined, size: 14, color: AppTheme.primaryTeal),
                          SizedBox(width: 4),
                          Text('Real-time GPS Tracking', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                        ],
                      ),
                      Row(
                        children: [
                          Icon(Icons.bolt, size: 14, color: AppTheme.accentRed),
                          SizedBox(width: 4),
                          Text('Instant M-Ticket', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Festive Deals Banner
            const Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(Icons.celebration, color: AppTheme.accentRed, size: 20),
                    SizedBox(width: 6),
                    Text('Festive Deals & Offers', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  ],
                ),
                Text('1 of 3', style: TextStyle(fontSize: 11, color: AppTheme.primaryTeal, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 10),
            Container(
              height: 155,
              width: double.infinity,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4))],
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Stack(
                  children: [
                    Image.network(
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ_EFOckoi9ssxl85JechGN8gwCATfxEr-befeW0-LMv_vwjStc1DMr93mY18JDE71wlTHU4XfxNUuJmOtDOLj0U2tUtpt-LVSRiRwwwp2Hpv8hVHnZ7_tnuyTk37X88gH5KzlsFMfsZ7JY2R0B3ZxWBSfLr6-DWU5Q-Db4fckwLTnbpaHeB4BeieeYanjQYItiaI5M_sN7z_7dNZemIGIIagNJ76LPS7o5Rk6TCkUbt-gMQ594vn20w',
                      fit: BoxFit.cover,
                      width: double.infinity,
                      height: double.infinity,
                      errorBuilder: (_, __, ___) => Container(color: const Color(0xFF00363A)),
                    ),
                    // High Contrast Gradient Overlay
                    Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.centerLeft,
                          end: Alignment.centerRight,
                          colors: [
                            Colors.black.withOpacity(0.9),
                            Colors.black.withOpacity(0.6),
                            Colors.transparent,
                          ],
                        ),
                      ),
                    ),
                    // Banner Content Body
                    Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(color: AppTheme.accentRed, borderRadius: BorderRadius.circular(12)),
                                child: const Text('FESTIVE SPECIAL', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w900)),
                              ),
                              const SizedBox(width: 6),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(color: Colors.white.withOpacity(0.25), borderRadius: BorderRadius.circular(12)),
                                child: const Text('Limited', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                              ),
                            ],
                          ),
                          const Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '20% OFF on Indore-Bhopal\nExpress',
                                style: TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.w900, height: 1.1),
                              ),
                              SizedBox(height: 3),
                              Text('Applicable on morning & night Volvo AC...', style: TextStyle(color: Colors.white70, fontSize: 10)),
                            ],
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                decoration: BoxDecoration(color: Colors.black.withOpacity(0.5), borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.white24)),
                                child: const Row(
                                  children: [
                                    Icon(Icons.local_offer, color: AppTheme.primaryTeal, size: 14),
                                    SizedBox(width: 4),
                                    Text('JUSTFEST', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 11, letterSpacing: 0.5)),
                                  ],
                                ),
                              ),
                              InkWell(
                                onTap: () {},
                                borderRadius: BorderRadius.circular(20),
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                                  decoration: BoxDecoration(color: AppTheme.primaryTeal, borderRadius: BorderRadius.circular(20)),
                                  child: const Row(
                                    children: [
                                      Text('Apply Now', style: TextStyle(color: AppTheme.inkBlack, fontWeight: FontWeight.w900, fontSize: 12)),
                                      SizedBox(width: 4),
                                      Icon(Icons.arrow_forward, size: 14, color: AppTheme.inkBlack),
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
              ),
            ),
            const SizedBox(height: 24),

            // Daily Routine Commutes Section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.autorenew, color: AppTheme.primaryTeal, size: 20),
                        SizedBox(width: 6),
                        Text('Daily Routine Commutes', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    Text('Frequent corridor shuttles with no advance booking fee', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                  ],
                ),
                TextButton(
                  onPressed: () {},
                  child: const Text('View All', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryTeal)),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Commute Cards
            _buildCommuteCard('Indore ⇄ Dewas', 'Active', 'Bhanwarkuan - Radisson - Dewas ...', 'Every 20 mins', 'AC Shuttles', '₹45', const Color(0xFF00C2CB)),
            const SizedBox(height: 10),
            _buildCommuteCard('Indore ⇄ Pithampur', 'Industrial', 'Rajwada - Silicon City - Sector 1-3', 'Every 15 mins', 'EV Express', '₹60', const Color(0xFFFE1617)),
            const SizedBox(height: 10),
            _buildCommuteCard('Indore ⇄ Mhow (Dr. Ambedkar)', 'MIL', 'Sarwate Bus Stand - Rau - Army C...', 'Every 30 mins', 'Direct Highway', '₹35', Colors.grey),
            const SizedBox(height: 24),

            // Brand Guarantee Box
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
                          JustaloLogo(height: 34),
                          SizedBox(width: 8),
                          Text('100% Live Ops', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(color: AppTheme.successGreen.withOpacity(0.12), borderRadius: BorderRadius.circular(12)),
                        child: const Text('100% Live Ops', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text('"Ab Safar Mein, No Sufferings"', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
                  const SizedBox(height: 4),
                  const Text('Guaranteed departure schedules, clean sanitized berths, zero surge pricing on daily shuttles, and 24×7 on-ground assistance at all MP transit terminals.', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                  const SizedBox(height: 14),
                  Row(
                    children: [
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                          child: const Row(
                            children: [
                              Icon(Icons.support_agent, color: AppTheme.primaryTeal, size: 20),
                              SizedBox(width: 8),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('24×7 SOS Help', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                  Text('Tap for immediate desk', style: TextStyle(fontSize: 9, color: AppTheme.textMuted)),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
                          child: const Row(
                            children: [
                              Icon(Icons.radar, color: AppTheme.primaryTeal, size: 20),
                              SizedBox(width: 8),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('Live Bus Radar', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                  Text('Precise GPS sync', style: TextStyle(fontSize: 9, color: AppTheme.textMuted)),
                                ],
                              ),
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
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (i) {
          setState(() => _currentIndex = i);
          if (i == 1) Navigator.pushNamed(context, '/eticket');
          if (i == 2) Navigator.pushNamed(context, '/tracking');
          if (i == 3) Navigator.pushNamed(context, '/login');
        },
        type: BottomNavigationBarType.fixed,
        selectedItemColor: AppTheme.primaryTeal,
        unselectedItemColor: AppTheme.textMuted,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.directions_bus), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.confirmation_number_outlined), label: 'My Bookings'),
          BottomNavigationBarItem(icon: Icon(Icons.navigation_outlined), label: 'Live Track'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'Help & Profile'),
        ],
      ),
    );
  }

  Widget _buildServiceCard({required String title, required String subtitle, required IconData icon, bool isPopular = false, required VoidCallback onTap}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: isPopular ? Border.all(color: AppTheme.primaryTeal, width: 1.5) : Border.all(color: Colors.grey.shade200),
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 6)],
            ),
            child: Column(
              children: [
                const SizedBox(height: 6),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(color: AppTheme.primaryTeal.withOpacity(0.12), shape: BoxShape.circle),
                  child: Icon(icon, color: AppTheme.primaryTeal, size: 24),
                ),
                const SizedBox(height: 8),
                Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w900), textAlign: TextAlign.center),
                const SizedBox(height: 2),
                Text(subtitle, style: const TextStyle(fontSize: 10, color: AppTheme.textMuted), textAlign: TextAlign.center),
              ],
            ),
          ),
          if (isPopular)
            Positioned(
              top: -8,
              left: 0,
              right: 0,
              child: Center(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(color: AppTheme.accentRed, borderRadius: BorderRadius.circular(8)),
                  child: const Text('Popular', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildQuickChip(String label, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(color: AppTheme.surfaceContainerLow, borderRadius: BorderRadius.circular(12)),
        child: Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.inkBlack)),
      ),
    );
  }

  Widget _buildCommuteCard(String route, String statusTag, String via, String freq, String type, String fare, Color color) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(color: color.withOpacity(0.12), borderRadius: BorderRadius.circular(12)),
            child: Icon(Icons.directions_bus, color: color, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(route, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900)),
                    const SizedBox(width: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                      decoration: BoxDecoration(color: color.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                      child: Text(statusTag, style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: color)),
                    ),
                  ],
                ),
                Text(via, style: const TextStyle(fontSize: 11, color: AppTheme.textMuted), overflow: TextOverflow.ellipsis),
                const SizedBox(height: 4),
                Row(
                  children: [
                    const Icon(Icons.access_time, size: 12, color: AppTheme.textMuted),
                    const SizedBox(width: 4),
                    Text(freq, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                    const SizedBox(width: 10),
                    const Icon(Icons.bolt, size: 12, color: AppTheme.primaryTeal),
                    const SizedBox(width: 2),
                    Text(type, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.primaryTeal)),
                  ],
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(fare, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppTheme.accentRed)),
              ElevatedButton(
                onPressed: () => Navigator.pushNamed(context, '/search'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  minimumSize: Size.zero,
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
                child: const Text('Board', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
