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
        <section className="card p-4 m-3">
            <h1 className="title is-5 m-2">New Tag</h1>
            <form onSubmit={handleCreateNewTag}>
                <fieldset className="m-2">
                    <label className="m-1">Tag Label</label>
                    <input
                        type="text"
                        name="tag_label"
                        value={newTag}
                        onChange={(event) => setNewTag(event.target.value)}
                        required
                    />
                </fieldset>
                <button type="submit" className="button is-success m-3">
                    Submit Tag
                </button>
            </form>
        </section>
    );
};
