import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { TensorRequest } from '../models/request.model';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TensorFlowService {

    constructor(private httpClient: HttpClient) {

    }

    public invokeService(request: TensorRequest): Promise<any> {
        const options:any = { 
            headers: {'Content-Type': 'application/json'},
            responseType: 'blob'
        };
        return this.httpClient.post<any>(`${environment.serviceurl}/publish`, request, options).toPromise();
    }
}