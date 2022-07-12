class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/"
    _apiKey = 'apikey=db65f2609fa76179ee83077743cefc47'
    _baseOffset = 210
    getResource = async (url) => {
        let result = await fetch(url);
    
        if (!result.ok){
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
    
        return await result.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacters)
    }

    getCharacters = async(id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacters(res.data.results[0])
    }

    checkStr = (str) => {
        if (str.length > 0 && str.length < 210) {
            return str
        } else if (str.length > 210) {
            return str.slice(0, 210) + '...'
        } else return 'description is missing'  
    }

    _transformCharacters = (char) => {
        
        return {
            id: char.id,
            name: char.name,
            description: this.checkStr(char.description),
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;

