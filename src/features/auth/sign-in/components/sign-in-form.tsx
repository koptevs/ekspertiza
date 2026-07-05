'use client';
import { useForm } from '@tanstack/react-form';
// import { Link, useNavigate } from '@tanstack/react-router';
import { Loader2, LogIn } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { z } from 'zod';
import { IconFacebook, IconGithub } from '@/assets/brand-icons';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { authClient } from '@/lib/auth-client';
import { cn, sleep } from '@/lib/utils';

const signInSchema = z.object({
    email: z.email({
        error: (iss) =>
            iss.input === '' ? 'Please enter your email' : undefined,
    }),
    password: z
        .string()
        .min(1, 'Please enter your password.')
        .min(7, 'Password must be at least 7 characters long.')
        .max(25, 'Too long password'),
});

interface SignInFormProps extends React.HTMLAttributes<HTMLFormElement> {
    redirectTo?: string;
}

export default function SignInForm({
    className,
    redirectTo,
    ...props
}: SignInFormProps) {
    // const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validators: {
            onSubmit: signInSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value);
            const { email, password } = value;
            const { data, error } = await authClient.signIn.email({
                email, // user email address
                password, // user password -> min 8 characters by default
            });
            console.log('DATA: ', data);

            if (error) {
                console.log('ERROR: ', error);
                toast.error(error.message || 'Failed to sign in');
            } else {
                toast.success('Successfully signed in!');
                await sleep(500);
                // Redirect to the stored location or default to dashboard
                const targetPath = redirectTo || '/';
                // await navigate({ to: targetPath, replace: true });
            }
        },
    });
    return (
        <form
            className={cn('grid gap-3', className)}
            id='form-signin'
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            {/* <FieldGroup> */}
            <form.Field
                children={(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                            <Input
                                aria-invalid={isInvalid}
                                autoComplete='on'
                                id={field.name}
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                placeholder='name@example.com'
                                value={field.state.value}
                            />
                            {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                            )}
                        </Field>
                    );
                }}
                name='email'
            />
            <form.Field
                children={(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                        <Field className='relative' data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                                Password
                            </FieldLabel>
                            <PasswordInput
                                aria-invalid={isInvalid}
                                autoComplete='off'
                                id={field.name}
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                placeholder='********'
                                value={field.state.value}
                            />
                            {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                            )}
                            <Link
                                className='absolute inset-e-0 -top-0.5 text-end font-medium text-muted-foreground text-sm hover:opacity-75'
                                href='/forgot-password'
                            >
                                Forgot password?
                            </Link>
                        </Field>
                    );
                }}
                name='password'
            />
            <form.Subscribe
                selector={(formState) => [
                    formState.canSubmit,
                    formState.isSubmitting,
                ]}
            >
                {([canSubmit, isSubmitting]) => (
                    <>
                        <Button
                            className='mt-2 py-[18px]'
                            disabled={!canSubmit}
                            form='form-signin'
                            type='submit'
                        >
                            {isSubmitting ? (
                                <Loader2 className='animate-spin' />
                            ) : (
                                <LogIn />
                            )}
                            Sign in
                        </Button>

                        <div className='relative my-2'>
                            <div className='absolute inset-0 flex items-center'>
                                <span className='w-full border-t' />
                            </div>
                            <div className='relative flex justify-center text-xs uppercase'>
                                <span className='bg-background px-2 text-muted-foreground'>
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <Button
                                disabled={isSubmitting}
                                type='button'
                                variant='outline'
                            >
                                <IconGithub className='h-4 w-4' /> GitHub
                            </Button>
                            <Button
                                disabled={isSubmitting}
                                type='button'
                                variant='outline'
                            >
                                <IconFacebook className='h-4 w-4' /> Facebook
                            </Button>
                        </div>
                    </>
                )}
            </form.Subscribe>
            {/* </FieldGroup> */}
        </form>
    );
}
