import { Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {Evento} from "../commons/evento.model";


@Injectable()
export class FirebaseconnectionService {
  periodos = ['Evento Único', 'Primer cuatrimestre', 'Segundo cuatrimestre'];
  /*
    aulas: AngularFireList<any[]>;
    actividades: AngularFireList<any[]>;
    tiposDeActividades: AngularFireList<any[]>;
    estadoActividades: AngularFireList<any[]>;
    evento: AngularFireObject<any>;
  */

  constructor(private af: AngularFireDatabase) { }

  getListActividades(): AngularFireList<any[]> {
    return this.af.list('/actividades');
  }

  getListActividadesWithOptions(options: any): AngularFireList<any[]> {
    return this.af.list('/actividades', options);
  }

  getListAulas(limit: number = 50): AngularFireList<any[]> {
    return this.af.list('/aula', ref => ref.limitToLast(limit));
  }

  getListEstados(): AngularFireList<any[]> {
    return this.af.list('/estado');
  }

  getListPeriodos(): string[] {
    return this.periodos;
  }

  getListTiposActividades(): AngularFireList<any[]> {
    return this.af.list('/tipo');
  }

  getActividadByKey(key: string): AngularFireObject<any> {
    return this.af.object('/actividades/' + key);
  }

  addActividad(actividad: Evento) {
    // TODO: asume que fue validado
    this.af.list('/actividades').push(
      {
        descripcion: actividad.descripcion,
        dias: actividad.dias,
        estadoActividad: actividad.estadoActividad,
        horaFin: actividad.horaFin,
        horaInicio: actividad.horaInicio,
        nombre: actividad.nombre,
        periodo: actividad.periodo,
        pickerDesde: actividad.pickerDesde,
        pickerHasta: actividad.pickerHasta,
        tipoActividad: actividad.tipoActividad,
        zonaAula: actividad.zonaAula
      }
    );
  }
  updateActividadByKey(key: string, actividad: Evento) {
    // no actualizaba
    actividad.dias = [actividad.chk_lun, actividad.chk_ma, actividad.chk_mi, actividad.chk_ju, actividad.chk_vi, actividad.chk_sa, actividad.chk_do];

    this.af.object('/actividades/' + key).set(
      {
        descripcion: actividad.descripcion,
        dias: actividad.dias,
        estadoActividad: actividad.estadoActividad,
        horaFin: actividad.horaFin,
        horaInicio: actividad.horaInicio,
        nombre: actividad.nombre,
        periodo: actividad.periodo,
        pickerDesde: actividad.pickerDesde,
        pickerHasta: actividad.pickerHasta,
        tipoActividad: actividad.tipoActividad,
        zonaAula: actividad.zonaAula
      }
    );

  }

  removeActividadByKey(key: string) {
    const item = this.af.object('/actividades/' + key);
    item.remove();
  }

  getHorario() {
    let arr = [], i, j;
    for (i = 7; i < 24; i++) {
      for ( j = 0; j < 4; j++) {
        //fix: usar hora con formato 99:99 para ahorrar conversiones con momentjs
        arr.push( ((i+'').length == 1 ? '0'+i : i) + ':' + (j === 0 ? '00' : 15 * j) );
        //arr.push(i + ':' + (j === 0 ? '00' : 15 * j) );
      }
    }
    return arr;
  }
}
