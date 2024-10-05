// src/data/destinationsData.js

// Importing Images (Assuming only 5 unique images, repeated for simplicity)
import destination1 from '../assets/folosi.png';
import destination2 from '../assets/namibia.png';
import destination3 from '../assets/zanzibar.png';
import destination4 from '../assets/okavangoo.png';
import destination5 from '../assets/desert.png';
// Repeating images for destinations 6 to 35
import destination6 from '../assets/folosi.png';
import destination7 from '../assets/namibia.png';
import destination8 from '../assets/zanzibar.png';
import destination9 from '../assets/okavangoo.png';
import destination10 from '../assets/desert.png';
import destination11 from '../assets/folosi.png';
import destination12 from '../assets/namibia.png';
import destination13 from '../assets/zanzibar.png';
import destination14 from '../assets/okavangoo.png';
import destination15 from '../assets/desert.png';
import destination16 from '../assets/folosi.png';
import destination17 from '../assets/namibia.png';
import destination18 from '../assets/zanzibar.png';
import destination19 from '../assets/okavangoo.png';
import destination20 from '../assets/desert.png';
import destination21 from '../assets/folosi.png';
import destination22 from '../assets/namibia.png';
import destination23 from '../assets/zanzibar.png';
import destination24 from '../assets/okavangoo.png';
import destination25 from '../assets/desert.png';
import destination26 from '../assets/folosi.png';
import destination27 from '../assets/namibia.png';
import destination28 from '../assets/zanzibar.png';
import destination29 from '../assets/okavangoo.png';
import destination30 from '../assets/desert.png';
import destination31 from '../assets/folosi.png';
import destination32 from '../assets/namibia.png';
import destination33 from '../assets/zanzibar.png';
import destination34 from '../assets/okavangoo.png';
import destination35 from '../assets/desert.png';

const images = [
  destination1,
  destination2,
  destination3,
  destination4,
  destination5,
];

const additionalDestinations = [
  { city: "Algiers", country: "Algeria" },
  { city: "Luanda", country: "Angola" },
  { city: "Porto-Novo", country: "Benin" },
  { city: "Gaborone", country: "Botswana" },
  { city: "Ouagadougou", country: "Burkina Faso" },
  { city: "Bujumbura", country: "Burundi" },
  { city: "Praia", country: "Cabo Verde" },
  { city: "Yaoundé", country: "Cameroon" },
  { city: "Bangui", country: "Central African Republic" },
  { city: "N'Djamena", country: "Chad" },
  { city: "Moroni", country: "Comoros" },
  { city: "Kinshasa", country: "Democratic Republic of the Congo" },
  { city: "Brazzaville", country: "Republic of the Congo" },
  { city: "Djibouti City", country: "Djibouti" },
  { city: "Khartoum", country: "Sudan" },
  { city: "Malabo", country: "Equatorial Guinea" },
  { city: "Asmara", country: "Eritrea" },
  { city: "Mbabane", country: "Eswatini" },
  { city: "Addis Ababa", country: "Ethiopia" },
  { city: "Libreville", country: "Gabon" },
  { city: "Banjul", country: "Gambia" },
  { city: "Accra", country: "Ghana" },
  { city: "Conakry", country: "Guinea" },
  { city: "Bissau", country: "Guinea-Bissau" },
  { city: "Yamoussoukro", country: "Ivory Coast" },
  { city: "Maseru", country: "Lesotho" },
  { city: "Monrovia", country: "Liberia" },
  { city: "Tripoli", country: "Libya" },
  { city: "Lilongwe", country: "Malawi" },
  { city: "Bamako", country: "Mali" },
  { city: "Nouakchott", country: "Mauritania" },
  { city: "Port Louis", country: "Mauritius" },
  { city: "Rabat", country: "Morocco" },
  { city: "Maputo", country: "Mozambique" },
  { city: "Windhoek", country: "Namibia" },
  { city: "Niamey", country: "Niger" },
  { city: "Abuja", country: "Nigeria" },
  { city: "Kigali", country: "Rwanda" },
  { city: "São Tomé", country: "Sao Tome and Principe" },
  { city: "Dakar", country: "Senegal" },
  { city: "Victoria", country: "Seychelles" },
  { city: "Freetown", country: "Sierra Leone" },
  { city: "Mogadishu", country: "Somalia" },
  { city: "Johannesburg", country: "South Africa" },
  { city: "Juba", country: "South Sudan" },
  { city: "Dodoma", country: "Tanzania" },
  { city: "Lomé", country: "Togo" },
  { city: "Bamako", country: "Mali" },
  { city: "Tunis", country: "Tunisia" },
  { city: "Kampala", country: "Uganda" },
  { city: "Lusaka", country: "Zambia" },
  { city: "Harare", country: "Zimbabwe" },
];

const getRandomVisits = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const activities = [
  {
    id: 1,
    city: "Cape Town",
    country: "South Africa",
    image: destination1,
    trending: true,
    nickname: "Mother City",
    activities: [
      "Table Mountain Hiking",
      "Robben Island Tour",
      "V&A Waterfront Shopping",
    ],
    visits: 1500,
  },
  {
    id: 2,
    city: "Nairobi",
    country: "Kenya",
    image: destination2,
    trending: true,
    nickname: "Green City in the Sun",
    activities: [
      "Nairobi National Park",
      "David Sheldrick Elephant Orphanage",
      "Giraffe Centre Visit",
    ],
    visits: 1200,
  },
  {
    id: 3,
    city: "Marrakech",
    country: "Morocco",
    image: destination3,
    trending: true,
    nickname: "Red City",
    activities: [
      "Jemaa el-Fnaa Square",
      "Majorelle Garden",
      "Bahia Palace Tour",
    ],
    visits: 1100,
  },
  {
    id: 4,
    city: "Cairo",
    country: "Egypt",
    image: destination4,
    trending: true,
    nickname: "City of a Thousand Minarets",
    activities: [
      "Pyramids of Giza",
      "Egyptian Museum Visit",
      "Nile River Cruise",
    ],
    visits: 2000,
  },
  {
    id: 5,
    city: "Zanzibar",
    country: "Tanzania",
    image: destination5,
    trending: false,
    nickname: "Spice Island",
    activities: [
      "Stone Town Exploration",
      "Beach Relaxation",
      "Dhow Sailing",
    ],
    visits: 900,
  },
  // Adding destinations 6 to 35
  ...additionalDestinations.map((dest, index) => ({
    id: index + 6,
    city: dest.city,
    country: dest.country,
    image: images[index % images.length],
    trending: index % 3 === 0, // Make every 3rd destination trending
    nickname: `${dest.city} Nickname`,
    activities: [
      `Activity 1 in ${dest.city}`,
      `Activity 2 in ${dest.city}`,
      `Activity 3 in ${dest.city}`,
    ],
    visits: getRandomVisits(500, 2000),
  })),
];

export default activities;
