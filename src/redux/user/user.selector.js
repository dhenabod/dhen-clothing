import { createSelector } from "reselect";

// input selector(function that get the whole state and return just a slice of it)
const selectUser = (state) => {
    return state.user;
};

// output selector (takes 2 argument 1st is an array of input selectors, 2nd is a fucntion that will return the value of these selectors)
export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
);
