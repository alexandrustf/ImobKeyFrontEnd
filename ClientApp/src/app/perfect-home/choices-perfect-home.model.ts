export class ChoicesPerfectHome {
  public maxPrice: Number;
  public numberOfRooms: Number;
  public nearMall: boolean;
  public nearHospital: boolean;
  public latFavoriteLocations: [];
  public lngFavoriteLocations: [];

  constructor(price, rooms, latLocations, lngLocations) {
    this.maxPrice = price;
    this.numberOfRooms = rooms;
    this.latFavoriteLocations = latLocations;
    this.lngFavoriteLocations = lngLocations;
  }
}
