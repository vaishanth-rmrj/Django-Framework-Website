
path:

GET method
/api/account/profile/active/ ------>for getting authenticated profile info

if not authenticated
{
    "user": "Anonymous"
}
profile/fetch/dp/(username) ------>for getting profile picture
json:
{
    "username": "vluth98",
    "image": "/media/profilePic/user1.jpg"
}

/api/account/profile/(basic)/(username) ------>for getting basic profile info
/api/account/profile/(detail)/(username) ------>for getting detailed profile info
/api/account/profile/request/(option)/(id) ------>for friend request accept or reject
option : "accept" or "reject"
/api/account/profile/bookmark/(idya_id)------>for bookmarking an idya
/api/account/profile/bookmarked/idyas ------>for fetching all the bookmarked idyas of the user
profile/friend/list/(username) ------>for fetching all the friend list
idya/list/(username)/ ------>for fetching all idyas user has posted

POST method
/api/account/profile/setup/ ------>for setting up profile with extra details
/api/account/profile/request/ ------>for friend request
json
{
    "requested": "id"
}

