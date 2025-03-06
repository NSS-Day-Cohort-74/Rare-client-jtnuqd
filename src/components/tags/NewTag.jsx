import { useState } from "react";
import { createNewTag } from "../../services/tagService";

export const NewTagForm = ({ setAndFetchTags }) => {
  const [newTag, setNewTag] = useState("");

  const handleCreateNewTag = (event) => {
    event.preventDefault();

    const tagObject = {
      label: newTag,
    };

    createNewTag(tagObject)
      .then(() => {
        setAndFetchTags();
        setNewTag("");
      })
      .catch((error) => console.error("Error adding tag", error));
  };

  return (
    <section>
      <h1>New Tag</h1>
      <form onSubmit={handleCreateNewTag}>
        <fieldset>
          <label>Tag Label</label>
          <input
            type="text"
            name="tag_label"
            value={newTag}
            onChange={(event) => setNewTag(event.target.value)}
            required
          />
        </fieldset>
        <button type="submit">Submit Tag</button>
      </form>
    </section>
  );
};
