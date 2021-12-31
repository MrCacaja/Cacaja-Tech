import { IonItem, IonList, IonPage } from "@ionic/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Post } from "../../models";
import { fetchPosts, selectAllPosts } from "./PostsSlice";

export const PostListPage: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector((state: RootState) => state.posts.status);

  useEffect(() => {
    async function loadPosts() {
      if (postsStatus === "idle") dispatch(fetchPosts());
    }

    loadPosts();
  }, []);

  return (
    <IonPage>
      <IonList>
        {posts.map((post: Post) => (
          <IonItem key={post.id}>
            <p>{post.title}</p>
          </IonItem>
        ))}
      </IonList>
    </IonPage>
  );
};
