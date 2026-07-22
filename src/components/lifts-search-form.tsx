'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

const ADDRESS_SEARCH_DEBOUNCE_MS = 400;

export const LiftsSearchForm = ({
    regNumbers,
    addressStreets,
    defaultRegNumber,
    defaultAddressStreet,
}: {
    regNumbers: string[];
    addressStreets: string[];
    defaultRegNumber?: string;
    defaultAddressStreet?: string;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const addressDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );

    useEffect(
        () => () => {
            if (addressDebounceRef.current) {
                clearTimeout(addressDebounceRef.current);
            }
        },
        []
    );

    const [regNumberValue, setRegNumberValue] = useState(
        defaultRegNumber ?? null
    );
    const [addressValue, setAddressValue] = useState(
        defaultAddressStreet ?? null
    );

    useEffect(() => {
        setRegNumberValue(defaultRegNumber ?? null);
        setAddressValue(defaultAddressStreet ?? null);
    }, [defaultRegNumber, defaultAddressStreet]);

    const applyFilter = (
        key: 'regNumber' | 'address',
        value: string | null
    ) => {
        const params = new URLSearchParams();
        if (value) {
            params.set(key, value);
        }
        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
    };

    const handleRegNumberValueChange = (value: string | null) => {
        setRegNumberValue(value);
        setAddressValue(null);
        applyFilter('regNumber', value);
    };

    const handleAddressValueChange = (value: string | null) => {
        setAddressValue(value);
        setRegNumberValue(null);
        applyFilter('address', value);
    };

    const handleRegNumberInputChange = (inputValue: string) => {
        if (inputValue && addressValue) {
            setAddressValue(null);
        }
    };

    const handleAddressInputChange = (inputValue: string) => {
        if (inputValue && regNumberValue) {
            setRegNumberValue(null);
        }
        if (addressDebounceRef.current) {
            clearTimeout(addressDebounceRef.current);
        }
        addressDebounceRef.current = setTimeout(() => {
            applyFilter('address', inputValue.trim() || null);
        }, ADDRESS_SEARCH_DEBOUNCE_MS);
    };

    return (
        <FieldGroup>
            <div className='mb-6 grid w-full grid-cols-1 gap-4 md:grid-cols-3'>
                <Field>
                    <FieldLabel htmlFor='search-reg-number'>
                        Reg. number
                    </FieldLabel>
                    <Combobox
                        items={regNumbers}
                        onInputValueChange={handleRegNumberInputChange}
                        onValueChange={handleRegNumberValueChange}
                        value={regNumberValue}
                    >
                        <ComboboxInput
                            id='search-reg-number'
                            placeholder='Search by reg. number'
                            showClear
                        />
                        <ComboboxContent>
                            <ComboboxEmpty>No matches found.</ComboboxEmpty>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item} value={item}>
                                        {item}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </Field>
                <Field>
                    <FieldLabel htmlFor='search-address'>Address</FieldLabel>
                    <Combobox
                        items={addressStreets}
                        onInputValueChange={handleAddressInputChange}
                        onValueChange={handleAddressValueChange}
                        value={addressValue}
                    >
                        <ComboboxInput
                            id='search-address'
                            placeholder='Search by address'
                            showClear
                        />
                        <ComboboxContent>
                            <ComboboxEmpty>No matches found.</ComboboxEmpty>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item} value={item}>
                                        {item}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </Field>
            </div>
        </FieldGroup>
    );
};
