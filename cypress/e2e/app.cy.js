describe("Navigation", () => {
  it("should navigate to Ko zna zna game mode", () => {
    cy.visit("http://localhost:3000");
    cy.get('a[href*="/ko-zna-zna"]').click();
    cy.url().should("include", "/ko-zna-zna");
  });
});
