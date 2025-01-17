import TimeLineTabs from '../../components/TimeLineTabs';
import PaginationContainer from '../../components/PaginationContainer';
import { getPosts } from '@/app/lib/actions';

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    let page;
    if (params.slug === null) {
      page = 1;
    } else {
      page = Number(params.slug);
    }
    const { timelinePosts, userId, timelinePostsCount } = await getPosts(page);

    const take = 5;
    const startIndex = (page - 1) * take + 1;
    const endIndex = Math.min(startIndex + take - 1, timelinePostsCount);

    return (
      <>
        <PaginationContainer page={page} timelinePostsCount={timelinePostsCount} />
        <TimeLineTabs
          forYouPosts={timelinePosts}
          userId={userId}
          page={page}
          pageCountTimelinePosts={timelinePosts.length}
          timelinePostsCount={timelinePostsCount}
          startIndex={startIndex}
          endIndex={endIndex}
        ></TimeLineTabs>
      </>
    );
  } catch (error) {
    return <div>Failed to Fetch Posts.</div>;
  }
}
