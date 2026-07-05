'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { ReactElement } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ThemeMode = 'light' | 'dark' | 'system';

export default function ModeToggle() {
    const { theme, resolvedTheme, setTheme } = useTheme();
    function toggleMode() {
        const nextMode: ThemeMode = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextMode);
    }
    const label =
        theme === 'system'
            ? 'Theme mode: system. Click to switch mode.'
            : `Theme mode: ${theme}. Click to switch mode.`;

    let switcherIcon: ReactElement;
    if (theme === 'system') {
        switcherIcon =
            resolvedTheme === 'dark' ? (
                <Moon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            ) : (
                <Sun className='h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            );
    } else if (theme === 'dark') {
        switcherIcon = (
            <Sun className='h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        );
    } else {
        switcherIcon = (
            <Moon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        );
    }
    return (
        <button
            aria-label={label}
            // className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
            className={cn(
                buttonVariants({
                    variant: 'ghost',
                    size: 'icon',
                }),
                'mt-3.5'
            )}
            onClick={toggleMode}
            title={label}
            type='button'
        >
            {switcherIcon}
        </button>
        // <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //         <Button size='icon' variant='outline'>
        //             <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        //             <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        //             <span className='sr-only'>Toggle theme</span>
        //         </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align='end'>
        //         <DropdownMenuItem onClick={() => setTheme('light')}>
        //             Light
        //         </DropdownMenuItem>
        //         <DropdownMenuItem onClick={() => setTheme('dark')}>
        //             Dark
        //         </DropdownMenuItem>
        //         <DropdownMenuItem onClick={() => setTheme('system')}>
        //             System
        //         </DropdownMenuItem>
        //     </DropdownMenuContent>
        // </DropdownMenu>
    );
}
/*
Build succeeds now.
Root cause: theme-toggle.tsx:17 called window.matchMedia(...) directly in the render body of a client component. During next build's static prerender pass, client components are still rendered on the server, where window doesn't exist — hence the crash. It was also a logic bug: media (the MediaQueryList object) is always truthy, so the old code never actually reflected whether the system preference was dark or light.
Fix: switched to resolvedTheme from next-themes, which already resolves "system" to the actual light/dark preference without touching window.
*/
