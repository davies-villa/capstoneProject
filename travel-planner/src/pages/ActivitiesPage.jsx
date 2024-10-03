import React, { useState } from "react";
import Navbar from "../components/Navbar";
import headerBackground from "../assets/header_background.png";

// Sample activities data
const activities = [
  {
    id: 1,
    title: "Safari Adventure",
    description:
      "Experience the thrill of the wild with our guided safari tours.",
    categories: ["Adventure", "Wildlife"],
    price: 199,
    image: "./assets/davies.jpg",
  },
  {
    id: 2,
    title: "Beach Volleyball",
    description: "Join us for a fun-filled beach volleyball tournament.",
    categories: ["Sports", "Beach"],
    price: 49,
    image: "path/to/activity2.jpg",
  },
  {
    id: 3,
    title: "Mountain Hiking",
    description: "Explore breathtaking trails and enjoy stunning views.",
    categories: ["Hiking", "Nature"],
    price: 99,
    image: "path/to/activity3.jpg",
  },
  {
    id: 4,
    title: "Cultural Tour",
    description:
      "Discover the rich history and culture of our beautiful region.",
    categories: ["Culture", "History"],
    price: 79,
    image: "path/to/activity4.jpg",
  },
  // Add more activities as needed
];

const ActivitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // Initially show 6 activities
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]); // Assuming max price is 200

  // Get unique categories for the filter buttons
  const uniqueCategories = [
    ...new Set(activities.flatMap((activity) => activity.categories)),
  ];

  // Filter activities based on search term, selected category, and price range
  const filteredActivities = activities.filter((activity) => {
    const matchesSearchTerm =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? activity.categories.includes(selectedCategory)
      : true;

    const matchesPrice =
      activity.price >= priceRange[0] && activity.price <= priceRange[1];

    return matchesSearchTerm && matchesCategory && matchesPrice;
  });

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Load 6 more activities
  };

  const handleSearch = () => {
    // Implement any additional logic you want on search button click
    console.log(`Searching for: ${searchTerm}`);
  };

  // Function to get category colors
  const getCategoryColors = (category) => {
    switch (category) {
      case "Adventure":
        return { bg: "bg-green-200", text: "text-green-800" };
      case "Wildlife":
        return { bg: "bg-yellow-200", text: "text-yellow-800" };
      case "Sports":
        return { bg: "bg-red-200", text: "text-red-800" };
      case "Beach":
        return { bg: "bg-blue-200", text: "text-blue-800" };
      case "Hiking":
        return { bg: "bg-purple-200", text: "text-purple-800" };
      case "Nature":
        return { bg: "bg-teal-200", text: "text-teal-800" };
      case "Culture":
        return { bg: "bg-pink-200", text: "text-pink-800" };
      case "History":
        return { bg: "bg-indigo-200", text: "text-indigo-800" };
      default:
        return { bg: "bg-gray-200", text: "text-gray-800" };
    }
  };

  return (
    <section className=" w-full  bg-gray-100">
      <div className=" relative">
        <div
          className="h-[60vh]"
          style={{
            backgroundImage: `url(${headerBackground})`,
          }}
        >
          <Navbar />
          <h2 className="text-3xl font-bold mb-4 text-center">
            Exciting Activities
          </h2>
          <p className="text-lg mb-6 text-center">
            Engage in thrilling activities tailored just for you!
          </p>
        {/* Search Bar and Filters */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-custom text-white px-6 py-3 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Search
          </button>
        </div>
        
        </div>
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center space-x-2">
          {uniqueCategories.map((category) => {
            const colors = getCategoryColors(category);
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(isSelected ? "" : category)}
                className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none transition ${
                  isSelected
                    ? `${colors.bg} ${colors.text} border border-${
                        colors.text.split("-")[1]
                      }-500`
                    : `${colors.bg} ${colors.text}`
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 lg:px-16 p-4  sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredActivities.slice(0, visibleCount).map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <div className="flex flex-wrap mb-4">
                  {activity.categories.map((category, index) => {
                    const colors = getCategoryColors(category);
                    return (
                      <span
                        key={index}
                        className={`inline-block py-1 px-3 mr-2 mb-2 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
                      >
                        {category}
                      </span>
                    );
                  })}
                </div>
                <p className="text-lg font-bold">${activity.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activities Count */}
        <div className="mt-6 text-center">
          <span className="text-lg text-gray-700">{`${filteredActivities.length} of ${activities.length} activities`}</span>
        </div>

        {/* Load More Button */}
        {visibleCount < filteredActivities.length && (
          <div className="mt-4 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitiesPage;
