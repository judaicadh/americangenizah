import React from 'react';
import Viewer from "@samvera/clover-iiif/scroll";

export default function LetterViewer({ manifestUrl }: { manifestUrl: string }) {
    return (
        <div className="h-[80vh] w-full">
            <Viewer iiifContent={manifestUrl} />
        </div>
    );
}