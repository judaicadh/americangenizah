import type { FC } from 'react';

export const ComingSoon: FC = () => (
    <section
        className="relative flex items-center justify-center text-center
               bg-cover bg-center min-h-[60vh] md:min-h-[70vh]"
        style={{
            backgroundImage:
                "url('https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=2940&q=80')",
        }}
    >
        {/* overlay */}
        <span className="absolute inset-0 bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80" />

        <div className="relative z-10 px-6 max-w-4xl mx-auto">
            <h1 className="mb-4 font-extrabold tracking-tight text-white
                     text-4xl md:text-6xl lg:text-7xl leading-tight">
                Re-imagining the

                American Genizah
            </h1>

            <p className="mb-6 text-base md:text-lg text-white/85 max-w-3xl mx-auto">
                A fresh digital home for early American Jewish history is on the way.
            </p>

            <p className="mb-12 text-base md:text-lg text-white/75 max-w-3xl mx-auto">
                We’re upgrading search, metadata, and IIIF viewers so you can explore
                letters, manuscripts, and ephemera from the 16<sup>th</sup>–19<sup>th</sup> centuries — all in one place.
                Check back soon!
            </p>

            <a
                href="/americangenizah/about"
                className="inline-block rounded bg-gray-100/10 px-6 py-3 text-lg font-medium text-white
                   ring-1 ring-white/40 backdrop-blur-sm
                   hover:bg-white/10 hover:underline focus:outline-none focus:ring-2
                   focus:ring-offset-2 focus:ring-white transition"
            >
                Learn more about the Jesselson-Kaplan American Genizah Project
            </a>
        </div>
    </section>
);
