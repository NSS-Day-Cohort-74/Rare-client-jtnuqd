import { useState } from "react";
import { createNewCategory } from "../../services/categoryService";
// Only load the columns

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
        <section class="card p-4 m-3">
            <h1 class="title is-5 m-3 has-text-centered">New Category</h1>
            <form onSubmit={handleCreateCategory}>
                <fieldset class="m-2">
                    <label class="m-1">Category Label:</label>
                    <input
                        type="text"
                        name="cat_label"
                        value={catLabel}
                        onChange={(event) => setCatLabel(event.target.value)}
                        required
                    />
                </fieldset>
                <button class="button is-success m-3" type="submit">
                    Submit Category
                </button>
            </form>
        </section>
    );
};
