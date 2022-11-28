import {
    FETCH_GROUPS, SET_PAGES, SELECT_GROUP, SELECT_ALL_GROUPS, CLEAR_GROUPS
} from '../actions/groups';
import {initialState} from "../initialStates/groups";

export default function groupsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GROUPS:
            // console.log('FETCH_GROUPS (reducer)');
            // console.log('items', action.payload.data);
            return {
                ...state,
                items: action.payload.groups,
                pagination: action.payload.pagination,
            };
        case CLEAR_GROUPS:
            return {
                ...state,
                items: []
            };
        case SET_PAGES:
            return {
                ...state,
                pages: action.payload,
            };

        case SELECT_GROUP:
            let newGroups = [...state.items];
            let selectedGroup = newGroups.find(x => x.id === action.payload);
            if (selectedGroup !== undefined) {
                let index = newGroups.indexOf(x => x.id = selectedGroup.id);
                selectedGroup['checked'] = !(selectedGroup.hasOwnProperty('checked') && selectedGroup['checked'] === true);
                newGroups[index] = selectedGroup;
            }
            return {
                ...state,
                items: newGroups,
            };

        case SELECT_ALL_GROUPS:
            let groupsState2 = [...state.items];
            state.items.map((g, gd) => {
                g['checked'] = action.payload;
                groupsState2[gd] = g;
            });
            return {
                ...state,
                items: groupsState2,
            };

        default:
            return state;
    }
}
