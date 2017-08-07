export const setRoomId = ({userId, roomId, userName}) => {
	return dispatch => {
		dispatch({
			type: 'SET_ROOM_ID',
			userId,
			roomId,
			userName
		})
	}
}