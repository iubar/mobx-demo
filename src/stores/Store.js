import { makeObservable, observable, action, computed } from 'mobx';
import Constants from 'expo-constants';

class Store {
	// Observable attributes
	name = 'MobX Demo';
	buttonEnabled = true;
	data = { results: [] };

	// Not observable attributes
	text = '';

	constructor() {
		// makeObservable(this)
		makeObservable(this, {
			name: observable,
			buttonEnabled: observable,
			data: observable,

			updateText: action,
			setData: action,
			setButtonEnabled: action,
			searchImages: action,
			//text: observable,
			searchedText: computed,
		});
	}

	// The values that can be derived from already defined observables are computed values.
	// Computed works like a getter function to get derived state from the observable
	// The following computed function doesn't work as expected because 'text' is not observable
	// This is right because, right now, we don't need 'text' to be observable
	get searchedText() {
		let _text = 'undefined';
		if (this.text) {
			_text = "'" + this.text + "'";
		}

		return _text;
	}

	// Actions are simply functions that modify the state.
	updateText = (text) => {
		console.log('action called, text updated : ' + text);
		this.text = text;
	};

	// Observables can be modifies by an action only.
	// Actions are simply functions that modify the state.
	setData = (json) => {
		console.log('data updated');
		this.data.results = json.results;
		console.log('this.data size: ' + this.data.results.length);
	};

	setButtonEnabled = (b) => {
		this.buttonEnabled = b;
	};

	randomNumberInRange(min, max) {
		// 👇️ get number between min (inclusive) and max (inclusive)
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// An action to call API and search images
	searchImages = async () => {
		this.setButtonEnabled(false);
		let API_KEY = Constants.expoConfig.extra.unsplashApiKey; // see the app.json file in the root path
		let page = 1; // vale sempre 1 in questo esempio
		let per_page = this.randomNumberInRange(3, 6);
		let url = 'https://api.unsplash.com';
		let lang = 'en';
		let orientation = 'landscape';
		url = url + '/search/photos';
		url =
			url +
			'?page=' +
			page +
			'&per_page=' +
			per_page +
			'&lang=' +
			lang +
			'&orientation=' +
			orientation +
			'&query=' +
			encodeURIComponent(this.text);
		console.log('Fetching ' + url);
		let statusCode = 0;
		let json = null;
		try {
			let result = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Accept-Version': 'v1',
					'Authorization': 'Client-ID ' + API_KEY,
				},
			});
			json = await result.json();
			statusCode = result.status;
		} catch (error) {
			console.log('*** ERROR ***');
			console.log(error.message);
		}

		if (statusCode != 200) {
			console.log('Http error: ' + statusCode);
		} else {
			console.log('Ok: ' + statusCode);
			console.log('results size: ' + json.results.length);
			//console.log('json: ' + JSON.stringify(json));
			this.setData(json);
		}
		this.setButtonEnabled(true);
	};

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
