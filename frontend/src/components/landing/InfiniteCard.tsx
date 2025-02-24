"use client";

import { motion } from "framer-motion";
import React from "react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

type infiniteCardProps = {
  id: number;
  userImage: string;
  userName: string;
  userTitle: string;
  quote: string;
};

const InfiniteCard = () => {
  return (
    <motion.div className="w-full h-64 overflow-hidden bg-transparent flex items-center justify-center space-x-3">
      {plateBookReviews.map((review, index) => (
        <motion.div className="w-80 max-w-md bg-card flex flex-col p-3 text-xs animate-scroll">
          <span>{review.quote}</span>
          <div className="flex flex-row space-x-2">
            <Avatar>
              <AvatarImage src={review.userImage} className="size-6" />
              <AvatarFallback>{review.userName}</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default InfiniteCard;

const plateBookReviews = [
  {
    userImage: "https://via.placeholder.com/150/1", // Replace with actual image URL
    userName: "Sophia Carter",
    userTitle: "Home Chef",
    quote:
      "PlateBook has completely transformed the way I cook! Finding and saving recipes has never been easier.",
  },
  {
    userImage: "https://via.placeholder.com/150/2", // Replace with actual image URL
    userName: "Daniel Thompson",
    userTitle: "Food Enthusiast",
    quote:
      "I love the Plate List feature! It helps me plan my meals effortlessly and keeps my favorite recipes in one place.",
  },
  {
    userImage: "https://via.placeholder.com/150/3", // Replace with actual image URL
    userName: "Emma Rodriguez",
    userTitle: "Nutritionist",
    quote:
      "The search filters are a game changer! Now I can quickly find vegan and gluten-free recipes that fit my diet.",
  },
  {
    userImage: "https://via.placeholder.com/150/4", // Replace with actual image URL
    userName: "Liam Mitchell",
    userTitle: "Aspiring Chef",
    quote:
      "Finally, a food community where I can share my creations and connect with other passionate cooks!",
  },
  {
    userImage: "https://via.placeholder.com/150/5", // Replace with actual image URL
    userName: "Olivia Bennett",
    userTitle: "Busy Mom",
    quote:
      "PlateBook’s AI recipe suggestions have helped me make the most out of my pantry ingredients. So convenient!",
  },
  {
    userImage: "https://via.placeholder.com/150/6", // Replace with actual image URL
    userName: "Ethan Walker",
    userTitle: "Food Blogger",
    quote:
      "I never realized how fun it could be to interact with other home cooks! The comment and like features make it feel like a true community.",
  },
  {
    userImage: "https://via.placeholder.com/150/7", // Replace with actual image URL
    userName: "Ava Richardson",
    userTitle: "Nighttime Baker",
    quote:
      "The dark mode is a great touch! I can browse recipes at night without straining my eyes.",
  },
  {
    userImage: "https://via.placeholder.com/150/8", // Replace with actual image URL
    userName: "Noah Harris",
    userTitle: "Culinary Student",
    quote:
      "From quick weeknight dinners to elaborate meals, PlateBook has recipes for every occasion. I’m obsessed!",
  },
  {
    userImage: "https://via.placeholder.com/150/9", // Replace with actual image URL
    userName: "Mia Anderson",
    userTitle: "Food Lover",
    quote:
      "The ability to follow my favorite chefs and discover new recipes daily keeps me inspired in the kitchen.",
  },
  {
    userImage: "https://via.placeholder.com/150/10", // Replace with actual image URL
    userName: "James Wilson",
    userTitle: "Amateur Cook",
    quote:
      "Cooking has never been this interactive and fun! PlateBook makes sharing recipes an absolute delight.",
  },
];
