import products from './products.json';
import _ from 'lodash';

export const generateProducts = () => {
  const oneDay = 24*(60*60*1000)
  const clonedProduct = _.cloneDeep(products);

  clonedProduct.forEach((prod: {
    id: string;
    codeName: string;
    name: string;
    category: string;
    price: string;
    image: string;
    images: string[];
    description: string;
    eta: number;
    discount: string;
    detailedInfo: { fullname: string; detail: string; features: string[]; };
  }) => {
    prod.eta = prod.eta * oneDay;
    prod.image = "/images/products/"+prod.codeName+"/"+prod.image;
    prod.images = prod.images.map(imageUrl => "images/products/"+prod.codeName+"/"+imageUrl);
  });

  return clonedProduct;
};
