import { decorate, observable, action, computed } from "mobx";
import Constants from 'expo-constants';

 class Store {

  @observable
  name = 'MobX Demo';

  // An observable to save image response from api
  @observable  
  data = {results:  []};

  // The following attribute is not observable
  text = '';

  // The values that can be derived from already defined observables are computed values.
  // Computed works like a getter function to get derived state from the observable
  // The following computed function doesn't work as expected because 'text' is not observable
  // This is right because, right now, we don't need 'text' to be observable
  @computed
  get searchedText(){
    let _text = 'undefined';
    if(this.text){
      _text = 'You have searched the string: ' + this.text;
    }
    return _text;
  } 

  // Actions are simply functions that modify the state.
  @action 
  updateText = (text) => {
      console.log('action called, text updated : ' + text);
      this.text = text;
    }

  // Observables can be modifies by an action only.
  // Actions are simply functions that modify the state.
  @action  
  setData = (data) => {
    this.data = data;
  };    
 
  // An action to call API and search images
  @action 
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

 

/*

OTHER EXAMPLES:

@computed
get getFavoriteCount() {
    return this.favorites.length;
}

@action
addToFavorite = (image) => {
  this.favorites.push(image);
  this.data = null;
  this.text = '';
};

// Invece di usare i decoratori potrei....

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

} // end class
 
export default new Store();
