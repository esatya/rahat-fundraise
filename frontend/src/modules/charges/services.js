import axios from 'axios';

export function getLatestPrice(payload) {
    const options = {
		headers: {
			Authorization: process.env.REACT_APP_CRYPTO_API_KEY
		}
	};
	const { currency, token } = payload;
	return new Promise((resolve, reject) => {
		axios(`${process.env.REACT_APP_CRYPTO_URL}/data/price?fsym=${token.toUpperCase()}&tsyms=${currency.toUpperCase()}`,
        options
        )
			.then(res => resolve(res.data))
			.catch(err => {
				reject(err.response.data);
			});
	});
}

