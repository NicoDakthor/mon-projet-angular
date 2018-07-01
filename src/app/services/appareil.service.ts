import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppareilService {

  appareilSubject = new Subject<any[]>();

  private appareils = [
  //  {
  //    id: 1,
  //    name: 'Machine à laver',
  //    status: 'éteint'
  //  },
  //  {
  //    id: 2,
  //    name: 'Frigo',
  //    status: 'allumé'
  //  },
  //  {
  //    id: 3,
  //    name: 'Ordinateur',
  //    status: 'éteint'
  //  }
  ];

  constructor(private httpClient: HttpClient) {}

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  switchOnAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(i: number) {
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(i: number) {
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: '',
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilsToServer() {
    this.httpClient
    .put('https://http-client-demo-331ab.firebaseio.com/appareils.json', this.appareils)
    .subscribe(
      () => {
        console.log('Enregistrement terminé');
      },
      (error) => {
        console.log('Erreur de sauvegarde ' + error);
      }
    );
  }

  getAppareilsFromServer() {
    this.httpClient
    .get<any[]>('https://http-client-demo-331ab.firebaseio.com/appareils.json')
    .subscribe(
      (response) => {
        console.log('get Appareils terminé');
        this.appareils = response;
        this.emitAppareilSubject();
      },
      (error) => {
        console.log('Erreur de get Appareils ' + error);
      }
    );
  }
}
