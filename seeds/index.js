const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62fa8a1fbb16228c69634945",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, laboriosam. Quidem nisi consequuntur, reprehenderit repellat harum possimus delectus sapiente ratione deserunt nostrum dolorum sequi similique odio error et facere alias?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dzbnjdzlj/image/upload/v1660928265/YelpCamp/xommojdfiirfiihcjlun.jpg",
          filename: "YelpCamp/xommojdfiirfiihcjlun",
        },
        {
          url: "https://res.cloudinary.com/dzbnjdzlj/image/upload/v1660928267/YelpCamp/dzzyerwlyudftqm97vul.png",
          filename: "YelpCamp/dzzyerwlyudftqm97vul",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
