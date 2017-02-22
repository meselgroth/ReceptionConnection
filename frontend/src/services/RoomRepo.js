
export default class RoomRepo {
    GetRoomBeds() {
        let roomBeds = [];
        let bedCount =0;
        for (let room of this.GetRooms()) {
            for (let i = 0; i < room.beds; i++) {
                roomBeds.push({ id: bedCount, room: room.name, beds:room.beds });
                bedCount++;
            }
        }
        return roomBeds;
    }

    GetRoomNames() {
        return this.GetRooms().map(r => r.name);
    }
    GetRooms() {
        return [{ id: 0, name: 'Fan', beds: 4 },
        { id: 1, name: '6 Bed', beds: 6 },
        { id: 2, name: '8 Bed', beds: 8 },
        { id: 3, name: '10 Bed', beds: 10 }];
    }
}