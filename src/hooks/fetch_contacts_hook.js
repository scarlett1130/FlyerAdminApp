import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getContacts } from "../redux/actions/contacts";
import store from "../redux/store";

export function useContacts() {
    const [page, setPage] = useState(1);
    const items = useSelector(state => state.contacts.items);

    const fetch = async () => {
        store.dispatch(getContacts(page));
        setPage(page + 1);
    };

    useEffect(() => { fetch() }, []);

    return [items, fetch];
}
