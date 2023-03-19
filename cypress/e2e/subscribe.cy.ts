/// <reference types="Cypress" />

describe("User wants to subscribe to hashes", () => {
	beforeEach(() => {
		cy.visit("/");
		cy.clock();
	});

	describe("and a valid address is entered", () => {
		const hash = "1Aqbi56jFyQofrtodqi2BdwBoWySF3b4Sx";

		beforeEach(() => {
			cy.get(`[data-testid=search-input]`).type(`${hash}{enter}`);
		});

		it("should allow the user to subscribe", () => {
			cy.get(`[data-testid=subscribe-button]`).invoke("text").should("equal", "Subscribe");
			cy.get(`[data-testid=subscribe-button]`).should("exist");
		});

		describe("and the user subscribes", () => {
			beforeEach(() => {
				cy.get(`[data-testid=subscribe-button]`).click();
			});

			it("should show notification", () => {
				const notificationSelector = `[aria-label="Notifications (F8)"] [role=status]`;
				cy.get(`[data-testid=subscribe-button]`).invoke("text").should("equal", "Unsubscribe");
				cy.get(notificationSelector).invoke("text").should("include", hash);
				cy.get(notificationSelector).invoke("text").should("include", "Subscribed for address updates");
			});

			it("should show appropriate notification when unsubscribing", () => {
				cy.get("[toast-close]").click();
				cy.get(`[data-testid=subscribe-button]`).click();
				const notificationSelector = `[aria-label="Notifications (F8)"] [role=status]`;
				cy.get(notificationSelector).invoke("text").should("include", hash);
				cy.get(notificationSelector).invoke("text").should("include", "Unsubscribed for address updates");
			});

			describe("and the user waits 30 seconds", () => {
				beforeEach(() => {
					cy.get("[toast-close]").click();
					cy.intercept(
						{
							method: "GET", // Route all GET requests
							url: "/api/transaction-hash*", // that have a URL that matches '/users/*'
						},
						{
							address: { hash: "wow" },
						}
					);

					cy.tick(30000);
				});

				it("should show notification that address changed", () => {
					const notificationSelector = `[aria-label="Notifications (F8)"] [role=status]`;
					cy.get(notificationSelector).invoke("text").should("include", hash);
					cy.get(notificationSelector).invoke("text").should("include", "Address update");
				});
			});
		});
	});

	describe("and a valid transaction is entered", () => {
		const hash = "dcb24eca4f7a0847b7b59da15deb46e68b64b75584bee29b8be9b02bad0ac26f";

		beforeEach(() => {
			cy.get(`[data-testid=search-input]`).type(`${hash}{enter}`);
		});

		it("should allow the user to subscribe", () => {
			cy.get(`[data-testid=subscribe-button]`).invoke("text").should("equal", "Subscribe");
			cy.get(`[data-testid=subscribe-button]`).should("exist");
		});

		describe("and the user subscribes", () => {
			beforeEach(() => {
				cy.get(`[data-testid=subscribe-button]`).click();
			});

			it("should show notification", () => {
				const notificationSelector = `[aria-label="Notifications (F8)"] [role=status]`;
				cy.get(`[data-testid=subscribe-button]`).invoke("text").should("equal", "Unsubscribe");
				cy.get(notificationSelector).invoke("text").should("include", hash);
				cy.get(notificationSelector).invoke("text").should("include", "Subscribed for transaction updates");
			});

			it("should show appropriate notification when unsubscribing", () => {
				cy.get("[toast-close]").click();
				cy.get(`[data-testid=subscribe-button]`).click();
				const notificationSelector = `[aria-label="Notifications (F8)"] [role=status]`;
				cy.get(notificationSelector).invoke("text").should("include", hash);
				cy.get(notificationSelector).invoke("text").should("include", "Unsubscribed for transaction updates");
			});

			describe("and the user waits 30 seconds", () => {
				beforeEach(() => {
					cy.get("[toast-close]").click();
					cy.intercept(
						{
							method: "GET", // Route all GET requests
							url: "/api/transaction-hash*", // that have a URL that matches '/users/*'
						},
						{
							transaction: { hash: "wow" },
						}
					);

					cy.tick(30000);
				});

				it("should show notification that transaction changed", () => {
					const notificationSelector = `[aria-label="Notifications (F8)"] [role=status]`;
					cy.get(notificationSelector).invoke("text").should("include", hash);
					cy.get(notificationSelector).invoke("text").should("include", "Transaction update");
				});
			});
		});
	});
});
