/// <reference types="Cypress" />

import { Then, And } from "cypress-cucumber-preprocessor/steps";

Then('the title of the feature card {int} is {string}', (itemNumber, cardTitle) => {
    cy.document().then(doc => {
        if (doc.documentElement.clientWidth < 641) {
            cy.get('.borderless-card').eq(itemNumber - 1).find('h2.mobile-display').should('be.visible');
            cy.get('.borderless-card').eq(itemNumber - 1).find('h2.desktop-tablet-display').should('not.be.visible');
        } else {
            cy.get('.borderless-card').eq(itemNumber - 1).find('h2.desktop-tablet-display').should('be.visible');
            cy.get('.borderless-card').eq(itemNumber - 1).find('h2.mobile-display').should('not.be.visible');

        }
    });

});

And('the feature card {int} title will have the href {string}', (itemNumber, titleHref) => {
    cy.get('.borderless-text-container').eq(itemNumber - 1).find('a').should('have.attr', 'href', titleHref);
});

And('the feature card {int} description is {string}', (itemNumber, cardDesc) => {
    if (cardDesc !== 'none')
        cy.get('.borderless-text-container').eq(itemNumber - 1).find('p').should('have.text', cardDesc);
    else
        cy.get('.borderless-text-container').eq(itemNumber - 1).find('p').should('not.exist');
});

And('the feature card {int} will have a button displayed under the card description with the text {string} and href {string}', (itemNumber, buttonText, buttonHref) => {
    cy.get('.borderless-text-container').eq(itemNumber - 1).find('.borderless-button').as('button').should('have.attr', 'href', buttonHref);
    cy.get('@button').should('have.text', buttonText);

});

And('{string} by {string} sized promo image of the feature card {int} is displayed with the source {string} and alt text {string}',
    (imgWidth, imgHeight, itemNumber, imgSrc, imgAltText) => {
        if (imgSrc !== 'none') {
            const regex = new RegExp(imgSrc);
            cy.get('.borderless-card').eq(itemNumber - 1).find('img').as('imgProperty')
                .should('have.attr', 'alt').and('eq', imgAltText);
            cy.get('@imgProperty').should('have.attr', 'width').and('eq', imgWidth);
            cy.get('@imgProperty').should('have.attr', 'height').and('eq', imgHeight);
            cy.get('@imgProperty').should('have.attr', 'src').and('match', regex);
        }
        else {
            cy.get('.borderless-card').eq(itemNumber - 1).find('img').should('not.exist');
        }

    });

And('the feature card {int} promo image {string} will link to the {string}', (itemNumber, imgSrc, titleHref) => {
    if (imgSrc !== 'none') {
        cy.get('.borderless-card').eq(itemNumber - 1).find('img').parent().should('have.attr', 'href').and('eq', titleHref);
    } else {
        cy.get('.borderless-card').eq(itemNumber - 1).find('img').should('not.exist');

    }

});



