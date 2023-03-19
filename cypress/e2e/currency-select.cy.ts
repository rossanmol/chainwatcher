/// <reference types="Cypress" />

describe("User wants to make use of currency select", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	describe("and the user selects EUR", () => {
		beforeEach(() => {
			cy.get(`[data-testid=currency-trigger]`).click();
			cy.get(`[data-testid=currency-item-USD]`).click();
		});

		describe("and the user searches for an address", () => {
			const hash = "1Aqbi56jFyQofrtodqi2BdwBoWySF3b4Sx";

			beforeEach(() => {
				cy.get(`[data-testid=search-input]`).type(`${hash}{enter}`);
			});

			it("should show balance in EUR value", () => {
				cy.get(`[data-testid=address-balance]`).invoke("text").should("contain", "EUR");
			});
		});
	});

	describe("and the user selects USD", () => {
		beforeEach(() => {
			cy.get(`[data-testid=currency-trigger]`).click();
			cy.get(`[data-testid=currency-item-USD]`).click();
		});

		describe("and the user searches for an address", () => {
			const hash = "1Aqbi56jFyQofrtodqi2BdwBoWySF3b4Sx";

			beforeEach(() => {
				cy.get(`[data-testid=search-input]`).type(`${hash}{enter}`);
			});

			it("should show balance in USD value", () => {
				cy.get(`[data-testid=address-balance]`).invoke("text").should("contain", "USD");
			});
		});
	});

	describe("and the user selects BTC", () => {
		beforeEach(() => {
			cy.get(`[data-testid=currency-trigger]`).click();
			cy.get(`[data-testid=currency-item-USD]`).click();
		});

		describe("and the user searches for an address", () => {
			const hash = "1Aqbi56jFyQofrtodqi2BdwBoWySF3b4Sx";

			beforeEach(() => {
				cy.get(`[data-testid=search-input]`).type(`${hash}{enter}`);
			});

			it("should show balance in BTC value", () => {
				cy.get(`[data-testid=address-balance]`).invoke("text").should("contain", "BTC");
			});
		});
	});
});
