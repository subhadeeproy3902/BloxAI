import Image from "next/image";
import { FollowerPointerCard } from "../ui/following-pointer";
import { Button } from "../ui/button";

export function FollowingPointerDemo() {
  return (
    <section className="flex-center py-20">
      <div className="w-80 mx-auto ">
        <FollowerPointerCard
          title={
            <TitleComponent
              title={blogContent.author}
              avatar={blogContent.authorAvatar}
            />
          }
        >
          <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-background hover:shadow-xl border">
            <div className="w-full aspect-w-16 aspect-h-10 bg-secondary rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative min-h-40">
              <Image
                src={blogContent.image}
                alt="thumbnail"
                layout="fill"
                objectFit="cover"
                className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 `}
              />
            </div>
            <div className=" p-4">
              <h2 className="font-bold my-4 text-lg text-foreground">
                {blogContent.title}
              </h2>
              <h2 className="font-normal my-4 text-sm text-muted-foreground">
                {blogContent.description}
              </h2>
              <div className="flex flex-row justify-between items-center mt-10">
                <span className="text-sm text-muted-foreground">
                  {blogContent.date}
                </span>
                <Button>
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </FollowerPointerCard>
      </div>
      <div className="flex flex-col gap-6 text-center text-balance">
        <h2 className="text-4xl font-bold">
          For All types of <br /> Flowcharts
        </h2>
        <p className="max-w-80 opacity-80">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In deleniti
          laboriosam debitis iure necessitatibus incidunt, quaerat commodi nobis
          vitae enim voluptatibus porro. Error commodi adipisci odio itaque
          molestiae! Eos, placeat.
        </p>
      </div>
      <div className="w-80 mx-auto ">
        <FollowerPointerCard
          title={
            <TitleComponent
              title={blogContent.author}
              avatar={blogContent.authorAvatar}
            />
          }
        >
          <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-background hover:shadow-xl border">
            <div className="w-full aspect-w-16 aspect-h-10 bg-secondary rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative min-h-40">
              <Image
                src={blogContent.image}
                alt="thumbnail"
                layout="fill"
                objectFit="cover"
                className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 `}
              />
            </div>
            <div className=" p-4">
              <h2 className="font-bold my-4 text-lg text-foreground">
                {blogContent.title}
              </h2>
              <h2 className="font-normal my-4 text-sm text-muted-foreground">
                {blogContent.description}
              </h2>
              <div className="flex flex-row justify-between items-center mt-10">
                <span className="text-sm text-muted-foreground">
                  {blogContent.date}
                </span>
                <Button>
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </FollowerPointerCard>
      </div>
    </section>
  );
}

const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Manu Arora",
  date: "28th March, 2023",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description:
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
  image: "/bdkjv.png",
  authorAvatar: "https://picsum.photos/50",
};

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
