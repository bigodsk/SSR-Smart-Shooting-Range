import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class SsrApiService {

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  readySession(callback: (data) => void){
    var _this = this
    this.http.get(environment.API_URL + 'ready-session/').subscribe(
      res => {
        callback(res)
      },
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
    })  
  }

  startSession(callback: (data) => void){
    var _this = this
    this.http.get(environment.API_URL + 'start-session/').subscribe(
      res => {
        callback(res)
      },
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
    })  
  }

  pauseSession(callback: (data) => void){
    var _this = this
    this.http.get(environment.API_URL + 'pause-session/').subscribe(
      res =>{
        callback(res)
      },
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
    })  
  }

  resumeSession(callback: (data) => void){
    var _this = this
    this.http.get(environment.API_URL + 'resume-session/').subscribe(
      res => {
        callback(res)
      },
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
    })  
  }

  endSession(callback: (data) => void){
    var _this = this
    this.http.get(environment.API_URL + 'end-session/').subscribe(
      res => {
        callback(res)
      },
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
    })  
  }



}
