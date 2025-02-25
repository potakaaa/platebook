import { PostCardProps } from "@/components/cards/PostCard";
import FloatingNavbar from "@/components/navbar/FloatingNav";
import HomeLogo from "@/components/navbar/nav/HomeLogo";
import UserNav from "@/components/navbar/UserNav";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SpotlightNew } from "@/components/ui/spotlight-new";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex w-full items-center justify-center px-2 py-5">
      <UserNav />
      <SpotlightNew />
      <section
        id="header"
        className="flex w-full max-w-lg flex-col justify-start items-center space-y-4 px-5 fixed top-16 my-5"
      >
        <div className="flex w-full justify-start flex-col space-y-1 ">
          <h1 className="text-primary text-xl font-semibold text-left">
            Want to Cook Something?
          </h1>
          <p className="text-foreground text-xs text-left">
            Discover delicious recipes here!
          </p>
        </div>
        <AspectRatio ratio={16 / 8} className="justify-start">
          <Image
            src={
              "https://makeyourasia.com/templates/yootheme/cache/09/3-09a03ff0.jpeg"
            }
            alt="Home Cover Photo"
            fill
            className="rounded-xl shadow-lg object-cover"
          />
        </AspectRatio>
      </section>
      <section></section>
      <FloatingNavbar />
    </div>
  );
};

export default page;

const samplePost: PostCardProps[] = [
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
  {
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
  },
];
