// Comprehensive South Indian Geospatial Data
// This file offloads massive GeoJSON representations to maintain component performance.

export const STATE_GEO_DATA = [
  {
    name: 'Karnataka',
    code: 'ST29',
    lgdCode: 29,
    center: [15.3173, 75.7139],
    districts: ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Hubballi-Dharwad', 'Mangaluru', 'Belagavi', 'Kalaburagi', 'Ballari', 'Vijayapura', 'Udupi'],
    polygon: [
      [18.5, 77.0], [16.5, 77.5], [14.0, 78.0], [11.5, 77.0], 
      [12.0, 75.0], [14.5, 74.0], [16.0, 74.5], [18.0, 75.5]
    ]
  },
  {
    name: 'Tamil Nadu',
    code: 'ST33',
    lgdCode: 33,
    center: [11.1271, 78.6569],
    districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Tiruppur'],
    polygon: [
      [13.5, 80.2], [11.0, 79.8], [9.5, 79.0], [8.0, 77.5], 
      [9.0, 77.0], [10.5, 76.5], [12.0, 77.5], [13.0, 79.0]
    ]
  },
  {
    name: 'Kerala',
    code: 'ST32',
    lgdCode: 32,
    center: [10.8505, 76.2711],
    districts: ['Thiruvananthapuram', 'Kochi (Ernakulam)', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur', 'Alappuzha', 'Kottayam', 'Palakkad', 'Malappuram'],
    polygon: [
      [12.8, 75.0], [11.0, 76.0], [9.5, 77.0], [8.2, 77.2], 
      [8.5, 76.8], [10.0, 76.0], [11.5, 75.5]
    ]
  },
  {
    name: 'Andhra Pradesh',
    code: 'ST28',
    lgdCode: 28,
    center: [15.9129, 79.7400],
    districts: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Anantapur', 'Kadapa', 'Eluru'],
    polygon: [
      [19.0, 84.0], [17.5, 82.5], [15.0, 80.0], [13.5, 80.2], 
      [13.0, 79.0], [14.0, 78.0], [16.0, 79.0], [18.0, 81.0]
    ]
  },
  {
    name: 'Telangana',
    code: 'ST36',
    lgdCode: 36,
    center: [18.1124, 79.0193],
    districts: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahabubnagar', 'Nalgonda', 'Adilabad', 'Suryapet'],
    polygon: [
      [19.5, 78.0], [18.5, 80.5], [17.0, 81.0], [16.5, 80.0], 
      [16.0, 78.0], [17.5, 77.0], [18.5, 77.5]
    ]
  },
  // Adding Maharashtra back to not break the fallback state
  {
    name: 'Maharashtra',
    code: 'ST27',
    lgdCode: 27,
    center: [19.7515, 75.7139],
    districts: ['Pune', 'Mumbai Suburban', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad'],
    polygon: [
      [20.0, 72.8], [21.5, 74.0], [21.8, 78.5], [20.5, 80.5], 
      [18.5, 80.0], [15.8, 74.2], [18.0, 73.0]
    ]
  }
];

export const DISTRICT_DATA = [
  // Karnataka Full Districts
  { name: 'Bagalkot', state: 'Karnataka', code: 'DTKA01', coords: [16.1817, 75.6958], disputes: 'Medium', areaSqKm: 6575, titlingRate: 85, type: 'Agricultural' },
  { name: 'Ballari', state: 'Karnataka', code: 'DTKA02', coords: [15.1394, 76.9214], disputes: 'High', areaSqKm: 8447, titlingRate: 80, type: 'Mining' },
  { name: 'Belagavi', state: 'Karnataka', code: 'DTKA03', coords: [15.8497, 74.4977], disputes: 'High', areaSqKm: 13415, titlingRate: 82, type: 'Mixed Use' },
  { name: 'Bengaluru Rural', state: 'Karnataka', code: 'DTKA04', coords: [13.2965, 77.6746], disputes: 'High', areaSqKm: 2298, titlingRate: 90, type: 'Peri-Urban' },
  { name: 'Bengaluru Urban', state: 'Karnataka', code: 'DTKA05', coords: [12.9716, 77.5946], disputes: 'High', areaSqKm: 2196, titlingRate: 92, type: 'Urban Hub' },
  { name: 'Bidar', state: 'Karnataka', code: 'DTKA06', coords: [17.9104, 77.5199], disputes: 'Low', areaSqKm: 5448, titlingRate: 88, type: 'Agricultural' },
  { name: 'Chamarajanagar', state: 'Karnataka', code: 'DTKA07', coords: [11.9261, 76.9437], disputes: 'Low', areaSqKm: 5101, titlingRate: 86, type: 'Forest Fringe' },
  { name: 'Chikkaballapur', state: 'Karnataka', code: 'DTKA08', coords: [13.4325, 77.7275], disputes: 'Medium', areaSqKm: 4244, titlingRate: 84, type: 'Agricultural' },
  { name: 'Chikkamagaluru', state: 'Karnataka', code: 'DTKA09', coords: [13.3161, 75.7720], disputes: 'Low', areaSqKm: 7201, titlingRate: 85, type: 'Forest/Plantation' },
  { name: 'Chitradurga', state: 'Karnataka', code: 'DTKA10', coords: [14.2251, 76.4010], disputes: 'Low', areaSqKm: 8440, titlingRate: 83, type: 'Agricultural' },
  { name: 'Dakshina Kannada', state: 'Karnataka', code: 'DTKA11', coords: [12.9141, 74.8560], disputes: 'Low', areaSqKm: 4560, titlingRate: 94, type: 'Coastal' },
  { name: 'Davanagere', state: 'Karnataka', code: 'DTKA12', coords: [14.4644, 75.9218], disputes: 'Medium', areaSqKm: 5924, titlingRate: 87, type: 'Agricultural' },
  { name: 'Dharwad', state: 'Karnataka', code: 'DTKA13', coords: [15.4589, 75.0078], disputes: 'Medium', areaSqKm: 4260, titlingRate: 88, type: 'Mixed Use' },
  { name: 'Gadag', state: 'Karnataka', code: 'DTKA14', coords: [15.4283, 75.6322], disputes: 'Low', areaSqKm: 4656, titlingRate: 89, type: 'Agricultural' },
  { name: 'Hassan', state: 'Karnataka', code: 'DTKA15', coords: [13.0098, 76.1028], disputes: 'Medium', areaSqKm: 6814, titlingRate: 86, type: 'Agricultural' },
  { name: 'Haveri', state: 'Karnataka', code: 'DTKA16', coords: [14.7949, 75.4011], disputes: 'Low', areaSqKm: 4823, titlingRate: 84, type: 'Agricultural' },
  { name: 'Kalaburagi', state: 'Karnataka', code: 'DTKA17', coords: [17.3297, 76.8343], disputes: 'High', areaSqKm: 10951, titlingRate: 81, type: 'Agricultural' },
  { name: 'Kodagu', state: 'Karnataka', code: 'DTKA18', coords: [12.3375, 75.8069], disputes: 'Low', areaSqKm: 4102, titlingRate: 88, type: 'Plantation' },
  { name: 'Kolar', state: 'Karnataka', code: 'DTKA19', coords: [13.1367, 78.1291], disputes: 'Medium', areaSqKm: 3969, titlingRate: 85, type: 'Agricultural' },
  { name: 'Koppal', state: 'Karnataka', code: 'DTKA20', coords: [15.3468, 76.1554], disputes: 'Low', areaSqKm: 5570, titlingRate: 86, type: 'Agricultural' },
  { name: 'Mandya', state: 'Karnataka', code: 'DTKA21', coords: [12.5218, 76.8951], disputes: 'Medium', areaSqKm: 4961, titlingRate: 87, type: 'Agricultural' },
  { name: 'Mysuru', state: 'Karnataka', code: 'DTKA22', coords: [12.2958, 76.6394], disputes: 'Medium', areaSqKm: 6854, titlingRate: 91, type: 'Mixed Use' },
  { name: 'Raichur', state: 'Karnataka', code: 'DTKA23', coords: [16.2076, 77.3463], disputes: 'Medium', areaSqKm: 8440, titlingRate: 82, type: 'Agricultural' },
  { name: 'Ramanagara', state: 'Karnataka', code: 'DTKA24', coords: [12.7150, 77.2812], disputes: 'High', areaSqKm: 3516, titlingRate: 88, type: 'Peri-Urban' },
  { name: 'Shivamogga', state: 'Karnataka', code: 'DTKA25', coords: [13.9299, 75.5681], disputes: 'Low', areaSqKm: 8477, titlingRate: 87, type: 'Forest Fringe' },
  { name: 'Tumakuru', state: 'Karnataka', code: 'DTKA26', coords: [13.3392, 77.1016], disputes: 'Medium', areaSqKm: 10597, titlingRate: 85, type: 'Industrial' },
  { name: 'Udupi', state: 'Karnataka', code: 'DTKA27', coords: [13.3409, 74.7421], disputes: 'Low', areaSqKm: 3880, titlingRate: 95, type: 'Coastal' },
  { name: 'Uttara Kannada', state: 'Karnataka', code: 'DTKA28', coords: [14.8021, 74.7925], disputes: 'Low', areaSqKm: 10291, titlingRate: 92, type: 'Coastal/Forest' },
  { name: 'Vijayapura', state: 'Karnataka', code: 'DTKA29', coords: [16.8302, 75.7100], disputes: 'Medium', areaSqKm: 10494, titlingRate: 84, type: 'Agricultural' },
  { name: 'Yadgir', state: 'Karnataka', code: 'DTKA30', coords: [16.7670, 77.1404], disputes: 'Low', areaSqKm: 5273, titlingRate: 82, type: 'Agricultural' },
  { name: 'Vijayanagara', state: 'Karnataka', code: 'DTKA31', coords: [15.2755, 76.3887], disputes: 'Medium', areaSqKm: 5644, titlingRate: 84, type: 'Mixed Use' },

  // Tamil Nadu Full Districts (Sample for key ones, plus generic fill)
  { name: 'Chennai', state: 'Tamil Nadu', code: 'DTTN01', coords: [13.0827, 80.2707], disputes: 'High', areaSqKm: 426, titlingRate: 88, type: 'Urban Hub' },
  { name: 'Coimbatore', state: 'Tamil Nadu', code: 'DTTN02', coords: [11.0168, 76.9558], disputes: 'Medium', areaSqKm: 4723, titlingRate: 90, type: 'Industrial' },
  { name: 'Madurai', state: 'Tamil Nadu', code: 'DTTN03', coords: [9.9252, 78.1198], disputes: 'Medium', areaSqKm: 3741, titlingRate: 86, type: 'Agricultural' },
  { name: 'Ariyalur', state: 'Tamil Nadu', code: 'DTTN04', coords: [11.1401, 79.0786], disputes: 'Low', areaSqKm: 1949, titlingRate: 88, type: 'Mixed Use' },
  { name: 'Chengalpattu', state: 'Tamil Nadu', code: 'DTTN05', coords: [12.6841, 79.9836], disputes: 'High', areaSqKm: 2944, titlingRate: 85, type: 'Peri-Urban' },
  { name: 'Cuddalore', state: 'Tamil Nadu', code: 'DTTN06', coords: [11.7480, 79.7714], disputes: 'Medium', areaSqKm: 3703, titlingRate: 87, type: 'Coastal' },
  { name: 'Dharmapuri', state: 'Tamil Nadu', code: 'DTTN07', coords: [12.1211, 78.1582], disputes: 'Low', areaSqKm: 4497, titlingRate: 84, type: 'Agricultural' },
  { name: 'Dindigul', state: 'Tamil Nadu', code: 'DTTN08', coords: [10.3673, 77.9803], disputes: 'Medium', areaSqKm: 6266, titlingRate: 85, type: 'Agricultural' },
  { name: 'Erode', state: 'Tamil Nadu', code: 'DTTN09', coords: [11.3410, 77.7172], disputes: 'Low', areaSqKm: 5722, titlingRate: 89, type: 'Industrial' },
  { name: 'Kallakurichi', state: 'Tamil Nadu', code: 'DTTN10', coords: [11.7389, 78.9625], disputes: 'Low', areaSqKm: 3520, titlingRate: 86, type: 'Agricultural' },
  { name: 'Kanchipuram', state: 'Tamil Nadu', code: 'DTTN11', coords: [12.8342, 79.7036], disputes: 'High', areaSqKm: 1656, titlingRate: 88, type: 'Industrial' },
  { name: 'Kanyakumari', state: 'Tamil Nadu', code: 'DTTN12', coords: [8.0883, 77.5385], disputes: 'Low', areaSqKm: 1672, titlingRate: 92, type: 'Coastal' },
  { name: 'Karur', state: 'Tamil Nadu', code: 'DTTN13', coords: [10.9504, 78.0833], disputes: 'Medium', areaSqKm: 2895, titlingRate: 87, type: 'Industrial' },
  { name: 'Krishnagiri', state: 'Tamil Nadu', code: 'DTTN14', coords: [12.5186, 78.2137], disputes: 'Medium', areaSqKm: 5143, titlingRate: 85, type: 'Industrial' },
  { name: 'Mayiladuthurai', state: 'Tamil Nadu', code: 'DTTN15', coords: [11.1085, 79.6534], disputes: 'Low', areaSqKm: 1172, titlingRate: 89, type: 'Coastal' },
  { name: 'Nagapattinam', state: 'Tamil Nadu', code: 'DTTN16', coords: [10.7656, 79.8424], disputes: 'Medium', areaSqKm: 1397, titlingRate: 87, type: 'Coastal' },
  { name: 'Namakkal', state: 'Tamil Nadu', code: 'DTTN17', coords: [11.2189, 78.1674], disputes: 'Low', areaSqKm: 3368, titlingRate: 86, type: 'Agricultural' },
  { name: 'Nilgiris', state: 'Tamil Nadu', code: 'DTTN18', coords: [11.4916, 76.7337], disputes: 'Low', areaSqKm: 2565, titlingRate: 93, type: 'Plantation' },
  { name: 'Perambalur', state: 'Tamil Nadu', code: 'DTTN19', coords: [11.2342, 78.8809], disputes: 'Low', areaSqKm: 1757, titlingRate: 88, type: 'Agricultural' },
  { name: 'Pudukkottai', state: 'Tamil Nadu', code: 'DTTN20', coords: [10.3797, 78.8205], disputes: 'Low', areaSqKm: 4663, titlingRate: 85, type: 'Agricultural' },
  { name: 'Ramanathapuram', state: 'Tamil Nadu', code: 'DTTN21', coords: [9.3639, 78.8321], disputes: 'Low', areaSqKm: 4123, titlingRate: 84, type: 'Coastal' },
  { name: 'Ranipet', state: 'Tamil Nadu', code: 'DTTN22', coords: [12.9272, 79.3330], disputes: 'Medium', areaSqKm: 2234, titlingRate: 86, type: 'Industrial' },
  { name: 'Salem', state: 'Tamil Nadu', code: 'DTTN23', coords: [11.6643, 78.1460], disputes: 'High', areaSqKm: 5205, titlingRate: 88, type: 'Mixed Use' },
  { name: 'Sivaganga', state: 'Tamil Nadu', code: 'DTTN24', coords: [9.8433, 78.4809], disputes: 'Low', areaSqKm: 4189, titlingRate: 85, type: 'Agricultural' },
  { name: 'Tenkasi', state: 'Tamil Nadu', code: 'DTTN25', coords: [8.9564, 77.3151], disputes: 'Low', areaSqKm: 2916, titlingRate: 87, type: 'Agricultural' },
  { name: 'Thanjavur', state: 'Tamil Nadu', code: 'DTTN26', coords: [10.7870, 79.1378], disputes: 'Medium', areaSqKm: 3411, titlingRate: 89, type: 'Agricultural' },
  { name: 'Theni', state: 'Tamil Nadu', code: 'DTTN27', coords: [10.0097, 77.4776], disputes: 'Low', areaSqKm: 2868, titlingRate: 86, type: 'Agricultural' },
  { name: 'Thoothukudi', state: 'Tamil Nadu', code: 'DTTN28', coords: [8.7642, 78.1348], disputes: 'Medium', areaSqKm: 4745, titlingRate: 88, type: 'Coastal' },
  { name: 'Tiruchirappalli', state: 'Tamil Nadu', code: 'DTTN29', coords: [10.7905, 78.7047], disputes: 'High', areaSqKm: 4404, titlingRate: 89, type: 'Urban Hub' },
  { name: 'Tirunelveli', state: 'Tamil Nadu', code: 'DTTN30', coords: [8.7139, 77.7567], disputes: 'Medium', areaSqKm: 3842, titlingRate: 88, type: 'Mixed Use' },
  { name: 'Tirupathur', state: 'Tamil Nadu', code: 'DTTN31', coords: [12.4947, 78.5684], disputes: 'Low', areaSqKm: 1792, titlingRate: 85, type: 'Agricultural' },
  { name: 'Tiruppur', state: 'Tamil Nadu', code: 'DTTN32', coords: [11.1085, 77.3411], disputes: 'Medium', areaSqKm: 5186, titlingRate: 90, type: 'Industrial' },
  { name: 'Tiruvallur', state: 'Tamil Nadu', code: 'DTTN33', coords: [13.1432, 79.9071], disputes: 'High', areaSqKm: 3422, titlingRate: 87, type: 'Peri-Urban' },
  { name: 'Tiruvannamalai', state: 'Tamil Nadu', code: 'DTTN34', coords: [12.2253, 79.0747], disputes: 'Low', areaSqKm: 6188, titlingRate: 86, type: 'Agricultural' },
  { name: 'Tiruvarur', state: 'Tamil Nadu', code: 'DTTN35', coords: [10.7661, 79.6344], disputes: 'Low', areaSqKm: 2161, titlingRate: 87, type: 'Agricultural' },
  { name: 'Vellore', state: 'Tamil Nadu', code: 'DTTN36', coords: [12.9165, 79.1325], disputes: 'High', areaSqKm: 2030, titlingRate: 89, type: 'Mixed Use' },
  { name: 'Viluppuram', state: 'Tamil Nadu', code: 'DTTN37', coords: [11.9401, 79.4861], disputes: 'Medium', areaSqKm: 3725, titlingRate: 85, type: 'Agricultural' },
  { name: 'Virudhunagar', state: 'Tamil Nadu', code: 'DTTN38', coords: [9.5872, 77.9620], disputes: 'Medium', areaSqKm: 4241, titlingRate: 86, type: 'Industrial' },

  // Kerala Full Districts
  { name: 'Thiruvananthapuram', state: 'Kerala', code: 'DTKL01', coords: [8.5241, 76.9366], disputes: 'Medium', areaSqKm: 2192, titlingRate: 95, type: 'Mixed Use' },
  { name: 'Kochi (Ernakulam)', state: 'Kerala', code: 'DTKL02', coords: [9.9816, 76.2999], disputes: 'High', areaSqKm: 3068, titlingRate: 92, type: 'Coastal Urban' },
  { name: 'Kozhikode', state: 'Kerala', code: 'DTKL03', coords: [11.2588, 75.7804], disputes: 'Low', areaSqKm: 2344, titlingRate: 96, type: 'Coastal' },
  { name: 'Alappuzha', state: 'Kerala', code: 'DTKL04', coords: [9.4981, 76.3388], disputes: 'Low', areaSqKm: 1414, titlingRate: 94, type: 'Coastal' },
  { name: 'Idukki', state: 'Kerala', code: 'DTKL05', coords: [9.8517, 76.9745], disputes: 'Medium', areaSqKm: 4358, titlingRate: 88, type: 'Plantation/Forest' },
  { name: 'Kannur', state: 'Kerala', code: 'DTKL06', coords: [11.8745, 75.3704], disputes: 'Low', areaSqKm: 2966, titlingRate: 93, type: 'Coastal' },
  { name: 'Kasaragod', state: 'Kerala', code: 'DTKL07', coords: [12.4996, 74.9869], disputes: 'Low', areaSqKm: 1992, titlingRate: 92, type: 'Coastal' },
  { name: 'Kollam', state: 'Kerala', code: 'DTKL08', coords: [8.8932, 76.6141], disputes: 'Low', areaSqKm: 2491, titlingRate: 94, type: 'Coastal' },
  { name: 'Kottayam', state: 'Kerala', code: 'DTKL09', coords: [9.5916, 76.5222], disputes: 'Low', areaSqKm: 2208, titlingRate: 95, type: 'Agricultural' },
  { name: 'Malappuram', state: 'Kerala', code: 'DTKL10', coords: [11.0733, 76.0740], disputes: 'Medium', areaSqKm: 3550, titlingRate: 90, type: 'Mixed Use' },
  { name: 'Palakkad', state: 'Kerala', code: 'DTKL11', coords: [10.7867, 76.6548], disputes: 'Medium', areaSqKm: 4480, titlingRate: 89, type: 'Agricultural' },
  { name: 'Pathanamthitta', state: 'Kerala', code: 'DTKL12', coords: [9.2648, 76.7870], disputes: 'Low', areaSqKm: 2637, titlingRate: 93, type: 'Plantation' },
  { name: 'Thrissur', state: 'Kerala', code: 'DTKL13', coords: [10.5276, 76.2144], disputes: 'Medium', areaSqKm: 3032, titlingRate: 92, type: 'Mixed Use' },
  { name: 'Wayanad', state: 'Kerala', code: 'DTKL14', coords: [11.6854, 76.1320], disputes: 'Medium', areaSqKm: 2131, titlingRate: 86, type: 'Plantation/Forest' },

  // Andhra Pradesh Full Districts
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', code: 'DTAP01', coords: [17.6868, 83.2185], disputes: 'High', areaSqKm: 1048, titlingRate: 84, type: 'Coastal Industrial' },
  { name: 'Vijayawada (NTR)', state: 'Andhra Pradesh', code: 'DTAP02', coords: [16.5062, 80.6480], disputes: 'Medium', areaSqKm: 3316, titlingRate: 87, type: 'Urban Hub' },
  { name: 'Tirupati', state: 'Andhra Pradesh', code: 'DTAP03', coords: [13.6288, 79.4192], disputes: 'Low', areaSqKm: 8231, titlingRate: 89, type: 'Mixed Use' },
  { name: 'Alluri Sitharama Raju', state: 'Andhra Pradesh', code: 'DTAP04', coords: [17.9124, 82.2619], disputes: 'Medium', areaSqKm: 12251, titlingRate: 78, type: 'Tribal/Forest' },
  { name: 'Anakapalli', state: 'Andhra Pradesh', code: 'DTAP05', coords: [17.6896, 83.0039], disputes: 'Low', areaSqKm: 4292, titlingRate: 85, type: 'Mixed Use' },
  { name: 'Anantapur', state: 'Andhra Pradesh', code: 'DTAP06', coords: [14.6819, 77.6006], disputes: 'Low', areaSqKm: 10205, titlingRate: 88, type: 'Agricultural' },
  { name: 'Annamayya', state: 'Andhra Pradesh', code: 'DTAP07', coords: [14.2140, 79.1360], disputes: 'Medium', areaSqKm: 7954, titlingRate: 85, type: 'Agricultural' },
  { name: 'Bapatla', state: 'Andhra Pradesh', code: 'DTAP08', coords: [15.9048, 80.4678], disputes: 'Low', areaSqKm: 3829, titlingRate: 87, type: 'Coastal' },
  { name: 'Chittoor', state: 'Andhra Pradesh', code: 'DTAP09', coords: [13.2172, 79.1003], disputes: 'Medium', areaSqKm: 6855, titlingRate: 86, type: 'Agricultural' },
  { name: 'Dr. B.R. Ambedkar Konaseema', state: 'Andhra Pradesh', code: 'DTAP10', coords: [16.5746, 81.9868], disputes: 'Low', areaSqKm: 2083, titlingRate: 89, type: 'Coastal/Agricultural' },
  { name: 'East Godavari', state: 'Andhra Pradesh', code: 'DTAP11', coords: [17.0005, 81.8040], disputes: 'Medium', areaSqKm: 3186, titlingRate: 87, type: 'Agricultural' },
  { name: 'Eluru', state: 'Andhra Pradesh', code: 'DTAP12', coords: [16.7107, 81.1031], disputes: 'Low', areaSqKm: 6679, titlingRate: 88, type: 'Agricultural' },
  { name: 'Guntur', state: 'Andhra Pradesh', code: 'DTAP13', coords: [16.2997, 80.4577], disputes: 'High', areaSqKm: 2443, titlingRate: 86, type: 'Urban Hub' },
  { name: 'Kakinada', state: 'Andhra Pradesh', code: 'DTAP14', coords: [16.9891, 82.2475], disputes: 'Medium', areaSqKm: 3019, titlingRate: 85, type: 'Coastal Industrial' },
  { name: 'Krishna', state: 'Andhra Pradesh', code: 'DTAP15', coords: [16.1818, 81.1352], disputes: 'Low', areaSqKm: 3775, titlingRate: 88, type: 'Agricultural' },
  { name: 'Kurnool', state: 'Andhra Pradesh', code: 'DTAP16', coords: [15.8281, 78.0373], disputes: 'Medium', areaSqKm: 7980, titlingRate: 85, type: 'Mixed Use' },
  { name: 'Nandyal', state: 'Andhra Pradesh', code: 'DTAP17', coords: [15.4851, 78.4862], disputes: 'Low', areaSqKm: 9682, titlingRate: 84, type: 'Agricultural' },
  { name: 'Palnadu', state: 'Andhra Pradesh', code: 'DTAP18', coords: [16.2625, 79.9178], disputes: 'Medium', areaSqKm: 7301, titlingRate: 86, type: 'Agricultural' },
  { name: 'Parvathipuram Manyam', state: 'Andhra Pradesh', code: 'DTAP19', coords: [18.7753, 83.4244], disputes: 'Medium', areaSqKm: 3659, titlingRate: 80, type: 'Tribal/Forest' },
  { name: 'Prakasam', state: 'Andhra Pradesh', code: 'DTAP20', coords: [15.5057, 80.0499], disputes: 'Low', areaSqKm: 14322, titlingRate: 85, type: 'Agricultural' },
  { name: 'Sri Potti Sriramulu Nellore', state: 'Andhra Pradesh', code: 'DTAP21', coords: [14.4426, 79.9865], disputes: 'Low', areaSqKm: 10441, titlingRate: 87, type: 'Coastal' },
  { name: 'Sri Sathya Sai', state: 'Andhra Pradesh', code: 'DTAP22', coords: [14.1685, 77.8093], disputes: 'Low', areaSqKm: 8925, titlingRate: 88, type: 'Agricultural' },
  { name: 'Srikakulam', state: 'Andhra Pradesh', code: 'DTAP23', coords: [18.2949, 83.8938], disputes: 'Medium', areaSqKm: 4591, titlingRate: 86, type: 'Coastal' },
  { name: 'Vizianagaram', state: 'Andhra Pradesh', code: 'DTAP24', coords: [18.1133, 83.3977], disputes: 'Low', areaSqKm: 4122, titlingRate: 85, type: 'Agricultural' },
  { name: 'West Godavari', state: 'Andhra Pradesh', code: 'DTAP25', coords: [16.5447, 81.5212], disputes: 'Low', areaSqKm: 2178, titlingRate: 89, type: 'Agricultural' },
  { name: 'Y.S.R. Kadapa', state: 'Andhra Pradesh', code: 'DTAP26', coords: [14.4673, 78.8242], disputes: 'Medium', areaSqKm: 11228, titlingRate: 86, type: 'Agricultural' },

  // Telangana Full Districts
  { name: 'Hyderabad', state: 'Telangana', code: 'DTTS01', coords: [17.3850, 78.4867], disputes: 'High', areaSqKm: 217, titlingRate: 86, type: 'Urban Hub' },
  { name: 'Warangal', state: 'Telangana', code: 'DTTS02', coords: [17.9689, 79.5941], disputes: 'Medium', areaSqKm: 1305, titlingRate: 82, type: 'Agricultural' },
  { name: 'Karimnagar', state: 'Telangana', code: 'DTTS03', coords: [18.4386, 79.1288], disputes: 'Low', areaSqKm: 2128, titlingRate: 85, type: 'Agricultural' },
  { name: 'Adilabad', state: 'Telangana', code: 'DTTS04', coords: [19.6641, 78.5320], disputes: 'Low', areaSqKm: 4153, titlingRate: 80, type: 'Agricultural' },
  { name: 'Bhadradri Kothagudem', state: 'Telangana', code: 'DTTS05', coords: [17.5255, 80.6139], disputes: 'Medium', areaSqKm: 7483, titlingRate: 78, type: 'Forest/Mining' },
  { name: 'Jagtial', state: 'Telangana', code: 'DTTS06', coords: [18.7953, 78.9189], disputes: 'Low', areaSqKm: 2419, titlingRate: 86, type: 'Agricultural' },
  { name: 'Jangaon', state: 'Telangana', code: 'DTTS07', coords: [17.7262, 79.1678], disputes: 'Low', areaSqKm: 2188, titlingRate: 88, type: 'Agricultural' },
  { name: 'Jayashankar Bhupalpally', state: 'Telangana', code: 'DTTS08', coords: [18.4312, 79.8407], disputes: 'Medium', areaSqKm: 6175, titlingRate: 80, type: 'Forest' },
  { name: 'Jogulamba Gadwal', state: 'Telangana', code: 'DTTS09', coords: [16.2238, 77.8016], disputes: 'Low', areaSqKm: 2928, titlingRate: 86, type: 'Agricultural' },
  { name: 'Kamareddy', state: 'Telangana', code: 'DTTS10', coords: [18.3182, 78.3370], disputes: 'Low', areaSqKm: 3652, titlingRate: 85, type: 'Agricultural' },
  { name: 'Khammam', state: 'Telangana', code: 'DTTS11', coords: [17.2473, 80.1514], disputes: 'Medium', areaSqKm: 4361, titlingRate: 84, type: 'Mixed Use' },
  { name: 'Komaram Bheem Asifabad', state: 'Telangana', code: 'DTTS12', coords: [19.3623, 79.2882], disputes: 'Medium', areaSqKm: 4878, titlingRate: 75, type: 'Tribal/Forest' },
  { name: 'Mahabubabad', state: 'Telangana', code: 'DTTS13', coords: [17.6062, 80.0076], disputes: 'Low', areaSqKm: 2877, titlingRate: 82, type: 'Agricultural' },
  { name: 'Mahabubnagar', state: 'Telangana', code: 'DTTS14', coords: [16.7453, 78.0069], disputes: 'Medium', areaSqKm: 5286, titlingRate: 85, type: 'Agricultural' },
  { name: 'Mancherial', state: 'Telangana', code: 'DTTS15', coords: [18.8710, 79.4447], disputes: 'Low', areaSqKm: 4016, titlingRate: 81, type: 'Mining' },
  { name: 'Medak', state: 'Telangana', code: 'DTTS16', coords: [18.0436, 78.2618], disputes: 'Low', areaSqKm: 2786, titlingRate: 86, type: 'Agricultural' },
  { name: 'Medchal-Malkajgiri', state: 'Telangana', code: 'DTTS17', coords: [17.5147, 78.5292], disputes: 'High', areaSqKm: 1084, titlingRate: 89, type: 'Peri-Urban' },
  { name: 'Mulugu', state: 'Telangana', code: 'DTTS18', coords: [18.1887, 80.0039], disputes: 'Medium', areaSqKm: 3881, titlingRate: 77, type: 'Tribal/Forest' },
  { name: 'Nagarkurnool', state: 'Telangana', code: 'DTTS19', coords: [16.4862, 78.3183], disputes: 'Low', areaSqKm: 6545, titlingRate: 83, type: 'Agricultural/Forest' },
  { name: 'Nalgonda', state: 'Telangana', code: 'DTTS20', coords: [17.0500, 79.2700], disputes: 'Medium', areaSqKm: 7122, titlingRate: 87, type: 'Agricultural' },
  { name: 'Narayanpet', state: 'Telangana', code: 'DTTS21', coords: [16.7323, 77.4984], disputes: 'Low', areaSqKm: 2336, titlingRate: 85, type: 'Agricultural' },
  { name: 'Nirmal', state: 'Telangana', code: 'DTTS22', coords: [19.0964, 78.3430], disputes: 'Low', areaSqKm: 3845, titlingRate: 84, type: 'Agricultural' },
  { name: 'Nizamabad', state: 'Telangana', code: 'DTTS23', coords: [18.6705, 78.0996], disputes: 'Medium', areaSqKm: 4288, titlingRate: 86, type: 'Agricultural' },
  { name: 'Peddapalli', state: 'Telangana', code: 'DTTS24', coords: [18.6186, 79.3753], disputes: 'Low', areaSqKm: 2236, titlingRate: 85, type: 'Industrial' },
  { name: 'Rajanna Sircilla', state: 'Telangana', code: 'DTTS25', coords: [18.3972, 78.8252], disputes: 'Low', areaSqKm: 2019, titlingRate: 87, type: 'Agricultural' },
  { name: 'Rangareddy', state: 'Telangana', code: 'DTTS26', coords: [17.3377, 78.0968], disputes: 'High', areaSqKm: 5031, titlingRate: 88, type: 'Peri-Urban' },
  { name: 'Sangareddy', state: 'Telangana', code: 'DTTS27', coords: [17.6253, 78.0833], disputes: 'Medium', areaSqKm: 4403, titlingRate: 86, type: 'Industrial' },
  { name: 'Siddipet', state: 'Telangana', code: 'DTTS28', coords: [18.0988, 78.8475], disputes: 'Low', areaSqKm: 3632, titlingRate: 88, type: 'Agricultural' },
  { name: 'Suryapet', state: 'Telangana', code: 'DTTS29', coords: [17.1353, 79.6251], disputes: 'Low', areaSqKm: 3607, titlingRate: 89, type: 'Agricultural' },
  { name: 'Vikarabad', state: 'Telangana', code: 'DTTS30', coords: [17.3333, 77.9000], disputes: 'Low', areaSqKm: 3386, titlingRate: 85, type: 'Agricultural' },
  { name: 'Wanaparthy', state: 'Telangana', code: 'DTTS31', coords: [16.3571, 78.0645], disputes: 'Low', areaSqKm: 2152, titlingRate: 87, type: 'Agricultural' },
  { name: 'Hanamkonda', state: 'Telangana', code: 'DTTS32', coords: [18.0076, 79.5583], disputes: 'Medium', areaSqKm: 1309, titlingRate: 85, type: 'Mixed Use' },
  { name: 'Yadadri Bhuvanagiri', state: 'Telangana', code: 'DTTS33', coords: [17.5113, 78.8770], disputes: 'Low', areaSqKm: 3092, titlingRate: 88, type: 'Peri-Urban' },

  // Maharashtra Fallback
  { name: 'Pune', state: 'Maharashtra', code: 'DT2725', coords: [18.5204, 73.8567], disputes: 'High', areaSqKm: 15643, titlingRate: 84, type: 'Urban Hub' },
  { name: 'Mumbai Suburban', state: 'Maharashtra', code: 'DT2721', coords: [19.0760, 72.8777], disputes: 'High', areaSqKm: 446, titlingRate: 92, type: 'Urban Hub' }
];

// Procedural Generator for Taluk Boundaries to simulate national granularity 
// without crashing the browser with millions of polygons.
export const generateTalukBoundaries = (districtCoords) => {
  const taluks = [];
  // Generate 4-6 taluks surrounding the district center
  const numTaluks = Math.floor(Math.random() * 3) + 4;
  const radius = 0.15; // Rough coordinate distance

  for (let i = 0; i < numTaluks; i++) {
    const angle = (i / numTaluks) * Math.PI * 2;
    const tLat = districtCoords[0] + Math.cos(angle) * radius;
    const tLng = districtCoords[1] + Math.sin(angle) * radius;
    
    taluks.push({
      id: `TLK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      name: `Taluk ${String.fromCharCode(65 + i)}`,
      center: [tLat, tLng],
      polygon: [
        [tLat + 0.05, tLng - 0.05],
        [tLat + 0.06, tLng + 0.04],
        [tLat - 0.04, tLng + 0.06],
        [tLat - 0.06, tLng - 0.04]
      ]
    });
  }
  return taluks;
};

export const generateVillageCadastre = (talukCoords) => {
  const villages = [];
  // Generate 15-20 village grids per taluk
  const numVillages = Math.floor(Math.random() * 6) + 15;
  const spread = 0.04; 

  for (let i = 0; i < numVillages; i++) {
    const vLat = talukCoords[0] + (Math.random() - 0.5) * spread;
    const vLng = talukCoords[1] + (Math.random() - 0.5) * spread;
    
    // Simulate a small village parcel polygon (SVAMITVA drone survey grid)
    const size = 0.003; 
    villages.push({
      id: `VLG-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      center: [vLat, vLng],
      polygon: [
        [vLat + size, vLng - size],
        [vLat + size, vLng + size],
        [vLat - size, vLng + size],
        [vLat - size, vLng - size]
      ],
      disputed: Math.random() > 0.8 // 20% chance of dispute
    });
  }
  return villages;
};
