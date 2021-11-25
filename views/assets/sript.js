//js select and manipulation

// d3.select();
// d3.selectAll();

// d3.select('h1').style('color', 'blue').attr('class', 'heading').text('Konichiwa World')

// d3.select('body').append('p').text("Lorem Ispum")
// d3.select('body').append('p').text("Lorem Ispum")
// d3.select('body').append('p').text("Lorem Ispum")

// d3.selectAll('p').style("color", 'orange')

// data binding
// var dataset= [1,2,3,4,5,6,7]

// d3.select('body').selectAll('p').data(dataset).enter().append('p')
// // .text("d3 is kawai")
// .text(function(d) {return d;})

//bar chart

var dataset =[80.40,50,60,30,70,80,90]
var svgwidth =500, svgheight=300, barpadding=5;
var barwidth= (svgwidth/dataset.length)

var svg = d3.select('svg')
    .attr("width", svgwidth)
    .attr("height", svgheight);
    //scale 
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, svgheight]);
    
var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function(d){
        return svgheight - yScale(d);
    })
    .attr("height", function(d){
        return yScale(d);
    })
    .attr("width", barwidth-barpadding)
    .attr("transform", function(d,i){
        var translate = [barwidth*i,0];
        return "translate("+translate+")";
    });

//label
var text = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append('text')
    .text(function(d){
        return d;
    })
    .attr('y', function(d,i){
        return svgheight -yScale(d) -2;
    })
    .attr('x',function(d,i){
        return barwidth*i;
    })
    .attr('fill','red')
    const data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
    var config = new Chart ("config" ,{
        type: 'doughnut',
        data: data,
      });
     