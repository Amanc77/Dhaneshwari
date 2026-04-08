const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Room = require('../models/Room');
const Attraction = require('../models/Attraction');
const Testimonial = require('../models/Testimonial');
const GallerySection = require('../models/Gallery');
const Blog = require('../models/Blog');
const Amenity = require('../models/Amenity');
const Slider = require('../models/Slider');

dotenv.config();

const rooms = [
  {
    roomType: 'Deluxe Room',
    shortDescription: 'Elegant interiors with modern comfort. Perfect for business travelers and couples seeking a luxurious stay.',
    size: '320 sq ft',
    totalRooms: 12,
    bookedRooms: 0,
    pricePerNight: 3499,
    baseOccupancy: 2,
    maxOccupancy: 3,
    extraAdultPrice: 700,
    amenities: ['Free WiFi', 'AC', 'TV', 'Mini Bar'],
    images: [],
  },
  {
    roomType: 'Premium Room',
    shortDescription: 'Luxury stay experience for couples & families with premium amenities and breathtaking views.',
    size: '450 sq ft',
    totalRooms: 8,
    bookedRooms: 0,
    pricePerNight: 4499,
    baseOccupancy: 2,
    maxOccupancy: 3,
    extraAdultPrice: 900,
    amenities: ['Free WiFi', 'AC', 'TV', 'Mini Bar', 'Bathtub'],
    images: [],
  },
  {
    roomType: 'Family Suite',
    shortDescription: 'Spacious comfort with premium amenities. Ideal for families and groups seeking extra space and luxury.',
    size: '650 sq ft',
    totalRooms: 5,
    bookedRooms: 0,
    pricePerNight: 6999,
    baseOccupancy: 3,
    maxOccupancy: 4,
    extraAdultPrice: 1200,
    amenities: ['Free WiFi', 'AC', 'TV', 'Mini Bar', 'Bathtub', 'Living Area'],
    images: [],
  },
];

const attractions = [
  { name: 'Kal Bhairav Temple', description: 'Ancient temple known as the guardian of Kashi, one of the most revered temples in Varanasi', distance: '100 mtrs', image: '' },
  { name: 'Manikarnika Ghat', description: 'Sacred cremation ghat on the banks of Ganga, one of the holiest ghats in Varanasi', distance: '200 mtrs', image: '' },
  { name: 'Kashi Dham Museum', description: 'Museum showcasing the rich cultural heritage of Kashi with ancient artifacts and exhibits', distance: '100 mtrs', image: '' },
  { name: 'Bundri Patoka Ghat', description: 'Historic ghat known for its spiritual significance and serene atmosphere', distance: '100 mtrs', image: '' },
  { name: 'Dhanvantri Koop', description: 'Sacred well associated with the god of Ayurveda, known for its healing properties', distance: '250 mtrs', image: '' },
  { name: 'Chandra Koop', description: 'Ancient well with mythological significance and historical importance', distance: '200 mtrs', image: '' },
  { name: 'Evening Ganga Aarti', description: 'Spiritual evening ritual on the holy Ganga ghats with lamps and chanting', distance: '900 mtrs', image: '' },
  { name: 'Kashi Vishwanath Temple', description: 'Sacred temple dedicated to Lord Shiva in Varanasi, one of the twelve Jyotirlingas', distance: '800 mtrs', image: '' },
];

const testimonials = [
  {
    title: 'Exceptional Stay & Service',
    name: 'Mr. Satish K',
    review: 'I loved everything about this hotel, from room types, customer service, specially house keeping was on top level and facilities to the serene pool area and gym facility. I will recommend others for sure.',
    rating: 5,
    tripType: 'Business',
    daysStayed: 3,
    month: 'March',
    year: 2024,
  },
  {
    title: 'Warm, Welcoming & Comfortable',
    name: 'Mr. Pavan Dahale',
    review: 'Wonderful stay at Dhaneshwari Guestline – highly recommend! The staff was exceptionally welcoming and went out of their way to ensure I had a comfortable stay from start to finish.',
    rating: 5,
    tripType: 'Solo',
    daysStayed: 2,
    month: 'February',
    year: 2024,
  },
  {
    title: 'Professional Staff & Prime Location',
    name: 'Mr. Anand',
    review: 'Wonderful experience. The staff was very helpful and professional. Rooms are well maintained and the hotel is in a prime location, close to major temples and attractions.',
    rating: 4,
    tripType: 'Family',
    daysStayed: 2,
    month: 'January',
    year: 2024,
  },
  {
    title: 'Feels Like A Second Home',
    name: 'Mr. Rahul',
    review: 'Amazing service and great hospitality. The team made us feel at home and helped us with local guidance and temple visits. We will definitely visit again.',
    rating: 5,
    tripType: 'Family',
    daysStayed: 4,
    month: 'December',
    year: 2023,
  },
];

const blogs = [
  {
    title: 'A Simple Varanasi Travel Guide',
    slug: 'varanasi-travel-guide',
    content: [
      'Varanasi is a city of rituals, ghats, and timeless streets. Start your mornings with a calm walk near Assi Ghat.',
      'For a relaxed stay, plan your day around sunrise and sunset. Keep afternoons for rest and local food.',
      'If you have limited time, prioritize the ghats, local markets, and a short boat ride on the Ganges.',
    ].join('\n\n'),
    image: '',
    metaDescription: 'Best times to visit, what to see near Assi, and how to make your stay comfortable.',
    categories: ['Travel Guide'],
    isPublished: true,
  },
  {
    title: 'How to Enjoy Ganga Aarti (Comfortably)',
    slug: 'ganga-aarti-experience',
    content: [
      'Reach early to get a good view and avoid last-minute rush. Carry a bottle of water and keep your valuables secure.',
      'If you’re with family, choose a less crowded spot or a guided arrangement for comfort.',
      'After the aarti, enjoy a quiet walk back and try local snacks nearby.',
    ].join('\n\n'),
    image: '',
    metaDescription: 'A practical checklist: timing, seating, what to carry, and tips for families.',
    categories: ['Travel Guide'],
    isPublished: true,
  },
  {
    title: 'Kashi Vishwanath & Sacred Streets',
    slug: 'kashi-vishwanath',
    content: [
      'The lanes around Kashi Vishwanath are some of the oldest and most storied streets in the city. As you walk through them, you’ll pass tiny shrines, traditional shops, and homes that have seen generations grow up around the temple.',
      'Start your walk early in the morning when the streets are quieter. This is the best time to notice the architecture, listen to the temple bells, and take in the fragrance of fresh flowers and incense.',
      'Keep your walk slow and simple. Pause at small tea stalls, talk to local shopkeepers, and take short breaks instead of trying to cover everything at once.',
    ].join('\n\n'),
    image: '',
    metaDescription: 'Sacred streets and stories around Kashi Vishwanath.',
    categories: ['Places you cannot forget'],
    isPublished: true,
  },
  {
    title: 'Manikarnika Ghat: Timeless Rituals',
    slug: 'manikarnika-ghar',
    content: [
      'Manikarnika Ghat is one of the most sacred cremation ghats in India. It is a place where life and death meet in a calm, continuous rhythm of rituals.',
      'If you choose to visit, do so with quiet respect. Stand at a distance, avoid taking photographs, and spend a few minutes simply observing the ceremonies.',
      'Many visitors find it meaningful to take a short boat ride on the river to view the ghat from the water, which offers a gentler perspective while still feeling its deep significance.',
    ].join('\n\n'),
    image: '',
    metaDescription: 'Spiritual significance of Manikarnika Ghat.',
    categories: ['Places you cannot forget'],
    isPublished: true,
  },
  {
    title: 'Evening Ganga Aarti Experience',
    slug: 'ganga-aarti',
    content: [
      'The evening Ganga Aarti is one of the most memorable experiences in Varanasi. Priests perform synchronized rituals with lamps, incense, and chanting along the riverbank.',
      'Arrive at least 45–60 minutes early if you want to sit close. Carry a light shawl, a bottle of water, and keep your belongings to a minimum.',
      'Once the aarti begins, put your phone away and simply watch. Focusing on the sound and light makes the experience feel calmer and more meaningful.',
    ].join('\n\n'),
    image: '',
    metaDescription: 'How to enjoy evening Ganga Aarti.',
    categories: ['Experiences you cannot miss'],
    isPublished: true,
  },
  {
    title: 'Kashi Dham & Museum Trails',
    slug: 'kashi-dham-museum',
    content: [
      'Kashi Dham and nearby museums offer a quieter, more reflective side of the city. Here you can learn about local art, history, and culture away from the busier ghats.',
      'Plan short visits of 45–60 minutes for each spot instead of trying to see everything in one go. This keeps the experience relaxed and enjoyable.',
      'Combine your museum stops with gentle walks or café breaks nearby so that the day feels like a slow, curated tour rather than a rushed checklist.',
    ].join('\n\n'),
    image: '',
    metaDescription: 'Museum and culture trails in Kashi.',
    categories: ['Experiences you cannot miss'],
    isPublished: true,
  },
  {
    title: 'Street Food You Must Try',
    slug: 'street-food',
    content: [
      'Varanasi’s street food is full of comforting flavours and simple recipes that locals have loved for decades.',
      'Start your morning with hot kachori-sabzi from a trusted stall, followed by jalebi or malaiyyo in season.',
      'Later in the day, try a thick lassi served in a kulhad, and don’t forget small snacks like chaat and pakoras from busy yet clean vendors.',
    ].join('\n\n'),
    image: '',
    metaDescription: 'Must-try street food in Varanasi.',
    categories: ['Food you cannot forget to taste'],
    isPublished: true,
  },
  {
    title: 'Calm Cafes Around the Ghats',
    slug: 'local-cafes',
    content: [
      'Around the main ghats you’ll find a mix of small cafés tucked into narrow lanes and rooftops with river views.',
      'These are perfect places to rest your feet, write in a journal, or simply watch the river as the city slows down in the evening.',
      'Look for cafés that offer simple menus, warm lighting, and open terraces — they often feel more like living rooms than restaurants.',
    ].join('\n\n'),
    image: '',
    metaDescription: 'Relaxed cafes around Varanasi ghats.',
    categories: ['Food you cannot forget to taste'],
    isPublished: true,
  },
];

const amenities = [
  'Prime Location',
  'Premium Quality Rooms',
  '24x7 Reception',
  'Lift Facility',
  'Premium Hotel Amenities',
  'Darshan Assistance',
  'Tour & Sightseeing',
];

const gallerySections = [
  { name: 'Our Rooms', description: 'Rooms, interiors, and in-room comfort.', order: 1, items: [] },
  { name: 'Nearby Places', description: 'Attractions and surroundings near the property.', order: 2, items: [] },
];

const sliders = [
  {
    title: 'Welcome to Dhaneshwari',
    subtitle: 'Luxury stay in Varanasi',
    description: 'Book premium rooms with comfort and hospitality.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'Book Now',
    buttonLink: '/booking',
    order: 1,
    isActive: true,
  },
];

async function seed() {
  await connectDB();

  await Promise.all([
    Room.deleteMany({}),
    Attraction.deleteMany({}),
    Testimonial.deleteMany({}),
    GallerySection.deleteMany({}),
    Blog.deleteMany({}),
    Amenity.deleteMany({}),
    Slider.deleteMany({}),
  ]);

  await Promise.all([
    Room.insertMany(rooms),
    Attraction.insertMany(attractions),
    Testimonial.insertMany(testimonials),
    GallerySection.insertMany(gallerySections),
    Blog.insertMany(blogs),
    Amenity.insertMany(amenities.map((name) => ({ name }))),
    Slider.insertMany(sliders),
  ]);

  console.log('Seed completed successfully.');
  await mongoose.connection.close();
}

seed().catch(async (err) => {
  console.error('Seed failed:', err);
  await mongoose.connection.close();
  process.exit(1);
});
