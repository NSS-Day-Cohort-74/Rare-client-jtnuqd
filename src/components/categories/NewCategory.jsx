import { useState } from "react";
import { createNewCategory } from "../../services/categoryService";

export const NewCategoryForm = ({ setAndFetchCategories }) => {
  const [catLabel, setCatLabel] = useState("");

  const handleCreateCategory = (event) => {
    event.preventDefault();

    const submissionObject = {
      label: catLabel,
    };
    // create new category, then refresh all categories data and reset catLabel
    createNewCategory(submissionObject)
      .then(() => {
        setAndFetchCategories();
        setCatLabel("");
      })
      .catch((error) => console.error("Error adding category", error));
  };

  return (
    <section>
      <h1>New Category</h1>
      <form onSubmit={handleCreateCategory}>
        <fieldset>
          <label>Category Label:</label>
          <input
            type="text"
            name="cat_label"
            value={catLabel}
            onChange={(event) => setCatLabel(event.target.value)}
            required
          />
        </fieldset>
        <button type="submit">Submit Category</button>
      </form>
    </section>
  );
};
