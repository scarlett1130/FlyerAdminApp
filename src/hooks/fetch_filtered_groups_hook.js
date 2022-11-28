import { useEffect, useState, useCallback } from "react";
import store from "../redux/store";
import { getGroups } from "../redux/actions/groups";
import { setResetGroups } from "../redux/actions/filters";

export function useGroups() {
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const state = store.getState();
  const [items, setItems] = useState([]);

  // return this function for Flatlist to call onEndReached
  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(() => {
    setItems(state.groups.items);
  }, [state.groups.items]);

  useEffect(
    () => {
      // prevent fetching for other state changes
      if (!shouldFetch) {
        return;
      }

      const fetch = async () => {
        let pages = 1;
        if (state.groups.pagination && state.groups.pagination.total_page) {
          // console.log('pages', state.schools.pagination.total_page);
          pages = state.groups.pagination.total_page;
        }

        if (state.filter.resetGroups) {
          setPage(1);
        }

        if (page > pages) {
          // console.log('page', page);
          // console.log('SCHOOLS', state.schools.items.length);
          setShouldFetch(false);
        } else {
          if (state.filter.resetGroups && shouldFetch) {
            store.dispatch(getGroups(1));
            setPage(2);
            store.dispatch(setResetGroups(false));
          } else {
            store.dispatch(getGroups(page));
            setPage(page + 1);
          }
        }

        // set the should fetch call to false to prevent fetching
        // on page number update
        setShouldFetch(false);
        //increment page for the next call
      };

      fetch();
    },
    // prevent fetching for other state changes
    [page, shouldFetch]
  );

  return [items, fetchMore];
}
