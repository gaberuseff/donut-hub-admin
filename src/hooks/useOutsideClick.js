import { useEffect, useRef } from "react";

function useOutsideClick(handler, listeCapture = true) {
    const ref = useRef();

    useEffect(() => {
        const handelClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handler();
            }
        };

        document.addEventListener("click", handelClick, listeCapture);

        return () => {
            document.removeEventListener("click", handelClick, listeCapture);
        };
    }, [handler, listeCapture]);

    return ref;
}

export default useOutsideClick;