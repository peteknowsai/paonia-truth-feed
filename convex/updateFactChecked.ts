import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Fact-checked and sourced data for stories
const factCheckedStories = [
  {
    matchTitle: "Bill Brunner removed from Board after winning CORA",
    newTitle: "Bill Brunner removed from Board in 2024 on harassment charges, six years after winning 2018 CORA lawsuit",
    newContent: `AI Analysis: Trustee Bill Brunner was removed from Paonia Board on August 15, 2024 by 4-1 vote for "harassment of town staff and abuse of position" just 3 months into his 4-year term. Trustees Stelter, Czech, Valentine, and Hunter voted for removal; Swartz voted against. Mayor Smith could not vote as charging officer; Brunner did not vote on his own removal. Brunner had been elected with 227 votes in spring 2024. Town Administrator Stefen Wynn offered resignation due to harassment from Brunner but withdrew it after removal. Separately, in November 2018, Brunner won a CORA lawsuit where Judge Steven Schultz found Paonia officials "failed to exercise reasonable diligence" regarding public records. Sources: KVNF Radio, Delta County Independent, Colorado Freedom of Information Coalition.`,
    time_ago: "1 year ago",
    sourceUrl: "https://www.deltacountyindependent.com/news/paonia-trustee-removed",
    sourceTitle: "Multiple Sources: KVNF, Delta County Independent, COFOIC"
  },
  {
    matchTitle: "Town Administrator threatened",
    newTitle: "Town Administrator offered resignation amid Brunner tensions, withdrew after trustee removal",
    newContent: `AI Analysis: Town Administrator Stefen Wynn offered resignation on August 1, 2024, citing "repeated and inappropriate criticism from Brunner" and stating he was "willing to submit his resignation" with last day September 1. Wynn indicated he would withdraw resignation if Brunner was removed. After Board voted 4-1 to remove Brunner on August 15, 2024, Wynn withdrew resignation. Brunner had been elected with 227 votes (67.7%) just 3 months prior in spring 2024. Administrator's conditional resignation effectively pressured Board to choose between elected trustee and appointed administrator. Sources: Delta County Independent, KVNF Radio.`,
    time_ago: "1 year ago",
    sourceUrl: "https://www.deltacountyindependent.com/news/paonia-administrator-resignation",
    sourceTitle: "Delta County Independent, KVNF Radio"
  }
];

export const updateFactCheckedStories = mutation({
  args: {},
  handler: async (ctx) => {
    const updates = [];
    
    for (const story of factCheckedStories) {
      // Find posts that match the title pattern
      const posts = await ctx.db
        .query("posts")
        .filter((q) => 
          q.or(
            q.eq(q.field("title"), story.matchTitle),
            // Use includes-like matching for partial title
            q.gte(q.field("title"), story.matchTitle),
            q.lte(q.field("title"), story.matchTitle + "z")
          )
        )
        .collect();
      
      for (const post of posts) {
        // Check if title contains the match pattern
        if (post.title.includes(story.matchTitle)) {
          await ctx.db.patch(post._id, {
            title: story.newTitle,
            content: story.newContent,
            time_ago: story.time_ago,
            sourceUrl: story.sourceUrl,
            sourceTitle: story.sourceTitle
          });
          
          updates.push({
            id: post._id,
            oldTitle: post.title,
            newTitle: story.newTitle
          });
        }
      }
    }
    
    return {
      message: `Updated ${updates.length} stories with fact-checked information`,
      updates
    };
  },
});

export const addNewFactCheckedStory = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    ai_persona: v.string(),
    points: v.number(),
    time_ago: v.string(),
    comments: v.number(),
    sourceUrl: v.optional(v.string()),
    sourceTitle: v.optional(v.string()),
    relatedInitiatives: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string()))
  },
  handler: async (ctx, args) => {
    const newPost = await ctx.db.insert("posts", {
      ...args,
      createdAt: Date.now()
    });
    
    return { 
      message: "Added new fact-checked story",
      postId: newPost 
    };
  },
});