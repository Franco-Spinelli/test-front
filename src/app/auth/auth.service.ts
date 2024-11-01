
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginRequest } from './loginRequest';
import { environment } from '../../environments/environment';
import { RegisterRequest } from './registerRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  authStatus = this.loggedIn.asObservable();
  private currentLoginOn = new BehaviorSubject<boolean>(false);
  private currentUserData = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {
    this.currentLoginOn.next(sessionStorage.getItem('token') !== null);
    this.currentUserData.next(sessionStorage.getItem('token') || '');
    this.loggedIn.next(this.currentLoginOn.value);
  }

//al principio del proyecto se implemento NgxCookies pero fue borrado por conflictos de dependencias con angular material  
  userInformation(): Observable<any> {
    return this.http.get<any>(environment.urlApi + '/user/get-user');
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(environment.urlHost + 'auth/login', credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem('token', userData.token);
        this.currentUserData.next(userData.token);
        this.currentLoginOn.next(true);
        this.loggedIn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  register(credentials: RegisterRequest): Observable<any> {
    return this.http.post<any>(environment.urlHost + 'auth/register', credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem('token', userData.token);
        this.currentUserData.next(userData.token);
        this.currentLoginOn.next(true);
        this.loggedIn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logOut(): void {
    sessionStorage.removeItem('token');
    this.currentUserData.next('');
    this.currentLoginOn.next(false);
    this.loggedIn.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Error:', error.error);
    } else {
      console.error('Backend returned status code:', error.status);
    }
    return throwError(() => new Error('Something went wrong, please try again.'));
  }

  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }
  get userLoginOn(): Observable<boolean> {
    return this.currentLoginOn.asObservable();
  }

  get userToken(): string {
    return this.currentUserData.value;
  }

  public isUserLoggedIn(): boolean {
    return !!this.userToken;
  }
}