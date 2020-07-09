Feature: function test for special report template for Annual Plan

    Scenario: User views the AP landing page
        Given user is navigating to "/special-report"
        And screen breakpoint is set to "desktop"
        Then the hero image should be displayed full width with the following
            | attribute | value                                                                                |
            | alt       | AP FY 2022 Hero                                                                      |
            | image     | \/sites\/default\/files\/cgov_hero\/banner/\d{4}-\d{2}\/apfy22-hero-placeholder\.jpg |
            | width     | 2880                                                                                 |
            | height    | 1080                                                                                 |
        And the hero image title text is "NCI Annual Plan & Budget Proposal For Fiscal Year 2022"
        And the main content area should appear
        And left navigation menu is not displayed


    Scenario: User views the AP landing page on Tablet
        Given user is navigating to "/special-report"
        And screen breakpoint is set to "tablet"
        Then the hero image should be displayed full width with the following
            | attribute    | value                                                                                |
            | alt          | AP FY 2022 Hero                                                                      |
            | desktopImage | \/sites\/default\/files\/cgov_hero\/banner/\d{4}-\d{2}\/apfy22-hero-placeholder\.jpg |
            | width        | 2880                                                                                 |
            | height       | 1080                                                                                 |
        And the hero image title text is "NCI Annual Plan & Budget Proposal For Fiscal Year 2022"
        And the main content area should appear


    Scenario: User views the AP landing page on Mobile
        Given user is navigating to "/special-report"
        And screen breakpoint is set to "mobile"
        Then the hero image should be displayed full width with the following
            | attribute    | value                                                                                |
            | alt          | AP FY 2022 Hero                                                                      |
            | desktopImage | \/sites\/default\/files\/cgov_hero\/banner/\d{4}-\d{2}\/apfy22-hero-placeholder\.jpg |
            | width        | 2880                                                                                 |
            | height       | 1080                                                                                 |
        And the hero image title text is "NCI Annual Plan & Budget Proposal For Fiscal Year 2022"
        And the main content area should appear


    Scenario: User views the AP landing page in Spanish
        Given user is navigating to "/espanol/special-report"
        And screen breakpoint is set to "desktop"
        Then the hero image should be displayed full width with the following
            | attribute | value                                                                                |
            | alt       | AP FY 2022 Hero                                                                      |
            | image     | \/sites\/default\/files\/cgov_hero\/banner/\d{4}-\d{2}\/apfy22-hero-placeholder\.jpg |
            | width     | 2880                                                                                 |
            | height    | 1080                                                                                 |
        And the hero image title text is "Spanish: NCI Annual Plan & Budget Proposal For Fiscal Year 2022"
        And the main content area should appear
        And left navigation menu is not displayed


    Scenario Outline: Web site visitor views an Annual Plan page  and PDF link appears only on desktop and table
        Given user is navigating to "<url>"
        And screen breakpoint is set to "<screenBreakpoint>"
        Then the PDF download link should appear
        And a PDF icon located at "profiles/custom/cgov_site/themes/custom/cgov/cgov_common/dist/images/sprites/svg-sprite.svg" should be displayed with a text "Annual Plan & Budget Proposal At A Glance"
        And clicking on the link will open a new window

        Examples:
            | screenBreakpoint | url                     |
            | desktop          | /special-report         |
            | tablet           | /espanol/special-report |
    Scenario: Web site visitor views an Annual Plan page  and PDF link is not shown on mobile
        Given user is navigating to "/special-report"
        And screen breakpoint is set to "mobile"
        Then the PDF download link is not displayed

    Scenario: Click events for “Annual Plan & Budget Proposal At-A-Glance” file download button from the page (top link)
        Given user is navigating to "/special-report"
        When user clicks on PDF download button
        Then page click request is sent
        And the following parameters should be captured
            | parameter | value                                   |
            | event52   |                                         |
            | prop4     | D=pev1                                  |
            | prop8     | english                                 |
            | prop66    | filedownload_icon                       |
            | prop67    | D=pagename                              |
            | eVar2     | english                                 |
            | channel   | NCI Homepage                            |
            | pageName  | {CANONICAL_HOST}/special-report         |
            | pageURL   | https://{CANONICAL_HOST}/special-report |