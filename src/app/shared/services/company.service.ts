import { Injectable } from "@angular/core";
import {
HttpClient,
HttpHeaders,
HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
providedIn: "root",
})
export class companyService {
URL_BACKEND = environment.BACKEND_URL;

constructor(private http: HttpClient) {}

getCompanyById(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
        "Authorization",
        "Bearer " + localStorage.getItem("pucoToken")
    );
    
    return this.http.get<any>(
        this.URL_BACKEND + '/api/company/' + id,
        { headers: headers, }
    );
    }

editCompany(body, id): Observable<any>{
    let headers = new HttpHeaders();
headers = headers.set("Content-type", "application/json");
headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
);

return this.http.put<any>(
    this.URL_BACKEND + "/api/company/" + id,
    body,
    {
    headers: headers,
    }
);
}

sendInfo(body): Observable<any>{
    let headers = new HttpHeaders();
headers = headers.set("Content-type", "application/json");
headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
);
let bodyJson = JSON.stringify(body);
return this.http.post<any>(
    this.URL_BACKEND + "/api/informationCompany/",
    bodyJson,
    {
    headers: headers,
    }
);
}

updateCompany(body, id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
        "Authorization",
        "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
        this.URL_BACKEND + "/api/company/" + id,
        body,
        {
        headers: headers,
        }
    );
    }

getCategory(category): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
        "Authorization",
        "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.get<any>(
        this.URL_BACKEND +  "/api/general_variables/" + category,
        {
        headers: headers,
        }
    );
    }

getCompanyTable(body, page, size): Observable<any> {
let headers = new HttpHeaders();
headers = headers.set("Content-type", "application/json");
headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
);
return this.http.post<any>(
    this.URL_BACKEND + `/api/company/list/private/?page=${page}&size=${size}`,
    body,
    {
    headers: headers,
    }
);
}

createCompany(body): Observable<any> {
let headers = new HttpHeaders();
headers = headers.set("Content-type", "application/json");
headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
);
return this.http.post<any>(
    this.URL_BACKEND + "/api/company",
    body,
    {
    headers: headers,
    }
);
}

getUsuarios(rol, page): Observable<any> {
let headers = new HttpHeaders();
headers = headers.set("Content-type", "application/json");
headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
);

return this.http.get<any>(
    this.URL_BACKEND + `/api/${rol}/list/users/all?page=${page}`,
    {
    headers: headers,
    }
);
}

updateUsuario(rol, user): Observable<any> {
let u = {
    name: user.name,
    lastname: user.lastname,
};

let headers = new HttpHeaders();
headers = headers.set("Content-type", "application/json");
headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
);
return this.http.put<any>(
    this.URL_BACKEND + `/api/${rol}/update/user/${user.id}`,
    u,
    {
    headers: headers,
    }
);
}

habilitarUsuario(rol, userId, estado): Observable<any> {
let headers = new HttpHeaders();
headers = headers.set("Content-type", "application/json");
headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
);
return this.http.put<any>(
    this.URL_BACKEND + `/api/${rol}/disable/user/${userId}`,
    { state: estado },
    {
    headers: headers,
    }
);
}

habilitarEmpresa(stateRow, idRow): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
        "Authorization",
        "Bearer " + localStorage.getItem("pucoToken")
    );

    let body = {
        headers: headers,
        body: { state: stateRow },
    }
    return this.http.delete<any>(
        this.URL_BACKEND + "/api/company/" + idRow,
    body
    );
    }

createUsuarios(rol, user, nameRol): Observable<any> {
let headers = new HttpHeaders();
headers = headers.set("Content-type", "application/json");
headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
);
return this.http.post<any>(
    this.URL_BACKEND + `/api/${rol}/new/${nameRol}`,
    user,
    {
    headers: headers,
    }
);
}
}
