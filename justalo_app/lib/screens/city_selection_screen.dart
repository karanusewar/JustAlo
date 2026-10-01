import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class CitySelectionScreen extends StatefulWidget {
  final String currentCity;
  const CitySelectionScreen({super.key, this.currentCity = 'Indore'});

  @override
  State<CitySelectionScreen> createState() => _CitySelectionScreenState();
}

class _CitySelectionScreenState extends State<CitySelectionScreen> {
  late String selectedCity;
  final List<Map<String, String>> popularCities = [
    {'name': 'Indore', 'state': 'Madhya Pradesh', 'badge': 'Auto-detected'},
    {'name': 'Bhopal', 'state': 'Madhya Pradesh', 'badge': 'Capital Hub'},
    {'name': 'Ujjain', 'state': 'Madhya Pradesh', 'badge': 'Holy City'},
    {'name': 'Dewas', 'state': 'Madhya Pradesh', 'badge': 'Industrial Hub'},
    {'name': 'Gwalior', 'state': 'Madhya Pradesh', 'badge': 'North MP Terminal'},
  ];

  @override
  void initState() {
    super.initState();
    selectedCity = widget.currentCity;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      appBar: AppBar(
        title: const Text('Select Your City'),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.pop(context, selectedCity),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Geolocation Auto-detected Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.primaryTeal.withOpacity(0.1),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.primaryTeal.withOpacity(0.3)),
              ),
              child: Row(
                children: [
                  Container(
                    width: 44,
                    height: 44,
                    decoration: const BoxDecoration(
                      color: AppTheme.primaryTeal,
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.my_location, color: Colors.white, size: 22),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              selectedCity,
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: AppTheme.inkBlack,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                              decoration: BoxDecoration(
                                color: AppTheme.primaryTeal,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: const Text(
                                'Current Geolocation',
                                style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 2),
                        const Text(
                          'AICTSL Hub, Geeta Bhawan Square',
                          style: TextStyle(fontSize: 12, color: AppTheme.textMuted),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'POPULAR OPERATING CITIES',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: AppTheme.textMuted,
                letterSpacing: 1.1,
              ),
            ),
            const SizedBox(height: 12),
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 2.2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
              ),
              itemCount: popularCities.length,
              itemBuilder: (context, index) {
                final c = popularCities[index];
                final isSelected = c['name'] == selectedCity;
                return InkWell(
                  onTap: () {
                    setState(() => selectedCity = c['name']!);
                    Navigator.pop(context, selectedCity);
                  },
                  borderRadius: BorderRadius.circular(14),
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isSelected ? AppTheme.primaryTeal : Colors.white,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(
                        color: isSelected ? AppTheme.primaryTeal : Colors.grey.shade300,
                        width: isSelected ? 2 : 1,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.03),
                          blurRadius: 6,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              c['name']!,
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: isSelected ? Colors.white : AppTheme.inkBlack,
                              ),
                            ),
                            Text(
                              c['state']!,
                              style: TextStyle(
                                fontSize: 11,
                                color: isSelected ? Colors.white70 : AppTheme.textMuted,
                              ),
                            ),
                          ],
                        ),
                        if (isSelected)
                          const Icon(Icons.check_circle, color: Colors.white, size: 20),
                      ],
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 24),
            // Override button
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () => Navigator.pop(context, selectedCity),
                icon: const Icon(Icons.public, color: AppTheme.primaryDark),
                label: const Text(
                  'Show Other Cities & Routes Anyway',
                  style: TextStyle(color: AppTheme.primaryDark, fontWeight: FontWeight.bold),
                ),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  side: const BorderSide(color: AppTheme.primaryDark),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
