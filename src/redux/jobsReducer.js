import * as types from './actionTypes';

const initialState = {
	// what is the state
	name: '',
	userID: '',
	boards: [],
	archived: [],
	email: ''
};

const jobsReducer = (state = initialState, action) => {
	
	switch (action.type) {
		case types.ADD_JOB: 
			// set constants that will hold the changed state
			// create the new job object from provided info
			// what is inside action.payload?
			const newJob = {
				title: '',
				company: '',
				location: '',
				url: '',
				column: '',
				notes: '',
				todo: [{
				  name: '',
				  date: '', //date
				}],
				interviews: [{
				  type: '',
				  date: '', //date
				  location: '',
				  notes: '',
				  todo: [{
					name: '',
					date: '', //date
				  }]
				}]
			  }
			// copy the state and update the copy
			let board = state.boards.slice()
			board[0].interestedIn.push(newJob);
			// return updated state
			return {
				...state,
				boards: board,
			};

		//EXAMPLES
		case types.MOVE_JOB:
			//need the payload to include the index and current board
			let newBoard = state.boards.slice() 
			// cut then paste into new column
			return {
				...state,
				boards: newBoard,
			};
		// case types.ADD_CARD:

		// case types.DELETE_CARD:

		default:
			return state;
	}
};

export default jobsReducer;