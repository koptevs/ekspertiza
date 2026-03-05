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
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const PublicMainNavigationMobile = () => {
    return (
        <div className="flex w-full items-center justify-end sm:hidden">
            <Drawer direction="right">
                <DrawerTrigger asChild>
                    <Button variant="ghost">
                        <Menu />
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerClose asChild className="ml-auto">
                            <Button variant="ghost" className="w-9">
                                {/* <Button variant="outline" className="w-9"> */}
                                <X />
                            </Button>
                        </DrawerClose>
                        <DrawerTitle>EKSPERTIZA</DrawerTitle>
                        <DrawerDescription>Menu</DrawerDescription>
                    </DrawerHeader>
                    <DrawerClose asChild>
                        <Link
                            href="/"
                            className="block px-4 py-1 text-xl font-semibold text-blue-900"
                        >
                            HOME
                        </Link>
                    </DrawerClose>
                    <Link
                        href="/dashboard"
                        className="block px-4 py-1 text-xl font-semibold text-blue-900"
                    >
                        DASHBOARD
                    </Link>
                    <DrawerClose asChild>
                        <Link
                            href="/"
                            className="block px-4 py-1 text-xl font-semibold text-blue-900"
                        >
                            ABOUT
                        </Link>
                    </DrawerClose>
                    <hr className="mx-4 my-4" />
                    <div className="no-scrollbar overflow-y-auto px-4">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <p
                                key={index}
                                className="style-lyra:mb-2 style-lyra:leading-relaxed mb-4 leading-normal"
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
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default PublicMainNavigationMobile;
