import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ThemeMode = 'light' | 'dark' | 'auto';

function getInitialMode(): ThemeMode {
    if (typeof window === 'undefined') {
        return 'auto';
    }

    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark' || stored === 'auto') {
        return stored;
    }

    return 'auto';
}

function applyThemeMode(mode: ThemeMode) {
    const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;
    const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode;

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolved);

    if (mode === 'auto') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', mode);
    }

    document.documentElement.style.colorScheme = resolved;
}

export default function ThemeToggle() {
    const [mode, setMode] = useState<ThemeMode>('auto');

    useEffect(() => {
        const initialMode = getInitialMode();
        setMode(initialMode);
        applyThemeMode(initialMode);
    }, []);

    useEffect(() => {
        if (mode !== 'auto') {
            return;
        }

        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = () => applyThemeMode('auto');

        media.addEventListener('change', onChange);
        return () => {
            media.removeEventListener('change', onChange);
        };
    }, [mode]);

    function toggleMode() {
        const nextMode: ThemeMode = mode === 'dark' ? 'light' : 'dark';
        // const nextMode: ThemeMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light';
        setMode(nextMode);
        applyThemeMode(nextMode);
        window.localStorage.setItem('theme', nextMode);
    }

    const label =
        mode === 'auto'
            ? 'Theme mode: auto (system). Click to switch to light mode.'
            : `Theme mode: ${mode}. Click to switch mode.`;

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
            {mode === 'auto' ? (
                'Auto'
            ) : mode === 'dark' ? (
                <Moon className='h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            ) : (
                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            )}
        </button>
        // <DropdownMenu>
        //     <DropdownMenuTrigger>
        //         <div
        //             className={buttonVariants({
        //                 variant: 'outline',
        //                 size: 'icon',
        //             })}
        //         >
        //             <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        //             <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        //             <span className="sr-only">Toggle theme</span>
        //         </div>
        //     </DropdownMenuTrigger>
        //     {/* <button
        //         onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        //     >
        //         Toggle
        //     </button> */}
        //     <DropdownMenuContent align="end">
        //         <DropdownMenuItem onClick={() => toggleMode()}>light</DropdownMenuItem>
        //         <DropdownMenuItem onClick={() => toggleMode()}>dark</DropdownMenuItem>
        //         <DropdownMenuItem onClick={() => toggleMode()}>system</DropdownMenuItem>
        //     </DropdownMenuContent>
        // </DropdownMenu>
    );
}
