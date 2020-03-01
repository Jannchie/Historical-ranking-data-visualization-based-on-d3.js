<h1 align="center">
Dynamic Ranking Visualization
</h1>

<h3 align="center">Visualize historical data with dynamic bar chart</h3>


<p align="center">
  <a href="README.md">Chinese</a>
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

This is a data visualization project based on D3.js, which easily converts historical ranking data to dynamic bar chart.

This project aims to help video creators without programming experience produce ranking animation videos.

----

# How to Use

Open `src/bargraph.html` in any browser and click `choose file` button. Choose your `.csv` formated data source then you can see the visualzied result. 

# Data Format

You can load data source in `.csv` format. See format requirement below:

| name  | type  | value  | date  |
| :---: | :---: | :----: | :---: |
| Name1 | Type1 | Value1 | Date1 |
| Name2 | Type2 | Value2 | Date2 |


**Names** will be displayed as categorical labels on Y-axis. **Name-Type** together will be displayed as annotations on bars.

**Types** are associated with bar colors. Please use type names with no whitespaces or any special characters other than English letters and Chinese characters.

**Values** are associated with bar length. They have to be interger or float values. 

**Dates** should be in `YYYY-MM-DD` format.

# Configurations

You can customize this project by editing parameters in [`src/config.js`](/src/config.js) with any text editor. Please check [`src/config.js`](/dist/config.js) comments for parameter details.
