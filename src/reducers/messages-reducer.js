import actionType from '../action/actionType'

const initState = {
    isLoading: false,
    list: [{
        id: 1,
        title: '清明雨上',
        content: '对方会计核算v开始空军的飞机肯定是地方发的伤口v反对',
        from: '张碧晨',
        type: 0
    }, {
        id: 2,
        title: '至上励合',
        content: '对方会计核算v开始空军的飞机肯定是地方发的伤口v反对',
        from: '张碧晨',
        type: 1
    }, {
        id: 3,
        title: '花开花落',
        content: '对方会计核算v开始空军的飞机肯定是地方发的伤口v反对',
        from: '张碧晨',
        type: 0
    }, ]
}

export default ( state = initState, action ) => {
    switch(action.type) {
        case actionType.RECIVERD_MESSAGES:
            return {
                ...state,
                list: action.payload.list
            }
        case actionType.START_CHANGE_MESSADE_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case actionType.FINISH_CHANGE_MESSADE_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case actionType.CHANGE_MESSAGES_TYPE:
            const changeItemList = state.list.map(item => {
                if (item.id === action.payload.id) {
                    item.type = 1
                }
                return item
            })
            return {
                ...state,
                list: changeItemList
            }
        case actionType.CHANGE_ALL_MESSAGES_TYPE:
                const changeAllList = state.list.map(item => {
                    item.type = 1
                    return item
                })
                return {
                    ...state,
                    list: changeAllList
                }
        default:
            return state
    }
}