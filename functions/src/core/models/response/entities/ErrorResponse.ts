import {Response} from "./Response";

export class ErrorResponse extends Response {
  public error: any;
  public error_code: any;
  public success: any;
  public status: any;
  public payload: any;
  public errorCode: any;

  constructor(data: any) {
    const {success = false, status = "error", payload, errorCode} = data;
    super({
      success,
      status,
    });
    this.error = payload;
    if (errorCode) {
      this.error_code = errorCode;
    }
  }
}
