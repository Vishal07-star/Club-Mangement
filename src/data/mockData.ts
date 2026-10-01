// ============================================================
// MOCK DATA — All sample data for the ClubHub demo
// ============================================================

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  membership: 'Premium' | 'Standard' | 'Basic';
  joinDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Pending';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  attendance: number;
  avatar?: string;
}

export interface Payment {
  id: string;
  transactionId: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  method: 'UPI' | 'Card' | 'Cash' | 'Bank Transfer';
  status: 'Paid' | 'Pending' | 'Failed';
  description: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  description: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface Facility {
  id: string;
  name: string;
  status: 'Available' | 'Booked' | 'Maintenance';
  capacity: number;
  todayBookings: number;
  description: string;
  icon: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: 'High' | 'Medium' | 'Low';
}

// ── MEMBERS ──────────────────────────────────────────────────
export const initialMembers: Member[] = [
  { id: 'CM-1001', name: 'Rahul Sharma',    email: 'rahul.sharma@email.com',    phone: '+91 98401 23456', dob: '15 Mar 1992', address: '12, Anna Nagar, Chennai, TN', membership: 'Premium',  joinDate: '12 Sep 2026', expiryDate: '11 Sep 2027', status: 'Active',  paymentStatus: 'Paid',    attendance: 42 },
  { id: 'CM-1002', name: 'Priya Singh',     email: 'priya.singh@email.com',     phone: '+91 98765 34567', dob: '22 Jul 1995', address: '45, Velachery, Chennai, TN', membership: 'Standard', joinDate: '10 Sep 2026', expiryDate: '09 Sep 2027', status: 'Active',  paymentStatus: 'Paid',    attendance: 38 },
  { id: 'CM-1003', name: 'Arjun Kumar',     email: 'arjun.kumar@email.com',     phone: '+91 99400 56789', dob: '08 Jan 1990', address: '78, T. Nagar, Chennai, TN',  membership: 'Basic',    joinDate: '08 Sep 2026', expiryDate: '07 Sep 2027', status: 'Active',  paymentStatus: 'Paid',    attendance: 25 },
  { id: 'CM-1004', name: 'Sneha Patel',     email: 'sneha.patel@email.com',     phone: '+91 87654 23456', dob: '30 Nov 1993', address: '23, Adyar, Chennai, TN',     membership: 'Premium',  joinDate: '05 Sep 2026', expiryDate: '04 Sep 2027', status: 'Active',  paymentStatus: 'Paid',    attendance: 55 },
  { id: 'CM-1005', name: 'Vikram Reddy',    email: 'vikram.reddy@email.com',    phone: '+91 96543 12345', dob: '14 May 1988', address: '67, Kodambakkam, Chennai, TN', membership: 'Standard', joinDate: '01 Sep 2026', expiryDate: '31 Aug 2027', status: 'Active',  paymentStatus: 'Paid',    attendance: 30 },
  { id: 'CM-1006', name: 'Ananya Iyer',     email: 'ananya.iyer@email.com',     phone: '+91 94456 78901', dob: '19 Aug 1997', address: '34, Mylapore, Chennai, TN',   membership: 'Premium',  joinDate: '28 Aug 2026', expiryDate: '27 Aug 2027', status: 'Active',  paymentStatus: 'Paid',    attendance: 61 },
  { id: 'CM-1007', name: 'Karthik Menon',   email: 'karthik.menon@email.com',   phone: '+91 93321 45678', dob: '03 Feb 1991', address: '89, Nungambakkam, Chennai, TN', membership: 'Basic',   joinDate: '25 Aug 2026', expiryDate: '24 Aug 2027', status: 'Active',  paymentStatus: 'Pending', attendance: 18 },
  { id: 'CM-1008', name: 'Neha Gupta',      email: 'neha.gupta@email.com',      phone: '+91 90234 56789', dob: '11 Dec 1994', address: '56, Kilpauk, Chennai, TN',    membership: 'Standard', joinDate: '20 Aug 2026', expiryDate: '19 Aug 2027', status: 'Active',  paymentStatus: 'Paid',    attendance: 44 },
  { id: 'CM-1009', name: 'Rohan Verma',     email: 'rohan.verma@email.com',     phone: '+91 91234 67890', dob: '25 Sep 1989', address: '12, Porur, Chennai, TN',      membership: 'Basic',    joinDate: '15 Aug 2026', expiryDate: '14 Aug 2027', status: 'Pending', paymentStatus: 'Pending', attendance: 5  },
  { id: 'CM-1010', name: 'Divya Nair',      email: 'divya.nair@email.com',      phone: '+91 98765 11223', dob: '07 Jun 1996', address: '90, Guindy, Chennai, TN',     membership: 'Premium',  joinDate: '10 Aug 2026', expiryDate: '09 Aug 2026', status: 'Expired', paymentStatus: 'Paid',    attendance: 72 },
  { id: 'CM-1011', name: 'Aditya Joshi',    email: 'aditya.joshi@email.com',    phone: '+91 97890 34567', dob: '29 Apr 1987', address: '33, Ambattur, Chennai, TN',   membership: 'Standard', joinDate: '05 Aug 2026', expiryDate: '04 Aug 2026', status: 'Expired', paymentStatus: 'Failed',  attendance: 20 },
  { id: 'CM-1012', name: 'Meera Krishnan',  email: 'meera.krishnan@email.com',  phone: '+91 99988 77665', dob: '17 Oct 1993', address: '44, Tambaram, Chennai, TN',   membership: 'Premium',  joinDate: '01 Aug 2026', expiryDate: '31 Jul 2027', status: 'Active',  paymentStatus: 'Paid',    attendance: 50 },
  { id: 'CM-1013', name: 'Suresh Babu',     email: 'suresh.babu@email.com',     phone: '+91 94567 89012', dob: '20 Jan 1985', address: '67, Perambur, Chennai, TN',   membership: 'Basic',    joinDate: '28 Jul 2026', expiryDate: '27 Jul 2027', status: 'Active',  paymentStatus: 'Paid',    attendance: 33 },
  { id: 'CM-1014', name: 'Lakshmi Rao',     email: 'lakshmi.rao@email.com',     phone: '+91 93456 78901', dob: '12 Mar 1990', address: '23, Chromepet, Chennai, TN',  membership: 'Standard', joinDate: '22 Jul 2026', expiryDate: '21 Jul 2027', status: 'Active',  paymentStatus: 'Paid',    attendance: 47 },
  { id: 'CM-1015', name: 'Vivek Pillai',    email: 'vivek.pillai@email.com',    phone: '+91 96789 01234', dob: '05 Aug 1992', address: '78, Sholinganallur, Chennai, TN', membership: 'Premium', joinDate: '18 Jul 2026', expiryDate: '17 Jul 2027', status: 'Active', paymentStatus: 'Paid', attendance: 68 },
];

// ── PAYMENTS ─────────────────────────────────────────────────
export const initialPayments: Payment[] = [
  { id: 'p1',  transactionId: 'TXN-2026-0901', memberId: 'CM-1001', memberName: 'Rahul Sharma',   amount: 8000,  date: '12 Sep 2026', method: 'UPI',           status: 'Paid',    description: 'Premium Membership - Annual' },
  { id: 'p2',  transactionId: 'TXN-2026-0902', memberId: 'CM-1002', memberName: 'Priya Singh',    amount: 4500,  date: '10 Sep 2026', method: 'Card',          status: 'Paid',    description: 'Standard Membership - Annual' },
  { id: 'p3',  transactionId: 'TXN-2026-0903', memberId: 'CM-1003', memberName: 'Arjun Kumar',    amount: 2000,  date: '08 Sep 2026', method: 'Cash',          status: 'Paid',    description: 'Basic Membership - Annual' },
  { id: 'p4',  transactionId: 'TXN-2026-0904', memberId: 'CM-1004', memberName: 'Sneha Patel',    amount: 8000,  date: '05 Sep 2026', method: 'Bank Transfer',  status: 'Paid',    description: 'Premium Membership - Annual' },
  { id: 'p5',  transactionId: 'TXN-2026-0905', memberId: 'CM-1005', memberName: 'Vikram Reddy',   amount: 4500,  date: '01 Sep 2026', method: 'UPI',           status: 'Paid',    description: 'Standard Membership - Annual' },
  { id: 'p6',  transactionId: 'TXN-2026-0906', memberId: 'CM-1006', memberName: 'Ananya Iyer',    amount: 8000,  date: '28 Aug 2026', method: 'Card',          status: 'Paid',    description: 'Premium Membership - Annual' },
  { id: 'p7',  transactionId: 'TXN-2026-0907', memberId: 'CM-1007', memberName: 'Karthik Menon',  amount: 2000,  date: '25 Aug 2026', method: 'Cash',          status: 'Pending', description: 'Basic Membership - Annual' },
  { id: 'p8',  transactionId: 'TXN-2026-0908', memberId: 'CM-1008', memberName: 'Neha Gupta',     amount: 4500,  date: '20 Aug 2026', method: 'UPI',           status: 'Paid',    description: 'Standard Membership - Annual' },
  { id: 'p9',  transactionId: 'TXN-2026-0909', memberId: 'CM-1009', memberName: 'Rohan Verma',    amount: 2000,  date: '15 Aug 2026', method: 'UPI',           status: 'Pending', description: 'Basic Membership - Annual' },
  { id: 'p10', transactionId: 'TXN-2026-0910', memberId: 'CM-1010', memberName: 'Divya Nair',     amount: 8000,  date: '10 Aug 2026', method: 'Card',          status: 'Paid',    description: 'Premium Membership - Annual' },
  { id: 'p11', transactionId: 'TXN-2026-0911', memberId: 'CM-1011', memberName: 'Aditya Joshi',   amount: 4500,  date: '05 Aug 2026', method: 'Bank Transfer',  status: 'Failed',  description: 'Standard Membership - Annual' },
  { id: 'p12', transactionId: 'TXN-2026-0912', memberId: 'CM-1012', memberName: 'Meera Krishnan', amount: 8000,  date: '01 Aug 2026', method: 'UPI',           status: 'Paid',    description: 'Premium Membership - Annual' },
  { id: 'p13', transactionId: 'TXN-2026-0913', memberId: 'CM-1013', memberName: 'Suresh Babu',    amount: 2000,  date: '28 Jul 2026', method: 'Cash',          status: 'Paid',    description: 'Basic Membership - Annual' },
  { id: 'p14', transactionId: 'TXN-2026-0914', memberId: 'CM-1014', memberName: 'Lakshmi Rao',    amount: 4500,  date: '22 Jul 2026', method: 'UPI',           status: 'Paid',    description: 'Standard Membership - Annual' },
  { id: 'p15', transactionId: 'TXN-2026-0915', memberId: 'CM-1015', memberName: 'Vivek Pillai',   amount: 8000,  date: '18 Jul 2026', method: 'Card',          status: 'Paid',    description: 'Premium Membership - Annual' },
];

// ── EVENTS ───────────────────────────────────────────────────
export const initialEvents: Event[] = [
  { id: 'e1', name: 'Annual Sports Day',   date: 'October 12, 2026', time: '10:00 AM', location: 'Club Ground',    capacity: 120, registered: 86,  description: 'Annual sports meet featuring cricket, football, badminton and athletics.', status: 'Upcoming' },
  { id: 'e2', name: 'Yoga Workshop',       date: 'October 05, 2026', time: '7:00 AM',  location: 'Wellness Hall',  capacity: 50,  registered: 42,  description: 'Morning yoga session for all members. Bring your own mat.', status: 'Upcoming' },
  { id: 'e3', name: 'Club Night',          date: 'October 20, 2026', time: '7:00 PM',  location: 'Main Hall',      capacity: 200, registered: 156, description: 'Annual gala night with live music, food and awards ceremony.', status: 'Upcoming' },
  { id: 'e4', name: 'Chess Tournament',    date: 'October 25, 2026', time: '2:00 PM',  location: 'Activity Room',  capacity: 40,  registered: 28,  description: 'Inter-club chess championship. Open to all members.', status: 'Upcoming' },
  { id: 'e5', name: 'Swimming Gala',       date: 'November 02, 2026', time: '9:00 AM', location: 'Swimming Pool',  capacity: 60,  registered: 34,  description: 'Swimming competitions across all age categories.', status: 'Upcoming' },
  { id: 'e6', name: 'Cooking Workshop',    date: 'November 10, 2026', time: '11:00 AM', location: 'Club Kitchen',  capacity: 30,  registered: 22,  description: 'Learn authentic South Indian recipes from our master chef.', status: 'Upcoming' },
];

// ── ATTENDANCE ───────────────────────────────────────────────
export const initialAttendance: AttendanceRecord[] = [
  { id: 'a1',  memberId: 'CM-1001', memberName: 'Rahul Sharma',   date: '01 Oct 2026', checkIn: '08:42 AM', checkOut: '10:15 AM', status: 'Present' },
  { id: 'a2',  memberId: 'CM-1002', memberName: 'Priya Singh',    date: '01 Oct 2026', checkIn: '07:15 AM', checkOut: '09:00 AM', status: 'Present' },
  { id: 'a3',  memberId: 'CM-1003', memberName: 'Arjun Kumar',    date: '01 Oct 2026', checkIn: '09:30 AM', checkOut: '11:00 AM', status: 'Late'    },
  { id: 'a4',  memberId: 'CM-1004', memberName: 'Sneha Patel',    date: '01 Oct 2026', checkIn: '06:55 AM', checkOut: '08:30 AM', status: 'Present' },
  { id: 'a5',  memberId: 'CM-1005', memberName: 'Vikram Reddy',   date: '01 Oct 2026', checkIn: '08:00 AM', checkOut: '09:45 AM', status: 'Present' },
  { id: 'a6',  memberId: 'CM-1006', memberName: 'Ananya Iyer',    date: '01 Oct 2026', checkIn: '07:30 AM', checkOut: '09:15 AM', status: 'Present' },
  { id: 'a7',  memberId: 'CM-1007', memberName: 'Karthik Menon',  date: '01 Oct 2026', checkIn: '10:00 AM', checkOut: '11:30 AM', status: 'Late'    },
  { id: 'a8',  memberId: 'CM-1008', memberName: 'Neha Gupta',     date: '01 Oct 2026', checkIn: '08:15 AM', checkOut: '10:00 AM', status: 'Present' },
  { id: 'a9',  memberId: 'CM-1012', memberName: 'Meera Krishnan', date: '01 Oct 2026', checkIn: '07:00 AM', checkOut: '09:30 AM', status: 'Present' },
  { id: 'a10', memberId: 'CM-1014', memberName: 'Lakshmi Rao',    date: '01 Oct 2026', checkIn: '08:45 AM', checkOut: '10:30 AM', status: 'Present' },
  { id: 'a11', memberId: 'CM-1015', memberName: 'Vivek Pillai',   date: '01 Oct 2026', checkIn: '07:20 AM', checkOut: '09:00 AM', status: 'Present' },
];

// ── FACILITIES ───────────────────────────────────────────────
export const initialFacilities: Facility[] = [
  { id: 'f1', name: 'Swimming Pool',    status: 'Available',   capacity: 50,  todayBookings: 12, description: 'Olympic-size swimming pool with 6 lanes. Lifeguard on duty.', icon: 'Waves'          },
  { id: 'f2', name: 'Gym',             status: 'Available',   capacity: 80,  todayBookings: 45, description: 'Fully equipped gym with cardio, weights and functional training area.', icon: 'Dumbbell'  },
  { id: 'f3', name: 'Tennis Court',    status: 'Booked',      capacity: 4,   todayBookings: 4,  description: 'Two international-standard clay tennis courts with floodlights.', icon: 'Target'        },
  { id: 'f4', name: 'Club Hall',       status: 'Available',   capacity: 200, todayBookings: 1,  description: 'Grand banquet hall suitable for large events and gatherings.', icon: 'Building2'       },
  { id: 'f5', name: 'Conference Room', status: 'Available',   capacity: 20,  todayBookings: 2,  description: 'Modern conference room with AV equipment and whiteboard.', icon: 'Monitor'           },
  { id: 'f6', name: 'Squash Court',    status: 'Available',   capacity: 2,   todayBookings: 3,  description: 'Professional squash court with glass back wall.', icon: 'Zap'                         },
  { id: 'f7', name: 'Yoga Studio',     status: 'Available',   capacity: 30,  todayBookings: 8,  description: 'Dedicated yoga and meditation studio with wooden flooring.', icon: 'Heart'            },
  { id: 'f8', name: 'Badminton Court', status: 'Maintenance', capacity: 8,   todayBookings: 0,  description: 'Two badminton courts. Currently under maintenance.', icon: 'Flame'                   },
];

// ── ANNOUNCEMENTS ────────────────────────────────────────────
export const initialAnnouncements: Announcement[] = [
  { id: 'an1', title: 'Annual Sports Day Registration Open',  content: 'Registration is now open for the Annual Sports Day scheduled for October 12, 2026. Participants can register for cricket, football, badminton, athletics, and swimming events. Last date for registration is October 08, 2026. Contact the sports committee for more details.', date: '30 Sep 2026', author: 'Admin User', priority: 'High'   },
  { id: 'an2', title: 'Club Maintenance Notice',              content: 'The swimming pool will be closed for scheduled maintenance on Sunday, October 04, 2026 from 6:00 AM to 4:00 PM. We apologize for the inconvenience. The gym and other facilities will remain open as usual.', date: '28 Sep 2026', author: 'Admin User', priority: 'Medium' },
  { id: 'an3', title: 'New Yoga Instructor Joining',          content: 'We are delighted to announce that Ms. Kavitha Subramanian, a certified Iyengar Yoga instructor with 12 years of experience, will be joining our wellness team from October 06, 2026. Morning yoga sessions will now be available 6 days a week.', date: '25 Sep 2026', author: 'Admin User', priority: 'Low'    },
  { id: 'an4', title: 'Club Night 2026 — Save the Date',     content: 'Mark your calendars for the most anticipated event of the year — Club Night 2026! Join us on October 20, 2026 at 7:00 PM in the Main Hall for an evening of live music, gourmet dinner, and the Annual Awards Ceremony. Dress code: Smart Casual.', date: '22 Sep 2026', author: 'Admin User', priority: 'High'   },
  { id: 'an5', title: 'Membership Renewal Reminder',         content: 'Members whose memberships are expiring in October 2026 are requested to renew before the expiry date to continue availing club facilities without interruption. Early renewal offers a 5% discount on the annual fee. Visit the admin office or renew online.', date: '20 Sep 2026', author: 'Admin User', priority: 'Medium' },
];

// ── CHART DATA ───────────────────────────────────────────────
export const membershipGrowthData = [
  { month: 'Apr', members: 980  },
  { month: 'May', members: 1025 },
  { month: 'Jun', members: 1080 },
  { month: 'Jul', members: 1125 },
  { month: 'Aug', members: 1180 },
  { month: 'Sep', members: 1248 },
];

export const revenueData = [
  { month: 'Apr', revenue: 312000 },
  { month: 'May', revenue: 398000 },
  { month: 'Jun', revenue: 425000 },
  { month: 'Jul', revenue: 467000 },
  { month: 'Aug', revenue: 512000 },
  { month: 'Sep', revenue: 482500 },
];

export const membershipDistribution = [
  { name: 'Premium',  value: 420, color: '#6366f1' },
  { name: 'Standard', value: 560, color: '#06b6d4' },
  { name: 'Basic',    value: 268, color: '#94a3b8' },
];

export const weeklyAttendance = [
  { day: 'Mon', attendance: 287 },
  { day: 'Tue', attendance: 312 },
  { day: 'Wed', attendance: 298 },
  { day: 'Thu', attendance: 324 },
  { day: 'Fri', attendance: 356 },
  { day: 'Sat', attendance: 412 },
  { day: 'Sun', attendance: 178 },
];

export const attendanceTrend = [
  { month: 'Apr', attendance: 265 },
  { month: 'May', attendance: 278 },
  { month: 'Jun', attendance: 292 },
  { month: 'Jul', attendance: 305 },
  { month: 'Aug', attendance: 318 },
  { month: 'Sep', attendance: 287 },
];
