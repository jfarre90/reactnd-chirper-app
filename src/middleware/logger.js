const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('The action: ', action)
    const returnValue = next(action);
    console.log('Then new state is: ', store.getState())
    console.groupEnd()

    return returnValue;
}

export default logger;