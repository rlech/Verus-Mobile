export const getCoinPaprikaRate = (coinObj) => {
  let coinID = coinObj.id
  let coinName = coinObj.name
  let param = (coinID.toLowerCase()) + '-' + (coinName.replace(/ /g,"-")).toLowerCase()

  const address = `https://api.coinpaprika.com/v1/coins/${param}/ohlcv/latest`

  return new Promise((resolve, reject) => {
    fetch(address, {
      method: 'GET'
      })
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        //TODO: Solve why coins that arent on coinPaprika cause 
        //an error
        resolve(false)
      }
      else {
        resolve(response[0].close)
      }
    })
  });
}