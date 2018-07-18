/**
 * @author Jannchie
 * @email jannchie@gmail.com
 * @create date 2018-05-02 13:17:10
 * @modify date 2018-07-18 09:27:10
 * @desc [description]
*/
//import * as d3 from 'd3';
//require("./stylesheet.css");

$('#inputfile').change(function () {
    $('#inputfile').attr('hidden', true);
    var r = new FileReader();
    r.readAsText(this.files[0],config.encoding);
    r.onload = function () {
        //读取完成后，数据保存在对象的result属性中
        var data = d3.csvParse(this.result);
        draw(data);
    }
});

function draw(data) {
    var color = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"
    ];
    var date = [];
    data.forEach(element => {
        if (date.indexOf(element["date"]) == -1) {
            date.push(element["date"]);
        }
    });

    var time = date.sort();
    // 选择颜色
    function getClass(d) {
        if (d.type != undefined) {
            return d.type;
        } 
        // 随机选色
        var r = d.name.charCodeAt();
        r = r % 25;
        r = Math.round(r);
        return color[r];
    }
    var showBottomMessage = true;
    var dividing_line = 0;
    var x_min = 0;
    var speed = 1;
    speed /= 3;
    var text_y = -50;
    var itemLabel = "榜首选手";
    var typeLabel = "所属协会";
    // 长度小于display_barInfo的bar将不显示barInfo
    var display_barInfo = 200;
    // 显示类型
    var use_type_info = true;
    // 使用计数器
    var use_counter = false;
    // 每个数据的间隔日期
    var step = 7;
    var format = '.0f';
    var left_margin = 200;
    var right_margin = 150
    var top_margin = 200
    var bottom_margin = 0
    var dateLabel_x = 1060
    var dateLabel_y = 750
    var top_x = 300
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

    const xValue = d => Number(d.value);
    const yValue = d => d.name;

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    const xAxisG = g.append('g')
        .attr('transform', `translate(0, ${innerHeight})`);
    const yAxisG = g.append('g');

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', innerWidth / 2)
        .attr('y', 100);

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

    function getCurrentData(date) {
        currentData = [];
        data.forEach(element => {
            if (element["date"] == date) {
                currentData.push(element);
            }
        });
        var tempSort = []

        var currentSort = currentData.sort(function (a, b) {
            return parseInt(b.value) - parseInt(a.value);
        });


        var a = d3.transition("2")
            .each(redraw)
        if (currentSort != tempSort) {
            a.each(change)
        }
        tempSort = currentSort;
    }

    if (showBottomMessage) {

        // 左1文字
        g.insert("text")
            .attr("class", "growth")
            .attr("x", 0)
            .attr("y", text_y).text(itemLabel);

        // 右1文字
        g.insert("text")
            .attr("class", "growth")
            .attr("x", 1000)
            .attr("y", text_y).text(typeLabel);
        // 榜首日期计数
        if (use_counter == true) {
            var days = g.insert("text")
                .attr("class", "days")
                .attr("x", 1300)
                .attr("y", text_y);
        }

        // 显示榜首type
        if (use_type_info == true) {
            var top_type = g.insert("text")
                .attr("class", "days")
                .attr("x", 1300)
                .attr("y", text_y);
        }
    }

    var lastname;
    var counter = {
        "value": 1
    };


    function redraw() {
        yScale
            .domain(currentData.map(yValue).reverse())
            .range([innerHeight, 0]);
        // x轴范围
        // xScale.domain([2 * d3.min(currentData, xValue) - d3.max(currentData, xValue), d3.max(currentData, xValue) + 100]).range([0, innerWidth]);
        xScale.domain([0, d3.max(currentData, xValue) + 100]).range([0, innerWidth]);

        dateLabel.text(currentdate);

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
            });
            if (use_counter == true) {
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
                    });
            }
            if (use_type_info == true) {
                // 榜首type更新
                top_type.data(currentData).text(function (d) {
                    return d.type
                });
            }
        }


        var barEnter = bar.enter().insert("g", ".axis")
            .attr("class", "bar")
            .attr("transform", function (d) {
                return "translate(0," + yScale(yValue(d)) + ")";
            });
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
                    var i = d3.interpolate(self.textContent, Number(d.value)),
                        prec = (Number(d.value) + "").split("."),
                        round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;
                    return function (t) {
                        self.textContent = d3.format(format)(Math.round(i(t) * round) / round);
                    };
                }).attr(
                "fill-opacity", 1).attr("y", 0)
            .attr("class", function (d) {
                return "value " + getClass(d)
            }).attr("x", d => xScale(xValue(d)) + 10)
            .attr("y", 22);


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
                    return d.type+"-"+d.name
                    //return d.barInfo
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
            });



        //.attr("text-anchor", "end").text(d => GDPFormater(Number(d.value) ));
        var barUpdate = bar.transition("2").duration(2990 * speed).ease(d3.easeLinear);

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
            var i = d3.interpolate((self.textContent), Number(d.value)),
                prec = (Number(d.value) + "").split("."),
                round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;
            return function (t) {
                self.textContent = d3.format(format)(Math.round(i(t) * round) / round);
            };
        }).duration(2990 * speed).attr("x", d => xScale(xValue(d)) + 10)


        var barExit = bar.exit().attr("fill-opacity", 1).transition().duration(2500 * speed)

        barExit.attr("transform", function (d) {
                var temp = parseInt(this.attributes["transform"].value.substr(12, 4))
                if (temp < dividing_line) {
                    return "translate(0," + temp - 5 + ")";
                }
                return "translate(0," + 800 + ")";
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

    getCurrentData(time[0]);

    var i = 1;
    var inter = setInterval(function next() {
        currentdate = time[i];
        getCurrentData(time[i]);
        i++;
        if (i >= time.length) {
            window.clearInterval(inter);
        }
    }, 3000 * speed);
}