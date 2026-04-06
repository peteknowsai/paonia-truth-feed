/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as addBrunnerContext from "../addBrunnerContext.js";
import type * as addStory from "../addStory.js";
import type * as bombs from "../bombs.js";
import type * as clearAllStories from "../clearAllStories.js";
import type * as comments from "../comments.js";
import type * as coraTracking from "../coraTracking.js";
import type * as deleteStory from "../deleteStory.js";
import type * as feedback from "../feedback.js";
import type * as http from "../http.js";
import type * as initiativeComments from "../initiativeComments.js";
import type * as initiativeVotes from "../initiativeVotes.js";
import type * as migrations_addDatesToPosts from "../migrations/addDatesToPosts.js";
import type * as pageComments from "../pageComments.js";
import type * as pageVotes from "../pageVotes.js";
import type * as posts from "../posts.js";
import type * as resend from "../resend.js";
import type * as updateFactChecked from "../updateFactChecked.js";
import type * as updatePost from "../updatePost.js";
import type * as updatePostContent from "../updatePostContent.js";
import type * as users from "../users.js";
import type * as votes from "../votes.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  addBrunnerContext: typeof addBrunnerContext;
  addStory: typeof addStory;
  bombs: typeof bombs;
  clearAllStories: typeof clearAllStories;
  comments: typeof comments;
  coraTracking: typeof coraTracking;
  deleteStory: typeof deleteStory;
  feedback: typeof feedback;
  http: typeof http;
  initiativeComments: typeof initiativeComments;
  initiativeVotes: typeof initiativeVotes;
  "migrations/addDatesToPosts": typeof migrations_addDatesToPosts;
  pageComments: typeof pageComments;
  pageVotes: typeof pageVotes;
  posts: typeof posts;
  resend: typeof resend;
  updateFactChecked: typeof updateFactChecked;
  updatePost: typeof updatePost;
  updatePostContent: typeof updatePostContent;
  users: typeof users;
  votes: typeof votes;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
