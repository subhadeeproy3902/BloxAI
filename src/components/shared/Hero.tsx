import heroimg from "@/app/assets/65375f2ad14a4d731410f610_Hero New-p-1600.webp";
import { ContainerScroll } from "@/components/ui/scroll-anim";
import Image from "next/image";

export function Hero() {
  return (
    <div className="flex md:pt-0 pt-28 flex-col overflow-hidden text-balance">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-foreground tracking-tight text-neutral-900 dark:text-stone-100">
              Documents & diagrams for the
              <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-b from-neutral-900 via-zinc-900 to-stone-400 dark:from-neutral-50 dark:via-stone-400 dark:to-zinc-950 text-transparent bg-clip-text">
                Future with AI
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={heroimg}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
