import {
    FETCH_DISTRICTS, SELECT_ALL_DISTRICTS, SELECT_DISTRICT, CLEAR_DISTRICTS
} from '../actions/districts';
import {initialState} from "../initialStates/districts";

export default function districtsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DISTRICTS:
            return {
                ...state,
                items: action.payload,
            };
        case CLEAR_DISTRICTS:
            return {
                ...state,
                items: []
            };
        case SELECT_DISTRICT:
            let newDistricts = [...state.items];
            let selectedDistrict = newDistricts.find(x => x.id === action.payload);
            if (selectedDistrict !== undefined) {
                let index = newDistricts.indexOf(x => x.id = selectedDistrict.id);
                selectedDistrict['checked'] = !(selectedDistrict.hasOwnProperty('checked') && selectedDistrict['checked'] === true);
                newDistricts[index] = selectedDistrict;
            }
            return {
                ...state,
                items: newDistricts,
            };

        case SELECT_ALL_DISTRICTS:
            let districtsState2 = [...state.items];
            state.items.map((d, id) => {
                d['checked'] = action.payload;
                districtsState2[id] = d;
            });
            return {
                ...state,
                items: districtsState2,
            };

        default:
            return state;
    }
}
