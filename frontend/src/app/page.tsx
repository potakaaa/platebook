import PostCard, { PostCardProps } from "@/components/cards/PostCard";
import HoverMe from "@/components/hero/HoverMe";
import SearchInput from "@/components/hero/SearchInput";
import Features from "@/components/landing/Features";
import StickyScrollFeatures from "@/components/landing/StickyScrollFeatures";
import Navbar from "@/components/navbar/Navbar";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
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
            className="w-full sm:max-w-none lg:max-w-none bg-background dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center"
          >
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <div className="flex flex-col w-full h-fit items-center justify-center z-40">
              <HoverMe />
              <PostCard postItems={samplePost} />
            </div>
          </section>
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
        <div
          id="testimonials"
          className="my-10 w-full h-full overflow-x-hidden "
        >
          <InfiniteMovingCards
            items={plateBookReviews}
            direction="right"
            speed="slow"
          />
        </div>
        <section
          id="meet-the-team"
          className="w-full mt-32 mb-14 flex flex-col items-center justify-center space-y-8"
        >
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted">
            Meet the Team
          </span>
          <div className="flex items-center">
            <AnimatedTooltip items={people} />
          </div>
        </section>
        <section id="footer" className="mt-10">
          <p className="text-muted-foreground">
            © 2025 PlateBook. All rights reserved.
          </p>
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
  images: [
    "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-09-kare-kare%2Fkare-kare-3458",
    "https://www.rappler.com/tachyon/2022/04/Bagnet-Kare-kare.jpg?fit=1024%2C720",
  ],
  forHero: true,
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

const people = [
  {
    id: 1,
    name: "Gerald Helbiro Jr.",
    designation: "Frontend Developer",
    image:
      "https://scontent.fcgm1-1.fna.fbcdn.net/v/t39.30808-6/459627604_3861877484137152_1136108887581876872_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGcnZsW21rZitB8BPv30xLs_lwC21-sVWX-XALbX6xVZRAaBA2PDDGWv83S78hZBgmHpMRKx2KvLgIZ-XgFdxDU&_nc_ohc=zUayjEpQ4X4Q7kNvgFxrxln&_nc_oc=AdhZlsJoWOkyN-L2pKAoTlVEvWBHZ_1fSAQYG34Te-Ubeo1mTGCDX4JnEQG-UqadM0E&_nc_zt=23&_nc_ht=scontent.fcgm1-1.fna&_nc_gid=AZXTs9ag9hvrOzwEtEhhXya&oh=00_AYAl9RNi7sGoALAJGqGUBlfak1hWgTGllv-stQ0MSzQoGQ&oe=67C2872A",
  },
  {
    id: 2,
    name: "Ira Chloie Narisma",
    designation: "UI/UX Designer",
    image:
      "https://scontent.fcgm1-1.fna.fbcdn.net/v/t39.30808-1/391519071_292977133548604_1008644212740598061_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeE1q-7aGg4n7oTzCyBuv8dgSswdRUez6fxKzB1FR7Pp_GkLhEj4wwjSrvXCy4nY-V5aam9nHA8b59qWj2yWeoum&_nc_ohc=xon6crvsBA0Q7kNvgG20NWx&_nc_oc=AdiAddbOsvZc4KAD1erwm1DGj5bI0veTuaklJW2Ea78Pkn0eW2eGnwpOyQepIYor4yg&_nc_zt=24&_nc_ht=scontent.fcgm1-1.fna&_nc_gid=AH02_lP39I8SoCu85yOK-zJ&oh=00_AYDFoUKZt0wiHJeS8mFl3AIUS94ZP0S8lG2Cv33qM1QMLQ&oe=67C267B6",
  },
  {
    id: 3,
    name: "Hans Matthew Del Mundo",
    designation: "Backend Developer",
    image:
      "https://scontent.fcgm1-1.fna.fbcdn.net/v/t39.30808-6/472253317_598424639227106_4134908177380016141_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEKqNm3MnzVVPldDCb3WYT3HLMpEX2iOKUcsykRfaI4pWMMCV0AHMg57yLxihGRhba82URFclfKUpvIkoNwDR0r&_nc_ohc=KmoQE681I_EQ7kNvgGkZB7b&_nc_oc=AdgYmJv_piiR7jYtxqSIZopyYsUh3Ev12n2pTnwO2OrG_YqfidG9Q9PAqcffNLul_UI&_nc_zt=23&_nc_ht=scontent.fcgm1-1.fna&_nc_gid=AzYfFdchD6eMaaXPIrL32kb&oh=00_AYCEpFoKDvG5zbl-193NU0avj0MorvHnWsCBHXVp8FaK2Q&oe=67C26811",
  },
];
