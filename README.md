# Elbows

Social network platform inpired by Instagram. Welcome to Elbows where you can "rub elbows" with friends and family from a safe social distance.

Visit the live site [here](https://elbowsapp.herokuapp.com/).

# Key Features

- Users can create accounts, login, and logout. 
- Users can create posts with an image and text.
- Users can view, like, and leave comments on posts created by friends.
- Users can delete their own posts and comments.
- Users can follow and unfollow other users.
- Users can like and unlike posts.


# Technology Used

-   Express
-   Sequelize
-   Node.js
-   Postgres
-   D3js
-   Bcryptjs
-   Pug
-  JWT
-  Cors
- JavaScript, HTML and CSS

# Dates in JS

After fetching the historical data from the Yahoo finance API we faced an issue with the array of objects we were getting back.

    const data = [{"date":"2020-04-21T13:30:00.000Z",  "value": 2328.1201171875}]

 Even though the format was being received as a date value in ISO format it was not instanciated as a date object recognizable by  JavaScript. This caused us trouble when plotting the graph since the value recieved was not a number capable of creating the graph line in the X axis.
The following snippet shows how we solved this issue by mapping over the array of objects and creating an date instance fro each value of date:

    const moddedData = data.map((element) => { 
	    element.date  =  new Date(element.date);
	    return element
	    });

 # Plotting the graph 
Trying to recreate the look and behavior of the graph in the spirit of Robinhood's app was another challenge we faced during  the making of Rokinhood. The approach to re-create the graph was made through the use of the **D3.js** JavaScript library  which allowed us to manipulate the data and bring it to life using HTML, SVG, and CSS. 
Creating the tooltip that allows to keep track of the date/value while hovering over the graph was done by finding the closest X index of the mouse movement (bisecting the data) contained inside  the SVG  (rectangle) area which let us recover the mouse position and coordenates we needed  :

    var bisect = d3.bisector(function (d) {
    return d.date;
    }).left;
    function  mousemove() { 
	    var x0 = x.invert(d3.mouse(this)[0]);
	    var i =  bisect(data, x0,  1);
	    selectedData = data[i];
	    var newDate = selectedData.date.toDateString();
	    var newVal = (Math.round(selectedData.value  *  100) /  100).toFixed(2);
	    focus.attr("cx",  x(selectedData.date)).attr("cy",y(selectedData.value));
	    focusText
			.html(newDate)
		    .attr("x",  x(selectedData.date) +  -70)
		    .attr("y",  y(selectedData.value) +  -40);
	    var diffVal = newVal - data[0].value; 
	    diffVal = (Math.round(diffVal *  100) /  100).toFixed(2);
	    var diffPercentage = (newVal *  100) / data[0].value  -  100;
	    d3.select(".portfolio__header").html(`<span>\$${newVal}</span>`);
	    d3.select(".portfolio__header-change").html(<span>\$${diffVal}(${diffPercentage.toFixed(2)}%)</span>`);
    }
The result:

[![graphd3.png](https://i.postimg.cc/JnxLWvPc/graphd3.png)](https://postimg.cc/ZBWg87kC)

 # The watchlist
Creating the watchlist and aligning symbols, graphs and prices were done by the implementation of multiple calls to the Yahoo Finance API and formatted  with flexbox in CSS. 
The API only allows for 5 calls/seconds. We were able to overpass this issue by implementing setTimeout functions that delayed the multiple calls by a second. Finally we were able   to generate the list of stocks owed and watchlist from the portfolio page.

[![Stocks.png](https://i.postimg.cc/KYK6W4Mb/Stocks.png)](https://postimg.cc/8FSXJp4X)

# Planned Feature Components

 - Improvements in transaction's functionalities
 - Funding account from dashboard
 - Add collection tags to categorize companies
