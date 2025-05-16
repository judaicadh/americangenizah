import React, { useEffect, useState } from 'react';

const sampleQueries = [
    'letters about immigration',
    'Rebecca Gratz to Isaac Leeser',
    'Zionism in the 1850s',
    'Philadelphia correspondence',
    'education and Jewish identity'
];

export default function HeroSearch() {
    const [index, setIndex] = useState(0);
    const [input, setInput] = useState('');
    const [corpus, setCorpus] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % sampleQueries.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = () => {
        const encodedQuery = encodeURIComponent(input);
        const path = corpus
            ? `/corpus/${corpus}?query=${encodedQuery}`
            : `/search?query=${encodedQuery}`;
        window.location.href = path;
    };

    return (
        <section className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                Explore Historical Correspondence
            </h1>
            <div className="relative w-full max-w-2xl">
                <input
                    type="search"
                    placeholder={sampleQueries[index]}
                    className="w-full px-6 py-4 text-xl rounded shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <div className="absolute right-0 top-0 mt-2 mr-2">
                    <button
                        onClick={handleSearch}
                        className="text-sm px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="mt-6">
                <button className="text-indigo-600 hover:underline text-sm mr-4">
                    Advanced Search
                </button>
                <select
                    className="text-sm border border-gray-300 px-2 py-1 rounded"
                    value={corpus}
                    onChange={(e) => setCorpus(e.target.value)}
                >
                    <option value="">All Corpora</option>
                    <option value="gratz-family-letters">Gratz Family Letters</option>
                    <option value="kaplan-collection">Kaplan Collection</option>
                    <option value="jts-archives">JTS Archives</option>
                </select>
            </div>
        </section>
    );
}