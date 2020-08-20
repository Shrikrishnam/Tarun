import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:6565/";
    sharedObj;


    constructor(private http: Http) { }
    postfitnessdata(data){
      return this.http.post(UserService.BaseUrl+'allfriends',data,httpOptions).pipe(map((response: Response) => response.json()));
    }
    postcontactdata(data){
      return this.http.post(UserService.BaseUrl+'contactus',data,httpOptions).pipe(map((response: Response) => response.json()));
    }
    setSharedObj(obj){
      this.sharedObj=obj;
    }
    getSharedObj(){
      return this.sharedObj;
    }
    getfitnessdata() {
      return this.http.get(UserService.BaseUrl+'allfriends',httpOptions).pipe(map((response: Response) => response.json()));
    }
    deletefitnessdata(data){

      return this.http.delete(UserService.BaseUrl+'allfriends/'+data.id,httpOptions).pipe(map((response: Response) => response.json()));
    }
    putfitnessdata(id,data){
      return this.http.put(UserService.BaseUrl+'allfriends/'+id,data,httpOptions).pipe(map((response: Response) => response.json()));
    }
}