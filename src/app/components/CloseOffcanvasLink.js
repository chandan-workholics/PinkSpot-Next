'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function CloseOffcanvasLink({ href, children, className = '' }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();

        // If already on the same route, don't push
        if (pathname !== href) {
            router.push(href);
        }

        // Close Bootstrap Offcanvas
        const offcanvasEl = document.querySelector('.offcanvas.show');
        if (offcanvasEl && window.bootstrap) {
            const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }
    };

    return (
        <Link href={href} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}
