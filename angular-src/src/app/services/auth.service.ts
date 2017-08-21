import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable()
export class AuthService {
  private headers = new HttpHeaders().set("Conetent-Type", "application/json");
  constructor(private http: HttpClient) {}

  getArtist() {
    return this.http.get("http://localhost:3000/users/artist").map(res => res);
  }

  searchArtist(criteria) {

    return this.http.put("http://localhost:3000/users/search", criteria, { headers: this.headers }).map(res => res);
  }



}
