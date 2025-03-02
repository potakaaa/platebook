import PostCard, { PostCardProps } from "@/components/cards/PostCard";
import HomeImageSlider from "@/components/home/HomeImageSlider";
import InfiniteScrollComp from "@/components/home/InfiniteScroll";
import LeftNav from "@/components/home/LeftNav";
import SearchBar from "@/components/home/SearchBar";
import FloatingNavbar from "@/components/navbar/FloatingNav";
import UserNav from "@/components/navbar/UserNav";
import { SpotlightNew } from "@/components/ui/spotlight-new";

const page = () => {
  return (
    <div className="flex flex-row w-full justify-center items-center bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* <UserNav /> */}

      <div className="flex flex-row w-full justify-center items-start min-h-screen overflow-y-auto">
        <section
          id="feed"
          className="flex flex-col w-full z-30 py-10 overflow-y-auto"
        >
          <section id="search" className="mb-10 w-full">
            <SearchBar />
          </section>

          <section
            id="header"
            className="flex w-full flex-col justify-center items-center self-center space-y-4 z-10 mb-12 sm:mb-14"
          >
            <div className="flex w-full justify-start flex-col space-y-1 ">
              <h1 className="text-primary text-xl sm:text-2xl lg:text-3xl font-bold text-left">
                Want to Cook Something?
              </h1>
              <p className="text-foreground text-xs sm:text-sm lg:text-base text-left">
                Discover delicious recipes here!
              </p>
              <HomeImageSlider />
            </div>
          </section>
          <section
            id="posts"
            className="flex flex-col max-w-md lg:max-w-xl xl:max-w-2xl justify-center self-center w-full space-y-5"
          >
            <InfiniteScrollComp />
          </section>
        </section>
      </div>

      <FloatingNavbar />
    </div>
  );
};

export default page;

const posts: PostCardProps[] = [
  {
    userImage: "https://avatars.githubusercontent.com/u/111859181?v=4",
    userName: "Potakaaa",
    title: "Adobong Kare Kare Pinoy Style",
    description:
      "A delicious Filipino dish that combines the flavors of adobo and kare kare.",
    images: [
      "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-09-kare-kare%2Fkare-kare-3458",
      "https://www.rappler.com/tachyon/2022/04/Bagnet-Kare-kare.jpg?fit=1024%2C720",
    ],
  },
  {
    userImage: "https://example.com/avatars/abi_marquez.jpg",
    userName: "Abi Marquez",
    title: "Classic Chicken Adobo",
    description:
      "A savory and slightly sweet chicken stew marinated in soy sauce and vinegar.",
    images: [
      "https://www.allchickenrecipes.com/wp-content/uploads/2023/01/Chicken-Adobo.jpg",
      "https://filrecipes101.blogspot.com/2014/03/pork-adobo-recipe-or-adobong-baboy.html",
    ],
  },
  {
    userImage: "https://example.com/avatars/jeeca_uy.jpg",
    userName: "Jeeca Uy",
    title: "Vegan Pancit Canton",
    description:
      "A plant-based twist on the traditional Filipino stir-fried noodle dish.",
    images: [
      "https://www.thespruceeats.com/thmb/4G8Y5Y5G8Y5Y5G8Y5Y5G8Y5Y5Y5=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/traditional-filipino-pancit-recipe-4172129-hero-01-5c3e6c46c9e77c0001d0d0d0.jpg",
      "https://www.chefspencil.com/wp-content/uploads/2021/04/Pancit.jpg",
    ],
  },
  /* {
    userImage: "https://example.com/avatars/filipino_foodie.jpg",
    userName: "Filipino Foodie",
    title: "Sinigang na Baboy",
    description:
      "A tangy and savory pork soup with vegetables, flavored with tamarind.",
    images: [
      "https://cookandsavor.com/wp-content/uploads/2023/02/Sinigang.jpg",
      "https://ar.inspiredpencil.com/wp-content/uploads/2023/01/Sinigang-Pork-Belly.jpg",
    ],
  },
  {
    userImage: "https://example.com/avatars/chef_ryan.jpg",
    userName: "Chef Ryan",
    title: "Crispy Lechon Kawali",
    description:
      "Deep-fried pork belly with a crispy exterior and tender, juicy meat inside.",
    images: [
      "https://discover.hubpages.com/food/The-Original-Cebu-Lechon-Recipe",
      "https://generals-lechon.com/wp-content/uploads/2023/03/Lechon-Kawali.jpg",
    ],
  },
  {
    userImage: "https://example.com/avatars/maria_cook.jpg",
    userName: "Maria Cook",
    title: "Refreshing Halo-Halo",
    description:
      "A popular Filipino dessert with shaved ice, sweetened beans, fruits, and topped with leche flan.",
    images: [
      "https://pagkaing-filipino.blogspot.com/2012/03/halo-halo-seasonal-flavor-of-summer.jpg",
      "https://www.chefspencil.com/wp-content/uploads/2021/04/Halo-Halo.jpg",
    ],
  }, */
];
