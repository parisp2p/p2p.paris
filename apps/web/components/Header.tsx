import { cn } from "@/lib/utils";
import {
  Button,
  Logo,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@repo/ui";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex justify-between w-full sticky top-0 h-20 items-center bg-black z-50">
      <Link href="/">
        <Logo />
      </Link>
      <NavigationMenu className="hidden lg:flex w-full bg">
        <NavigationMenuList className="flex mx-auto gap-20">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="uppercase">
              Events_
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        P2P Festival 2025
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        3 days event for p2p, cryptography and privacy
                        enthustiasts
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Past Events">
                  See our past festivals, workshops and meetups.
                </ListItem>
                <ListItem href="/docs/installation" title="Speakers">
                  Hackers, developers, politicians, economists...
                </ListItem>
                <ListItem href="/docs/installation" title="Calendar">
                  Join our next events
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/content" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle() + " uppercase"}
              >
                Content
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="uppercase">
              About_
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Our Manifesto
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Open Source is Rebellion, P2P is Survival
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Links">
                  All useful links to join the community
                </ListItem>
                <ListItem href="/docs/installation" title="Brand Kit">
                  Want to talk about us? Feel free to use our brand assets
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="hidden lg:flex items-center gap-4">
        <div className="flex items-center justify-center gap-4 p-4">
          <a
            href="https://x.com/ParisP2P"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src="/icons/twitter.svg"
              alt="Twitter logo"
              width={16}
              height={16}
            />
          </a>
          <a
            href="https://discord.com/invite/e4UZM4q"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src="/icons/discord.svg"
              alt="Twitter logo"
              width={16}
              height={16}
            />
          </a>
        </div>
        <Button className="uppercase" variant="outline">
          Add to calendar
        </Button>
      </div>
      <button
        onClick={toggleMenu}
        className="lg:hidden text-gray-600 hover:text-gray-900"
        aria-label="Toggle Menu"
      >
        <Image
          src="/icons/bars-solid.svg"
          height={10}
          width={16}
          alt="Menu icon"
        />
      </button>
      {isMenuOpen && (
        <div className="fixed  mt-20 inset-0 z-50 bg-secondary pt-20">
          <div className="flex flex-col h-full p-4">
            <div className="mt-auto">
              <div className="flex items-center justify-center gap-4 mb-8">
                <a
                  href="https://x.com/ParisP2P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <Image
                    src="/icons/twitter.svg"
                    alt="Twitter logo"
                    width={30}
                    height={30}
                  />
                </a>
                <a
                  href="https://discord.com/invite/e4UZM4q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <Image
                    src="/icons/discord.svg"
                    alt="Discord logo"
                    width={30}
                    height={30}
                  />
                </a>
              </div>
              <Button className="uppercase w-full" variant="outline">
                Add to calendar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
