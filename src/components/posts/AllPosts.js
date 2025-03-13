import { useState, useEffect } from "react";
import { getAllAuthors } from "../../services/postService";
import { Link } from "react-router-dom";

export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [error, setError] = useState(null);

  // Fetch posts, filtering by author if selected
  useEffect(() => {
    fetch(
      `http://localhost:8088/posts${
        selectedAuthor ? `?user_id=${selectedAuthor}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => setAllPosts(data))
      .catch((error) => console.error("Error fetching posts", error));
  }, [selectedAuthor]); // Re-fetch posts when author selection changes

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:8088/categories")
      .then((response) => response.json())
      .then((data) => setAllCategories(data))
      .catch((error) => console.error("Error fetching categories", error));
  }, []);

  // Fetch authors
  useEffect(() => {
    getAllAuthors()
      .then((data) => setAllAuthors(data))
      .catch((error) => console.error("Error fetching authors", error));
  }, []);

  // Handle category selection
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Handle author selection
  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };

  // Filter posts by category & author
  const filteredPosts = allPosts.filter((post) =>
    selectedCategory ? post.category_id === parseInt(selectedCategory) : true
  );

  return (
    <section>
      <h1 className="title is-3 has-text-centered">All Posts</h1>

      <div className="m-3 level">
        <div className="level-item">
          <label className="mr-2">Filter by Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="level-item">
          <label className="mr-2">Filter by Author:</label>
          <select value={selectedAuthor} onChange={handleAuthorChange}>
            <option value="">All Authors</option>
            {allAuthors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.first_name} {author.last_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid">
        <table className="table is-bordered is-striped is-hoverable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </td>
                  <td>
                    {post.first_name} {post.last_name}
                  </td>
                  <td>{post.category_label}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="has-text-centered">
                  No posts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
