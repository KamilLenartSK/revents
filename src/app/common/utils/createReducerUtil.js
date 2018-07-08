export const createReducer = (initialState, actionLookupMap) => {

    return (state = initialState, {type, payload}) => {
        const fnHandler = actionLookupMap[type];

        return fnHandler
            ? fnHandler(state, payload)
            : state
    }
}