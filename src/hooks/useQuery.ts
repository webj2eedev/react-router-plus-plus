import { useLocation } from "react-router-dom"
import URLSearchParams from '@ungap/url-search-params'

export default function useQuery() {
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const query = {};
    for (const [key, value] of params) {
        query[key] = value;
    }

    return query;
}