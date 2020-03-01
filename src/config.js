const config = {
  // 数据源的编码方式。
  // 默认为UTF-8。
  // 如果是国内用户，且使用旧版Execl处理数据，保存的编码很可能是GBK的，如果出现乱码则将这里改成GBK。
  // 不建议修改这里。而是建议将自己制作完毕的csv文件的内容复制到example.csv中。因为example.csv的编码格式是所有语言都支持的。
  // Encoding is not recommended to be modified.
  // Instead, it is recommended to copy the contents of the CSV file produced by yourself to example.csv.
  // The encoding format of example.csv is supported by all languages.
  encoding: "UTF-8",

  // 每个时间节点最多显示的条目数。
  max_number: 20,

  // 控制是否显示顶部附加信息文字。
  showMessage: true,

  // 时间自动排序。
  // !!!请确保打开此项时，使用的是标准日期格式！(即：YYYY-MM-DD HH:MM)
  // 如果关闭，排序顺序为csv表格的时间字段自上而下的出现顺序。
  // 如果你的日期格式为标准的日期格式，则可以无视数据排序，达到自动按照日期顺序排序的效果。
  // 开启auto_sort可以实现时间的自动补间。
  // Auto Sort by Time
  // Please ensure using standard datetime format (YYYY-MM-DD HH:MM) when this term is enabled!!!
  auto_sort: false,

  // 时间格式化
  timeFormat: "%Y-%m-%d",

  // 倒序，使得最短的条位于最上方
  reverse: false,

  // 类型根据什么字段区分？如果是name，则关闭类型显示
  divide_by: "type",

  // 颜色根据什么字段区分？
  divide_color_by: "name",

  // 字段的值与其对应的颜色值
  color: {
    Chinese: "#1177CC",
    Japanese: "#667788"
  },

  // 颜色渐变：颜色绑定增长率
  changeable_color: false,

  // 添加功能：不同类型的增长率所用渐变色不同(暗→亮)
  // 如果该项为false，那么所有条目全部按照color_range变色
  // 如果该项为true，那么按照src/color_ranges.js中的color_ranges变色，默认色板为color_range
  // 一个具体的设置模板见src/_color_ranges.js，将其更名为color_ranges.js再设置即可
  divide_changeable_color_by_type: false,
  color_range: ["#ff7e5f", "#feb47b"],

  // 附加信息内容。
  // left label
  itemLabel: "左侧文字",

  // right label
  typeLabel: "右侧文字",

  // 榜首项目信息的水平位置 。
  // Top item information horizontal location
  item_x: 250,

  // 时间点间隔时间。
  interval_time: 1,

  // 上方文字水平高度。
  text_y: -50,

  // 右侧文字横坐标
  text_x: 1000,
  // 偏移量
  offset: 350,

  // 长度小于display_barInfo的bar将不显示barInfo。
  // Hide barInfo if bar is shorter than barInfo
  display_barInfo: 0,

  // 使用计数器
  // 注意！使用计时器和使用类型目前不能兼容，即不能同时开启！
  // 计数器会出现在右上角，记录着当前榜首的持续时间。
  use_counter: false,
  // 每个时间节点对于计数器的步长。
  // 比如时间节点日期的间隔可能为1周（七天），那么step的值就应该为7。
  step: 1,

  //////////////////////////////////////////////////////////////////////////////
  // 格式化数值
  // 这里控制着数值的显示位数。主要靠修改中间的数字完成，如果为1则为保留一位小数。
  // 逗号表示每隔三位数用","分割
  // '.2f' means keeping two decimals.
  format: ",.0f",

  // 后缀
  postfix: "",

  // 如果看不懂这是在干什么的话，建议不要修改这里。
  // 反格式化函数:
  // 格式化操作可能会导致NaN问题。此函数将格式化后的数值反格式化为JS可以识别的数字。
  deformat: function(val, postfix) {
    return Number(val.replace(postfix, "").replace(/\,/g, ""));
  },
  //////////////////////////////////////////////////////////////////////////////

  // 图表左右上下间距。
  // 注意，left_margin不包括左侧的label，修改数值较小会导致左侧label不显示
  left_margin: 250,
  right_margin: 150,
  top_margin: 180,
  bottom_margin: 0,

  // 是否开启时间标签。
  dateLabel_switch: true,
  // 时间标签坐标。建议x：1000 y：-50开始尝试，默认位置为x:null,y:null
  dateLabel_x: null,
  dateLabel_y: null,

  // 允许大于平均值的条消失时上浮。
  allow_up: false,

  // 所有条目上浮 - 用于反向排行榜等情况
  always_up: false,

  // 设置动画效果，如果为true，则新进入的条目从0开始。
  enter_from_0: true,

  // 如果所有数字都很大，导致拉不开差距则开启此项使得坐标原点变换为（最小值）*2-（最大值）
  big_value: true,

  // 如果要使用半对数坐标，则开启此项
  use_semilogarithmic_coordinate: false,

  // barinfo太长？也许可以试试这个
  long: false,

  // 延迟多少个时间节点开始
  wait: 0,

  // 单独控制交换动画速度倍率
  update_rate: 1,

  // 开启匀速动画效果
  // animation:'linear',
  showLabel: true,

  // label x轴位置
  labelx: -10,

  use_img: true,

  // 图片路径，本地图片或者网上图片。
  // 也可在imgs.js中配置。
  imgs: {
    item:
      "http://i1.hdslb.com/bfs/face/983034448f81f45f05956d0455a86fe0639d6a36.jpg",
    条目:
      "http://i1.hdslb.com/bfs/face/983034448f81f45f05956d0455a86fe0639d6a36.jpg",
    任意名称: "path/to/img"
  },

  // 全局背景颜色
  background_color: "#FFFFFF",

  // 矩形柱是否为圆角矩形
  rounded_rectangle: true,

  // 是否显示x轴轴线
  show_x_tick: true,

  // 限制bar info 展示的长度
  // limit bar info display length
  bar_name_max: 30
};
