import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class FranchiseeDashboardScreen extends StatefulWidget {
  const FranchiseeDashboardScreen({super.key});

  @override
  State<FranchiseeDashboardScreen> createState() => _FranchiseeDashboardScreenState();
}

class _FranchiseeDashboardScreenState extends State<FranchiseeDashboardScreen> {
  String selectedFilter = 'Monthly';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      appBar: AppBar(
        title: const Text('Franchisee P&L Console'),
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
            // Franchisee Scope Header
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('FRANCHISEE SCOPED ACCESS', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                      Text('ID: FRAN_INDORE_01', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryDark)),
                    ],
                  ),
                  SizedBox(height: 6),
                  Text('Central Malwa Transit Agency', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  Text('Assigned Territory: Indore & Dewas Hubs', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Date Range Filter Bar
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'].map((filter) {
                  final isSel = filter == selectedFilter;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: ChoiceChip(
                      label: Text(filter),
                      selected: isSel,
                      onSelected: (_) => setState(() => selectedFilter = filter),
                      selectedColor: AppTheme.primaryTeal,
                      labelStyle: TextStyle(color: isSel ? Colors.white : AppTheme.inkBlack, fontWeight: FontWeight.bold),
                    ),
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 16),

            // P&L Summary Cards
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [Color(0xFF00C2CB), Color(0xFF00696E)]),
                borderRadius: BorderRadius.circular(20),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('NET PROFIT (MONTHLY)', style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.bold)),
                  SizedBox(height: 4),
                  Text('₹98,200', style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w900)),
                  SizedBox(height: 6),
                  Text('Profit Margin: 20.2% - Scoped to Indore Routes', style: TextStyle(color: Colors.white, fontSize: 12)),
                ],
              ),
            ),
            const SizedBox(height: 16),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
              child: const Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Gross Booking Revenue'),
                      Text('₹4,85,000', style: TextStyle(fontWeight: FontWeight.bold)),
                    ],
                  ),
                  SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Convenience Fee Share (+20%)'),
                      Text('+₹34,200', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.successGreen)),
                    ],
                  ),
                  SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Cancellation Deductions'),
                      Text('-₹11,200', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.accentRed)),
                    ],
                  ),
                  SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Bus Operating & Fuel Costs'),
                      Text('-₹3,41,600', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
                    ],
                  ),
                  Divider(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('NET DISBURSED TO FRANCHISEE', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                      Text('₹98,200', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppTheme.primaryDark)),
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
}
