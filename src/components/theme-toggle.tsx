'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { ReactElement } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ThemeMode = 'light' | 'dark' | 'system';

export default function ModeToggle() {
    const { theme, setTheme } = useTheme();
    function toggleMode() {
        const nextMode: ThemeMode = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextMode);
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const label =
        theme === 'system'
            ? 'Theme mode: system. Click to switch mode.'
            : `Theme mode: ${theme}. Click to switch mode.`;

    let switcherIcon: ReactElement;
    if (theme === 'system') {
        switcherIcon = media ? (
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
