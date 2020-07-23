/// <reference types="Cypress" />

import { Then, And } from "cypress-cucumber-preprocessor/steps";

Then('a content block should appear', () => {
    cy.get('.special-report-raw-html-container').should('be.visible');
});

And('the title should be a H2', () => {
    cy.get('.special-report-raw-html-container h2').should('be.visible');
});

And('the title of a content block will have a href {string}', (linkHref) => {
    cy.get('.special-report-raw-html-container').find('a').should('have.attr', 'href', linkHref);
});

And('the body of a content block will have a link with href {string}', (linkHref) => {
    cy.get('.special-report-raw-html-container p').find('a').last().should('have.attr', 'href', linkHref);
});

And('the image of a content block is displayed with the source {string} and alt text {string}', (imageSource,imageAlt) => {
    cy.get('.special-report-raw-html-container').find('img').should('have.attr', 'src', imageSource);
    cy.get('.special-report-raw-html-container').find('img').should('have.attr', 'alt', imageAlt);

});

And('the image will have a link and text wrapped around', () => {

    cy.document().then(document => {
        const selector = '.special-report-raw-html-container img';
        const imageLink = document.querySelector(selector).parentElement.nodeName
        //assert image has a link (A)
        expect(imageLink).to.eq('A');
        //assert image is a child of a text element (P)
        const imageLinkParent = document.querySelector(selector).parentElement.parentElement.nodeName
        expect(imageLinkParent).to.eq('P');
        //assert that image is not allighed on the left, but rather wrapped around whatever
        //text present
        const offset = document.querySelector(selector).offsetLeft
        assert.isAbove(offset, 30);
    })

    cy.get('.special-report-raw-html-container').find('img').parent().should('have.attr', 'href');

});

And('the image will appear below the title', () => {
    cy.document().then(document => {
        //assert image is allighed on the left
        const offset = document.querySelector('.special-report-raw-html-container img').offsetLeft
        expect(offset).to.eq(30);
    })
});

Then('user clicks on a {string} of a rawHTML block', (component) => {
    if (component === 'title')
        cy.get('.special-report-raw-html-container h2 a').trigger('click', { followRedirect: false });
    else if (component === 'image')
        cy.get('.special-report-raw-html-container img').trigger('click', { followRedirect: false });
});