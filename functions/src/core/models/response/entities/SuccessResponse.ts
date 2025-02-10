import {Response} from "./Response";

export class SuccessResponse extends Response {
  public payload: any;
  public success: any;
  public status: any;

  constructor(data: any) {
    const {success = true, status = "success", payload} = data;
    super({
      success,
      status,
    });
    this.payload = payload;
  }
}
