import axios from 'axios';
require('dotenv').config();

const MAIN_URL = process.env.URL;

const GET_TRAVEL_ROUTES = () => ({
  query: `
    query travelRoutes(
      $type: String!,
      $params: TravelRouteInput!,
    ) {
      travelRoutes(
        type: $type,
        params: $params,
      ) {
        routeId,
        moduleOriginId,
        moduleDestinationId,
        origin,
        destination,
        originType,
        destinationType,
        isPopular,
        masterOrigin {
          routeId
          routeValue
          routeType
          isActive
        },
        masterDestination {
          routeId
          routeValue
          routeType
          isActive
        }
      }
    }`,
    variables: {
      type: "getAll",
      params: {},
    }
});

const GET_ROUTE = routeValue => ({
  query: `
    query travelRoutes(
      $type: String!,
      $params: travelRoutesInput!,
    ) {
      travelRoutes(
        type: $type,
        params: $params,
      ) {
        routeId,
        routeValue,
        routeType,
        isActive,
      }
    }`,
  variables: {
    type: "getRouteValue",
    params: {
      routeValue,
    },
  },
});

const POST_TRAVEL_ORDER = (date, moduleOriginId, moduleDestinationId, pickupAddress, destinationAddress, passenger, customerContact) =>
  ({
    query: `
    mutation travelOrder(
      $type: String!,
      $params: TravelOrderInput!
    ) {
      travelOrder(
        type: $type,
        params: $params
      ) {
        moduleOriginId,
        moduleDestinationId,
        travelOrderId,
        shortId,
        moduleUserId,
        moduleOfferingId,
        orderCode,
        customerName,
        customerContact,
        origin,
        destination,
        date,
        passenger,
        pickupAddress,
        airline,
        flightCode,
        arrival,
        departure,
        statusOrder,
        payment,
        verified,
        travelOfferingSelected {
          travelOfferingId
          moduleOrderId
          moduleProviderId
          pickupTime
          status
          price
          rawPrice
          overAreaPrice
          uniqueCode
        },
        travelOffering {
          travelOfferingId
          moduleOrderId
          moduleProviderId
          pickupTime
          status
          price
          rawPrice
          overAreaPrice
          uniqueCode
        },
        createdAt,
        updatedAt,
      }
    }
  `,
    variables: {
      type: "create",
      params: {
        date,
        moduleOriginId,
        moduleDestinationId,
        pickupAddress,
        destinationAddress,
        passenger,
        customerContact,
      },
    },
  });

async function getTravelRoutes() {
  let result;
  try {
    result = await axios({
      url: MAIN_URL,
      method: 'post',
      data: GET_TRAVEL_ROUTES(),
    });
  } catch (error) {
    throw new Error(error);
  }
  return result.data.data.travelRoutes;
}

async function getRoute() {
  let result;
  try {
    result = await axios({
      url: MAIN_URL,
      method: 'post',
      data: GET_ROUTE(routeValue),
    });
  } catch (error) {
    throw new Error(error);
  }
  return result.data.data.travelRoutes;
}

async function postTravelOrder(date, moduleOriginId, moduleDestinationId, pickupAddress, destinationAddress, passenger, customerContact) {
  let input;
  try {
    input = await axios({
      url: MAIN_URL,
      method: 'post',
      data: POST_TRAVEL_ORDER(date, moduleOriginId, moduleDestinationId, pickupAddress, destinationAddress, passenger, customerContact),
    });
  } catch (error) {
    throw new Error(error);
  }
  return input.data.data.travelOrder;
}

export {
  getTravelRoutes,
  getRoute,
  postTravelOrder
}
