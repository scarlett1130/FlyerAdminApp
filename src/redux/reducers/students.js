import {
    ADD_STUDENTS,
    FETCH_STUDENTS,
    SELECT_STUDENT, UNSELECT_STUDENT, UNSELECT_STUDENT_CONTACT, SELECT_STUDENT_ID, SELECT_ALL_STUDENTS, CLEAR_CONTACTS_BY_STUDENTS
} from '../actions/students';
import {initialState} from "../initialStates/students";

export default function studentsReducer(state = initialState, action) {
    switch (action.type) {
        case CLEAR_CONTACTS_BY_STUDENTS:
            return {
                ...state,
                addedContactsByStudent: [],
            };
        case FETCH_STUDENTS:
            return {
                ...state,
                items: action.payload,
            };

        case SELECT_STUDENT:
            let i = action.payload;
            let newContacts = [...state.items];
            newContacts[i].checked = !state.items[i].checked;
            let items = state.items.splice(0, state.items.length, ...newContacts);
            return {
                ...state,
                items: items,
            };

        case SELECT_STUDENT_ID:
            let studentsState = [...state.items];
            let selectedStudent = studentsState.find(x => x.id === action.payload);
            if (selectedStudent !== undefined) {
                let idx = studentsState.indexOf(x => x.id === selectedStudent.id);
                selectedStudent['checked'] = !(selectedStudent.hasOwnProperty('checked') && selectedStudent['checked'] === true);
                studentsState[idx] = selectedStudent;
            }
            return {
                ...state,
                items: studentsState,
            };

        case SELECT_ALL_STUDENTS:
            let studentsAll = [...state.items];
            state.items.map((s, sd) => {
                s['checked'] = action.payload;
                studentsAll[sd] = s;
            });
            return {
                ...state,
                items: studentsAll,
            };

        case UNSELECT_STUDENT:
            let id = action.payload;
            let students = [...state.items];
            let index = students.findIndex(x => x.id === id);
            students[index].checked = !state.items[index].checked;
            let newItems = state.items.splice(0, state.items.length, ...students);
            let addedIndex = state.addedStudents.findIndex(x => x.id === id);
            let addedStudentsArr = state.addedStudents;
            addedStudentsArr.splice(addedIndex, 1);

            let newAddedContactsByStudent = [];
            for (let i = 0; i < addedStudentsArr.length; i++) {
                let contacts = addedStudentsArr[i].contacts;
                for (let j = 0; j < contacts.length; j++) {
                    newAddedContactsByStudent.push(contacts[j]);
                }
            }
            return {
                ...state,
                items: newItems,
                addedStudents: addedStudentsArr,
                addedContactsByStudent: newAddedContactsByStudent,
            };


        case UNSELECT_STUDENT_CONTACT:
            // remove contacts from pills
            let contactId = action.payload;
            let contactIndex = state.addedContactsByStudent.findIndex(x => x.id === contactId);
            let newContactsArr = state.addedContactsByStudent;
            newContactsArr.splice(contactIndex, 1);

            // console.log('reducer addedContactsByStudent, length ', newContactsArr.length);

            return {
                ...state,
                addedContactsByStudent: [...newContactsArr],
            };


        case ADD_STUDENTS:
            let addedStudents = [];
            state.items.map((student, i) => {
                if (student.checked) {
                    addedStudents.push(student);
                }
            });
            let addedContacts = [];
            for (let i = 0; i < addedStudents.length; i++) {
                let contacts = addedStudents[i].contacts;
                for (let j = 0; j < contacts.length; j++) {
                    addedContacts.push(contacts[j]);
                }
            }
            return {
                ...state,
                addedStudents: addedStudents,
                addedContactsByStudent: addedContacts,
            };

        default:
            return state;
    }
}
