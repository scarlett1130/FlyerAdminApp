import { useState } from 'react';
import { getMessages } from "../redux/actions/message";
import { getMessagesDraft } from "../redux/actions/message";
import { getMessagesArchived } from "../redux/actions/message";
import store from "../redux/store";
import { useSelector } from 'react-redux';

export function useMessageItems() {
    const [page, setPage] = useState(1);
    const items = useSelector(state => state.message.items);

    const fetch = async (resetPage = false) => {
        if (resetPage) {
            store.dispatch(getMessages(1));
            setPage(2);
        } else {
            store.dispatch(getMessages(page));
            setPage(page + 1);
        }
    };

    return [items, fetch];
}

export function useMessageItemsDraft() {
    const [page, setPage] = useState(1);
    const items = useSelector(state => state.message.items_draft);

    const fetch = async (resetPage = false) => {
        if (resetPage) {
            store.dispatch(getMessagesDraft(1));
            setPage(2);
        } else {
            store.dispatch(getMessagesDraft(page));
            setPage(page + 1);
        }
    };

    return [items, fetch];
}


export function useMessageItemsArchived() {
    const [page, setPage] = useState(1);
    const items = useSelector(state => state.message.items_archived);

    const fetch = async (resetPage = false) => {
        if (resetPage) {
            store.dispatch(getMessagesArchived(1));
            setPage(2);
        } else {
            store.dispatch(getMessagesArchived(page));
            setPage(page + 1);
        }
    };

    return [items, fetch];
};

