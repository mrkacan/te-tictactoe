class GameManager {
  constructor() {
    this.GameManager = null;
  }

  getUserId = async () => {
    const userId = await localStorage.getItem('userId');
    if (userId) {
      return userId;
    }
    return null;
  };

  getCurrentRoomId = async () => {
    const roomId = await localStorage.getItem('currentRoom');
    if (roomId) {
      return roomId;
    }
    return null;
  };

  setUserId = async (userId) => {
    await localStorage.getItem('userId', userId);
  };

  setCurrentRoomId = async (currentRoom) => {
    await localStorage.setItem('currentRoom', currentRoom);
  };

  removeUserId = async () => {
    await localStorage.removeItem('userId');
  }

  removeCurrentRoomId = async () => {
    await localStorage.removeItem('currentRoom');
  }

  clearAppStorage = async () => {
    await this.removeUserId();
    await this.removeCurrentRoomId();
  }
}

export default new GameManager();
