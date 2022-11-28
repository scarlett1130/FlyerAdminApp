import React, {useEffect, useState, useCallback} from 'react';
import store from "../redux/store";
import {getDistricts} from "../redux/actions/districts";

export function useDistricts() {
    const [page, setPage] = useState(1);
    const [shouldFetch, setShouldFetch] = useState(true);
    const state = store.getState();
    const [items, setItems] = useState([]);

    // return this function for Flatlist to call onEndReached
    const fetchMore = useCallback(() => setShouldFetch(true), []);

    useEffect(() => {
        setItems(state.districts.items);
    }, [state.districts.items]);

    useEffect(
        () => {
            // prevent fetching for other state changes
            if (!shouldFetch) {
                return;
            }

            const fetch = async () => {
                store.dispatch(getDistricts(page));

                // set the should fetch call to false to prevent fetching
                // on page number update
                setShouldFetch(false);
                //increment page for the next call
                setPage(page + 1);
            };

            fetch();
        },
        // prevent fetching for other state changes
        [page, shouldFetch],
    );

    return [items, fetchMore];
}
