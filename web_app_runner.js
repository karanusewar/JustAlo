const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const BOOKING_DIR = path.join(__dirname, 'Booking');
const FLUTTER_WEB_DIR = path.join(__dirname, 'justalo_app', 'build', 'web');
const CODEBASE_DIR = path.join(__dirname, 'justalo_complete_codebase', 'dist');

// Serve compiled Flutter Web application
if (fs.existsSync(FLUTTER_WEB_DIR)) {
  app.use('/flutter', express.static(FLUTTER_WEB_DIR));
  app.use('/flutter', (req, res, next) => {
    if (req.accepts('html')) {
      res.sendFile(path.join(FLUTTER_WEB_DIR, 'index.html'));
    } else {
      next();
    }
  });
}

// Serve Justalo Complete Codebase Platform (React / TS)
if (fs.existsSync(CODEBASE_DIR)) {
  app.use('/codebase', express.static(CODEBASE_DIR));
  app.use('/complete', express.static(CODEBASE_DIR));
  app.use(['/codebase', '/complete'], (req, res, next) => {
    if (req.accepts('html')) {
      res.sendFile(path.join(CODEBASE_DIR, 'index.html'));
    } else {
      next();
    }
  });
}

app.use(express.static(BOOKING_DIR));

const SCREENS = {
  home: 'justalo_home_search',
  city: 'city_selection_detection_justalo',
  login: 'justalo_multi_actor_login_verification',
  search: 'search_results_indore_to_bhopal',
  seat: 'seat_map_stoppage_selection',
  passenger: 'passenger_details_fare_breakdown',
  eticket: 'e_ticket_booking_confirmation',
  tracking: 'live_bus_tracking',
  rent: 'rent_fleet_weddings_tours_logistics',
  parcel: 'parcel_express_same_day_bus_cargo',
  driver: 'driver_manifest_live_gps_broadcast',
  vendor: 'vendor_partner_fleet_trip_management',
  franchisee: 'franchisee_p_l_route_operations_dashboard',
  admin: 'super_admin_global_platform_governance_console'
};

app.get('/', (req, res) => {
  const currentScreenKey = req.query.screen || 'home';
  const folderName = SCREENS[currentScreenKey] || SCREENS['home'];
  const htmlPath = path.join(BOOKING_DIR, folderName, 'code.html');

  if (!fs.existsSync(htmlPath)) {
    return res.status(404).send(`Screen ${folderName} not found`);
  }

  let htmlContent = fs.readFileSync(htmlPath, 'utf8');

  const navigationScript = `
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        console.log("JUSTALO App Navigation System Initialized.");
        document.body.addEventListener('click', (e) => {
          const target = e.target.closest('button, [role="button"], a, input[type="submit"]');
          if (!target) return;
          const text = target.innerText ? target.innerText.toLowerCase() : '';
          const id = target.id ? target.id.toLowerCase() : '';

          if (text.includes('switch') || id.includes('city') || text.includes('indore')) {
            window.location.href = '/?screen=city';
          } else if (text.includes('search buses') || text.includes('search')) {
            window.location.href = '/?screen=search';
          } else if (text.includes('select seat') || text.includes('book ticket')) {
            window.location.href = '/?screen=seat';
          } else if (text.includes('proceed') || text.includes('passenger')) {
            window.location.href = '/?screen=passenger';
          } else if (text.includes('pay') || text.includes('confirm') || text.includes('book now')) {
            window.location.href = '/?screen=eticket';
          } else if (text.includes('live track') || text.includes('track bus') || text.includes('where is my bus')) {
            window.location.href = '/?screen=tracking';
          } else if (text.includes('rent fleet') || text.includes('rent vehicle')) {
            window.location.href = '/?screen=rent';
          } else if (text.includes('parcel') || text.includes('courier')) {
            window.location.href = '/?screen=parcel';
          } else if (text.includes('driver')) {
            window.location.href = '/?screen=driver';
          } else if (text.includes('vendor')) {
            window.location.href = '/?screen=vendor';
          } else if (text.includes('franchisee')) {
            window.location.href = '/?screen=franchisee';
          } else if (text.includes('admin') || text.includes('governance')) {
            window.location.href = '/?screen=admin';
          } else if (text.includes('login') || text.includes('sign in')) {
            window.location.href = '/?screen=login';
          }
        });
      });
    </script>
    <div id="justalo-floating-bar" style="position:fixed;bottom:12px;left:50%;transform:translateX(-50%);z-index:99999;background:rgba(10,10,10,0.92);backdrop-filter:blur(10px);color:#fff;padding:8px 16px;border-radius:30px;box-shadow:0 8px 32px rgba(0,0,0,0.3);display:flex;align-items:center;gap:10px;font-family:sans-serif;font-size:12px;">
      <span style="font-weight:bold;color:#00C2CB;">📱 JUSTALO Switcher:</span>
      <select onchange="window.location.href='/?screen='+this.value" style="background:#1a1a1a;color:#fff;border:1px solid #00C2CB;padding:4px 8px;border-radius:14px;outline:none;font-weight:bold;cursor:pointer;">
        <option value="home" ${currentScreenKey === 'home' ? 'selected' : ''}>1. Home Search</option>
        <option value="city" ${currentScreenKey === 'city' ? 'selected' : ''}>2. City Selection Modal</option>
        <option value="login" ${currentScreenKey === 'login' ? 'selected' : ''}>3. Multi-Actor Login</option>
        <option value="search" ${currentScreenKey === 'search' ? 'selected' : ''}>4. Bus Search Results</option>
        <option value="seat" ${currentScreenKey === 'seat' ? 'selected' : ''}>5. Seat Map & Stoppage</option>
        <option value="passenger" ${currentScreenKey === 'passenger' ? 'selected' : ''}>6. Passenger Details & Fare</option>
        <option value="eticket" ${currentScreenKey === 'eticket' ? 'selected' : ''}>7. E-Ticket Confirmation</option>
        <option value="tracking" ${currentScreenKey === 'tracking' ? 'selected' : ''}>8. Live Bus GPS Tracking</option>
        <option value="rent" ${currentScreenKey === 'rent' ? 'selected' : ''}>9. Rent Vehicle Fleet</option>
        <option value="parcel" ${currentScreenKey === 'parcel' ? 'selected' : ''}>10. Parcel Express Cargo</option>
        <option value="driver" ${currentScreenKey === 'driver' ? 'selected' : ''}>11. Driver App Manifest</option>
        <option value="vendor" ${currentScreenKey === 'vendor' ? 'selected' : ''}>12. Vendor Fleet Console</option>
        <option value="franchisee" ${currentScreenKey === 'franchisee' ? 'selected' : ''}>13. Franchisee P&L Scoped</option>
        <option value="admin" ${currentScreenKey === 'admin' ? 'selected' : ''}>14. Super Admin Console</option>
      </select>
      <a href="/flutter" style="background:#00C2CB;color:#fff;padding:5px 12px;border-radius:14px;text-decoration:none;font-weight:bold;">💙 Flutter App</a>
      <a href="/codebase" style="background:#8B5CF6;color:#fff;padding:5px 12px;border-radius:14px;text-decoration:none;font-weight:bold;">⚡ Complete Codebase Platform</a>
      <a href="http://localhost:5000/api/cities" target="_blank" style="color:#00C2CB;text-decoration:none;font-weight:bold;">📡 API Server</a>
    </div>
  `;

  htmlContent = htmlContent.replace('</body>', `${navigationScript}</body>`);
  res.send(htmlContent);
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`📱 JUSTALO Web App running at http://localhost:${PORT}`);
  console.log(`💙 Compiled Flutter Web App running at http://localhost:${PORT}/flutter`);
  console.log(`====================================================`);
});
