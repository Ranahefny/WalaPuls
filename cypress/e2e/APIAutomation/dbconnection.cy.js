describe("Database Query Test", () => {
  it("Fetch users from DB", () => {
    cy.queryDB("SELECT * FROM users").then((result) => {
      cy.log(result); // Logs query result
      expect(result.length).to.be.greaterThan(0); // Validate response
    });
  });
});
