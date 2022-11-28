import {
    ADD_CONTACTS,
    FETCH_CONTACTS,
    SELECT_CONTACT, UNSELECT_CONTACT, SELECT_CONTACT_ID, SELECT_ALL_CONTACTS, CLEAR_CONTACTS, CLEAR_CONTACTS_ITEMS
} from '../actions/contacts';
import {initialState} from "../initialStates/contacts";

export default function contactsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONTACTS:
            return {
                ...state,
                items: action.payload,
            };

        case CLEAR_CONTACTS:
            return {
                ...state,
                addedContacts: []
            };

        case CLEAR_CONTACTS_ITEMS:
            return {
                ...state,
                items: []
            };

        case SELECT_CONTACT_ID:
            let contactsState = [...state.items];
            let selectedContact = contactsState.find(x => x.id === action.payload);
            if (selectedContact !== undefined && selectedContact !== null) {
                let idx = contactsState.indexOf(x => x.id = selectedContact.id);
                selectedContact['checked'] = !(selectedContact.hasOwnProperty('checked') && selectedContact['checked'] === true);
                contactsState[idx] = selectedContact;
            }
            return {
                ...state,
                items: contactsState,
            };

        case SELECT_ALL_CONTACTS:
            let contactsState2 = [...state.items];
            state.items.map((c, ic) => {
                c['checked'] = action.payload;
                contactsState2[ic] = c;
            });
            return {
                ...state,
                items: contactsState2,
            };

        case SELECT_CONTACT:
            let i = action.payload;
            let newContacts = [...state.items];
            // console.log('all contacts', newContacts);
            // console.log('select contact i', i);
            // console.log('select contact', newContacts[i]);
            newContacts[i].checked = !state.items[i].checked;
            let items = state.items.splice(0, state.items.length, ...newContacts);
            return {
                ...state,
                items: items,
            };

        case UNSELECT_CONTACT:
            let id = action.payload;
            let contacts = [...state.items];
            let index = contacts.findIndex(x => x.id === id);
            contacts[index].checked = !state.items[index].checked;
            let newItems = state.items.splice(0, state.items.length, ...contacts);
            let addedIndex = state.addedContacts.findIndex(x => x.id === id);
            let addedContactsArr = state.addedContacts;
            addedContactsArr.splice(addedIndex, 1);
            return {
                ...state,
                items: newItems,
                addedContacts: addedContactsArr
            };

        case ADD_CONTACTS:
            let addedContacts = [];
            state.items.map((contact, i) => {
                if (contact.checked) {
                    addedContacts.push(contact);
                }
            });
            return {
                ...state,
                addedContacts: addedContacts,
            };

        default:
            return state;
    }
}
