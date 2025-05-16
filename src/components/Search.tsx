import React, { useEffect } from 'react';
import { algoliasearch } from 'algoliasearch';
import {
    InstantSearch,
    SearchBox,
    Hits,
    RefinementList,
    RangeInput,
    Configure,
    useSearchBox
} from 'react-instantsearch';
import { Item } from '../types/getItems.ts';
const searchClient = algoliasearch('04RTZHOMX5', 'd984d55d995e3e3ef5f4f81371eae86b');
const indexName = 'Dev_Genizah'
function Hit({ hit }: { hit: Item }) {

    return (
        <article className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold">{hit.title}</h3>
            <p>{hit.dateWritten} – from {hit.creators} to {hit.contributors}</p>
            <a href={`/item/${hit.slug}`} className="text-indigo-600 hover:underline">Read more →</a>
        </article>
    );
}

function PrefilledQuery({ query }: { query: string }) {
    const { refine } = useSearchBox();
    useEffect(() => {
        if (query) refine(query);
    }, [query]);
    return null;
}

export default function Search({ initialQuery = '', corpusFilter = '' }: { initialQuery?: string; corpusFilter?: string }) {
    return (
        <InstantSearch searchClient={searchClient} indexName={indexName}>
            <PrefilledQuery query={initialQuery} />
            <div className="flex flex-col lg:flex-row gap-6">
                <aside className="w-full lg:w-1/4">
                    <SearchBox />
                    {corpusFilter === '' && <RefinementList attribute="corpus_label" />} {/* Hide if filtering by corpus */}
                    <RefinementList attribute="contributors" />
                    <RefinementList attribute="creators" />
                    <RefinementList attribute="topic" />
                    <RangeInput attribute="dateWritten" />
                </aside>
                <main className="w-full lg:w-3/4">
                </main>
            </div>
            <Configure
                hitsPerPage={20}
                filters={corpusFilter ? `corpus:"${corpusFilter}"` : ''}
            />
        </InstantSearch>
    );
}