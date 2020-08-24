export class ServiceResponse<T = {}> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: string;
  public value?: T;
}
