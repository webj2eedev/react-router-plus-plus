import { useLocation } from "react-router-dom"
import url from 'url'

export default function useQuery() {
    const location = useLocation();

    const query = url.parse(location.search, true);

    return query;
}