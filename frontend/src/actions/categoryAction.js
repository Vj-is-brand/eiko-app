import axios from "axios";
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
} from "../constants/categoryConstant";

//add category
export const addCategory = (newCategory) => async (dispatch, getState) => {
  try {
    // Make the axios POST request to add a new category
    const { data } = await axios.post(`/api/categories`, newCategory);

    console.log(data);

    // Verify that the response contains the expected structure
    if (data && data.name) {
      // Dispatch the action with the retrieved category data
      dispatch({
        type: ADD_CATEGORY,
        payload: {
          name: data.name,
          _id: data._id, // Optionally add the category ID if needed
        },
      });

      // Update localStorage with the latest category items
      localStorage.setItem(
        "categoryItems",
        JSON.stringify(getState().category.categoryItems)
      );
    } else {
      console.error("Unexpected server response:", data);
      // You can dispatch an action here to handle unexpected responses
    }
  } catch (error) {
    console.error("Error adding category:", error);
    // You can dispatch an action here to handle errors if needed
  }
};

//remove category
export const removeItemFromCategory = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CATEGORY,
    payload: id,
  });
  localStorage.setItem(
    "categoryItems",
    JSON.stringify(getState().category.categoryItems)
  );
};

//update category
export const updateItemFromCategory =
  (categoryId, updatedCategory) => async (dispatch, getState) => {
    try {
      // Make the axios PUT request to update the category data
      const { data } = await axios.put(
        `/api/categories/${categoryId}`,
        updatedCategory
      );

      console.log(data);

      // Dispatch the action with the updated category data
      dispatch({
        type: UPDATE_CATEGORY,
        payload: {
          _id: data.category._id,
          name: data.category.name,
        },
      });

      // Update localStorage with the latest category items
      localStorage.setItem(
        "categoryItems",
        JSON.stringify(getState().category.categoryItems)
      );
    } catch (error) {
      console.error("Error updating category", error);
    }
  };
