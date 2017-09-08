import BedLayoutService from '../src/services/BedLayoutService';

describe("BedLayoutService", () => {
  let bedLayoutService = new BedLayoutService(new Date(2017, 1, 1), new Date(2017, 2, 1));
  let roomBeds = [{ id: 0, room:{id:undefined, name: 'a'}} , { id: 1, room:{id:0, name: 'Fan'} }, { id: 2, room:{id:0, name: 'Fan'} }, { id: 3, room:{id:1, name:  '8 Bed'} }];
  let bookings = [];

  it("Constructor creates days array", () => {
    let days = bedLayoutService.Days;
    expect(days.length).toBe(28);
    expect(days[27].getMonth()).toBe(1);
    expect(days[27].getDate()).toBe(28);
  });
  it("MakeLayout creates beds array", () => {
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);

    expect(beds.length).toBe(4);
    expect(beds[0].days.length).toBe(28);
    expect(beds[1].room.name).toBe('Fan');
  });

  it("MakeLayout puts booking in correct days", () => {
    bookings = [{ name: 'james', checkin: new Date(2017, 1, 2), checkout: new Date(2017, 1, 4) }];
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);

    expect(beds[0].days[0].name).toBeUndefined();
    expect(beds[0].days[1].name).toBe('james');
    expect(beds[0].days[2].name).toBe('james');
    expect(beds[0].days[3].name).toBeUndefined();
  });

  it("MakeLayout puts 2 pax booking in correct days", () => {
    bookings = [{ name: 'james', checkin: new Date(2017, 1, 2), checkout: new Date(2017, 1, 4), roomId: 0, numOfPeople: 2 }];
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);

    expect(beds[1].days[1].name).toBe('james');
    expect(beds[1].days[2].name).toBe('james');
    expect(beds[2].days[1].name).toBe('james');
    expect(beds[2].days[2].name).toBe('james');
  });
  it("MakeLayout puts booking outside of current view in correct days", () => {
    bookings = [{ name: 'james', checkin: new Date(2016, 1, 1), checkout: new Date(2017, 1, 3) }];
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);

    expect(beds[0].days[0].name).toBe('james');
    expect(beds[0].days[1].name).toBe('james');
    expect(beds[0].days[2].name).toBeUndefined();
  });
  it("MakeLayout puts booking outside of current view in correct days", () => {
    bookings = [{ name: 'james', checkin: new Date(2016, 1, 1), checkout: new Date(2018, 1, 3) }];
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);

    expect(beds[0].days[0].name).toBe('james');
    expect(beds[0].days[1].name).toBe('james');
    expect(beds[0].days[27].name).toBe('james');
  });

  it("MakeLayout puts booking in correct room", () => {
    bookings = [{ name: 'james', roomId: 1, checkin: new Date(2017, 1, 2), checkout: new Date(2017, 1, 4) }];
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);

    expect(beds[0].days[1].name).toBeUndefined();
    expect(beds[1].days[1].name).toBeUndefined();
    expect(beds[3].days[0].name).toBeUndefined();
    expect(beds[3].days[1].name).toBe('james');
    expect(beds[3].days[2].name).toBe('james');
    expect(beds[3].days[3].name).toBeUndefined();
  });

  it("MakeLayout unrecognised room added to errors string", () => {
    bookings = [{ name: 'james', roomId: 999, checkin: new Date(2017, 1, 2), checkout: new Date(2017, 1, 4) }];
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);

    expect(beds[0].days[1].name).toBeUndefined();
    expect(beds[3].days[1].name).toBeUndefined();
    expect(bedLayoutService.errors[0]).toBe('Bad booking, unrecognised room: james');
  });
  it("MakeLayout puts 2nd booking in empty bed", () => {
    bookings = [{ name: 'james', roomId: 0, checkin: new Date(2017, 1, 2), checkout: new Date(2017, 1, 4) },
    { name: 'bob', roomId: 0, checkin: new Date(2017, 1, 2), checkout: new Date(2017, 1, 4) }];
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);

    expect(beds[0].days[1].name).toBeUndefined();
    expect(beds[1].days[0].name).toBeUndefined();
    expect(beds[1].days[1].name).toBe('james');
    expect(beds[1].days[2].name).toBe('james');
    expect(beds[1].days[3].name).toBeUndefined();

    expect(beds[2].days[0].name).toBeUndefined();
    expect(beds[2].days[1].name).toBe('bob');
    expect(beds[2].days[2].name).toBe('bob');
    expect(beds[2].days[3].name).toBeUndefined();
  });
  it("MakeLayout puts 3rd booking in empty bed", () => {
    bookings = [{ name: 'james', roomId: 0, checkin: new Date(2017, 1, 2), checkout: new Date(2017, 1, 4) },
    { name: 'bob', roomId: 0, checkin: new Date(2017, 1, 2), checkout: new Date(2017, 1, 4) },
    { name: 'jay', roomId: 0, checkin: new Date(2017, 1, 4), checkout: new Date(2017, 1, 7) }];
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);

    expect(beds[1].days[1].name).toBe('james');
    expect(beds[1].days[2].name).toBe('james');
    expect(beds[1].days[3].name).toBe('jay');
    expect(beds[1].days[4].name).toBe('jay');

    expect(beds[2].days[1].name).toBe('bob');
    expect(beds[2].days[2].name).toBe('bob');
  });

  it("MakeLayout puts 4th and 5th booking in empty bed", () => {
    bookings = [{ name: 'james', roomId: 0, checkin: new Date(2017, 1, 2), checkout: new Date(2017, 1, 4) },
    { name: 'bob', roomId: 0, checkin: new Date(2017, 1, 2), checkout: new Date(2017, 1, 4) },
    { name: 'dan', roomId: 0, checkin: new Date(2017, 1, 4), checkout: new Date(2017, 1, 6) },
    { name: 'dude', roomId: 0, checkin: new Date(2017, 1, 4), checkout: new Date(2017, 1, 5) },
    { name: 'jay', roomId: 0, checkin: new Date(2017, 1, 5), checkout: new Date(2017, 1, 7) }]
    // james | james | dan   | dan | 
    // bob   | bob   | dude  | jay | jay
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);

    expect(beds[1].days[1].name).toBe('james');
    expect(beds[1].days[2].name).toBe('james');
    expect(beds[1].days[3].name).toBe('dan');
    expect(beds[1].days[4].name).toBe('dan');
    expect(beds[1].days[5].name).toBeUndefined();

    expect(beds[2].days[1].name).toBe('bob');
    expect(beds[2].days[2].name).toBe('bob');
    expect(beds[2].days[3].name).toBe('dude');
    expect(beds[2].days[4].name).toBe('jay');
    expect(beds[2].days[5].name).toBe('jay');
  });

  it("MakeLayout puts over-booking in overbookings", () => {
    bookings = [{ name: 'james', room: '8 Bed', checkin: new Date(2017, 1, 2), checkout: new Date(2017, 1, 4) },
    { name: 'jay', room: '8 Bed', checkin: new Date(2017, 1, 3), checkout: new Date(2017, 1, 7) }];
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);

    expect(bedLayoutService.overbookings.length).toBe(1);
    expect(bedLayoutService.overbookings[0].name).toBe('jay');
  });
});