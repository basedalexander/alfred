
compositions = {
    "Find me people talking about longevity": [
        semanticSearchPostTable('longetivity',["profileId"])
    ],
    "Find people that follow me, that talk about longevity": [
        semanticSearchPostTable('longetivity',["profile_id"]),
        filterFollowersOfProfileId(userId, profileIds)
    ]

}








# Who are my weekly active followr
    # Get all my followers
    # Find their activity (likes, comments etc)
    # Keep only if they were active last week

# Weekly followers
    # 

# Who are not collecting my posts.
# Who collected more that one post
# WHo coleected more than 5 mosts
# Top 10 most engaging followers
# Weekly followers who are not collecting my posts.

# Find publication (by author, by keyword, by topic)
# Find find people in domain data science that I follow
# Find posts that talk about longevity and have more that 2 replies and 1 like
# Find people that write about solidity developement
# Find people writing about defi and have more than 500 followers
# Give a quick summary about a person based on lens handle.
# Find top 10 investors by followerswho talk about network state
# Find all posts that contain video and talk about space tech.
