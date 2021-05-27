require('dotenv').config()
const fetch = require('node-fetch');

/**
 * Username of the challonge account
 * @type {string}
 */
const USERNAME = "I_Like_Cats__";
/**
 * URL to prevent having to give api_key all the time
 * @type {string}
 */
const BASE_KEY = `https://${USERNAME}:${process.env.CHALLONGE_API_KEY}@api.challonge.com/v1`;

// TOURNAMENTS
/**
 * Get a list tournaments with your account 
 * 
 * [Challone API Docs](https://api.challonge.com/v1/documents/tournaments/index)
 * @async
 * @param {object} { "state" : "pending", "type" : "single elimination", "created_after" : "2020-01-01" }
 * @returns {object} All tournaments and their info (excludes participants)
 * @example 
 * // Returns {tournaments}
 * const myTournaments = await listTournaments({ "state" : "pending", "type" : "single elimination", "created_after" : "2020-01-01" });
 */
async function listTournaments(parameters) {
    const params = new URLSearchParams(parameters);
    const response = await fetch(`${BASE_KEY}/tournaments.json?&` + params, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    }).catch(e => {
        return Promise.reject(e);
    });
    if (!response.ok) return Promise.reject(`${response.status} ${response.statusText}`);
    const json = await response.json();
    return json;
}

/**
 * Get info on one specific tournament
 * 
 * [Challonge API Docs](https://api.challonge.com/v1/documents/tournaments/show)
 * @async
 * @param {object} { "tournamentID" : 000000, "include_participants" : 0, "include_matches" : 0 }
 * @returns {object} Tournament info
 * @example 
 * // Returns {tournament}
 * const tournamentInfo = await getTournament({ "tournamentID" : 9841271, "include_matches" : 0 });
 */
async function getTournament(parameters) {
    const params = new URLSearchParams(parameters);
    const response = await fetch(`${BASE_KEY}/tournaments/${parameters.tournamentID}.json?&${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    }).catch(e => {
        return Promise.reject(e);
    });
    if (!response.ok) return Promise.reject(`${response.status} ${response.statusText}`);
    const json = await response.json();
    return json;
}

/**
 * Create a tournament
 * 
 * [Challonge API Docs](https://api.challonge.com/v1/documents/tournaments/create)
 * 
 * Also takes custom parameters (object)
 * @see new tournamentParameters();
 * @async
 * @param {object} 
 * @returns {object} Info about the created tournament
 * @example 
 * // Creates a tournament
 * // Named:                        testingYetAgain
 * // Tournament Type:              default (single elimination)
 * // Custom URL:                   random URL (null)
 * // Description:                  Testing yet again
 * // Host signup page:             false
 * // Host third place match:       true
 * // Player Cap:                   16
 * // Starting and ending date:     2021/01/19 10:30:00 till 11:30:00
 * createTournament(new tournamentParameters("testingYetAgain", null, null, "Testing yet again", false, true, 16, "2021-01-19T10:30:00-11:30:00"))
 */
async function createTournament(parameters) {
    if (!parameters) return Promise.reject(`This function requires parameters`);
    const response = await fetch(`${BASE_KEY}/tournaments.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(parameters)
    }).catch(e => {
        return Promise.reject(e);
    });
    console.log(response)
    if (!response.ok) return Promise.reject(`${response.status} ${response.statusText}`);
    return response.json()
}

/**
 * Delete a specific tournament
 * 
 * [Challonge API Docs](https://api.challonge.com/v1/documents/tournaments/destroy)
 * @async
 * @param {number|string} tournament Either a tournament ID or the URL 
 * @returns void
 * @example 
 * deleteTournament("testingLinkJSDoc");
 */
async function deleteTournament(tournament) {
    if (!tournament) return Promise.reject(`This function requires a tournament ID or URL`);
    const response = await fetch(`${BASE_KEY}/tournaments/${tournament}.json`, {
        method: 'DELETE'
    }).catch(e => {
        return Promise.reject(e);
    });
    if (!response.ok) return Promise.reject(`${response.status} ${response.statusText}`);
    return response.json()
}

async function startTournament(tournamentID) {
    if (!tournamentID) return Promise.reject(`This function requires a tournament ID`);
    const response = await fetch(`${BASE_KEY}/tournaments/${tournamentID}/start.json`, {
        method: 'POST'
    }).catch(e => {
        return Promise.reject(e);
    });
    if (!response.ok) return Promise.reject(`${response.status} ${response.statusText}`);
    return response.json()
}


// PARTICIPANTS
async function getParticipants(tournamentID) {
    if (!tournamentID) return Promise.reject(`This function requires parameters`);
    const response = await fetch(`${BASE_KEY}/tournaments/${tournamentID}/participants.json`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    }).catch(e => {
        return Promise.reject(e);
    })
    if (!response.ok) return Promise.reject(`${response.status} ${response.statusText}`);
    return response.json()
}

async function createParticipant(parameters) {
    if (!parameters) return Promise.reject(`This function requires parameters`);
    const response = await fetch(`${zBASE_KEY}/tournaments/${parameters.tournamentID}/participants.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(parameters)
    }).catch(e => {
        return Promise.reject(e);
    });
    if (!response.ok) return Promise.reject(`${response.status} ${response.statusText}`);
    return response.json()
}

async function deleteParticipant(parameters) {
    if (!parameters) return Promise.reject(`This function requires parameters`);
    const response = await fetch(`${BASE_KEY}/tournaments/${parameters.tournamentID}/participants/${parameters.participantID}.json`, {
        method: 'DELETE'
    }).catch(e => {
        return Promise.reject(e);
    });
    if (!response.ok) return Promise.reject(`${response.status} ${response.statusText}`);
    return response.json()
}


// MATCHES
async function getMatches(parameters) {
    if (!tournamentID) return Promise.reject(`This function requires a tournament ID`);
    const params = new URLSearchParams(parameters);
    const response = await fetch(`${BASE_KEY}/tournaments/${parameters.tournamentID}.json?&${params}`, {
        method: 'GET'
    }).catch(e => {
        return Promise.reject(e);
    });
    if (!response.ok) return Promise.reject(`${response.status} ${response.statusText}`);
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

/** Easy way to create a tournament with parameters */
class tournamentParameters {
    /**
     * Basic parameters for a tournament
     * @param {string} name Name of the tournament (Max 60 characters)
     * @param {string} tournament_type Type of the tournament, IE "single elimination"
     * @param {string} url The url that will link to the tournament https://www.challonge.com/${URL}
     * @param {string} description Description of the tournament
     * @param {boolean} open_signup True lets challonge create a sign up page, false requires you to manually add participants
     * @param {boolean} hold_third_place_match True hosts a special match for third and fourth place, false does not
     * @param {number} signup_cap The max amount of players in the tournament, adding more than the cap adds the participants to a waiting list
     * @param {string} start_at The time and date the tournament starts at. YYYY-MM-DD **T**HH:MM:SS-HH:MM:SS
     */
    constructor(name, tournament_type, url, description, open_signup, hold_third_place_match, signup_cap, start_at) {
        this.name = name
        this.tournament_type = tournament_type ? tournament_type : "single elimination";
        this.url = url
        this.description = description
        this.open_signup = open_signup ? open_signup : false
        this.hold_third_place_match = hold_third_place_match
        this.signup_cap = signup_cap
        this.start_at = start_at
    }
}

class matchParameters {
    constructor(state, participantID){
        this.state = state;
        this.participantID = participantID;
    }
}

module.exports = {
    listTournaments,
    createTournament,
    deleteTournament,
    createParticipant,
    participantParameters,
    tournamentParameters
}