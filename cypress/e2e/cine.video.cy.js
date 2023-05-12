describe('Check functionality of the video', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.cnb-video-player')
            .as('videoPlayer')
        cy.get('.play-block-center__button')
            .as('playButton')
        cy.get('.gear-control > button')
            .as('gearButton')
        cy.get('.cn-webviewer-icon-check')
            .as('activePlaybackOption')
        cy.get('.video_subtitles')
            .as('videoSubtitles')
        cy.get('.settings-block button.cn-webviewer-icon-subtitle-pressed')
            .as('subtitleButtonPressed')
    });

    after(() => {
        cy.get('@gearButton').click({ force: true })
        cy.get('@playButton').click()
    }); //maybe not necessary, because new page will be opened for each new test, just wanted to have a clean view after the test

    it('Check functonality of subtitles and playback speed options', () => {
        cy.get('@videoPlayer').scrollIntoView()
        cy.get('@playButton').click()
        cy.get('@gearButton').click({ force: true })
        cy.get('.settings-popup__row div').contains("Playback speed")
            .as('playbackSpeedButton')
            .click({ multiple: true, force: true })

        cy.get('.settings-popup .settings-popup__link')
            .as('playbackOptionItem')
            .invoke('slice', '4')
            .should('have.length', 4)
            .as('fastForward')
        cy.get('@fastForward')
            .its('length')
            .then(elementCount => {
        const selected = Cypress._.random(elementCount - 1)
        cy.get('@fastForward').eq(selected).click({force: true})
            .invoke('text')
            .as('fastText')
        });

        cy.get('@gearButton').click({ multiple: true, force: true })
        cy.get('@playbackSpeedButton').click({ multiple: true, force: true })
        cy.get('@activePlaybackOption')
            .invoke('text')
            .should('match', /1\.\d+|\b2\b/ /* I know it is not a perfect assertion, but ('equal', cy.get('@fastText')) – doesn't work, unfortunately. Returns { Object (specWindow, chainerId) } :( */ )
        cy.get('@gearButton')
            .click({ multiple: true, force: true })
        cy.get('@videoSubtitles', {timeout: 30000})
            .should('be.visible').should('have.text', 'True!')
        cy.get('@playButton').click({ multiple: true, force: true })
        cy.get('@subtitleButtonPressed').click({ multiple: true, force: true })
        cy.get('@playButton').click({ multiple: true, force: true })
        cy.get('@videoSubtitles', {timeout: 15000}).should('not.be.visible')
        cy.get('@gearButton').click({ multiple: true, force: true })
        cy.get('@playbackSpeedButton').click({ multiple: true, force: true })
        
        cy.get('@playbackOptionItem')
            .invoke('slice', '0', '3')
            .should('have.length', 3)
            .as('slowMotion')
        cy.get('@slowMotion')
            .its('length')
            .then(elementCount => {
        const selected = Cypress._.random(elementCount - 1);
        cy.get('@slowMotion').eq(selected).click({force: true})
            .invoke('text')
            .as('slowText')
        cy.get('@gearButton').click({ multiple: true, force: true })
        cy.get('@playbackSpeedButton').click({ multiple: true, force: true })
        cy.get('@activePlaybackOption')
            .invoke('text')
            .should('match', /0\.\d+/ /* same thing as in previous case :( */)
        })
    })
})