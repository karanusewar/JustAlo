import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AdminGovernanceScreen extends StatefulWidget {
  const AdminGovernanceScreen({super.key});

  @override
  State<AdminGovernanceScreen> createState() => _AdminGovernanceScreenState();
}

class _AdminGovernanceScreenState extends State<AdminGovernanceScreen> {
  double convenienceFee = 35.0;
  double cancelWindow = 25.0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      appBar: AppBar(
        title: const Text('Super Admin Governance Console'),
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
            // Admin Header
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.inkBlack,
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('SYSTEMIC GOVERNANCE', style: TextStyle(color: AppTheme.primaryTeal, fontSize: 10, fontWeight: FontWeight.bold)),
                      Text('PLATFORM OWNER', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  SizedBox(height: 6),
                  Text('JUSTALO Global Operations', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                  Text('Active Cities: 5 - Vendors: 48 - Franchisees: 12', style: TextStyle(color: Colors.white70, fontSize: 12)),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Platform Stats
            Row(
              children: [
                Expanded(
                  child: _statCard('Platform GMV Today', '₹18,45,000', AppTheme.primaryTeal),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _statCard('Convenience Collected', '₹1,44,200', AppTheme.successGreen),
                ),
              ],
            ),
            const SizedBox(height: 20),

            const Text('SYSTEMIC POLICY CONFIGURATOR', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.textMuted)),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Convenience Charge (Per Ticket):', style: TextStyle(fontWeight: FontWeight.bold)),
                      Text('₹${convenienceFee.toInt()}', style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primaryDark, fontSize: 16)),
                    ],
                  ),
                  Slider(
                    value: convenienceFee,
                    min: 10,
                    max: 100,
                    divisions: 18,
                    activeColor: AppTheme.primaryTeal,
                    onChanged: (val) => setState(() => convenienceFee = val),
                  ),
                  const SizedBox(height: 14),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Cancellation Deadline Window:', style: TextStyle(fontWeight: FontWeight.bold)),
                      Text('${cancelWindow.toInt()} Mins Before', style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.accentRed, fontSize: 16)),
                    ],
                  ),
                  Slider(
                    value: cancelWindow,
                    min: 10,
                    max: 60,
                    divisions: 10,
                    activeColor: AppTheme.accentRed,
                    onChanged: (val) => setState(() => cancelWindow = val),
                  ),
                  const SizedBox(height: 14),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Global Platform Rules Updated Successfully!'),
                            backgroundColor: AppTheme.successGreen,
                          ),
                        );
                      },
                      child: const Text('SAVE GLOBAL CONFIGURATION'),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _statCard(String label, String val, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
          const SizedBox(height: 4),
          Text(val, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: color)),
        ],
      ),
    );
  }
}
