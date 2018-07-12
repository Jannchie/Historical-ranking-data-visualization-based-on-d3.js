import * as d3 from 'd3'
// 选择颜色
var color = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"
];

function getClass(d) {
    if (d.name == "江波涛") {
        return "江波涛";
    } else if (d.name == "英雄联盟") return "英雄联盟";
    else if (d.name == "东方PROJECT") return "东方PROJECT";
    else if (d.name == "地下城与勇士") return "地下城与勇士";
    else if (d.name == "守望先锋") return "守望先锋";
    else if (d.name == "星际争霸") return "星际争霸";
    else if (d.name == "魔兽争霸") return "魔兽争霸";
    else if (d.name == "魔兽世界") return "魔兽世界";
    else if (d.name == "Dota") return "Dota";
    else if (d.name == "绝地求生") return "绝地求生";
    else if (d.name == "阴阳师") return "阴阳师";
    else if (d.name == "三国杀") return "三国杀";
    else if (d.name == "剑网三") return "剑网三";
    else if (d.name == "求生之路") return "求生之路";
    else if (d.name == "怪物猎人") return "怪物猎人";
    else if (d.name == "王者荣耀") return "王者荣耀";
    else if (d.name == "GTA") return "GTA";
    else if (d.name == "300英雄") return "三百英雄";
    else if (d.name == "崩坏学园") return "崩坏学园";
    else if (d.name == "FGO") return "FGO";
    else if (d.name == "CS:GO") return "CS";
    else {
        // 随机选色
        var r = d.name.charCodeAt();
        r = r % 25;
        r = Math.round(r);
        return color[r];
    }
}
var showBottomMessage = true;
var dividing_line = 300;
var x_min = 0;
var speed = 1;
speed /= 3;
var text_y = -50;
var itemLabel = "榜首游戏";
var typeLabel = "持续天数";

// 长度小于display_barInfo的bar将不显示barInfo
var display_barInfo = 200;

// 每个数据的间隔日期
var step = 7;
var format = '.0f';
var growth = [{}];
let range = (start, end) => new Array(end - start).fill(start).map((el, i) => start + i);
var left_margin = 150;
var right_margin = 150
var top_margin = 200
var bottom_margin = 0
var dateLabel_x = 1060
var dateLabel_y = 750
var top_x = 400
const margin = {
    left: left_margin,
    right: right_margin,
    top: top_margin,
    bottom: bottom_margin
};
var currentdate = time[0].toString();
var currentData = [];
var lastname;
const svg = d3.select('svg');
const width = svg.attr('width');
const height = svg.attr('height');
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom - 50;

const xValue = d => d.value;
const yValue = d => d.name;
const name = d => d.name;

const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
const xAxisG = g.append('g')
    .attr('transform', `translate(0, ${innerHeight})`);
const yAxisG = g.append('g');

xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', 100)


// const xScale = d3.scalePow().exponent(.5);
const xScale = d3.scaleLinear()
const yScale = d3.scaleBand()
    .paddingInner(0.3)
    .paddingOuter(0);

const xTicks = 10;
const xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(xTicks)
    .tickPadding(20)
    .tickFormat(d => d)
    .tickSize(-innerHeight);

const yAxis = d3.axisLeft()
    .scale(yScale)
    .tickPadding(5)
    .tickSize(-innerWidth);

var dateLabel = g.insert("text")
    .data(currentdate)
    .attr("class", "dateLabel")
    .attr("x", dateLabel_x)
    .attr("y", dateLabel_y)
    .text(currentdate);

var topLabel = g.insert("text")
    .attr("class", "topLabel")
    .attr("x", top_x)
    .attr("y", text_y)

var growthLabel = g.insert("text")
    .attr("class", "growth")
    .attr("x", 350)
    .attr("y", text_y)






function getCurrentData(date) {
    var c = [];
    data.forEach(element => {
        if (element["date"] == date) {
            c.push(element);
        }
    });
    var tempSort = []

    var currentSort = c.sort(function (a, b) {
        return parseInt(b.value) - parseInt(a.value);
    });


    var a = d3.transition("2")
        .each(redraw)
    if (currentSort != tempSort) {
        a.each(change)
    }
    tempSort = currentSort;

    currentData = c;

}
if (showBottomMessage) {

    // 左1文字
    g.insert("text")
        .attr("class", "growth")
        .attr("x", 0)
        .attr("y", text_y).text(itemLabel)

    // 右1文字
    g.insert("text")
        .attr("class", "growth")
        .attr("x", 1100)
        .attr("y", text_y).text(typeLabel)
    // 榜首日期计数
    var days = g.insert("text")
        .attr("class", "days")
        .attr("x", 1400)
        .attr("y", text_y)
}

var lastname
var counter = {
    "value": 1
}
var currentGrowth = g.insert("text")
    .attr("class", "growth")
    .attr("x", 800)
    .attr("y", text_y)

function redraw() {
    yScale
        .domain(currentData.map(yValue).reverse())
        .range([innerHeight, 0]);
    // x轴最小值定义
    xScale
        .domain([0, d3.max(currentData, xValue)])
        .range([0, innerWidth])

    dateLabel.text(currentdate)

    xAxisG.transition(g).duration(3000 * speed).ease(d3.easeLinear).call(xAxis);
    yAxisG.transition(g).duration(3000 * speed).ease(d3.easeLinear).call(yAxis);

    yAxisG.selectAll('.tick').remove();

    var bar = g.selectAll(".bar")
        .data(currentData, function (d) {
            return d.name;
        });

    if (showBottomMessage) {
        // 榜首文字
        topLabel.data(currentData).text(function (d) {
            if (lastname == d.name) {
                counter.value = counter.value + step;
            } else {
                counter.value = 1;
            }
            lastname = d.name
            return d.name;
        })

        // 榜首持续时间更新
        days.data(currentData).transition().duration(3000 * speed).ease(d3.easeLinear).tween(
            "text",
            function (d) {
                var self = this;
                var i = d3.interpolate(self.textContent, counter.value),
                    prec = (counter.value + "").split("."),
                    round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;
                return function (t) {
                    self.textContent = d3.format(format)(Math.round(i(t) * round) / round);
                };
            })
    }







    var barEnter = bar.enter().insert("g", ".axis")
        .attr("class", "bar")
        .attr("transform", function (d) {
            return "translate(0," + yScale(yValue(d)) + ")";
        })
    barEnter.append("g").attr("class", function (d) {
        return getClass(d)
    })

    barEnter.append("rect").attr("fill-opacity", 0)
        .attr("height", 26).attr("y", 50)
        .transition("a")
        .attr("class", d => getClass(d))
        .delay(500 * speed)
        .duration(2490 * speed)
        .attr("y", 0).attr(
            "width", d =>
            xScale(xValue(d)))
        .attr("fill-opacity", 1);

    barEnter.append("text").attr("y", 50).attr("fill-opacity", 0).transition("2").delay(500 * speed).duration(
            2490 * speed)
        .attr(
            "fill-opacity", 1).attr("y", 0)
        .attr("class", function (d) {
            return "label " + getClass(d)
        })
        .attr("x", -5)
        .attr("y", 20)
        .attr("text-anchor", "end")
        .text(function (d) {
            return d.name;
        });

    barEnter.append("text").attr("x", 0).attr("y", 50).attr("fill-opacity", 0).transition()
        .delay(500 * speed).duration(2490 * speed).tween(
            "text",
            function (d) {
                var self = this;
                var i = d3.interpolate(self.textContent, d.value),
                    prec = (d.value + "").split("."),
                    round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;
                return function (t) {
                    self.textContent = d3.format(format)(Math.round(i(t) * round) / round);
                };
            }).attr(
            "fill-opacity", 1).attr("y", 0)
        .attr("class", function (d) {
            return "value " + getClass(d)
        }).attr("x", d => xScale(xValue(d)) + 10)
        .attr("y", 22)


    // bar上文字
    barEnter.append("text").attr("x", 0)
        .attr("stroke", function (d) {
            return $("." + getClass(d)).css("fill");
        })
        .attr("class", function (d) {
            return "barInfo"
        })
        .attr("y", 50).attr("stroke-width", "0px").attr("fill-opacity",
            0).transition()
        .delay(500 * speed).duration(2490 * speed).text(
            function (d) {
                return d.name
                // return d.name + "/" + d.name
            }).attr("x", d => xScale(xValue(d)) - 10).attr(
            "fill-opacity",
            function (d) {
                if (xScale(xValue(d)) - 10 < display_barInfo) {
                    return 0;
                }
                return 1;
            })
        .attr("y", 2)
        .attr("dy", ".5em")
        .attr("text-anchor", "end")
        .attr("stroke-width", function (d) {
            if (xScale(xValue(d)) - 10 < display_barInfo) {
                return "0px";
            }
            return "1px";
        })



    //.attr("text-anchor", "end").text(d => GDPFormater(d.value));
    var barUpdate = bar.transition("2").duration(2990 * speed).ease(d3.easeLinear)

    barUpdate.select("rect")
        .attr("width", d => xScale(xValue(d)))
    barUpdate.select(".barInfo").attr("x", d => xScale(xValue(d)) - 10).attr(
        "fill-opacity",
        function (d) {
            if (xScale(xValue(d)) - 10 < display_barInfo) {
                return 0;
            }
            return 1;
        }
    ).attr("stroke-width", function (d) {
        if (xScale(xValue(d)) - 10 < display_barInfo) {
            return "0px";
        }
        return "1px";
    })

    barUpdate.select(".value").tween("text", function (d) {
        var self = this;
        var i = d3.interpolate((self.textContent), d.value),
            prec = (d.value + "").split("."),
            round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;
        return function (t) {
            self.textContent = d3.format(format)(Math.round(i(t) * round) / round);
        };
    }).duration(2990 * speed).attr("x", d => xScale(xValue(d)) + 10)


    var barExit = bar.exit().attr("fill-opacity", 1).transition().duration(2500 * speed)

    barExit.attr("transform", function (d) {
            temp = parseInt(this.attributes["transform"].value.substr(12, 4))
            if (temp < dividing_line) {
                y = temp - 40;
                return "translate(50," + y + ")";
            }
            y = temp + 40;
            return "translate(-50," + y + ")";
        })
        .remove().attr("fill-opacity", 0);
    barExit.select("rect").attr("fill-opacity", 0)
    barExit.select(".value").attr("fill-opacity", 0)
    barExit.select(".barInfo").attr("fill-opacity", 0).attr("stroke-width", function (d) {
        return "0px";
    })
    barExit.select(".label").attr("fill-opacity", 0)

}


function change() {
    var bar = g.selectAll(".bar")
        .data(currentData, function (d) {
            return d.name;
        });
    var barUpdate = bar.transition("1").delay(500 * speed).duration(2490 * speed)
    if (barUpdate.attr("transform") != "translate(0," + function (d) {
            return "translate(0," + yScale(yValue(d)) + ")";
        }) {
        barUpdate.attr("transform", function (d) {
            return "translate(0," + yScale(yValue(d)) + ")";
        })
    }

}


var date = time[0];
getCurrentData(date);

var i = 1;
var inter = setInterval(function next() {
    currentdate = time[i];
    getCurrentData(time[i]);
    i++;
    if (i >= time.length) {
        window.clearInterval(inter);
    }
}, 3000 * speed);
