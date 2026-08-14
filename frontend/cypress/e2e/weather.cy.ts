describe("Weather App", () => {
  it("loads the weather app", () => {
    cy.visit("/");

    cy.contains("Weather App").should("be.visible");
  });

  it("allows the user to search for a city and view its weather", () => {
    cy.visit("/");

    cy.get('input[placeholder="Search for a city"]')
      .type("London")
      .type("{enter}");

    cy.get('[data-cy="location-result"]').contains("London").click();

    cy.contains("London, United Kingdom").should("be.visible");
  });

  it("shows a message when no locations are found", () => {
    cy.visit("/");

    cy.get('input[placeholder="Search for a city"]')
      .type("xyznonexistentcity123")
      .type("{enter}");

    cy.contains("No locations found").should("be.visible");
  });

  it("shows an error when weather cannot be loaded", () => {
    cy.intercept("GET", `${Cypress.expose("apiUrl")}/api/v1/weather*`, {
      statusCode: 500,
      body: {
        message: "Internal server error",
      },
    }).as("getWeather");

    cy.visit("/");

    cy.get('input[placeholder="Search for a city"]')
      .type("London")
      .type("{enter}");

    cy.get('[data-cy="location-result"]').contains("London").click();

    cy.wait("@getWeather");

    cy.contains("Weather unavailable").should("be.visible");
  });

  it("clears the selected weather when a new search is submitted", () => {
    cy.visit("/");

    cy.get('input[placeholder="Search for a city"]')
      .type("London")
      .type("{enter}");

    cy.get('[data-cy="location-result"]').contains("London").click();

    cy.contains("London, United Kingdom").should("be.visible");

    cy.get('input[placeholder="Search for a city"]')
      .clear()
      .type("Paris")
      .type("{enter}");

    cy.contains("London, United Kingdom").should("not.exist");

    cy.get('[data-cy="location-result"]')
      .contains("Paris")
      .should("be.visible");
  });
});
