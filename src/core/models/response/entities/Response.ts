export class Response {
  public success: any;
  public status: any;

  constructor(data: any) {
    const {success, status} = data;
    this.success = success;
    this.status = status;
  }
}
