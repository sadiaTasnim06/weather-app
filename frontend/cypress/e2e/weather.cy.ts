import {
  mockDhakaSearch,
  mockLondonSearch,
  mockLondonWeather,
  mockNoLocations,
  mockWeatherError,
} from '../support/weatherMocks';

describe('Weather App', () => {
  it('loads the weather app', () => {
    cy.visit('/');

    cy.contains('Weather App').should('be.visible');
  });

  it('allows the user to search for a city and view its weather', () => {
    mockLondonSearch();
    mockLondonWeather();

    cy.visit('/');

    cy.get('input[placeholder="Search for a city"]')
      .type('London')
      .type('{enter}');

    cy.wait('@searchLondon');

    cy.get('[data-cy="location-result"]').contains('London').click();

    cy.wait('@getLondonWeather');

    cy.contains('London, United Kingdom').should('be.visible');
  });

  it('shows a message when no locations are found', () => {
    mockNoLocations();

    cy.visit('/');

    cy.get('input[placeholder="Search for a city"]')
      .type('xyznonexistentcity123')
      .type('{enter}');

    cy.wait('@searchNoLocations');

    cy.contains('No locations found').should('be.visible');
  });

  it('shows an error when weather cannot be loaded', () => {
    mockLondonSearch();
    mockWeatherError();

    cy.visit('/');

    cy.get('input[placeholder="Search for a city"]')
      .type('London')
      .type('{enter}');

    cy.wait('@searchLondon');

    cy.get('[data-cy="location-result"]').contains('London').click();

    cy.wait('@getWeather');

    cy.contains('Weather unavailable').should('be.visible');
  });

  it('clears the selected weather when a new search is submitted', () => {
    mockLondonSearch();
    mockLondonWeather();
    mockDhakaSearch();

    cy.visit('/');

    cy.get('input[placeholder="Search for a city"]')
      .type('London')
      .type('{enter}');

    cy.wait('@searchLondon');

    cy.get('[data-cy="location-result"]').contains('London').click();

    cy.wait('@getLondonWeather');

    cy.contains('London, United Kingdom').should('be.visible');

    cy.get('input[placeholder="Search for a city"]')
      .clear()
      .type('Dhaka')
      .type('{enter}');

    cy.wait('@searchDhaka');

    cy.contains('London, United Kingdom').should('not.exist');

    cy.get('[data-cy="location-result"]')
      .contains('Dhaka')
      .should('be.visible');
  });
});
