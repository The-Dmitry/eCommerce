import { ProductCategories } from '../models/ProductCategories';

export default function defineCategories(
  allCategories: ProductCategories['results']
) {
  return Object.entries(
    allCategories.reduce(
      (acc, v) => {
        if (!v.parent?.obj) {
          return acc;
        }

        const inputData = [v.id, v.name['en-US']];
        const { key } = v.parent.obj;
        if (acc[key]) {
          acc[key].push(inputData);
        } else {
          acc[key] = [inputData];
        }
        return acc;
      },
      {} as Record<string, string[][]>
    )
  );
}
