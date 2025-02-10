export class SuccessResponseWithResults {
  public result: any;

  constructor(data: any) {
    const {success = true, status = "success", payload} = data;
    this.result = {
      success,
      status,
      payload: payload,
    };
  }
}
