export class OutletPhoto {
  id: number;
  formId: number;
  name: string;
  path: string;
  filePath: string;

  constructor(formId: number, name: string) {
    this.formId = formId;
    this.name = name;
  }
}
