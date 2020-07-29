/// <reference types="Cypress" />

import { Then, And } from "cypress-cucumber-preprocessor/steps";
Then('the button to download At a Glance should appear at the bottom of the page', () => {
    cy.get('.ap-button-block').find('a').should('be.visible');

});
And('a PDF icon located at {string} should be displayed with a text {string}', (iconUrl, iconText) => {
    const baseURL = Cypress.config('baseUrl');
    cy.document().then((document) => {
        const element = document.querySelector("div[class='ap-button-block'] a");
        const style = window.getComputedStyle(element, '::before');
        const image = style.getPropertyValue('background-image');
        const expectedURL = `url("${baseURL}${iconUrl}")`;
        expect(expectedURL).equal(image);
        const text = element.innerText;
        expect(text).equal(iconText);
    });
});

And('clicking on the link will open the PDF in a new window', () => {
    cy.get('.ap-button-block').find('a').should('have.attr', 'target', '_blank');

});


When('user clicks on bottom {string} button', (buttonLink) => {
    cy.get(`div[class='ap-button-block']`).find('a').trigger('click', {followRedirect:false});

});