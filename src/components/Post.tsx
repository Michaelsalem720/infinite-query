import { FC } from "react";
export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface PostProps {
  post: Posts;
  innerRef?: (node?: Element | null | undefined) => void;
}
const Post: FC<PostProps> = ({ post, innerRef }) => {
  return <li ref={innerRef}>{post.title}</li>;
};

export default Post;
