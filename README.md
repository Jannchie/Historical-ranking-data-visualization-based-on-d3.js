<h1 align="center">
动态排名数据可视化
</h1>

<h3 align="center">将历史数据排名转化为动态柱状图图表</h3>


  

<p align="center">
  <a href="readme-en.md">English</a>
</p>

<p align="center">
    <a href="https://github.com/Jannchie/Historical-ranking-data-visualization-based-on-d3.js/issues" style="text-decoration:none">
        <img src="https://img.shields.io/github/issues/Jannchie/Historical-ranking-data-visualization-based-on-d3.js.svg" alt="GitHub issues"/>
    </a>
    <a href="https://github.com/Jannchie/Historical-ranking-data-visualization-based-on-d3.js/stargazers" style="text-decoration:none" >
        <img src="https://img.shields.io/github/stars/Jannchie/Historical-ranking-data-visualization-based-on-d3.js.svg" alt="GitHub stars"/>
    </a>
    <a href="https://github.com/Jannchie/Historical-ranking-data-visualization-based-on-d3.js/network" style="text-decoration:none" >
        <img src="https://img.shields.io/github/forks/Jannchie/Historical-ranking-data-visualization-based-on-d3.js.svg" alt="GitHub forks"/>
    </a>
    <a href="https://github.com/Jannchie/Historical-ranking-data-visualization-based-on-d3.js/blob/master/LICENSE" style="text-decoration:none" >
        <img src="https://img.shields.io/github/license/Jannchie/Historical-ranking-data-visualization-based-on-d3.js.svg" alt="GitHub license"/>
    </a>
</p>

这是一个数据可视化项目，基于D3.js。能够将历史数据排名转化为动态柱状图图表。

这个项目旨在降低此类视频的使用门槛与提高生产效率，使得没有编程经验的用户也能无痛制作排名可视化动画。



----

# 一句话用法

只需打开src目录下的bargraph.html。然后点击页面中间的选择文件按钮，接着选择csv格式的数据文件，便可以看到可视化的结果。

# 数据格式

本项目能够读取csv格式的数据。

具体的格式如下：

| name  | type  | value | date  |
| ----- | ----- | ----- | ----- |
| 名称1 | 类型1 | 值1   | 日期1 |
| 名称2 | 类型2 | 值2   | 日期2 |

其中“名称”会出现在柱状图的左侧作为Y轴，而“类型-名称”会作为附加信息出现在柱状图上。

类型与柱状图的颜色相关，建议命名为不包含空格或者特殊符号的中英文字符。

值与柱状图的长度绑定，必须是整数或浮点数。

日期建议使用的格式为"YYYY-MM-DD"。

# 配置

本项目能够进行一些简单的定制。

使用记事本或者其他文本编辑器，打开config.js的文件即可进行一些参数的修改。

---

# 更新日志

## 2020-03-01

- 美化了图片的位置
- 美化了描边

## 2019-04-16

- 合并了数个分支。
- 更新了英文版README，将颜色代码统一为HEX格式。--BY [rabbitism](https://github.com/rabbitism)
- 在渐变色模式下，添加了根据类型选择渐变色板的功能。--BY [MiracleXYZ](https://github.com/MiracleXYZ)
- 添加always_up属性，用于反向排行榜，条目退出排行榜时都会上浮。--BY [MiracleXYZ](https://github.com/MiracleXYZ)
- 控制配置文件篇幅，将imgs和color_ranges移动到其他的文件中，方便进行其他属性的配置。--BY [MiracleXYZ](https://github.com/MiracleXYZ)
- 修复了图片模式下一些名字中含有特殊符号（如英文括号和引号）导致图片无法正常显示的问题。--BY [MiracleXYZ](https://github.com/MiracleXYZ)
  
## 2019-03-30

- 修复了反格式化函数的一些错误。

## 2019-03-20

- 添加了反格式化函数。

## 2019-02-11

- 修复了没有后缀时数据会从零开始的问题。

## 2019-02-10

- 更新了默认编码和example.csv。

## 2019-02-09

- 现在可以添加在图表的数值上添加后缀了。
- 在使用动态颜色时，可以自定义颜色渐变了。

## 2019-01-14

- 优化了图像选取算法，在图片极多的情况下也不会卡顿了。
  
## 2019-01-13

- 现在柱状图颜色变化时图片边框颜色也会变化了。

## 2019-01-11

- 现在柱状图可以设置为圆角矩形。
- 现在可以添加图片Logo。
- 现在可以调整左侧label的显示与位置。
- 现在可以在config中调整全局背景色。
  
## 2018-12-25

- 为了规避字体版权问题，默认采用思源黑体。

## 2018-11-29

- 现在发生错误会弹出对话框，便于定位并描述错误了。
  
## 2018-11-26

- 史诗级更新，更新了动画算法。
- 现在可以通过选项指定匀速运动。

## 2018-11-18

- 修复一些bug
- 现在使用计数器会自动覆盖掉type标签，而不是直接报错。

## 2018-10-14

- 不再使用webpack了。webpack并不适用于如此之小的项目，使用webpack感觉只会增加调试和二次开发的门槛。
- 不再使用css来控制颜色的选择了。现在可以在config.js中进行设置。
- 现在默认随机配色，并且可以只指定部分颜色了。
- 添加了颜色绑定增长率的选项，开启后颜色与增长率有关。越黄越快，越蓝越慢。
- 添加了barinfo过长时的另一种显示方法，在config.js中用long参数控制。

## 2018-08-04

- 美化随机配色。
- 修改了配置说明。
- 美化进入退出效果。

## 2018-07-31

- 修复了中途修改type不会改变类型的问题。
- 删除了运行不正常的dividing_line，改为使用allow_up属性，该属性使得高于平均值的条目能够上浮退出。

## 2018-07-23

- 添加了数据都很大时的坐标轴策略，如果所有数字都很大，导致拉不开差距则开启此项使得坐标原点变换为（最小值）*2-（最大值）。
- 添加了当数字量级差距巨大时的坐标轴策略（开启半对数坐标）。
- 修复了时间的排序方式。
- 添加了reverse配置，使得使得最短的bar位于最上方。
  
## 2018-07-22

- 修复了自定义颜色时，无法按照名称来上色的BUG。
- 修复了自定义颜色时，名称和数值没有正确上色的BUG。

## 2018-07-21

- 修复了上色机制，并且现在可以选择按照类型还是按照名称上色了。

## 2018-07-20

- 现在可以关闭自动排序了。
- 现在能选择条状图进入时是从零开始还是从当前的数值开始了。

## 2018-07-19

- 现在可以在配置文件里控制每日最大的显示条目数了。
- 现在在配置文件里配置成不显示type能够移除柱状图上的类型了。
- 现在能够在配置文件中选择自定义颜色了。
- 使用更加合理的随机颜色。
- speed属性更名为interval_time。

