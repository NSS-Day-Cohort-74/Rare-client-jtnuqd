export const createNewTag = async (submissionObject) => {
  await fetch("http://localhost:8088/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submissionObject),
  });
};

export const getPostTags = (postId) => {
  return fetch(`http://localhost:8088/tags/posts/${postId}`).then((response) =>
    response.json()
  );
};

export const deletePostTags = (postId) => {
  return fetch(`http://localhost:8088/tags/posts/${postId}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

export const updatePostTags = (postId, tagIds) => {
  return fetch(`http://localhost:8088/tags/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tag_ids: tagIds }),
  }).then((response) => response.json());
};
