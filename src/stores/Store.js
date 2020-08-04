import { decorate, observable, action, computed } from "mobx";

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
  data = {results:  []};

  // action to call API and search images
  searchImages = () => {
    let API_KEY = 'CHANGE_ME';
    let page = 1; // vale sempre 1 in questo esempio
    let url = 'https://api.unsplash.com/search/photos?client_id=' + API_KEY + '&page=' + page + '&query=' + encodeURIComponent(this.text) + '&orientation=landscape';
    console.log('Fetching ' + url);
    fetch(url)
      .then(response => response.json())
      .then(data => this.setData(data));
  };

  // observables can be modifies by an action only
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