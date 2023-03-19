/// <reference types="Cypress" />

describe("User wants to make use of widgets on home page", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("should display the transaction widget first", () => {
		cy.get("[data-testid=top-widget]:nth-child(1) [data-testid=widget-title]")
			.invoke("text")
			.should("include", "Top Transactions");
	});

	it("should display the address widget second", () => {
		cy.get("[data-testid=top-widget]:nth-child(2) [data-testid=widget-title]")
			.invoke("text")
			.should("include", "Top Addresses");
	});
});
