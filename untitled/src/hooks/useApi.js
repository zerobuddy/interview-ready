import { useEffect, useState } from "react";

export function useApi(apiFn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiFn({ signal: controller.signal })
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, deps);

    return { data, loading, error };
}
