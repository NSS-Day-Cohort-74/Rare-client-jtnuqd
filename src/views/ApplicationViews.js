import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AllPosts } from "../components/posts/AllPosts"
import { AllTags } from "../components/tags/AllTags"
import { AllCategories } from "../components/categories/AllCategories"
import { PostDetails } from "../components/posts/PostDetails"
import { NewPost } from "../components/posts/NewPost"
import { MyPosts } from "../components/posts/MyPosts"
import { EditPost } from "../components/posts/EditPost"
import { UserList } from "../components/users/AllUsers"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/posts" >
            <Route index element={<AllPosts />} />
            <Route path=":postId" element={<PostDetails />} />
        </Route>
        <Route path="/tags" element={<AllTags />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/newPost" element={<NewPost token={token} />} />
        <Route path="/my-posts" element={<MyPosts token={token} />} />
        <Route path="/edit">
          <Route path="post/:postId" element={<EditPost />} />
        </Route>

      </Route>
    </Routes>
  </>
}
