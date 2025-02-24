import PostCard, { PostCardProps } from "@/components/cards/PostCard";
import HoverMe from "@/components/hero/HoverMe";
import SearchInput from "@/components/hero/SearchInput";
import Features from "@/components/landing/Features";
import InfiniteCard from "@/components/landing/InfiniteCard";
import StickyScrollFeatures from "@/components/landing/StickyScrollFeatures";
import Navbar from "@/components/navbar/Navbar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { LinkPreview } from "@/components/ui/link-preview";
import { SpotlightNew } from "@/components/ui/spotlight-new";
import {
  IconBowlSpoon,
  IconBrandTabler,
  IconMessageChatbot,
} from "@tabler/icons-react";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="w-full my-5 lg:my-20">
      <section className="absolute inset-0 w-full">
        <Navbar />
        <div className="flex-grow" />{" "}
        {/* This ensures content can fill the space above */}
      </section>
      <div className="flex flex-col items-center justify-center mx-7 lg:mx-16 xl:mx-28 2xl:mx-48 my-5">
        <section
          id="hero"
          className="flex flex-col my-10 lg:my-0 lg:flex-row  justify-around w-full pb-14 2xl:pb-28"
        >
          <SpotlightNew />
          <section
            id="left"
            className="flex flex-col w-full space-y-3 lg:space-y-6 pt-10 pb-5 lg:py-20 justify-center items-center lg:items-start lg:justify-normal"
          >
            <section className="font-bold text-5xl lg:text-6xl xl:text-7xl text-center lg:text-left z-10">
              <h1>Eat. Cook</h1>
              <LinkPreview
                url="https://platebook.vercel.app"
                className="text-primary dark:text-primary"
              >
                Platebook.
              </LinkPreview>
              <h1>Repeat.</h1>
            </section>
            <p className="w-full max-w-sm flex justify-center break-words lg:max-w-md ml-0 lg:ml-1 text-center lg:text-left">
              Discover, share, and savor recipes from around the world—one plate
              at a time.
            </p>
            <div className="py-5 max-w-xs sm:max-w-sm lg:max-w-sm xl:max-w-md w-full">
              <SearchInput />
            </div>
          </section>

          <section
            id="right"
            className="w-full sm:max-w-none lg:max-w-none relative flex justify-center"
          >
            <div className="flex flex-col w-full h-fit items-center justify-center z-40">
              <HoverMe />
              <PostCard postItems={samplePost} />
            </div>
          </section>
          <BackgroundBeams />
        </section>
        <section
          id="3-features"
          className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 space-x-0 lg:space-x-5 xl:space-x-8 justify-between w-full h-full lg:my-10"
        >
          {threeFeatures.map((feature, index) => (
            <Features
              id={index}
              title={feature.title}
              desc={feature.desc}
              icon={feature.icon}
              key={index}
            />
          ))}
        </section>
        <section
          id="sticky-scroll-features"
          className="w-full flex flex-col items-center justify-center my-20 space-y-10 h-full bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative"
        >
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          {stickyFeatures.map((feature, index) =>
            index === 1 ? (
              <StickyScrollFeatures
                id={index}
                imageUrl={feature.imageUrl}
                desc={feature.desc}
                key={index}
                containerClassName="sm:flex-row-reverse"
              />
            ) : (
              <StickyScrollFeatures
                id={index}
                imageUrl={feature.imageUrl}
                desc={feature.desc}
                key={index}
                containerClassName="sm:flex-row"
              />
            )
          )}
        </section>
        <section id="testimonials" className="my-10 w-full overflow-x-hidden ">
          <InfiniteCard />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;

const samplePost: PostCardProps = {
  userImage: "https://avatars.githubusercontent.com/u/111859181?v=4",
  userName: "Potakaaa",
  title: "Adobong Kare Kare Pinoy Style",
  description:
    "A delicious Filipino dish that combines the flavors of adobo and kare kare.",
  image1:
    "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-09-kare-kare%2Fkare-kare-3458",
  image2:
    "https://www.rappler.com/tachyon/2022/04/Bagnet-Kare-kare.jpg?fit=1024%2C720",
};

const stickyFeatures = [
  {
    imageUrl:
      "https://www.seriouseats.com/thmb/sNOqOuOaiILj05PSuunyT3FuyPY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Filipino-Features-Soups-and-Stews-1e81ba12ce10481caf3ff58981c347ab.jpg",
    desc: "Save your favorite recipes to your Plate List and easily plan your next meal.",
  },
  {
    imageUrl:
      "https://travellingfoodie.net/wp-content/uploads/2022/02/Bs-Sizzling-Kitchen-Mississauga-Travelling-Foodie.jpg",
    desc: "Find the perfect dish faster with tags and filters like “Vegan,” “Quick & Easy,” or “High-Protein.” Discover recipes tailored to your taste!",
  },
  {
    imageUrl:
      "https://static01.nyt.com/images/2018/03/14/dining/14FIlipino1-sub/14FIlipino1-sub-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
    desc: "Like, comment, follow, and share recipes with other food lovers. Engage with the community and get inspired!",
  },
];

const threeFeatures = [
  {
    title: "Personalized Recipe Experience",
    desc: "Easily browse, save, and share your favorite recipes. PlateBook makes cooking inspiration effortless.",
    icon: IconBowlSpoon,
  },
  {
    title: "Aesthetic & Seamless Experience",
    desc: "Enjoy a beautifully designed platform with dark mode, real-time searching, and responsive performance.",
    icon: IconBrandTabler,
  },
  {
    title: "Smart AI Recipe Assistant",
    desc: "Not sure what to cook? Our AI chatbot suggests recipes based on existing posts and your preferences.",
    icon: IconMessageChatbot,
  },
];

const plateBookReviews = [
  {
    quote:
      "PlateBook has completely transformed the way I cook! Finding and saving recipes has never been easier.",
    name: "Sophia Carter",
    title: "Home Chef",
  },
  {
    quote:
      "I love the Plate List feature! It helps me plan my meals effortlessly and keeps my favorite recipes in one place.",
    name: "Daniel Thompson",
    title: "Food Enthusiast",
  },
  {
    quote:
      "The search filters are a game changer! Now I can quickly find vegan and gluten-free recipes that fit my diet.",
    name: "Emma Rodriguez",
    title: "Nutritionist",
  },
  {
    quote:
      "Finally, a food community where I can share my creations and connect with other passionate cooks!",
    name: "Liam Mitchell",
    title: "Aspiring Chef",
  },
  {
    quote:
      "PlateBook’s AI recipe suggestions have helped me make the most out of my pantry ingredients. So convenient!",
    name: "Olivia Bennett",
    title: "Busy Mom",
  },
  {
    quote:
      "I never realized how fun it could be to interact with other home cooks! The comment and like features make it feel like a true community.",
    name: "Ethan Walker",
    title: "Food Blogger",
  },
  {
    quote:
      "The dark mode is a great touch! I can browse recipes at night without straining my eyes.",
    name: "Ava Richardson",
    title: "Nighttime Baker",
  },
  {
    quote:
      "From quick weeknight dinners to elaborate meals, PlateBook has recipes for every occasion. I’m obsessed!",
    name: "Noah Harris",
    title: "Culinary Student",
  },
  {
    quote:
      "The ability to follow my favorite chefs and discover new recipes daily keeps me inspired in the kitchen.",
    name: "Mia Anderson",
    title: "Food Lover",
  },
  {
    quote:
      "Cooking has never been this interactive and fun! PlateBook makes sharing recipes an absolute delight.",
    name: "James Wilson",
    title: "Amateur Cook",
  },
];
