import { Menu, X } from 'lucide-react';
// import { authClient } from '#/lib/auth-client';
import Link from 'next/link';
import ModeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';

const PublicMainNavigationMobile = () => {
    // const navigate = useNavigate();
    // const { data: session, isPending } = authClient.useSession();
    return (
        <div className='flex w-full items-center justify-end sm:hidden'>
            <Drawer direction='right'>
                <DrawerTrigger asChild>
                    <Button variant='ghost'>
                        <Menu />
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerClose asChild className='ml-auto'>
                            <Button className='w-9' variant='ghost'>
                                {/* <Button variant="outline" className="w-9"> */}
                                <X />
                            </Button>
                        </DrawerClose>
                        <DrawerTitle className='flex items-center justify-between'>
                            EKSPERTIZA
                            <ModeToggle />
                            {/* {session?.user ? ( */}
                            <DrawerClose asChild>
                                <Button
                                    onClick={() => {
                                        // void authClient.signOut({
                                        //     fetchOptions: {
                                        //         onSuccess: () => {
                                        //             navigate({ to: '/' }); // redirect to login page
                                        //         },
                                        //     },
                                        // });
                                    }}
                                    variant='outline'
                                >
                                    Sign out
                                </Button>
                            </DrawerClose>
                            {/* ) : (
                                <DrawerClose asChild>
                                    <Link href="/sign-in">
                                        <Button variant="outline">Sign In</Button>
                                    </Link>
                                </DrawerClose>
                            )} */}
                        </DrawerTitle>
                        <DrawerDescription>Menu</DrawerDescription>
                    </DrawerHeader>

                    <DrawerClose asChild>
                        <Link
                            className='block px-4 py-1 font-semibold text-blue-900 text-xl'
                            href='/'
                        >
                            Home
                        </Link>
                    </DrawerClose>
                    <Link
                        className='block px-4 py-1 font-semibold text-blue-900 text-xl'
                        href='/dashboard'
                        prefetch={false}
                    >
                        Dashboard
                    </Link>
                    <DrawerClose asChild>
                        <Link
                            className='block px-4 py-1 font-semibold text-blue-900 text-xl'
                            href='/about'
                        >
                            About
                        </Link>
                    </DrawerClose>
                    <hr className='mx-4 my-4' />
                    <div className='no-scrollbar overflow-y-auto px-4'>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <p
                                className='mb-4 style-lyra:mb-2 leading-normal style-lyra:leading-relaxed'
                                key={index}
                            >
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        ))}
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant='outline'>Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default PublicMainNavigationMobile;
