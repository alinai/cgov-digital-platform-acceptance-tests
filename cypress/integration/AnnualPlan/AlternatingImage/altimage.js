/// <reference types="Cypress" />

import { Then, And } from "cypress-cucumber-preprocessor/steps";



Then('an alternating image list will appear', () => {
    cy.get('.alternating-image-list-container').should('be.visible');
});

And('the list items will have alternating alighment starting with left', () => {
    cy.document().then(document => {
        const allImages = document.querySelectorAll('div.list-item-image.image.container');
        const allDescContainer = document.querySelectorAll('.title-and-desc.title.desc.container.alternating-image-list-text');
        for (let i = 0; i < allImages.length; i++) {
            if (i % 2 === 0) {
                expect(allImages[i].offsetLeft).to.eq(30);
                expect(allDescContainer[i].offsetLeft).to.eq(441);
            } else {
                expect(allImages[i].offsetLeft).to.eq(441);
                expect(allDescContainer[i].offsetLeft).to.eq(30);
            }
        }
    })
});


And('the list items images will not be displayed', () => {
    cy.get('alternating-image-list-image').should('not.be.visible');
});

And('{string} by {string} sized promo image of the list item number {int} is displayed with the source {string} and alt text {string}', 
(height,width,itemNumber,srcURL,altText) => {
    const regex = new RegExp (srcURL);
    cy.get('.alternating-image-list-image').eq(itemNumber - 1).find('img').as('image');
    cy.get('@image').should('have.attr','height').and('eq',height);
    cy.get('@image').should('have.attr','width').and('eq',width);
    cy.get('@image').should('have.attr','src').and('match',regex);
    cy.get('@image').should('have.attr','alt').and('eq',altText);

});

And('the page title of the list item number {int} should appear as H3 tag', (itemNumber) => {
cy.get('.title-and-desc.title.desc.container.alternating-image-list-text').eq(itemNumber-1).find('h3').should('not.be.empty');
});

And('the list description of the list item number {int} should appear', (itemNumber) => {
    cy.get('.title-and-desc.title.desc.container.alternating-image-list-text').eq(itemNumber-1).find('.description p').should('not.be.empty');
});

And('the item number {int} has a href {string}', (itemNumber, hrefLink ) =>  {
cy.get('a.alternating-image-list-container-link').eq(itemNumber-1).should('have.attr', 'href',hrefLink );
});

And('the exit disclaimer of item number {int} appears', (itemNumber) => {
cy.get('a.alternating-image-list-container-link').eq(itemNumber-1).find('~ a.icon-exit-notification')
.should('have.attr', 'href');
});

When('user clicks on a list item at position {int}', (itemNumber) => {
    cy.get('a.alternating-image-list-container-link > div').eq(itemNumber - 1).trigger('click', { followRedirect: false });
});