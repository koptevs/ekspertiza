import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from '../mode-toggle';

const PublicMainNavigationMobile = () => {
    return (
        <div className="ml-4 flex w-full items-center justify-end sm:hidden">
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
};

export default PublicMainNavigationMobile;
