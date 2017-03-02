function ticker() {
	$("#feeds").animate({
	scrollTop:$("#feeds")[0].scrollHeight - $("#feeds").height()
	},3000)
}

$.getJSON("TwitterTweets17.json", function(data) {
	$.each(data, function( count, value ) {
		var tweet;
		var name;
		var screenName;
		var time;
		var profileImage;
		var retweetCount;
		var favoriteCount;
				  
		$.each( data[count], function( key, val ) {
			if (key == "created_at") {
				time = new Date(val);
			}
			if (key == "text") {
				tweet = val;
			}
			if (key == "retweet_count") {
				retweetCount = val;
			}
			if (key == "favorite_count") {
				favoriteCount = val;
			}
			if (key == "user" || key == "entities") {
				$.each( val, function( key2, val2) {
					if (key2 == "name") {
						name = val2;
					}
					if (key2 == "screen_name") {
						screenName = val2;
					}
					if (key2 == "profile_image_url") {
						profileImage = val2;
					}				
				});
			}	
		});

	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var n = monthNames[time.getMonth()];
				  	  
	var html = "<li><ul class=\"tweets\">";
	html += "<li class=\"profileImage\"><img class=\"images\" src=\"" + profileImage + "\"></li>";
	html += "<li><ul class=\"user\">";
	html += "<li class=\"name\">" + name + "</li>";
	html += "<li class=\"screenName\">@" + screenName + "</li></ul></li>";
	
	html += "<li class=\"tweet\">" + tweet + "</li>";
	html += "<li><ul class=\"tweetFooter\"><li class=\"time\">" + n + " " + time.getDay() + "</li>";
					
	html += "<li> " + "Retweets:" + retweetCount;
	html += "<li> " + "Favorites:" + favoriteCount;
	html += "</ul></li>";
				  
	$("#feeds").append(html);
	ticker();
	
	});
});