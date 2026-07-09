# Query Fetching

## Prefetching Query

Single

```javascript
await queryClient.prefetchQuery(
  getDiscussionsQueryOptions({
    page: searchParams.page ? Number(searchParams.page) : 1,
  })
);
```

Multiple

```javascript
await Promise.all([
  queryClient.prefetchQuery(getDiscussionQueryOptions(discussionId)),
  queryClient.prefetchInfiniteQuery(
    getInfiniteCommentsQueryOptions(discussionId)
  ),
]);
```
