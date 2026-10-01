const express = require('express');
const cors = require('cors');
const http = require('http');
const { WebSocketServer, WebSocket } = require('ws');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database matching JUSTALO Blueprint
const DB = {
  cities: [
    { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', hub: 'AICTSL Hub, Geeta Bhawan Square', lat: 22.7196, lng: 75.8577 },
    { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', hub: 'Bhopal ISBT / Nadra Stand', lat: 23.2599, lng: 77.4126 },
    { id: 'ujjain', name: 'Ujjain', state: 'Madhya Pradesh', hub: 'Dewas Gate Bus Stand', lat: 23.1765, lng: 75.7885 },
    { id: 'dewas', name: 'Dewas', state: 'Madhya Pradesh', hub: 'Bhopal Bypass Square', lat: 22.9676, lng: 76.0534 },
    { id: 'gwalior', name: 'Gwalior', state: 'Madhya Pradesh', hub: 'Interstate Bus Terminal', lat: 26.2183, lng: 78.1828 }
  ],

  // Authentication Sessions & Users
  otpSessions: {},
  users: [
    { id: 'usr_101', name: 'Demo Rider', phone: '+919876543210', role: 'rider' },
    { id: 'usr_102', name: 'Bagdi Partner', phone: '+919826012345', role: 'vendor' },
  ],

  stoppages: {
    'indore-bhopal': [
      { id: 'stp_1', name: 'Indore Junction Bus Stand', type: 'pickup', lat: 22.7196, lng: 75.8577, time: '08:00 AM' },
      { id: 'stp_2', name: 'Geeta Bhawan Square', type: 'pickup', lat: 22.7225, lng: 75.8789, time: '08:15 AM' },
      { id: 'stp_3', name: 'Palasia Bus Hub', type: 'pickup', lat: 22.7266, lng: 75.8894, time: '08:25 AM' },
      { id: 'stp_4', name: 'Vijay Nagar Square', type: 'pickup', lat: 22.7533, lng: 75.8937, time: '08:40 AM' },
      { id: 'stp_5', name: 'Dewas Bypass Junction', type: 'waypoint', lat: 22.9676, lng: 76.0534, time: '09:30 AM' },
      { id: 'stp_6', name: 'Sehore Bypass Point', type: 'waypoint', lat: 23.2032, lng: 77.0844, time: '10:30 AM' },
      { id: 'stp_7', name: 'Lal Ghati Square', type: 'drop', lat: 23.2750, lng: 77.3750, time: '11:15 AM' },
      { id: 'stp_8', name: 'Bhopal ISBT Terminal', type: 'drop', lat: 23.2599, lng: 77.4126, time: '11:30 AM' }
    ]
  },

  trips: [
    {
      id: 'TRIP_101',
      operator: 'Bagdi Travels Kinetic Express',
      busType: '2+2 Volvo AC Multi-Axle Sleeper',
      capacity: 40,
      rating: 4.8,
      reviewsCount: 342,
      origin: 'Indore',
      destination: 'Bhopal',
      departureTime: '08:00 AM',
      arrivalTime: '11:30 AM',
      duration: '3h 30m',
      baseFare: 450,
      amenities: ['Water Bottle', 'Charging Port', 'AC', 'Live GPS', 'Blanket'],
      cancellationPolicy: 'Free cancellation up to 25 mins before departure (Admin Policy Rule)',
      driver: { name: 'Ramesh Kumar', phone: '+91 98260 12345', license: 'MP-09-2021-00948', rating: 4.9 },
      liveGps: { lat: 22.8451, lng: 75.9650, speed: '62 km/h', nextStop: 'Dewas Bypass', etaNext: '12 mins' }
    },
    {
      id: 'TRIP_102',
      operator: 'Hans Travels Superfast',
      busType: '2+1 Non-AC Seater / Sleeper',
      capacity: 50,
      rating: 4.6,
      reviewsCount: 189,
      origin: 'Indore',
      destination: 'Bhopal',
      departureTime: '09:30 AM',
      arrivalTime: '01:00 PM',
      duration: '3h 30m',
      baseFare: 380,
      amenities: ['Charging Port', 'Live GPS', 'Reading Light'],
      cancellationPolicy: '100% refund before 30 mins, 50% refund within 20 mins',
      driver: { name: 'Suresh Patel', phone: '+91 98261 67890', license: 'MP-09-2019-00512', rating: 4.7 },
      liveGps: { lat: 22.7196, lng: 75.8577, speed: '0 km/h', nextStop: 'Indore Junction', etaNext: 'At Terminal' }
    },
    {
      id: 'TRIP_103',
      operator: 'Chartered Bus Executive',
      busType: '2+2 AC Seater',
      capacity: 40,
      rating: 4.9,
      reviewsCount: 512,
      origin: 'Indore',
      destination: 'Ujjain',
      departureTime: '07:00 AM',
      arrivalTime: '08:15 AM',
      duration: '1h 15m',
      baseFare: 180,
      amenities: ['AC', 'Reclining Seats', 'Live GPS'],
      cancellationPolicy: 'Non-refundable within 15 mins of departure',
      driver: { name: 'Vikram Singh', phone: '+91 94250 88990', license: 'MP-13-2018-00123', rating: 4.8 },
      liveGps: { lat: 23.0000, lng: 75.8000, speed: '55 km/h', nextStop: 'Ujjain Gate', etaNext: '10 mins' }
    }
  ],

  // Seat locks stored as { [tripId_seatCode]: { userId, expiresAt } }
  seatLocks: {},

  // Booked seats per trip
  bookedSeats: {
    'TRIP_101': ['A1', 'A2', 'B5', 'C3'],
    'TRIP_102': ['1', '2', '12', '15', '16'],
    'TRIP_103': ['S1', 'S2', 'S3']
  },

  bookings: [
    {
      id: 'JUST-884920',
      tripId: 'TRIP_101',
      userId: 'USR_1001',
      userName: 'Aman Sharma',
      userPhone: '+91 98765 43210',
      userEmail: 'aman.sharma@example.com',
      seats: ['B1', 'B2'],
      pickupStop: 'Geeta Bhawan Square (08:15 AM)',
      dropStop: 'Bhopal ISBT Terminal (11:30 AM)',
      baseFare: 900,
      convenienceFee: 35,
      insuranceOpted: true,
      insuranceFee: 15,
      totalFare: 950,
      status: 'CONFIRMED',
      whatsappOptIn: true,
      bookingTime: new Date().toISOString(),
      qrCodeData: 'JUSTALO-BOOKING-JUST-884920-TRIP_101',
      canCancelUntil: new Date(Date.now() + 45 * 60 * 1000).toISOString()
    }
  ],

  rentals: [
    {
      id: 'RENT-501',
      category: 'Wedding & Tours Fleet',
      vehicleType: 'Vintage Open Car / Luxury Bus',
      customerName: 'Rajesh Verma',
      phone: '+91 99887 76655',
      eventDate: '2026-10-15',
      city: 'Indore',
      status: 'PENDING_QUOTE',
      notes: 'Baraat transportation and vintage groom car'
    }
  ],

  parcels: [
    {
      id: 'PKG-7721',
      trackingNo: 'JST-PRCL-9901',
      senderName: 'Deepak Traders',
      senderPhone: '+91 91111 22223',
      receiverName: 'Sanjay Electronics',
      receiverPhone: '+91 94444 55556',
      fromCity: 'Indore',
      toCity: 'Bhopal',
      packageType: 'Document / Electronics Box',
      weightKg: 4.5,
      pickupType: 'We Pickup from Doorstep',
      status: 'IN_TRANSIT',
      estimatedDelivery: 'Today by 02:00 PM'
    }
  ],

  config: {
    convenienceFeeRate: 35,
    cancellationWindowMins: 25,
    insurancePerPassenger: 15,
    platformStatus: 'ONLINE'
  },

  franchisees: [
    {
      id: 'FRAN_INDORE_01',
      name: 'Central Malwa Transit Franchise',
      owner: 'Vikramaditya Agency',
      assignedCities: ['Indore', 'Dewas'],
      assignedRoutes: ['Indore - Bhopal', 'Indore - Ujjain'],
      monthlyGrossRevenue: 485000,
      netProfit: 98000,
      activeBuses: 14,
      totalBookingsThisMonth: 1240,
      cancellationsRate: '2.4%'
    }
  ]
};

// --- AUTH ENDPOINTS ---
app.post('/api/auth/login', (req, res) => {
  const { role, identifier, password, pin, otp } = req.body;
  // Mock login handling for multi-actor system
  const user = {
    id: `USR_${Date.now()}`,
    name: role === 'driver' ? 'Ramesh Kumar Driver' : role === 'vendor' ? 'Bagdi Travels Vendor' : role === 'franchisee' ? 'Central Malwa Franchisee' : role === 'admin' ? 'Super Admin' : 'Rider User',
    role: role || 'rider',
    phone: identifier || '+91 98765 43210',
    email: `${role || 'user'}@justalo.com`,
    token: `jwt_token_${role}_${Date.now()}`
  };

  res.json({ success: true, user, message: `Logged in successfully as ${role.toUpperCase()}` });
});

app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  res.json({ success: true, message: `OTP sent to ${phone} (Demo OTP: 1234)` });
});

// --- CITY & GEOLOCATION ENDPOINTS ---
app.get('/api/cities', (req, res) => {
  res.json({ success: true, cities: DB.cities });
});

app.get('/api/cities/detect', (req, res) => {
  res.json({
    success: true,
    detectedCity: DB.cities[0],
    geoAddress: 'AICTSL Hub, Geeta Bhawan Square, Indore',
    status: 'AUTO_DETECTED'
  });
});

app.get('/api/stoppages/:routeKey', (req, res) => {
  const routeKey = req.params.routeKey || 'indore-bhopal';
  const stoppages = DB.stoppages[routeKey] || DB.stoppages['indore-bhopal'];
  res.json({ success: true, routeKey, stoppages });
});

// --- TRIPS & SEARCH ENDPOINTS ---
app.get('/api/trips/search', (req, res) => {
  const { from = 'Indore', to = 'Bhopal', date } = req.query;
  const filtered = DB.trips.filter(t => 
    t.origin.toLowerCase() === from.toLowerCase() && 
    t.destination.toLowerCase() === to.toLowerCase()
  );
  res.json({
    success: true,
    count: filtered.length > 0 ? filtered.length : DB.trips.length,
    trips: filtered.length > 0 ? filtered : DB.trips
  });
});

app.get('/api/trips/:id', (req, res) => {
  const trip = DB.trips.find(t => t.id === req.params.id) || DB.trips[0];
  const booked = DB.bookedSeats[trip.id] || [];

  // Generate layout seats
  const seats = [];
  const rows = trip.capacity === 50 ? 10 : 8;
  const cols = ['A', 'B', 'C', 'D'];

  for (let r = 1; r <= rows; r++) {
    for (let c of cols) {
      const code = `${c}${r}`;
      const isBooked = booked.includes(code);
      const isLocked = DB.seatLocks[`${trip.id}_${code}`] && DB.seatLocks[`${trip.id}_${code}`].expiresAt > Date.now();
      seats.push({
        code,
        row: r,
        col: c,
        status: isBooked ? 'BOOKED' : isLocked ? 'LOCKED' : 'AVAILABLE',
        price: trip.baseFare
      });
    }
  }

  res.json({ success: true, trip, seats, bookedCount: booked.length, stoppages: DB.stoppages['indore-bhopal'] });
});

// --- SEAT LOCKING & BOOKING ENDPOINTS ---
app.post('/api/seats/lock', (req, res) => {
  const { tripId, seatCodes, userId = 'GUEST' } = req.body;
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins Redis lock simulation

  const locked = [];
  for (let code of seatCodes) {
    const lockKey = `${tripId}_${code}`;
    const existing = DB.seatLocks[lockKey];
    if (existing && existing.expiresAt > Date.now() && existing.userId !== userId) {
      return res.status(400).json({ success: false, message: `Seat ${code} is currently held by another passenger!` });
    }
    DB.seatLocks[lockKey] = { userId, expiresAt };
    locked.push(code);
  }

  res.json({ success: true, lockedSeats: locked, expiresAt, message: 'Seats locked for 10 minutes' });
});

app.post('/api/bookings/create', (req, res) => {
  const { tripId, passengerName, passengerPhone, passengerEmail, seats, pickupStop, dropStop, whatsappOptIn, insuranceOpted } = req.body;
  
  const trip = DB.trips.find(t => t.id === tripId) || DB.trips[0];
  const seatCount = seats ? seats.length : 1;
  const baseTotal = trip.baseFare * seatCount;
  const convenienceFee = DB.config.convenienceFeeRate;
  const insuranceFee = insuranceOpted ? DB.config.insurancePerPassenger * seatCount : 0;
  const netTotal = baseTotal + convenienceFee + insuranceFee;

  const bookingId = `JUST-${Math.floor(100000 + Math.random() * 900000)}`;
  const booking = {
    id: bookingId,
    tripId: trip.id,
    operator: trip.operator,
    busType: trip.busType,
    userId: 'USR_1001',
    userName: passengerName || 'Aman Sharma',
    userPhone: passengerPhone || '+91 98765 43210',
    userEmail: passengerEmail || 'rider@justalo.com',
    seats: seats || ['B1'],
    pickupStop: pickupStop || 'Geeta Bhawan Square',
    dropStop: dropStop || 'Bhopal ISBT Terminal',
    baseFare: baseTotal,
    convenienceFee,
    insuranceOpted: !!insuranceOpted,
    insuranceFee,
    totalFare: netTotal,
    status: 'CONFIRMED',
    whatsappOptIn: !!whatsappOptIn,
    bookingTime: new Date().toISOString(),
    canCancelUntil: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
    qrCodeData: `JUSTALO-TICKET-${bookingId}`
  };

  DB.bookings.unshift(booking);
  if (!DB.bookedSeats[trip.id]) DB.bookedSeats[trip.id] = [];
  DB.bookedSeats[trip.id].push(...(seats || ['B1']));

  res.json({ success: true, booking, message: 'Booking confirmed! E-ticket generated.' });
});

app.get('/api/bookings/:id', (req, res) => {
  const booking = DB.bookings.find(b => b.id === req.params.id) || DB.bookings[0];
  res.json({ success: true, booking });
});

app.post('/api/bookings/:id/cancel', (req, res) => {
  const booking = DB.bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

  if (new Date() > new Date(booking.canCancelUntil)) {
    return res.status(400).json({ success: false, message: 'Cancellation window (25 mins before departure) has expired!' });
  }

  booking.status = 'CANCELLED';
  res.json({ success: true, booking, message: 'Ticket cancelled successfully. Refund of ₹' + (booking.totalFare - booking.convenienceFee) + ' initiated to original payment mode.' });
});

// --- LIVE GPS TRACKING ---
app.get('/api/tracking/:bookingId', (req, res) => {
  const booking = DB.bookings.find(b => b.id === req.params.bookingId) || DB.bookings[0];
  const trip = DB.trips.find(t => t.id === booking.tripId) || DB.trips[0];
  
  res.json({
    success: true,
    bookingId: booking.id,
    operator: trip.operator,
    driver: trip.driver,
    currentLocation: trip.liveGps,
    stoppages: DB.stoppages['indore-bhopal'],
    status: 'IN_TRANSIT'
  });
});

app.post('/api/tracking/driver-broadcast', (req, res) => {
  const { tripId, lat, lng, speed, nextStop } = req.body;
  const trip = DB.trips.find(t => t.id === tripId) || DB.trips[0];
  trip.liveGps = { lat, lng, speed, nextStop, etaNext: '8 mins' };

  // Broadcast to WebSocket clients
  broadcastLocation(trip.id, trip.liveGps);
  res.json({ success: true, message: 'Live GPS location updated & broadcasted' });
});

// --- RENT VEHICLE FLEET ---
app.post('/api/rentals/inquiry', (req, res) => {
  const rental = {
    id: `RENT-${Math.floor(100 + Math.random() * 900)}`,
    ...req.body,
    status: 'CONFIRMED_INQUIRY',
    createdAt: new Date().toISOString()
  };
  DB.rentals.unshift(rental);
  res.json({ success: true, rental, message: 'Rental fleet request submitted! Vendor partner will call shortly.' });
});

app.get('/api/rentals', (req, res) => {
  res.json({ success: true, rentals: DB.rentals });
});

// --- PARCEL / CARGO EXPRESS ---
app.post('/api/parcels/create', (req, res) => {
  const parcel = {
    id: `PKG-${Math.floor(1000 + Math.random() * 9000)}`,
    trackingNo: `JST-PRCL-${Math.floor(1000 + Math.random() * 9000)}`,
    ...req.body,
    status: 'BOOKED_PICKUP_READY',
    createdAt: new Date().toISOString()
  };
  DB.parcels.unshift(parcel);
  res.json({ success: true, parcel, message: `Parcel registered! Tracking No: ${parcel.trackingNo}` });
});

app.get('/api/parcels/:trackingNo', (req, res) => {
  const parcel = DB.parcels.find(p => p.trackingNo === req.params.trackingNo || p.id === req.params.trackingNo) || DB.parcels[0];
  res.json({ success: true, parcel });
});

// --- DRIVER MANIFEST ---
app.get('/api/driver/manifest/:tripId', (req, res) => {
  const trip = DB.trips.find(t => t.id === req.params.tripId) || DB.trips[0];
  const tripBookings = DB.bookings.filter(b => b.tripId === trip.id);
  res.json({
    success: true,
    trip,
    passengersCount: tripBookings.length,
    manifest: tripBookings.map(b => ({
      bookingId: b.id,
      passengerName: b.userName,
      phone: b.userPhone,
      seats: b.seats,
      pickup: b.pickupStop,
      drop: b.dropStop,
      status: b.status
    }))
  });
});

// --- VENDOR DASHBOARD ---
app.get('/api/vendor/stats', (req, res) => {
  res.json({
    success: true,
    vendorName: 'Bagdi Travels Partner',
    totalBuses: 12,
    activeTripsToday: 8,
    totalBookingsToday: 142,
    todayEarnings: 68450,
    trips: DB.trips
  });
});

// --- FRANCHISEE DASHBOARD (SCOPED QUERY) ---
app.get('/api/franchisee/pnl', (req, res) => {
  const { city = 'Indore', period = 'monthly' } = req.query;
  const fran = DB.franchisees[0];
  res.json({
    success: true,
    franchisee: fran,
    filteredCity: city,
    period,
    metrics: {
      grossRevenue: 485000,
      convenienceFeeShare: 34200,
      cancellationDeductions: 11200,
      operatingCosts: 341600,
      netProfit: 98200,
      marginPercent: '20.2%'
    },
    weeklyTrend: [
      { week: 'Week 1', revenue: 110000, profit: 22000 },
      { week: 'Week 2', revenue: 125000, profit: 26000 },
      { week: 'Week 3', revenue: 118000, profit: 23500 },
      { week: 'Week 4', revenue: 132000, profit: 26700 }
    ]
  });
});

// --- SUPER ADMIN GOVERNANCE CONSOLE ---
app.get('/api/admin/metrics', (req, res) => {
  res.json({
    success: true,
    platformStats: {
      totalCitiesActive: DB.cities.length,
      activeVendors: 48,
      activeFranchisees: 12,
      totalTripsToday: 320,
      systemBookingsToday: 4120,
      platformGMV: 1845000,
      convenienceFeesCollected: 144200,
      config: DB.config
    }
  });
});

app.post('/api/admin/config', (req, res) => {
  const { convenienceFeeRate, cancellationWindowMins } = req.body;
  if (convenienceFeeRate !== undefined) DB.config.convenienceFeeRate = convenienceFeeRate;
  if (cancellationWindowMins !== undefined) DB.config.cancellationWindowMins = cancellationWindowMins;
  res.json({ success: true, config: DB.config, message: 'Platform configuration updated!' });
});

// --- AUTHENTICATION API ENDPOINTS ---
app.post('/api/auth/send-otp', (req, res) => {
  const { phone, role = 'rider' } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  const generatedOtp = '1234'; // Default 4-digit test OTP
  DB.otpSessions[phone] = {
    otp: generatedOtp,
    role,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 mins expiration
  };

  console.log(`[AUTH] Generated OTP ${generatedOtp} for phone ${phone} (${role})`);
  res.json({
    success: true,
    message: `OTP sent successfully to ${phone} via SMS & WhatsApp!`,
    testOtp: generatedOtp
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp, role = 'rider' } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
  }

  const session = DB.otpSessions[phone];
  // Allow '1234' as universal fallback or matching session OTP
  if (otp === '1234' || (session && session.otp === otp)) {
    let user = DB.users.find(u => u.phone === phone);
    if (!user) {
      user = {
        id: `usr_${Date.now()}`,
        name: `JUSTALO ${role.toUpperCase()} User`,
        phone,
        role
      };
      DB.users.push(user);
    }

    delete DB.otpSessions[phone];
    return res.json({
      success: true,
      message: 'Authentication successful!',
      token: `jwt_token_${user.id}_${Date.now()}`,
      user
    });
  }

  return res.status(400).json({ success: false, message: 'Invalid OTP code. Please try 1234.' });
});

app.post('/api/auth/social-login', (req, res) => {
  const { provider = 'google', phone = '+919876543210' } = req.body;
  const user = {
    id: `usr_social_${Date.now()}`,
    name: `${provider.toUpperCase()} User`,
    phone,
    role: 'rider'
  };
  res.json({
    success: true,
    message: `Logged in via ${provider.toUpperCase()}`,
    token: `jwt_token_${user.id}_${Date.now()}`,
    user
  });
});

// --- HTTP SERVER & WEBSOCKET SETUP ---
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const wsClients = new Set();
wss.on('connection', (ws) => {
  wsClients.add(ws);
  ws.send(JSON.stringify({ type: 'CONNECTED', message: 'Connected to JUSTALO Live Tracking WebSocket' }));
  ws.on('close', () => wsClients.delete(ws));
});

function broadcastLocation(tripId, gpsData) {
  const message = JSON.stringify({ type: 'GPS_UPDATE', tripId, gpsData, timestamp: new Date().toISOString() });
  for (let client of wsClients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 JUSTALO Backend API Server running on port ${PORT}`);
  console.log(`📡 WebSocket Live Tracking Server Active`);
  console.log(`====================================================`);
});
