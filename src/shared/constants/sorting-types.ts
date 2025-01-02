type SortOptions = { [key: string]: { text: string; param: string } };

const sortingTypes: SortOptions = {
  '': { text: 'Default', param: '' },
  'name asc': { text: 'Name A-Z', param: 'name.en-US asc' },
  'name desc': { text: 'Name Z-A', param: 'name.en-US desc' },
  'price asc': {
    text: 'Price: Low to High',
    param: 'price asc',
  },
  'price desc': { text: 'Price: High to low', param: 'price desc' },
  'highest rated': {
    text: 'Highest rated',
    param: 'variants.attributes.rating desc',
  },
};

export default sortingTypes;
