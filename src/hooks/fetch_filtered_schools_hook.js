import { useEffect, useState } from 'react';
import store from "../redux/store";
import { getSchools } from "../redux/actions/schools";
import { setResetSchools } from "../redux/actions/filters";
import { useSelector } from 'react-redux';

export function useFilterSchoolsItems() {
    const [page, setPage] = useState(1);
    const state = store.getState();
    const items = useSelector(state => state.schools.items);

    const fetch = async () => {
        let pages = 1;
        if (state.schools.pagination && state.schools.pagination.total_page) {
            pages = state.schools.pagination.total_page;
        }

        if (state.filter.resetSchools) setPage(1);

        if (page <= pages) {
            if (state.filter.resetSchools) {
                store.dispatch(getSchools(1));
                setPage(2);
                store.dispatch(setResetSchools(false));
            } else {
                store.dispatch(getSchools(page));
                setPage(page + 1);
            }
        }

    };

    useEffect(() => { fetch() }, []);

    return [items, fetch];
}
