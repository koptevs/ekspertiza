import 'dotenv/config';

import { db } from '@/db';
import { lifts } from '@/db/schema/index';
import liftsData from '@/db/seeds/data/lifts.json';

interface RawLift {
    bir_url: string;
    google_coordinates: string;
    lifts_adrese_iela: string;
    lifts_adrese_indeks: string;
    lifts_adrese_kapnu_telpa: string;
    lifts_adrese_maja: string;
    lifts_adrese_majas_serija: string;
    lifts_adrese_novads: string;
    lifts_adrese_pagasts: string;
    lifts_adrese_pilseta: string;
    lifts_atrums: string;
    lifts_celtspeja: string;
    lifts_code: string;
    lifts_kategorija: '1' | '2' | '3' | 'CE';
    lifts_latitude?: string;
    lifts_longitude?: string;
    lifts_modelis: string;
    lifts_piezimes: string;
    lifts_razotajs: string;
    lifts_reg_nr: string;
    lifts_rupn_nr: string;
    lifts_stavu_skaits: string;
    lifts_tips: 'elektriskais' | 'hidrauliskais';
    lifts_uzstadisanas_gads: string;
    lifts_uzstaditajs: string;
}

const toNullable = (value: string | undefined | null) =>
    value && value.trim() !== '' ? value : null;

const FLOORS_SERVICED_PATTERN = /\d+/;
const toFloorsServiced = (value: string) => {
    const match = value.match(FLOORS_SERVICED_PATTERN);
    return match ? Number(match[0]) : null;
};

const LIFT_PLACEMENT_PATTERN = /^\d+-([A-Za-z]+)$/;
const toLiftPlacement = (value: string) => {
    const match = value.match(LIFT_PLACEMENT_PATTERN);
    return match ? match[1] : null;
};

const SPEED_PATTERN = /\d+(?:\.\d+)?/;
const toSpeed = (value: string | undefined | null) => {
    const normalized = toNullable(value)?.replace(',', '.');
    const match = normalized?.match(SPEED_PATTERN);
    return match ? match[0] : null;
};

const toGoogleCoordinates = (raw: RawLift) => {
    const coordinates = toNullable(raw.google_coordinates);
    if (coordinates) {
        return coordinates;
    }
    if (raw.lifts_latitude && raw.lifts_longitude) {
        return `${raw.lifts_latitude}, ${raw.lifts_longitude}`;
    }
    return null;
};

const toAddressNovads = (raw: RawLift) => {
    const parts = [raw.lifts_adrese_pagasts, raw.lifts_adrese_novads]
        .map((part) => part?.trim())
        .filter((part): part is string => Boolean(part));
    return parts.length > 0 ? parts.join(' ') : null;
};

const STREET_TYPE_SUFFIXES = new Set([
    'šoseja',
    'bulvāris',
    'bulvaris',
    'gatve',
    'prospekts',
    'aleja',
    'līnija',
    'laukums',
    '"Jūrmala"',
]);

const WHITESPACE_PATTERN = /\s+/;
const toAddressStreet = (value: string) => {
    const trimmed = value.trim();
    const words = trimmed.split(WHITESPACE_PATTERN);
    const lastWord = words.at(-1)?.toLowerCase();
    if (lastWord && STREET_TYPE_SUFFIXES.has(lastWord)) {
        return trimmed;
    }
    return `${trimmed} iela`;
};

const mapLift = (raw: RawLift) => ({
    regNumber: raw.lifts_reg_nr,
    factoryNumber: raw.lifts_rupn_nr,
    model: toNullable(raw.lifts_modelis),
    floorsServiced: raw.lifts_stavu_skaits
        ? toFloorsServiced(raw.lifts_stavu_skaits)
        : null,
    liftPlacement: raw.lifts_stavu_skaits
        ? toLiftPlacement(raw.lifts_stavu_skaits)
        : null,
    speed: toSpeed(raw.lifts_atrums),
    load: Number(raw.lifts_celtspeja),
    manufacturer: toNullable(raw.lifts_razotajs),
    type: raw.lifts_tips,
    category: raw.lifts_kategorija,
    installationYear: Number(raw.lifts_uzstadisanas_gads),
    installer: toNullable(raw.lifts_uzstaditajs),
    addressCity: raw.lifts_adrese_pilseta,
    addressPostalCode: raw.lifts_adrese_indeks,
    addressNovads: toAddressNovads(raw),
    addressStreet: toAddressStreet(raw.lifts_adrese_iela),
    addressBuildingNr: raw.lifts_adrese_maja,
    addressBuildingEntrance: toNullable(raw.lifts_adrese_kapnu_telpa),
    buildingSeries: toNullable(raw.lifts_adrese_majas_serija),
    googleCoordinates: toGoogleCoordinates(raw),
    entryCode: toNullable(raw.lifts_code),
    birUrl: toNullable(raw.bir_url),
    notes: toNullable(raw.lifts_piezimes),
});

export async function seedLifts() {
    const rows = Object.values(
        liftsData as unknown as Record<string, RawLift>
    ).map(mapLift);
    await db.insert(lifts).values(rows);
}
