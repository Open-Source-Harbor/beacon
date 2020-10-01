import { combineReducers } from 'redux';

// import all reducers here
import jobsReducer from './marketsReducer';

// combine reducers
const reducers = combineReducers({
	// if we had other reducers, they would go here
	jobs: jobsReducer,
});

// make the combined reducers available for import
export default reducers;