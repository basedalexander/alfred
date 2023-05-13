
compositions = {
    "Find me people talking about longevity": [
        semanticSearchPostTable('longetivity',["profileId"])
    ],
    "Find people that write about solidity developement": [
        semanticSearchPostTable('solidity developement',["profileId"])
    ],
    "Find people that follow me, that talk about longevity": [
        semanticSearchPostTable('longetivity',["profile_id"]),
        filterFollowersOfProfileId(userId, profileIds)
    ],
    "Give a quick summary about a person based on lens handle": [
        getProfileInformationFromLens(profileId, informationRequired),
        summarizeProfile(profileData)
    ]

}









# Find all posts that contain videos and talk about space tech.
# Who are my weekly active followr
# Who are not collecting my posts.
# Who collected more that one post
# WHo coleected more than 5 mosts
# Top 10 most engaging followers
# Weekly followers who are not collecting my posts.
# Find publication (by author, by keyword, by topic)
# Find find people in domain data science that I follow
# Find posts that talk about longevity and have more that 2 replies and 1 like
# Find people writing about defi and have more than 500 followers
# Find top 10 investors by followers who talk about network state
