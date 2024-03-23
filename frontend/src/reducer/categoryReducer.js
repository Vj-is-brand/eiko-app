import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
} from "../constants/categoryConstant";

export const categoryReducer = (state = { categoryItems: [] }, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      // Check if the category already exists in the array
      const categoryExists = state.categoryItems.some(
        (category) => category.name === action.payload.name
      );

      if (categoryExists) {
        // If the category already exists, return the state as is
        return state;
      } else {
        // If the category doesn't exist, add it to the array
        return {
          ...state,
          categoryItems: [...state.categoryItems, action.payload],
        };
      }

    case REMOVE_CATEGORY:
      return {
        ...state,
        categoryItems: state.categoryItems.filter(
          (item) => item._id !== action.payload
        ),
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        categoryItems: state.categoryItems.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    default:
      return state;
  }
};
