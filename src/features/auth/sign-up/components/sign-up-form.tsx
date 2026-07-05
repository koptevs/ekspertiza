'use client';
import { useForm } from '@tanstack/react-form';
import { Loader2, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

import { authClient } from '@/lib/auth-client';

const signUpSchema = z.object({
    name: z
        .string()
        .min(3, 'Username must be at least 3 characters.')
        .max(30, { message: 'Username must be no more than 30 characters.' }),
    email: z.email(),
    password: z.string().min(8).max(30),
});

interface SignUpFormProps extends React.HTMLAttributes<HTMLFormElement> {
    redirectTo?: string;
}

export default function SignUpForm({
    className,
    redirectTo,
    ...props
}: SignUpFormProps) {
    // const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        validators: {
            onSubmit: signUpSchema,
        },
        onSubmit: async ({ value }) => {
            // return;
            const { name, email, password } = value;
            // const { data, error } = await authClient.signUp.email(
            await authClient.signUp.email(
                {
                    email, // user email address
                    password, // user password -> min 8 characters by default
                    name, // user display name
                },
                {
                    onRequest: () => {},
                    onResponse: () => {},
                    onSuccess: () => {
                        toast.success('Successfully signed up!');
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    },
                }
            );

            // if (error) {
            //     console.log('ERROR: ', error);
            //     toast.error(error.message || 'Failed to sign up');
            // } else {
            //     toast.success('Successfully signed up!');
            //     await sleep(500);
            //     // await navigate({ to: '/about' });
            // }

            setTimeout(() => {
                toast('You submitted the following values:', {
                    description: (
                        <pre className='mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground'>
                            <code>{JSON.stringify(value, null, 2)}</code>
                        </pre>
                    ),
                    position: 'bottom-right',
                    classNames: {
                        content: 'flex flex-col gap-2',
                    },
                    style: {
                        '--border-radius': 'calc(var(--radius)  + 4px)',
                    } as React.CSSProperties,
                });
            }, 3000);
        },
    });
    return (
        <form
            id='form-signup'
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <FieldGroup>
                <form.Field
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Name
                                </FieldLabel>
                                <Input
                                    aria-invalid={isInvalid}
                                    autoComplete='on'
                                    id={field.name}
                                    name={field.name}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    placeholder='John'
                                    value={field.state.value}
                                />
                                {isInvalid && (
                                    <FieldError
                                        errors={field.state.meta.errors}
                                    />
                                )}
                            </Field>
                        );
                    }}
                    name='name'
                />
                <form.Field
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Email address
                                </FieldLabel>
                                <Input
                                    aria-invalid={isInvalid}
                                    autoComplete='on'
                                    id={field.name}
                                    name={field.name}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    placeholder='john@mail.local'
                                    value={field.state.value}
                                />
                                {isInvalid && (
                                    <FieldError
                                        errors={field.state.meta.errors}
                                    />
                                )}
                            </Field>
                        );
                    }}
                    name='email'
                />
                <form.Field
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                        return (
                            <Field data-invalid={isInvalid}>
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
                                    placeholder='Password'
                                    value={field.state.value}
                                />
                                {isInvalid && (
                                    <FieldError
                                        errors={field.state.meta.errors}
                                    />
                                )}
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
                                form='form-signup'
                                type='submit'
                            >
                                {isSubmitting ? (
                                    <Loader2 className='animate-spin' />
                                ) : (
                                    <LogIn />
                                )}
                                Sign Up
                            </Button>
                        </>
                    )}
                </form.Subscribe>
            </FieldGroup>
        </form>
    );
}
