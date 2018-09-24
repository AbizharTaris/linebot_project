import { getTravelRoutes, getTravelRoute, getRoute, postTravelOrder } from '../data/index';
import createFlex from '../utils/flex';
import createMessage from '../utils/message';
import Session from '../mongodb/models/session';
import { falseDateFormat, falsePassengerFormat, falsePhoneNumber, formEmpty, routeNotFound, travelRouteNotFound, systemError, travelOrderFormat } from '../message/message';
import { parseNumber, formatNumber } from 'libphonenumber-js';

async function travel() {
  const route = await getTravelRoutes();
  return createFlex(route, 'Pilih Rute Travel!');
}

async function pilih(event, value) {
  const [ origin, destination ] = value.split('-');

  let moduleOriginId;
  let moduleDestinationId;

  try {
    var originCheck = new Promise(async (resolve, reject) => {
      try {
        const route = await getRoute(origin);
        moduleOriginId = route.routeId;
        resolve();
      } catch (error) {
        reject({
          reason: routeNotFound(origin),
        });
      }
    })
    var destinationCheck = new Promise(async (resolve, reject) => {
      try {
        const route = await getRoute(destination);
        moduleDestinationId = route.routeId;
        resolve();
      } catch (error) {
        reject({
          reason: routeNotFound(destination),
        });
      }
    })  
    await Promise.all([originCheck, destinationCheck]);
  } catch (error) {
    return createMessage(error.reason);
  }

  try {
    const newSession = new Session({
      userId: event.source.userId,
      travelOrder: {
        moduleOriginId,
        moduleDestinationId,
      }
    });
    await newSession.save();
  } catch (error) {
    return createMessage(systemError);
  }
  return createMessage(travelOrderFormat);
}

/*async function pesan(event, value) {
  let = [
    date,
    passenger,
    pickupAddress,
    destinationAddress,
    customerContact
] = value.split('#');

  // Pengecekan tanggal dan waktu
  try {
    if (date.length !== 12){
      throw new Error();
    }
    else {
      date = date.concat('00');
    }
  } catch {

  }

  // Pengecekan jumlah penumpang
  try {
    if (isNaN(passenger)){
      throw new Error();
    }
    else {
      passenger = parseInt(passenger);
    }
  } catch (error) {
    createMessage(falsePassengerFormat);
  }

  // Pengecekan nomor hp
  try {
    if (isNaN(customerContact)){
      throw new Error();
    }
    customerContact = formatNumber(parseNumber(customerContact, 'ID'), 'International') 
  } catch (error) {
    createMessage(falsePhoneNumber);
  }
}*/


export default {
  travel,
  pilih
}
