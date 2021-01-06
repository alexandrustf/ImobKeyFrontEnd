import { LocationModel } from "./location.model";

export class Apartment {
  public id: string;
  public name: string;
  public price: number;
  public area: number;
  public numberOfRooms: number;
  public location: string;
  public exactAdress: string;
  public lat: number;
  public lng: number;
  public imagesBytes: any;
  public pathImages: string;
  public images: [];
}
