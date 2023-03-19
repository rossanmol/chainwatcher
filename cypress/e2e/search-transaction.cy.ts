/// <reference types="Cypress" />

describe("User wants to make use of transaction search", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	describe("and a valid transaction is entered", () => {
		const hash = "dcb24eca4f7a0847b7b59da15deb46e68b64b75584bee29b8be9b02bad0ac26f";

		beforeEach(() => {
			cy.get(`[data-testid=search-input]`).type(`${hash}{enter}`);
		});

		it("should display information about the transaction", () => {
			cy.get(`[data-testid=transaction-hash]`).invoke("text").should("equal", hash);
		});

		it("should display BTC currency as default", () => {
			cy.get(`[data-testid=transaction-fees]`).invoke("text").should("contain", "BTC");
		});

		it("should allow the user to subscribe", () => {
			cy.get(`[data-testid=subscribe-button]`).invoke("text").should("equal", "Subscribe");
			cy.get(`[data-testid=subscribe-button]`).should("exist");
		});

		describe("and the currency is modified to EUR", () => {
			beforeEach(() => {
				cy.get(`[data-testid=currency-trigger]`).click();
				cy.get(`[data-testid=currency-item-EUR]`).click();
			});

			it("should show EUR value", () => {
				cy.get(`[data-testid=transaction-fees]`).invoke("text").should("contain", "EUR");
			});
		});

		describe("and the currency is modified to USD", () => {
			beforeEach(() => {
				cy.get(`[data-testid=currency-trigger]`).click();
				cy.get(`[data-testid=currency-item-USD]`).click();
			});

			it("should show USD value", () => {
				cy.get(`[data-testid=transaction-fees]`).invoke("text").should("contain", "USD");
			});
		});

		describe("and the currency is modified to BTC", () => {
			beforeEach(() => {
				cy.get(`[data-testid=currency-trigger]`).click();
				cy.get(`[data-testid=currency-item-BTC]`).click();
			});

			it("should show BTC value", () => {
				cy.get(`[data-testid=transaction-fees]`).invoke("text").should("contain", "BTC");
			});
		});
	});
});
