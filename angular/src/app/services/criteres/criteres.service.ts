import { Injectable } from '@angular/core';
import { Criteres } from '../../model/criteres/criteres';
import {PersistenceService, StorageType} from 'angular-persistence';

@Injectable()
export class CriteresService {

  criteres: Criteres;
  bienici: boolean;
  leboncoin: boolean;
  seloger: boolean;
  logicimmo: boolean;
  pap: boolean;

  constructor(private persistenceService: PersistenceService) {
    this.criteres = new Criteres();
    try {
      const saved: Criteres = persistenceService.get('criteres', StorageType.LOCAL);
      if (saved != null) {
        /* L'objet issu du service de persistence n'est pas exactement un objet Criteres, il manque notamment ses
           fonctions et l'énumération AnnonceType
           Le hack est donc de construire un nouvel objet Criteres à partir des valeurs de l'objet récupéré */
        this.criteres.setFrom(saved);
      }

      this.bienici = persistenceService.get('bienici', StorageType.LOCAL);
      this.leboncoin = persistenceService.get('leboncoin', StorageType.LOCAL);
      this.seloger = persistenceService.get('seloger', StorageType.LOCAL);
      this.logicimmo = persistenceService.get('logicimmo', StorageType.LOCAL);
      this.pap = persistenceService.get('pap', StorageType.LOCAL);
    } catch (e) {
      console.log(e);
    }

    if (this.leboncoin == null) this.leboncoin = true;
    // TODO: modifier après ajout des services
    if (this.bienici == null) this.bienici = false;
    if (this.seloger == null) this.seloger = false;
    if (this.logicimmo == null) this.logicimmo = false;
    if (this.pap == null) this.pap = false;
  }

  public criteresChanged(): void {
    try {
      this.persistenceService.set('criteres', this.criteres, {type: StorageType.LOCAL});

      this.persistenceService.set('bienici', this.bienici, {type: StorageType.LOCAL});
      this.persistenceService.set('leboncoin', this.leboncoin, {type: StorageType.LOCAL});
      this.persistenceService.set('seloger', this.seloger, {type: StorageType.LOCAL});
      this.persistenceService.set('logicimmo', this.logicimmo, {type: StorageType.LOCAL});
      this.persistenceService.set('pap', this.pap, {type: StorageType.LOCAL});
    } catch (e) {
      console.log(e);
    }
  }

  public clear(): void {
    this.criteres = new Criteres();
    this.leboncoin = true;
    // TODO: modifier après ajout des services
    this.bienici = false;
    this.logicimmo = false;
    this.pap = false;
    this.seloger = false;
    this.criteresChanged();
  }
}
