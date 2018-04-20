import { Input } from "@angular/core";

export class Login {
    @Input() login: string;
    @Input() senha: string;
  }