import ModeToggle from '@/components/theme-toggle';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const PublicMainNavigationMobile = () => (
    <div className='ml-4 flex w-full items-center justify-end sm:hidden'>
        <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone.
                    </SheetDescription>
                </SheetHeader>
                <ModeToggle />
            </SheetContent>
        </Sheet>
    </div>
);

export default PublicMainNavigationMobile;
