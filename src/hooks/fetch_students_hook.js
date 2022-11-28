import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getStudents } from "../redux/actions/students";
import store from "../redux/store";

export function useStudents() {
    const [page, setPage] = useState(1);
    const items = useSelector(state => state.students.items);

    const fetch = async () => {
        store.dispatch(getStudents(page));
        setPage(page + 1);
    };

    useEffect(() => { fetch() }, []);

    return [items, fetch];
}
