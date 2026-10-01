# JUSTALO — Full-Stack Build Blueprint & Master Prompt
*(Bus ticketing + vehicle rental + parcel platform — Admin / User / Vendor / Driver / Franchisee)*

---

## 1. What the requirement doc actually asks for

Reading through `Justalo_Making.pdf`, this isn't just a "bus booking app" — it's a **local-transport marketplace** with five actors:

| Module | Who uses it | Core job |
|---|---|---|
| **Admin Panel** | You (platform owner) | Onboard vendors/drivers/franchisees, manage routes, fares, cancellation windows, convenience charges, reports |
| **User App** | Riders | Discover city-wise buses, book seats, rent vehicles for events, send parcels, track bus live, cancel tickets |
| **Vendor App** | Bus/vehicle owners (travel agencies like "Bagdi Travels") | Manage their fleet, trips, pricing, availability, bookings |
| **Driver App** | Drivers | Trip start/end, live location ping, manifest of booked passengers, pickup/drop confirmation |
| **Franchisee Module** | City/route franchise owners | Read-only-ish dashboard scoped to *their assigned city/routes only* — bookings, cancellations, P&L, with date-range filters (daily/weekly/monthly/quarterly/yearly) |

Key functional details called out explicitly in the PDF that must not get lost in generic scaffolding:
- **First-launch city picker popup** (BookMyShow-style), auto-detected via geolocation, with a "show other cities anyway" marketing override.
- **Home page**: service icons (Book Ticket, Rent Vehicles, Parcel/Courier), search widget with Today/Tomorrow shortcuts, "Daily Routine Trips" rail scoped to the user's current city, sliding marketing/ad banners (must support an attached link), testimonials, About/T&C/social links.
- **Search → Results**: shows per-operator cards (operator name, distance/duration, fare, amenities tags, rating, "Cancellation Policy" and "Select Seat" actions).
- **Pickup/Drop point selection** shows a **map** of stoppage points inside the city (not just city-to-city) — important because riders often don't know local stop names.
- **Seat map**: drag-and-drop-friendly grid, 3 states (Available / Selected / Booked), must support both 40 and 50 seater configs dynamically.
- **Passenger details**: WhatsApp-number checkbox (booking sent via WhatsApp, email, SMS), optional (non-mandatory) travel/accidental insurance add-on.
- **Fare breakdown**: base fare × seats + admin-configurable convenience charge → net payable.
- **E-ticket**: downloadable + auto-sent via email/WhatsApp/SMS, branded with the JUSTALO logo.
- **Cancellation policy is time-bound and admin-configurable** (their current rule: 20–25 min before departure, since it's a local/short-route market).
- **Live bus tracking** ("Where is my Bus", explicitly compared to IRCTC's "Where is my Train" and Zomato's delivery tracking) — visible only to the customer who booked.
- **Rent Vehicles** flow (vintage cars for weddings, buses for baraat, mini-trucks/trucks for luggage, buses/cars for tours) — a distinct vertical from ticketing.
- **Parcel/Courier** flow with pickup-or-self-drop choice.

This is the spec. Everything below is built to satisfy it — not a generic "bus app" template.

---

## 2. Brand system — extracted directly from `Project_Logo.jpeg`

I sampled the actual logo pixels rather than guessing, so these are exact:

| Token | Hex | Usage |
|---|---|---|
| **Primary / Brand Teal** | `#00C2CB` | Ring/brand mark, primary buttons, active states, headers, selected seat, "search" CTA |
| **Accent Red** | `#FE1617` | "ALO" wordmark accent, urgency/alerts, price highlights, booked-seat state, cancel actions |
| **Ink / Text Black** | `#0A0A0A` | "JUST" wordmark, primary text |
| **Surface White** | `#FFFFFF` / `#FAFAFA` | Backgrounds, cards |
| Success Green (derive) | `#1FAE59` | Confirmed booking, available seat, "Proceed Payment" |
| Warning Amber (derive) | `#FFA726` | Marketing banners / "Select Seat" CTA per the wireframes (they used orange) |
| Neutral Gray scale | `#F5F6F7 → #6B7280 → #1A1A1A` | Borders, disabled states, secondary text |

**Typography**: the wordmark is a bold geometric grotesk — use **Poppins** or **Inter** (SemiBold/Bold for headings, Regular/Medium for body) across Flutter and web; both are free, have full weight ranges, and render consistently on iOS/Android.

**Tone**: tagline "Ab Safar Mein, No Sufferings" → friendly, no-nonsense, local-first. UI copy should be short, warm, Hindi-English (Hinglish) tolerant.

Keep a single `design_tokens.json` (colors, spacing scale, radius, typography) shared by Flutter, the admin web app, and Stitch — this is the file Stitch should generate UI from and Flutter should theme from, so all 4 apps stay visually identical.

---

## 3. Recommended tech stack (built for "must run on iOS + Android" + your toolchain)

| Layer | Choice | Why |
|---|---|---|
| **User / Vendor / Driver apps** | **Flutter** (single codebase → iOS + Android + optionally web) | You're already using Flutter MCP; one codebase for 3 of the 4 apps cuts cost/time drastically |
| **Admin Panel + Franchisee Module** | **Next.js (React) web app**, Tailwind | Desktop-first, data/report-heavy (charts, date-range pickers) — better suited to web than mobile |
| **Backend API** | **Node.js + NestJS** (TypeScript) | Modular by design (matches "separate module" requirement 1:1 via Nest modules), scales cleanly, plays well with Claude Code codegen |
| **Database** | **PostgreSQL** (primary) + **Redis** (seat-lock cache, OTP, sessions) | Relational integrity for seats/bookings/fares; Redis prevents double-seat-booking race conditions |
| **Real-time (bus tracking, seat lock)** | **Socket.IO** or Firebase Realtime DB | Live location ping from Driver App → User App |
| **Auth** | **JWT (access + refresh)** + **OTP via SMS** for riders, email+password for Admin/Vendor/Franchisee, PIN/OTP for Driver | Role-based guards per module |
| **Notifications** | Firebase Cloud Messaging (push) + WhatsApp Business API + SMS gateway (MSG91/Twilio) + Email (SendGrid) | Matches the PDF's explicit "send via WhatsApp, mail, SMS" requirement |
| **Maps** | Google Maps SDK (Flutter) + Directions/Places API | Pickup/drop stoppage map, live tracking |
| **Payments** | Razorpay (India-first, supports UPI) | Matches ₹ pricing shown throughout the PDF |
| **File/Media storage** | S3-compatible bucket (e.g., Cloudflare R2) | Ticket PDFs, vendor documents, driver license uploads |
| **Infra** | Docker Compose for local dev, deploy on Railway/Render/EC2 | Keep infra simple for MVP, containerized so Claude Code/Antigravity can spin it up identically every time |

---

## 4. Monorepo / folder structure (explicitly separated as you asked)

```
justalo/
├── apps/
│   ├── mobile-user/            # Flutter — User App
│   ├── mobile-vendor/          # Flutter — Vendor App
│   ├── mobile-driver/          # Flutter — Driver App
│   └── web-admin/              # Next.js — Admin + Franchisee Module
│
├── backend/
│   ├── src/
│   │   ├── auth/                # JWT, OTP, role guards, refresh tokens
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── strategies/       # jwt.strategy.ts, otp.strategy.ts
│   │   │   └── guards/           # roles.guard.ts, franchisee-scope.guard.ts
│   │   ├── routes/               # <-- literal "routes" domain: city routes, stoppages
│   │   │   ├── routes.module.ts
│   │   │   ├── routes.controller.ts
│   │   │   └── routes.service.ts
│   │   ├── modules/
│   │   │   ├── users/
│   │   │   ├── vendors/
│   │   │   ├── drivers/
│   │   │   ├── franchisees/
│   │   │   ├── buses/
│   │   │   ├── trips/
│   │   │   ├── seats/
│   │   │   ├── bookings/
│   │   │   ├── payments/
│   │   │   ├── rentals/          # marriage/tour vehicle rental
│   │   │   ├── courier/          # parcel pickup/drop
│   │   │   ├── notifications/
│   │   │   ├── tracking/         # live location websocket gateway
│   │   │   └── reports/          # franchisee/admin analytics
│   │   ├── common/                # DTOs, pipes, interceptors, decorators
│   │   ├── config/
│   │   └── main.ts
│   ├── prisma/ (or typeorm/)      # schema.prisma, migrations/, seed.ts
│   └── test/
│
├── design-system/
│   ├── design_tokens.json         # colors/typography/spacing (source of truth)
│   ├── logo/
│   └── stitch-exports/            # Stitch-generated screen specs land here
│
├── infra/
│   ├── docker-compose.yml
│   └── ci-cd/
│
└── docs/
    ├── api-spec.yaml (OpenAPI)
    ├── er-diagram.png
    └── flows/                      # the exact flows from Justalo_Making.pdf, kept as reference
```

`routes/` and `auth/` are called out as their own top-level backend modules exactly as you asked, since "routes" is also a first-class **domain object** here (a route = a city-pair with stoppages), not just an API-routing folder — worth flagging so Claude Code doesn't collapse the two meanings.

---

## 5. Core data model (minimum viable entities)

```
User(id, name, phone, email, role[rider|vendor|driver|franchisee|admin], city_id, wallet_balance)
City(id, name, lat, lng)
Route(id, source_city_id, dest_city_id, distance_km, avg_duration_min)
Stoppage(id, route_id, name, lat, lng, type[pickup|drop])
Vendor(id, user_id, company_name, kyc_status)
Bus(id, vendor_id, reg_number, seat_layout[40|50], amenities[])
Trip(id, bus_id, route_id, driver_id, departure_time, arrival_time, base_fare, status)
Seat(id, trip_id, seat_code, status[available|selected|booked], gender_lock?)
Booking(id, trip_id, user_id, seats[], pickup_stoppage_id, drop_stoppage_id,
         convenience_charge, insurance_opted, total_fare, status, cancel_deadline_at)
Payment(id, booking_id, provider_ref, amount, status)
Rental(id, user_id, vehicle_type, event_type, city_id, date_range, status)
CourierOrder(id, user_id, pickup_type[self|pickup], from, to, status)
Franchisee(id, user_id, assigned_city_ids[], assigned_route_ids[])
Notification(id, user_id, channel[push|whatsapp|sms|email], template, status)
```

---

## 6. Key flows to build first (in priority order)

1. **Auth** — OTP login (rider), email+password (admin/vendor/franchisee), PIN (driver), role-based routing.
2. **City detection + home feed** — geolocation → city popup → "Daily Routine Trips" for that city.
3. **Search → results → seat map → pickup/drop map → passenger details → fare breakdown → payment → e-ticket** (this is the money flow — build and stabilize this end-to-end before anything else, including the seat double-booking lock via Redis).
4. **Cancellation** — countdown against `cancel_deadline_at`, admin-configurable window.
5. **Live tracking** — driver app pings location every N seconds → websocket → user's active-booking map.
6. **Vendor App** — trip CRUD, view bookings, mark departed/arrived.
7. **Driver App** — today's manifest, start/end trip, live ping toggle.
8. **Franchisee dashboard** — scoped queries (never let a franchisee query outside their `assigned_city_ids`/`assigned_route_ids` — enforce this in a guard, not just in the UI), date-range analytics, P&L.
9. **Admin Panel** — global CRUD + franchisee/vendor onboarding + fare & convenience-charge config + reports.
10. **Rental + Courier verticals** — same platform, simpler flows, build after ticketing is solid.

---

## 7. The Super Master Prompt

Paste the block below as the **first message** into Claude Code / Antigravity for the session that owns backend + Flutter scaffolding. It's written so the agent has full context in one shot and won't need to re-derive the domain from the PDF each time. Adjust the "START WITH" line per session depending on which module you're driving that day.

```
You are the lead full-stack engineer building JUSTALO, a city-local transport
marketplace (bus ticketing + vehicle rental + parcel courier) with five
actors: Admin, Rider (User App), Vendor, Driver, and Franchisee.

PRODUCT CONTEXT
- Riders open the app, get a city-detection popup (BookMyShow-style), and see
  a home feed scoped to their current city: search widget (From/To/Date +
  Today/Tomorrow shortcuts), "Daily Routine Trips" for that city, marketing
  slider banners (must accept an attachable link), a Rent Vehicles vertical
  (weddings/tours), a Courier/Parcel vertical (self-drop or we-pickup), and
  About/T&C/testimonials.
- Search results show operator cards: operator name, distance/duration,
  fare, amenity tags (water bottle/pillow/wifi/AC), rating, "Cancellation
  Policy" and "Select Seat" actions.
- Selecting pickup/drop must show a MAP of in-city stoppage points, not just
  the city pair — riders often don't know local stop names.
- Seat selection supports both 40- and 50-seater buses dynamically, three
  visual states (available/selected/booked), drag-friendly grid.
- Passenger details step includes a "this is my WhatsApp number" checkbox
  (booking confirmation goes out via WhatsApp + email + SMS) and an optional,
  NON-mandatory accidental travel insurance add-on.
- Fare = (base fare × seats) + admin-configurable convenience charge = net
  payable. Ticket is downloadable and auto-sent via WhatsApp/email/SMS.
- Cancellation window is admin-configurable per trip/route (default 20–25
  minutes before departure — this is a short-haul/local market).
- Riders can live-track their booked bus (like "Where is my Train" /
  Zomato's delivery tracking) — visible only to the customer who booked
  that specific trip.
- Franchisee Module: a franchisee owner logs in with credentials issued by
  Admin, and sees ONLY their assigned city/routes — trips, bookings,
  cancellations, driver/vehicle info, seat counts, and profit & loss, with
  daily/weekly/monthly/quarterly/yearly and custom date-range filters. Admin
  must retain override visibility into every franchisee's data ("in case of
  any mishappening").

BRAND / DESIGN SYSTEM (from the JUSTALO logo — use exactly, do not
substitute a generic palette)
- Primary teal: #00C2CB
- Accent red: #FE1617
- Ink/text: #0A0A0A
- Surface: #FFFFFF / #FAFAFA
- Success green: #1FAE59, Warning amber: #FFA726
- Typography: Poppins or Inter (SemiBold/Bold headings, Regular/Medium body)
- Keep every color/spacing/type choice in one design_tokens.json consumed by
  both the Flutter apps and the Next.js admin panel so all surfaces stay
  visually identical to the logo.

TECH STACK (do not deviate without telling me why)
- mobile-user, mobile-vendor, mobile-driver: Flutter (iOS + Android from one
  codebase), state via Riverpod or Bloc, Google Maps SDK for stoppage
  selection + live tracking.
- web-admin: Next.js + TypeScript + Tailwind, for Admin Panel AND the
  Franchisee Module (role-gated, same app, different scoped views).
- backend: NestJS (TypeScript), PostgreSQL via Prisma, Redis for seat-lock
  and OTP/session cache, Socket.IO gateway for live location.
- Auth: JWT access+refresh; OTP login for riders; email+password for
  admin/vendor/franchisee; PIN/OTP for drivers. Role guards on every route.
  A dedicated FranchiseeScopeGuard must filter every query by the
  franchisee's assigned_city_ids/assigned_route_ids at the query level, not
  just hidden in the UI.
- Notifications: FCM push, WhatsApp Business API, SMS (MSG91/Twilio),
  email (SendGrid).
- Payments: Razorpay (UPI-first, INR).

REPO LAYOUT — keep these as separate top-level concerns, do not flatten:
apps/mobile-user, apps/mobile-vendor, apps/mobile-driver, apps/web-admin,
backend/src/auth, backend/src/routes (route/stoppage domain, NOT just API
routing), backend/src/modules/{users,vendors,drivers,franchisees,buses,
trips,seats,bookings,payments,rentals,courier,notifications,tracking,
reports}, design-system/, infra/, docs/.

HOW TO WORK
1. Confirm you understand the five actor roles and the money-flow priority
   order below before writing any code.
2. Build in this order: auth → city/home feed → search→booking→payment→
   ticket (with Redis seat-lock to prevent double booking) → cancellation →
   live tracking → vendor app → driver app → franchisee dashboard (with the
   scope guard) → admin panel → rentals → courier.
3. After each module: write it, write its tests, tell me what you built and
   what decisions you made, then stop and wait for me before moving on —
   don't silently keep building past a module boundary.
4. Every screen you scaffold in Flutter must pull colors/type from
   design_tokens.json — never hardcode hex values inline.
5. When a UI screen doesn't yet have a Stitch design, generate a first-pass
   layout yourself from the flows described above, but flag it clearly as
   "placeholder pending Stitch design" so I know to swap it later.
6. Flag any ambiguity in the spec instead of guessing silently — especially
   around fare rules, cancellation edge cases, and franchisee data
   boundaries, since those are money- and trust-sensitive.

START WITH: [tell the agent which module/session this is, e.g. "Scaffold
the backend NestJS project with the auth module and Prisma schema for
User, City, Route, Stoppage, Vendor, Bus, Trip, Seat, Booking, Payment"]
```

**How to split this across your specific tools:**
- **Stitch** → generate the actual pixel-perfect screens per flow (home, search, seat map, passenger details, ticket, franchisee dashboard), exporting tokens that match `design_tokens.json` above.
- **Flutter MCP + Claude Code** → turn Stitch screens into real Flutter widgets/screens for mobile-user/vendor/driver, wired to the NestJS API.
- **Antigravity** → orchestrate the multi-agent/multi-session work (backend session, mobile session, admin-web session) so they don't collide on the same files, and to run the "build one module → test → report → wait" loop from the prompt above.
- Keep the Super Master Prompt itself in `docs/master-prompt.md` in the repo, and paste it fresh into any new agent session so context never has to be reconstructed from memory.

---

## 8. Suggestions for delivering the best possible client experience

1. **Demo the money flow first, publicly.** Search → seat → pay → ticket is the one flow a client will judge the whole product by. Get it rock-solid and demo-able within the first milestone, even before admin/franchisee panels exist.
2. **Ship a staging build after every module**, not just at the end — a shareable APK/TestFlight link + a staging admin URL. Clients trust visible progress far more than status reports.
3. **Never let seat-locking race conditions slip through.** Two people selecting the same seat within the lock window is the single most damaging bug class for a booking product — test it explicitly with concurrent requests before calling booking "done."
4. **Enforce franchisee data scoping at the database query layer**, not the UI layer — a franchisee ever seeing another franchisee's numbers is a trust-ending bug, not a cosmetic one.
5. **Make the cancellation-window rule fully admin-configurable per route/trip**, since the PDF explicitly says this is tuned per local market — hardcoding "20 minutes" will bite you when they expand cities.
6. **Instrument notifications end-to-end early** (WhatsApp + SMS + email all firing correctly on booking) — this is a small feature that clients notice immediately if broken, and it's annoying to debug late.
7. **Record a short Loom/video walkthrough with every milestone delivery** — for a client this technical-minded (they hand-drew wireframes and referenced BookMyShow/Zomato/IRCTC by name), a 3-minute video mapping "here's what you asked for → here's what we built" builds far more confidence than a changelog.
8. **Keep one running `docs/decisions.md`** logging every place you deviated from or extended their spec (e.g., "added Redis seat-lock — not in original doc, needed to prevent double-booking") — clients who write requirement docs this detailed will ask "why is X different," and having the answer ready pre-empts trust issues.
9. **Load-test live tracking and search before launch day**, not after — bus-ticketing traffic spikes hard around festivals/weekends in local markets, and live-location websockets are the first thing to fall over under load.
10. **Plan the post-launch support window explicitly** (bug-fix SLA, who owns hosting, what happens when they want a 6th module) — set this expectation before final handover, not after.
