const Country = require('../models/Country');

const createData = async () => {
  const nigeria = {
    _id: '61913a5bade61b31479133b7',
    name: 'Nigeria',
    capital: 'Abuja',
    iso2Code: 'NG',
  };

  const ghana = {
    _id: '61913e71abd74c71610559fd',
    name: 'Ghana',
    capital: 'Accra',
    iso2Code: 'GH',
  };

  const cameroon = {
    _id: '61920698c4747ee7f652c497',
    name: 'Cameroon',
    capital: 'Yaounde',
    iso2Code: 'CM',
  };

  const benin = {
    _id: '6194a6b677af3512c59daf34',
    name: 'Benin',
    capital: 'Cotonou',
    iso2Code: 'BN',
  };

  return {
    nigeria,
    ghana,
    cameroon,
    benin,
  };
};

export const createDocument = async () => {
  const { nigeria, ghana, cameroon, benin } = await createData();

  const countries = await Country.create([nigeria, ghana, cameroon, benin]);

  return { countries, nigeria, ghana, cameroon, benin };
};
