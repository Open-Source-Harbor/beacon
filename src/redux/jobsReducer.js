import * as types from './actionTypes';

const initialState = {
	// what is the state
	name,
	userID,
	boards,
	archived,
	email
};

const jobsReducer = (state = initialState, action) => {
	
	// switch (action.type) {
	// 	case types.SOME_ACTION: //use an actual action from file
	// 		// set constants that will hold the changed state
			
	// 		// copy the state and update the copy
			
	// 		// return updated state
	// 		return {
	// 			// key value pairs
	// 		};

		//EXAMPLES
		// case types.SET_NEW_LOCATION:
		
		// case types.ADD_CARD:

		// case types.DELETE_CARD:

		default:
			return state;
	}
};

export default jobsReducer;