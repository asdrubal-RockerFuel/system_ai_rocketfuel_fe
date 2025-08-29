import { Injectable } from '@angular/core';
import {  HttpClient,  HttpHeaders,} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})

export class JobsService {
  
  URL_BACKEND = environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  deleteComment(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.delete<any>(
      this.URL_BACKEND + "/api/comments/" + id,
      {
        headers: headers,
      }
    );
  }

  editComment(req): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
      let body = {
        value: req.value
      }

    return this.http.put<any>(
      this.URL_BACKEND + "/api/comments/" + req.id,
      body,
      {
        headers: headers,
      }
    );
  }

  sendComment(body): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.post<any>(
      this.URL_BACKEND + "/api/comments",
      body,
      {
        headers: headers,
      }
    );
  }

  listJobsAsAdmin(id?): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    let body = {
      company_id: id
    }

    return this.http.post<any>(
      this.URL_BACKEND + "/api/job/wait",
      body,
      {
        headers: headers,
      }
    );
  }

    getPostulation(id: number): Observable<any> {
      let headers = new HttpHeaders();
      headers = headers.set("Content-type", "application/json");
      headers = headers.set(
        "Authorization",
        "Bearer " + localStorage.getItem("pucoToken")
      );
  
      return this.http.get<any>(
        this.URL_BACKEND + "/api/postulations/user/" + id,
        {
          headers: headers,
        }
      );
    }

  deleteJob(id): Observable<any> {
      let headers = new HttpHeaders();
      headers = headers.set("Content-type", "application/json");
      headers = headers.set(
        "Authorization",
        "Bearer " + localStorage.getItem("pucoToken")
      );
  
      const options = {
        headers: headers,
        body: { state:false },
      };
      return this.http.delete<any>(
        this.URL_BACKEND + "/api/job/"  + id,
        options);
    }

  deleteCalification(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.delete<any>(
      this.URL_BACKEND + "/api/punctuations/" + id,
      {
        headers: headers,
      }
    );
  }


  deleteTrello(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    const options = {
      headers: headers,
      body: { state:1 },
    };
    return this.http.delete<any>(
      this.URL_BACKEND + "/api/trello/"  + id,
      options);
  }


  deleteQuestion(id:any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.delete<any>(
      this.URL_BACKEND + "/api/questions/" + id,
      {
        headers: headers,
      }
    );
  }

  deleteRequirement(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.delete<any>(
      this.URL_BACKEND + "/api/requirements/" + id,
      {
        headers: headers,
      }
    );
  }

  deleteRequisite(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.delete<any>(
      this.URL_BACKEND + "/api/requisite/" + id,
      {
        headers: headers,
      }
    );
  }

  putCalification(body, id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + "/api/punctuations/" + id,
      body,
      {
        headers: headers,
      }
    );
  }


  putTrello(body, id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + "/api/trello/"  + id,
      body,
      {
        headers: headers,
      }
    );
  }


  putQuestion(body, id:any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + "/api/questions/" + id,
      body,
      {
        headers: headers,
      }
    );
  }

  putRequirement(body, id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + "/api/requirements/" + id,
      body,
      {
        headers: headers,
      }
    );
  }

  putRequisite(body, id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + "/api/requisite/" + id,
      body,
      {
        headers: headers,
      }
    );
  }

  getCalificationsByJobId(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + "/api/list/punctuations/" + id,
      {
        headers: headers,
      }
    );
  }

  getTrelloByJobId(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + "/api/list/trello/" + id,
      {
        headers: headers,
      }
    );
  }

  getQuestionsByJobId(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + "/api/list/questions/" + id,
      {
        headers: headers,
      }
    );
  }

  getRequirementsByJobId(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + "/api/list/requirements/" + id,
      {
        headers: headers,
      }
    );
  }

  getRequisitesByJobId(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + "/api/list/requisite/" + id,
      {
        headers: headers,
      }
    );
  }

  getJobById(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + "/api/job/" + id,
      {
        headers: headers,
      }
    );
  }

  listJobsPubli(data, status?): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    let body = {
      company_id: data.companyId,
      queryTypeJobs: data.type_f,
      queryModality: data.modality_f,
      querySearch: data.search_f,
      visibilityStatus: status
    }

    return this.http.post<any>(
      this.URL_BACKEND + `/api/job/company/?size=${data.size}&page=${data.page}`,
      body,
      {
        headers: headers,
      }
    );
  }

  listJobs(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    let body = {
      company_id: data.companyId,
      queryTypeJobs: data.type_f,
      queryModality: data.modality_f,
      querySearch: data.search_f,
      visibilityStatus: data.state_f
    }

    return this.http.post<any>(
      this.URL_BACKEND + `/api/job/company/?size=${data.size}&page=${data.page}`,
      body,
      {
        headers: headers,
      }
    );
  }

  editJob(body, id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + "/api/job/" + id,
      body,
      {
        headers: headers,
      }
    );
  }

  addCalification(body): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + "/api/job/punctuations",
      body,
      {
        headers: headers,
      }
    );
  }


  addTrello(body): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + "/api/job/trello",
      body,
      {
        headers: headers,
      }
    );
  }


  addQuestion(body): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + "/api/job/questions",
      body,
      {
        headers: headers,
      }
    );
  }

  addRequirement(body): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + "/api/job/requirements",
      body,
      {
        headers: headers,
      }
    );
  }

  addRequisite(body): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + "/api/job/requisite",
      body,
      {
        headers: headers,
      }
    );
  }

  createJob(body): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + "/api/job",
      body,
      {
        headers: headers,
      }
    );
  }

  listUsuarios(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + "/api/user/" + id,
      {
        headers: headers,
      }
    );
  }

}
