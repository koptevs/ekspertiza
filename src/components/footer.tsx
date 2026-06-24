export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className='mt-20 border-[var(--line)] border-t px-4 pt-4 pb-4 text-[var(--sea-ink-soft)]'>
            <div className='page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left'>
                <p className='m-0 text-sm'>
                    &copy; {year} "Ekspertiza". &nbsp;  All rights reserved.
                </p>
                <p className='island-kicker m-0'>Built with Next.js</p>
            </div>
        </footer>
    );
}
