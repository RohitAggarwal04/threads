import ThreadCard from "@/components/card/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";
const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  const thread = await fetchThreadById(params.id);
  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || " "}
          content={thread.text}
          community={thread.community}
          author={thread.author}
          parentId={thread.parentId}
          comments={thread.children}
          createdAt={thread.createdAt}
        />
      </div>
      <div className="mt-7 ">
        {" "}
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />{" "}
      </div>
      <div className="mt-10 ">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={childItem?.id || " "}
            content={childItem.text}
            community={childItem.community}
            author={childItem.author}
            parentId={childItem.parentId}
            comments={childItem.children}
            createdAt={childItem.createdAt}
            iscomment
          />
        ))}
      </div>
    </section>
  );
};
export default Page;
