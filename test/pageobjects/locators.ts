import propertiesReader from 'properties-reader';

// Load the properties file
const properties = propertiesReader('D:/Js/wdio-testdata-ts-main/test/pageelements/TheInternetPageElements.properties');

// Get the values of properties and store them in an object
const pageElements = {
  userName: properties.get('username') as string,
  password: properties.get('password') as string,
  submit: properties.get('submit') as string,
  flash: properties.get('flash') as string,
  tripmode: properties.get('tripmode') as string,
  fareType: properties.get('fareType') as string,
  priceList: properties.get('priceList') as string,
  closeLoginWindow: properties.get('closeLoginWindow') as string,
  refreshBtn: properties.get('refreshBtn') as string,
  popularFilters: properties.get('popularFilters') as string,
  links: properties.get('links') as string,
  search: properties.get('search') as string,
  list: properties.get('list') as string,
  carFilter: properties.get('carFilter') as string,
  cabBookDetails: properties.get('cabBookDetails') as string,
  carPriceList: properties.get('carPriceList') as string,
  cabName: properties.get('cabName') as string,
  cabDetails : properties.get('cabDetails') as string,
  busFilters :properties.get('busFilters') as string,
  busPickUpPointCheckBox : properties.get('busPickUpPointCheckBox') as string,
  busDropPointCheckBox: properties.get('busDropPointCheckBox') as string,
  busFilterText : properties.get('busFilterText') as string,
  busDetails: properties.get('busDetails') as string
};

// Export the object containing all the page elements
export default pageElements;
