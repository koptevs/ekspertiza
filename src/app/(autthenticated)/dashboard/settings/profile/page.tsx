import { headers } from 'next/headers';
import { SignOutButton } from '@/components/sign-out-button';
import { auth } from '@/lib/auth';
import { ContentSection } from '../components/content-section';

const SettingsProfilePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        return (
            <ContentSection
                desc='This is how others will see you on the site.'
                title='Profile'
            >
                <p className='text-destructive'>Unauthorized</p>
            </ContentSection>
        );
    }
    return (
        <ContentSection
            desc='This is how others will see you on the site.'
            title='Profile'
        >
            <div>
                <SignOutButton />
                <div>SettingsProfilePage</div>
                <pre className='overflow-clip text-sm'>
                    {' '}
                    {JSON.stringify(session, null, 4)}
                </pre>
            </div>
        </ContentSection>
    );
};

export default SettingsProfilePage;
