'use client';
import {
    CircleAlertIcon,
    CircleCheckIcon,
    CircleDashedIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type * as React from 'react';
import { toast } from 'sonner';
import ModeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { authClient } from '@/lib/auth-client';
// import PublicMainNavigationMobile from './public-main-navigation-mobile-sheet';

import PublicMainNavigationMobile from './public-main-navigation-mobile-drawer';

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description:
            'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description:
            'For sighted users to preview content available behind a link.',
    },
    {
        title: 'Progress',
        href: '/docs/primitives/progress',
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
        title: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.',
    },
    {
        title: 'Tabs',
        href: '/docs/primitives/tabs',
        description:
            'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
        title: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description:
            'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
];

export default function PublicMainNavigation() {
    const { data: session, isPending } = authClient.useSession();
    console.log('session:', session);
    const router = useRouter();

    async function handleSignOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.info('Logged out', {
                        position: 'top-center',
                        duration: 1000,
                    });
                    router.push('/'); // redirect to login page
                },
                onError: (error) => {
                    toast.error(error.error.message || 'Failed to sign Out', {
                        position: 'top-center',
                    });
                    console.log('ERROR_IK: ', error);
                },
            },
        });
    }
    if (isPending) {
        return (
            <div className='h-8 w-8 animate-pulse bg-neutral-100 dark:bg-neutral-800' />
        );
    }
    return (
        <div className='container mx-auto flex h-[56px] w-full max-w-2xl justify-between px-6 lg:max-w-7xl'>
            {/* <div className="flex items-center">LOGO</div> */}
            <Link className='flex min-w-max items-center gap-2' href='/'>
                {/* <img
                        src="/assets/images/site-logo.png"
                        alt="Site Logo"
                        width={20}
                        height={20}
                    /> */}
                <span className='font-bold'>EKSPERTIZA</span>
                {/* TODO replace logo with SVG*/}
                {/* <svg*/}
                {/*    className="size-5 sm:size-6"*/}
                {/*    xmlns="http://www.w3.org/2000/svg"*/}
                {/*    fill="none"*/}
                {/*    viewBox="0 0 24 24"*/}
                {/* >*/}
                {/*    <g fill="#772D20">*/}
                {/*        <path*/}
                {/*            d="M13.09 3.294c1.924.95 3.422 1.69 5.472.692a1 1 0 0 1 1.438.9v9.54a1 1 0 0 1-.562.9c-2.981 1.45-5.382.24-7.25-.701a38.739 38.739 0 0 0-.622-.31c-1.033-.497-1.887-.812-2.756-.77-.76.036-1.672.357-2.81 1.396V21a1 1 0 1 1-2 0V4.971a1 1 0 0 1 .297-.71c1.522-1.506 2.967-2.185 4.417-2.255 1.407-.068 2.653.453 3.72.967.225.108.443.216.655.32Z"/>*/}
                {/*    </g>*/}

                {/* </svg>*/}
            </Link>
            <ModeToggle />
            <NavigationMenu className='max-sm:hidden'>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            render={<Link href='/'>Home</Link>}
                        />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            render={<Link href='/dashboard'>Dashboard</Link>}
                        />
                    </NavigationMenuItem>
                    {/* START */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Portfolio</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className='grid gap-3 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                                <li className='row-span-3'>
                                    <NavigationMenuLink
                                        render={
                                            <Link
                                                className='flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md'
                                                href='/'
                                            >
                                                {/* <Icons.logo className="h-6 w-6" /> */}
                                                <div className='mt-4 mb-2 font-medium text-lg'>
                                                    Sample WEB page
                                                </div>
                                                <p className='text-muted-foreground text-sm leading-tight'>
                                                    WEB page built with
                                                    shadcn/ui and Tailwind CSS.
                                                </p>
                                            </Link>
                                        }
                                    />
                                </li>
                                <ListItem
                                    href='/portfolio/landing'
                                    title='Portfolio Landing Page'
                                >
                                    Landing Page
                                </ListItem>
                                <ListItem
                                    href='/docs/installation'
                                    title='Installation'
                                >
                                    How to install dependencies and structure
                                    your app.
                                </ListItem>
                                <ListItem
                                    href='/docs/primitives/typography'
                                    title='Typography'
                                >
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    {/* END */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            Getting started
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className='w-96'>
                                <ListItem href='/dashboard' title='Dashboard'>
                                    App admin dashboard
                                </ListItem>
                                <ListItem href='/sign-in' title='Sign in'>
                                    Sign in to view dashboard
                                </ListItem>
                                <ListItem
                                    href='/docs/primitives/typography'
                                    title='Typography'
                                >
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='hidden md:flex'>
                        <NavigationMenuTrigger>
                            Components
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className='grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                                {components.map((component) => (
                                    <ListItem
                                        href={component.href}
                                        key={component.title}
                                        title={component.title}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className='grid w-[200px]'>
                                <li>
                                    <NavigationMenuLink
                                        render={
                                            <Link
                                                className='flex-row items-center gap-2'
                                                href='/'
                                            >
                                                <CircleAlertIcon />
                                                Backlog
                                            </Link>
                                        }
                                    />
                                    <NavigationMenuLink
                                        render={
                                            <Link
                                                className='flex-row items-center gap-2'
                                                href='/'
                                            >
                                                <CircleDashedIcon />
                                                To Do
                                            </Link>
                                        }
                                    />
                                    <NavigationMenuLink
                                        render={
                                            <Link
                                                className='flex-row items-center gap-2'
                                                href='/'
                                            >
                                                <CircleCheckIcon />
                                                Done
                                            </Link>
                                        }
                                    />
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    {session?.user && (
                        <NavigationMenuItem>
                            <div className='flex items-center gap-2'>
                                <Button
                                    onClick={() => {
                                        void authClient.signOut({
                                            fetchOptions: {
                                                onSuccess: () => {
                                                    router.push('/'); // redirect to login page
                                                },
                                            },
                                        });
                                    }}
                                    variant='outline'
                                >
                                    Sign out
                                </Button>
                                {session.user.image ? (
                                    <img
                                        alt=''
                                        className='h-8 w-8'
                                        src={session.user.image}
                                    />
                                ) : (
                                    <div className='flex h-8 w-8 items-center justify-center bg-neutral-100 dark:bg-neutral-800'>
                                        <span className='font-medium text-neutral-600 text-xs dark:text-neutral-400'>
                                            {session.user.name
                                                .charAt(0)
                                                .toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </NavigationMenuItem>
                    )}
                    {/* {loggedIn ? (
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                // render={<Link href="/sign-in">Log out</Link>}
                                render={
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </Button>
                                }
                            />
                        </NavigationMenuItem>
                    ) : (
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                render={<Link href="/sign-in">Log in</Link>}
                            />
                        </NavigationMenuItem>
                    )} */}
                </NavigationMenuList>
            </NavigationMenu>
            {/* <ModeToggle /> */}
            <PublicMainNavigationMobile />
        </div>
    );
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink
                render={
                    <Link href={href}>
                        <div className='flex flex-col gap-1 text-sm'>
                            <div className='font-medium leading-none'>
                                {title}
                            </div>
                            <div className='line-clamp-2 text-muted-foreground'>
                                {children}
                            </div>
                        </div>
                    </Link>
                }
            />
        </li>
    );
}
