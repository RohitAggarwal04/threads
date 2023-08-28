import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../card/ThreadCard";

interface Props {
  currentUserId: string;
  accountType: string;
  accountId: string;
}
const ThreadsTab = async ({ currentUserId, accountType, accountId }: Props) => {
  let result = await fetchUserPosts(accountId);
  if (!result) {
    redirect("/");
  }
  console.log(result);

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          content={thread.text}
          community={thread.community}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          parentId={thread.parentId}
          comments={thread.children}
          createdAt={thread.createdAt}
        />
      ))}
    </section>
  );
};
export default ThreadsTab;
