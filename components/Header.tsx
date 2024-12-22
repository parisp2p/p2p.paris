import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
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
ListItem.displayName = 'ListItem';

export default function Header() {
  return (
    <div className="flex p-4 justify-between">
      <div className="flex gap-4 items-center">
        <Image width={30} height={30} alt="" src="/images/paris-p2p-logo.svg" />
        <h1 className="font-bold text-lg">Paris P2P</h1>
      </div>
      <NavigationMenu className="flex w-full bg">
        <NavigationMenuList className="flex mx-auto gap-20">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="uppercase">
              Events_
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
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
                    </a>
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
                className={navigationMenuTriggerStyle() + ' uppercase'}
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
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Our Manifesto
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Open Source is Rebellion, P2P is Survival
                      </p>
                    </a>
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
      <Button className="uppercase">+ Add to calendar</Button>
    </div>
  );
}
