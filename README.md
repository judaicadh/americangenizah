# Jesselson Kaplan American Genizah Project
An international initiative to integrate digital technologies into the way we study early American Jewry. Its primary goal is to create an open access digital repository or “genizah” of physically dispersed primary sources that document the development of Jewish life in the Western hemisphere from the 16th-19th centuries.





--- Directory Structure ---

src/

 ├── components/
 
 │   ├── Search.tsx              Algolia InstantSearch UI
 
 │   ├── Map.tsx                 React Leaflet map with geolocation pins
 
 │   └── Timeline.tsx            Date histogram or slider 
 
 ├── data/items.json          Raw metadata for indexing
 
 
 
└── pages/
    ├── index.astro                     ← homepage / global search
    ├── item/
    │   └── [slug].astro                ← page for each letter/document/item
    ├── institution/
    │   └── [slug].astro                ← page for contributing institution
    ├── person/
    │   └── [slug].astro                ← page for person or organization 
    ├── place/
    │   └── [slug].astro                ← pages for geographic locations
    └── corpus/
        └── [slug].astro                ← page for each corpus
