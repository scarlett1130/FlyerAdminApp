import {
    useEffect,
    useState
} from 'react';
import { useSelector } from 'react-redux';
import { getNewsFeed } from '../redux/actions/newsFeed';
import store from '../redux/store';

export function useFeedItems() {
    const [page, setPage] = useState(1);
    const items = useSelector(state => state.newsFeed.items);

    const fetch = async () => {
        store.dispatch(getNewsFeed(page));
        setPage(page + 1);
    };

    useEffect(() => { fetch(); }, []);

    return [items, fetch];
}
