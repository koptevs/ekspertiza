import { ComponentExample } from '@/components/component-example';
import Footer from '@/components/footer';
import { PublicMainNavigation } from '@/components/public-main-navigation';

export default function IndexPage() {
    return (
        <div className='container mx-auto w-full max-w-2xl px-6 lg:max-w-7xl'>
            <PublicMainNavigation />
            <ComponentExample />
            <Footer />
        </div>
    );
}
