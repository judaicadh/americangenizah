import items from '../data/items.json';

// A typed helper – reuse everywhere.
export interface Item {
    slug: string;
    collection: string;
    tei: string;
    title: string;
    dateWritten: string;
    creators: string;
    contributors: string;
    institution: string;
    fromLocation: string;
    toLocation: string;
    place: string;
    thumbnail: string;
    corpus: string;
    hasFormat: string;
    link: string;
    // add any extra fields you need
}

export const getAllItems = (): Item[] => items as Item[];

export const getItemBySlug = (slug: string): Item | undefined =>
    (items as Item[]).find((it) => it.slug === slug);