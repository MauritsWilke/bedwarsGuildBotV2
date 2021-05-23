require('dotenv').config()
const fetch = require('node-fetch');

const USERNAME = "I_Like_Cats__";
const BASE_KEY = `https://${USERNAME}:${process.env.CHALLONGE_API_KEY}@api.challonge.com/v1`;

module.exports = {
    getTournaments,
    createTournament,
    deleteTournament,
    createParticipant,
    participantParameters,
    tournamentParameters
}

// TOURNAMENTS
async function getTournaments(parameters) {
    const params = new URLSearchParams(parameters);
    const response = await fetch(`${BASE_KEY}/tournaments.json?&` + params, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    });
    const json = await response.json();
    return json;
}

async function createTournament(parameters) {
    if (!parameters) return Promise.reject(`This function requires parameters`);
    const response = await fetch(`${BASE_KEY}/tournaments.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(parameters)
    }).catch(e => {
        return Promise.reject(e);
    });
    return response.json()
}

async function deleteTournament(tournamentID) {
    if (!tournamentID) return Promise.reject(`This function requires a tournament ID`);
    const response = await fetch(`${BASE_KEY}/tournaments/${tournamentID}.json`, {
        method: 'DELETE'
    }).catch(e => {
        return Promise.reject(e);
    });
    return response.json()
}



// PARTICIPANTS
async function createParticipant(parameters) {
    if (!parameters) return Promise.reject(`This function requires parameters`);
    const response = await fetch(`${BASE_KEY}/tournaments/${parameters.tournamentID}/participants.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(parameters)
    }).catch(e => {
        return Promise.reject(e);
    })
    return response.json()
}



// CLASSES
class participantParameters {
    constructor(tournamentID, name, challonge_username, email, seed, misc) {
        this.tournamentID = tournamentID
        this.name = name
        this.challonge_username = challonge_username ? challonge_username : null
        this.email = email ? email : null
        this.seed = seed ? seed : null
        this.misc = misc ? misc : null
    }
}

class tournamentParameters {
    constructor(name, tournament_type, url, description, open_signup, hold_third_place_match, signup_cap, start_at) {
        this.name = name
        this.tournament_type = tournament_type
        this.url = url
        this.description = description
        this.open_signup = open_signup ? open_signup : false
        this.hold_third_place_match = hold_third_place_match
        this.signup_cap = signup_cap
        this.start_at = start_at
    }
}

getTournaments();