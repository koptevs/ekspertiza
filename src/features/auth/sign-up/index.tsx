import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import SignUpForm from './components/sign-up-form';

export function SignUp() {
    // const { redirect }: { redirect: string | undefined } = useSearch({
    //     from: '/(auth)/sign-in',
    // });
    return (
        <Card className='max-w-sm gap-4'>
            <CardHeader>
                <CardTitle className='text-lg tracking-tight'>
                    Create an account
                </CardTitle>
                <CardDescription>
                    Enter your details below to create your account.{' '}
                    <br className='max-sm:hidden' /> Already have an account?{' '}
                    <Link
                        className='text-nowrap underline underline-offset-4 hover:text-primary'
                        href='/sign-in'
                    >
                        Sign In
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* <SignInForm redirectTo={redirect} /> */}
                <SignUpForm />
            </CardContent>
            <CardFooter className='bg-transparent'>
                <p className='bg-tr px-8 text-center text-muted-foreground text-sm'>
                    By clicking sign in, you agree to our{' '}
                    <a
                        className='underline underline-offset-4 hover:text-primary'
                        href='/terms'
                    >
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                        className='underline underline-offset-4 hover:text-primary'
                        href='/privacy'
                    >
                        Privacy Policy
                    </a>
                    .
                </p>
            </CardFooter>
        </Card>
    );
}
