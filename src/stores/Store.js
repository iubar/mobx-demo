import { decorate, observable, action, computed } from "mobx";
import Constants from 'expo-constants';

 class Store {

  @observable
  name = 'Borgo';

  @observable
  count = 0;

  @computed
  get delayMessage(){
    return 'The train is delayed by' + this.count;
  }

  @action
  updateDelay(delay){
    this.count = delay;
  }







// ESEMPIO:  invece di usare i decoratori potrei....
// previously added value
/*
get getFavoriteCount() {
    return this.favorites.length;
}
decorate(Store, {
  // previously added values
  getFavoriteCount: computed,
});

// another way to decorate variables with observable
decorate(Store, {
  text: observable,
  updateText: action,
  data: observable,
  searchImage: action,
  setData: action,
});
*/

@computed
get getFavoriteCount() {
  return this.favorites.length;
}

// observable to save search query
    text = '';

// action to update text
  updateText = (text) => {
      this.text = text;
    }


  // observable to save image response from api
  @observable  
  data = {results:  []};
 
  // action to call API and search images
  searchImages = async () => {
    let API_KEY = Constants.manifest.extra.unsplashApiKey;
    let page = 1; // vale sempre 1 in questo esempio
    let per_page = 20;
    let url = 'https://api.unsplash.com';
    let lang = 'en';
    let orientation = 'landscape';
    url = url + '/search/photos';
    url = url + '?page=' + page + '&per_page=' + per_page + '&lang=' + lang + '&orientation=' + orientation + '&query=' + encodeURIComponent(this.text) ;
    console.log('Fetching ' + url);
    let result = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Version': 'v1',
          Authorization: 'Client-ID ' + API_KEY,        
        }
    });	
  let json = await result.json();
  //console.log('json: ' + JSON.stringify(json));		
  const statusCode = result.status;             
  if (statusCode != 200){
    console.log('Http error: ' + statusCode);			
  }else{			
    console.log('Ok: ' + statusCode);
    console.log('results size: ' + json.results.length);
    this.setData(json);
   
  }
}

  // observables can be modifies by an action only
  @action  
  setData = (data) => {
    this.data = data;
  };

// array to save favourite images
favorites = [];

// action to add images to favorites
addToFavorite = (image) => {
  this.favorites.push(image);
  this.data = null;
  this.text = '';
};

}
 
export default new Store();
