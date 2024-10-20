import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VerificationRequestResponse } from "./verify-account-dialog/verification-request-response.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  static REQUEST_CODE_URI: string = '/accounts/verification/request';
  static CHECK_CODE_URI: string = '/accounts/verification/check';

  constructor(
    private httpClient: HttpClient
  ) {}

  /**
   * Requests a verification code to be sent
   * @returns 
   */
  requestCode(): Observable<VerificationRequestResponse> {
    return this.httpClient.put<VerificationRequestResponse>(AccountService.REQUEST_CODE_URI, null);
  }

  /**
   * Checks a verification code
   * @param code 
   * @returns 
   */
  checkCode(code: string): Observable<any> {
    return this.httpClient.put(AccountService.CHECK_CODE_URI, {
      verificationCode: code
    });
  }
}