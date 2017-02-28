
export default class RoomRepo {
    GetRoomBeds() {
        let roomBeds = [];
        let bedCount =0;
        for (let room of this.GetRooms()) {
            for (let i = 0; i < room.bedCount; i++) {
                roomBeds.push({ id: bedCount, room: room });
                bedCount++;
            }
        }
        return roomBeds;
    }

    GetRoomNames() {
        return this.GetRooms().map(r => r.name);
    }
    GetRooms() {
        return [{ id: '95159', name: 'Fan', bedCount: 4 },
        { id: '1', name: '6 Bed', bedCount: 6 },
        { id: '2', name: '8 Bed', bedCount: 8 },
        { id: '3', name: '10 Bed', bedCount: 10 }];
    }
}