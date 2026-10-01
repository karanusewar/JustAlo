class City {
  final String id;
  final String name;
  final String state;
  final String hub;
  final double lat;
  final double lng;

  City({
    required this.id,
    required this.name,
    required this.state,
    required this.hub,
    required this.lat,
    required this.lng,
  });

  factory City.fromJson(Map<String, dynamic> json) {
    return City(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      state: json['state'] ?? '',
      hub: json['hub'] ?? '',
      lat: (json['lat'] ?? 0.0).toDouble(),
      lng: (json['lng'] ?? 0.0).toDouble(),
    );
  }
}

class Stoppage {
  final String id;
  final String name;
  final String type; // pickup, drop, waypoint
  final String time;
  final double lat;
  final double lng;

  Stoppage({
    required this.id,
    required this.name,
    required this.type,
    required this.time,
    required this.lat,
    required this.lng,
  });

  factory Stoppage.fromJson(Map<String, dynamic> json) {
    return Stoppage(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      type: json['type'] ?? 'pickup',
      time: json['time'] ?? '',
      lat: (json['lat'] ?? 0.0).toDouble(),
      lng: (json['lng'] ?? 0.0).toDouble(),
    );
  }
}

class BusTrip {
  final String id;
  final String operator;
  final String busType;
  final int capacity;
  final double rating;
  final int reviewsCount;
  final String origin;
  final String destination;
  final String departureTime;
  final String arrivalTime;
  final String duration;
  final double baseFare;
  final List<String> amenities;
  final String cancellationPolicy;

  BusTrip({
    required this.id,
    required this.operator,
    required this.busType,
    required this.capacity,
    required this.rating,
    required this.reviewsCount,
    required this.origin,
    required this.destination,
    required this.departureTime,
    required this.arrivalTime,
    required this.duration,
    required this.baseFare,
    required this.amenities,
    required this.cancellationPolicy,
  });

  factory BusTrip.fromJson(Map<String, dynamic> json) {
    return BusTrip(
      id: json['id'] ?? '',
      operator: json['operator'] ?? '',
      busType: json['busType'] ?? '',
      capacity: json['capacity'] ?? 40,
      rating: (json['rating'] ?? 4.5).toDouble(),
      reviewsCount: json['reviewsCount'] ?? 100,
      origin: json['origin'] ?? '',
      destination: json['destination'] ?? '',
      departureTime: json['departureTime'] ?? '',
      arrivalTime: json['arrivalTime'] ?? '',
      duration: json['duration'] ?? '',
      baseFare: (json['baseFare'] ?? 0.0).toDouble(),
      amenities: List<String>.from(json['amenities'] ?? []),
      cancellationPolicy: json['cancellationPolicy'] ?? '',
    );
  }
}

class SeatItem {
  final String code;
  final int row;
  final String col;
  String status; // AVAILABLE, SELECTED, BOOKED, LOCKED
  final double price;

  SeatItem({
    required this.code,
    required this.row,
    required this.col,
    required this.status,
    required this.price,
  });

  factory SeatItem.fromJson(Map<String, dynamic> json) {
    return SeatItem(
      code: json['code'] ?? '',
      row: json['row'] ?? 1,
      col: json['col'] ?? 'A',
      status: json['status'] ?? 'AVAILABLE',
      price: (json['price'] ?? 0.0).toDouble(),
    );
  }
}

class Booking {
  final String id;
  final String tripId;
  final String operator;
  final String busType;
  final String userName;
  final String userPhone;
  final String userEmail;
  final List<String> seats;
  final String pickupStop;
  final String dropStop;
  final double baseFare;
  final double convenienceFee;
  final bool insuranceOpted;
  final double insuranceFee;
  final double totalFare;
  final String status;
  final bool whatsappOptIn;
  final String bookingTime;
  final String canCancelUntil;
  final String qrCodeData;

  Booking({
    required this.id,
    required this.tripId,
    required this.operator,
    required this.busType,
    required this.userName,
    required this.userPhone,
    required this.userEmail,
    required this.seats,
    required this.pickupStop,
    required this.dropStop,
    required this.baseFare,
    required this.convenienceFee,
    required this.insuranceOpted,
    required this.insuranceFee,
    required this.totalFare,
    required this.status,
    required this.whatsappOptIn,
    required this.bookingTime,
    required this.canCancelUntil,
    required this.qrCodeData,
  });

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      id: json['id'] ?? '',
      tripId: json['tripId'] ?? '',
      operator: json['operator'] ?? '',
      busType: json['busType'] ?? '',
      userName: json['userName'] ?? '',
      userPhone: json['userPhone'] ?? '',
      userEmail: json['userEmail'] ?? '',
      seats: List<String>.from(json['seats'] ?? []),
      pickupStop: json['pickupStop'] ?? '',
      dropStop: json['dropStop'] ?? '',
      baseFare: (json['baseFare'] ?? 0.0).toDouble(),
      convenienceFee: (json['convenienceFee'] ?? 0.0).toDouble(),
      insuranceOpted: json['insuranceOpted'] ?? false,
      insuranceFee: (json['insuranceFee'] ?? 0.0).toDouble(),
      totalFare: (json['totalFare'] ?? 0.0).toDouble(),
      status: json['status'] ?? 'CONFIRMED',
      whatsappOptIn: json['whatsappOptIn'] ?? true,
      bookingTime: json['bookingTime'] ?? '',
      canCancelUntil: json['canCancelUntil'] ?? '',
      qrCodeData: json['qrCodeData'] ?? '',
    );
  }
}
