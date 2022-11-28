import { useEffect, useState } from 'react';
import store from "../redux/store";
import { getSchools } from "../redux/actions/schools";
import { useSelector } from 'react-redux';

export function useSchoolsItems() {
    const [page, setPage] = useState(1);
    const items = useSelector(state => state.schools.items);

    const fetch = async () => {
        store.dispatch(getSchools(page));
        setPage(page + 1);
    };

    useEffect(() => { fetch() }, []);

    return [items, fetch];
}
