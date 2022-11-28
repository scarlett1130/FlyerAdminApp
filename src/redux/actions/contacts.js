import { ContactsUrl, StudentsUrl } from '../../constants/api';
import { isExpired } from "../../common/expiration";
import { logout } from "./login";
import { endLoading, startLoading } from './application';

export const FETCH_CONTACTS = 'FETCH_CONTACTS';
export const SELECT_CONTACT = 'SELECT_CONTACT';
export const SELECT_ALL_CONTACTS = 'SELECT_ALL_CONTACTS';
export const UNSELECT_CONTACT = 'UNSELECT_CONTACT';
export const ADD_CONTACTS = 'ADD_CONTACTS';
export const SELECT_CONTACT_ID = 'SELECT_CONTACT_ID';
export const CLEAR_CONTACTS = 'CLEAR_CONTACTS';
export const CLEAR_CONTACTS_ITEMS = 'CLEAR_CONTACTS_ITEMS';


export const fetchContacts = (page, items, oldContacts) => ({
    type: FETCH_CONTACTS,
    payload: page == 1 ? items.data : oldContacts.concat(items.data)
});

export const selectContact = (index) => ({
    type: SELECT_CONTACT,
    payload: index
});

export const selectAllContacts = (flag) => ({
    type: SELECT_ALL_CONTACTS,
    payload: flag,
});

export const clearContacts = () => ({
    type: CLEAR_CONTACTS,
});

export const clearContactsItems = () => ({
    type: CLEAR_CONTACTS_ITEMS,
});

export const selectContactByID = (id) => ({
    type: SELECT_CONTACT_ID,
    payload: id,
});

export const unSelectContact = (id) => ({
    type: UNSELECT_CONTACT,
    payload: id
});

export const addContacts = () => ({
    type: ADD_CONTACTS,
    payload: {},
});


export const getStudentContacts = (studentId) => {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.user.data.access_token;
        let url = StudentsUrl + '/' + studentId + '/contacts';
        const oldContacts = [];

        if (isExpired(state.user.data.expires_in)) return dispatch(logout());


        dispatch(startLoading());
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': '*/*'
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log('contacts fetched');
                dispatch(fetchContacts(data, oldContacts));
            })
            .catch(error => {
                console.log(error);
            }).finally(() => dispatch(endLoading()));
    }
};

export const getContacts = (page) => {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.user.data.access_token;
        let url = ContactsUrl + '?page=' + page;
        if (state.conversations.unitId) {
            url = ContactsUrl + '?unit_id=' + state.conversations.unitId + '?page=' + page;
        }
        let oldContacts = state.contacts.items;

        if (isExpired(state.user.data.expires_in)) return dispatch(logout());

        dispatch(startLoading());
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': '*/*'
            },
        })
            .then(res => res.json())
            .then(data => {
                dispatch(fetchContacts(page, data, oldContacts));
            })
            .catch(error => {
                console.log(error);
            }).finally(() => dispatch(endLoading()));
    }
};

