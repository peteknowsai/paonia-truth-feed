/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as addBrunnerContext from "../addBrunnerContext.js";
import type * as addStory from "../addStory.js";
import type * as clearAllStories from "../clearAllStories.js";
import type * as comments from "../comments.js";
import type * as deleteStory from "../deleteStory.js";
import type * as http from "../http.js";
import type * as initiativeVotes from "../initiativeVotes.js";
import type * as posts from "../posts.js";
import type * as removeMockStories from "../removeMockStories.js";
import type * as seed from "../seed.js";
import type * as updateFactChecked from "../updateFactChecked.js";
import type * as updatePost from "../updatePost.js";
import type * as users from "../users.js";
import type * as votes from "../votes.js";

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
  clearAllStories: typeof clearAllStories;
  comments: typeof comments;
  deleteStory: typeof deleteStory;
  http: typeof http;
  initiativeVotes: typeof initiativeVotes;
  posts: typeof posts;
  removeMockStories: typeof removeMockStories;
  seed: typeof seed;
  updateFactChecked: typeof updateFactChecked;
  updatePost: typeof updatePost;
  users: typeof users;
  votes: typeof votes;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
