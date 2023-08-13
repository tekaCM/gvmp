const ConfigManager = require("./Config");
const config = new ConfigManager("./secret/Data.json");

class Server {
    constructor() {
        this.mainUrl = "https://launcher.gvmp.de:5004";
    }

    loginPlayer(username, password) {
        const payload = {
            username: username,
            password: sha256(password)
        }

        return axios.post(`${this.mainUrl}/auth/login`, payload)
                .then(response => response.data)
    }

    whitelistPlayer() {
        const payload = {
            auth_token: config.read("auth_token"),
            name: config.read("username"),
            proxy: config.read("proxy"),
            forum_id: config.read("forum_id")
        }

        return axios.post(`${this.mainUrl}/player/whitelist`, payload)
                .then(response => response.data)
    }

    isPlayerOnline(id) {
        return axios.get(`${this.mainUrl}/player/online/${id}`)
                .then(response => response.data)    
    }

    isPlayerWhitelisted(id) {
        return axios.get(`${this.mainUrl}/whitelist/ip/validate/${id}`)
                .then(response => response.data)  
    }

    getServers() {
        return axios.get(`${this.mainUrl}/server`)
                .then(response => response.data)
    }
}

exports.Server = Server;