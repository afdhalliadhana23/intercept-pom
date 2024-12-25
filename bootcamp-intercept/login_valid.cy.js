/// <reference types="cypress"/>
import loginPage from "../../../pom/orangeHRM/loginPage/login";

describe('Login Feature',() => {
    it('User Login with Valid credentials',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text',' ');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('admin123');
        cy.intercept("Get","**/employees/action-summary").as("actionsummary");
        loginPage.buttonLogin().click();

        cy.wait("@actionsummary").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });
        loginPage.menuDashboard().should('have.text','Dashboard')
                
        })
    
})