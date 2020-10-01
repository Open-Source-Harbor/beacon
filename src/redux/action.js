// import actionType constants
import * as types from './actionTypes';

export const addJob = (updateJobs) => ({
	type: types.ADD_JOB,
	payload: updateJobs,
});

export const moveJob = (updateColumn) => ({
	type: types.MOVE_JOB,
	payload: updateColumn,
});
