import React, { useEffect, useState } from 'react';

export function useScreenEnter(ref: React.RefObject<HTMLElement>, callback?: () => void) {
    const [entered, setEntered] = useState(false);
    function activate() {
        if (ref.current && isInViewPort(ref.current.getBoundingClientRect()) && !entered) {
            callback?.();
            setEntered(true);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', activate);
        return () => document.removeEventListener('scroll', activate);
    });
}

function isInViewPort(rect: DOMRect) {
    return (
        window.screen.height >= rect.bottom &&
        window.screen.width >= rect.right &&
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.width > 0 &&
        rect.height > 0
    );
}
