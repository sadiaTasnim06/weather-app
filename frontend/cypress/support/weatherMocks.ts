export const londonLocation = {
  name: 'London',
  country: 'United Kingdom',
  latitude: 51.5074,
  longitude: -0.1278,
};

export const dhakaLocation = {
  name: 'Dhaka',
  country: 'Bangladesh',
  latitude: 23.8103,
  longitude: 90.4125,
};

export const malagaLocation = {
  name: 'Málaga',
  country: 'Spain',
  latitude: 36.7213,
  longitude: -4.4214,
};

export const londonWeather = {
  current: {
    temperature: 15,
    humidity: 72,
    windSpeed: 10,
    weatherCode: 1,
  },
  daily: [
    {
      date: '2026-08-15',
      maxTemperature: 18,
      minTemperature: 12,
      weatherCode: 1,
    },
  ],
};

export function mockLondonSearch() {
  cy.intercept('GET', '**/locations?q=London', {
    statusCode: 200,
    body: [londonLocation],
  }).as('searchLondon');
}

export function mockDhakaSearch() {
  cy.intercept('GET', '**/locations?q=Dhaka', {
    statusCode: 200,
    body: [dhakaLocation],
  }).as('searchDhaka');
}

export function mockNoLocations() {
  cy.intercept('GET', '**/locations?q=xyznonexistentcity123', {
    statusCode: 200,
    body: [],
  }).as('searchNoLocations');
}

export function mockLondonWeather() {
  cy.intercept('GET', '**/weather?latitude=51.5074&longitude=-0.1278', {
    statusCode: 200,
    body: londonWeather,
  }).as('getLondonWeather');
}

export function mockWeatherError() {
  cy.intercept('GET', '**/weather?latitude=51.5074&longitude=-0.1278', {
    statusCode: 500,
    body: {
      message: 'Internal server error',
    },
  }).as('getWeather');
}
