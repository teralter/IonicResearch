import { KeyValuePair } from './key-value-pair';

export class Directory {
  constructor(
    public name: string,
    public routes: KeyValuePair[],
    public isFile: boolean
  ) { }
}
