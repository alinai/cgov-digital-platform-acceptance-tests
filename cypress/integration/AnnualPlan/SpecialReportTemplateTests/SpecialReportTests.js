/// <reference types="Cypress" />

import { Then, And } from "cypress-cucumber-preprocessor/steps";

Then('the hero image should be displayed full width with the following', dataTable => {
    cy.get('#nvcgSlHeroHeader > div > .rawHtml').find('img').as('image');
    for (const { attribute, value } of dataTable.hashes()) {
        if (attribute === 'alt') {
            if (value === 'empty') {
                cy.get('#nvcgSlHeroHeader > div > .rawHtml img').should('have.attr', 'alt').and('eq', '');
            }

            else {
                cy.get('#nvcgSlHeroHeader > div > .rawHtml img').should('have.attr', 'alt').and('eq', value);
            }

        }

        if (attribute === 'image') {
            const regex = new RegExp(value);
            cy.get('@image').should('have.attr', 'src').and('match', regex);
        }

        if (attribute === 'width') {
            cy.get('@image').should('have.attr', 'width').and('eq', value);
        }

        if (attribute === 'height') {
            cy.get('@image').should('have.attr', 'height').and('eq', value);
        }
    }
});

And('the hero image title text is {string}', (titleText) => {
    cy.get('#nvcgSlHeroHeader h1').should('have.text', titleText);
});

And('the main content area should appear', () => {
    cy.get(".row.report-container").should('be.visible');
});

And('left navigation menu is not displayed', () => {
    cy.get("div#nvcgSlSectionNav").should('not.exist');
});



