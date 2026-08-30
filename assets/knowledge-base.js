/* ============================================================
 * AI 教师 · 单一数据源（knowledge-base.js）
 * 所有页面从此文件读取知识点数据：导航主页 / 学科索引页 / 回顾系统 / 知识图谱
 * 规范依据：《AI教师-课件制作指导文档》第 5.4 节
 * 维护约定：新增知识点 = 在此加一条记录 + 更新 updatedAt；字段见文档字段字典
 * ============================================================ */
(function () {
  "use strict";

  var KB = {
    version: "0.1.0",
    updatedAt: "2026-08-30",

    /* 学科字典 */
    subjects: [
      { id: "chinese", name: "语文", order: 1 },
      { id: "math",    name: "数学", order: 2 },
      { id: "english", name: "英语", order: 3 }
    ],

    /* 知识模块字典（对应文档 §3.1） */
    modules: [
      // 语文
      { id: "pinyin",   subject: "chinese", name: "拼音与识字", order: 1 },
      { id: "words",    subject: "chinese", name: "词语与句子", order: 2 },
      { id: "reading",  subject: "chinese", name: "阅读",       order: 3 },
      { id: "writing",  subject: "chinese", name: "写作表达",   order: 4 },
      { id: "poetry",   subject: "chinese", name: "古诗文积累", order: 5 },
      // 数学
      { id: "number",   subject: "math", name: "数与运算",   order: 1 },
      { id: "measure",  subject: "math", name: "量与计量",   order: 2 },
      { id: "geometry", subject: "math", name: "图形与几何", order: 3 },
      { id: "stat",     subject: "math", name: "统计与概率", order: 4 },
      { id: "appl",     subject: "math", name: "典型应用",   order: 5 },
      // 英语
      { id: "phon",     subject: "english", name: "语音",   order: 1 },
      { id: "vocab",    subject: "english", name: "词汇",   order: 2 },
      { id: "grammar",  subject: "english", name: "语法",   order: 3 },
      { id: "listen",   subject: "english", name: "听说",   order: 4 },
      { id: "readwrite",subject: "english", name: "读写",   order: 5 }
    ],

    /* ★ 知识点主表（首批：数学 4 年级，含四上·新版 / 四下·旧版 / 三下衔接） */
    knowledgePoints: [

      /* ================= 数学 · 四年级上册（2026 新版教材） ================= */

      // 第1单元 万以上数的认识
      { id: "math-4-001", name: "亿以内数的读法", subject: "math", grade: 4, term: "上册", unit: "第1单元·万以上数的认识", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-3-003"], status: "待制作", file: "", summary: "分级读亿以内数，先读亿级再读万级", keywords: ["读数","大数","亿以内"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-002", name: "亿以内数的写法", subject: "math", grade: 4, term: "上册", unit: "第1单元·万以上数的认识", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-4-001"], status: "待制作", file: "", summary: "按数级写亿以内数，0 的占位", keywords: ["写数","大数","占位"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-003", name: "亿以内数的大小比较", subject: "math", grade: 4, term: "上册", unit: "第1单元·万以上数的认识", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-4-001"], status: "待制作", file: "", summary: "位数多的大，同位数比高位", keywords: ["比较","大数"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-004", name: "数的改写（整万、整亿）", subject: "math", grade: 4, term: "上册", unit: "第1单元·万以上数的认识", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-4-001"], status: "待制作", file: "", summary: "整万/整亿数改写成万、亿作单位", keywords: ["改写","万","亿","单位"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-005", name: "求近似数（四舍五入）", subject: "math", grade: 4, term: "上册", unit: "第1单元·万以上数的认识", module: "number", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-004"], status: "待制作", file: "", summary: "四舍五入法求近似数到指定数位", keywords: ["近似数","四舍五入","省略"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-006", name: "十进制计数法与亿以上数的认识", subject: "math", grade: 4, term: "上册", unit: "第1单元·万以上数的认识", module: "number", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-001"], status: "待制作", file: "", summary: "理解十进制计数法，认识亿以上数", keywords: ["十进制","计数单位","亿以上"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },

      // 第2单元 角的度量
      { id: "math-4-007", name: "角的再认识与分类", subject: "math", grade: 4, term: "上册", unit: "第2单元·角的度量", module: "geometry", difficulty: "基础", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "锐角、直角、钝角、平角、周角", keywords: ["角","分类","锐角","钝角"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-008", name: "用量角器量角", subject: "math", grade: 4, term: "上册", unit: "第2单元·角的度量", module: "geometry", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-4-007"], status: "待制作", file: "", summary: "量角器读度数，注意内外圈刻度", keywords: ["量角","量角器","度数"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-009", name: "画指定度数的角", subject: "math", grade: 4, term: "上册", unit: "第2单元·角的度量", module: "geometry", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-008"], status: "待制作", file: "", summary: "用量角器画角，先画边再定点", keywords: ["画角","量角器"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },

      // 第3单元 多位数乘两位数
      { id: "math-4-010", name: "三位数乘两位数的笔算", subject: "math", grade: 4, term: "上册", unit: "第3单元·多位数乘两位数", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-3-004"], status: "待制作", file: "", summary: "笔算乘法，先乘个位再乘十位", keywords: ["乘法","笔算","三位数乘两位数"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-011", name: "因数中间或末尾有 0 的乘法", subject: "math", grade: 4, term: "上册", unit: "第3单元·多位数乘两位数", module: "number", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-010"], status: "待制作", file: "", summary: "0 的乘法简算：末尾 0 先不参与", keywords: ["乘法","0","简算"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-012", name: "积的变化规律", subject: "math", grade: 4, term: "上册", unit: "第3单元·多位数乘两位数", module: "number", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-010"], status: "待制作", file: "", summary: "一个因数变化，积随之变化的规律", keywords: ["积","变化规律","因数"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },

      // 第4单元 平行四边形和梯形
      { id: "math-4-013", name: "平行与垂直", subject: "math", grade: 4, term: "上册", unit: "第4单元·平行四边形和梯形", module: "geometry", difficulty: "基础", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "同一平面内两条直线的位置关系", keywords: ["平行","垂直","直线"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-014", name: "画垂线（点到直线的距离）", subject: "math", grade: 4, term: "上册", unit: "第4单元·平行四边形和梯形", module: "geometry", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-013"], status: "待制作", file: "", summary: "用三角尺画垂线，垂线段最短", keywords: ["垂线","距离","三角尺"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-015", name: "平行四边形的认识与特征", subject: "math", grade: 4, term: "上册", unit: "第4单元·平行四边形和梯形", module: "geometry", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-4-013"], status: "待制作", file: "", summary: "对边平行且相等，会画高", keywords: ["平行四边形","对边","高"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-016", name: "梯形的认识与特征", subject: "math", grade: 4, term: "上册", unit: "第4单元·平行四边形和梯形", module: "geometry", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-4-013"], status: "待制作", file: "", summary: "只有一组对边平行，认识梯形要素", keywords: ["梯形","上底","下底","腰"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },

      // 第5单元 除数是两位数的除法
      { id: "math-4-017", name: "除数是两位数的口算除法", subject: "math", grade: 4, term: "上册", unit: "第5单元·除数是两位数的除法", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-3-004"], status: "待制作", file: "", summary: "用表内除法迁移口算整十数除法", keywords: ["除法","口算","整十数"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-018", name: "除数是两位数的笔算除法", subject: "math", grade: 4, term: "上册", unit: "第5单元·除数是两位数的除法", module: "number", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-017"], status: "待制作", file: "", summary: "试商、调商，商的书写位置", keywords: ["除法","试商","笔算"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-019", name: "商的变化规律", subject: "math", grade: 4, term: "上册", unit: "第5单元·除数是两位数的除法", module: "number", difficulty: "挑战", source: "syllabus", prerequisiteIds: ["math-4-018"], status: "待制作", file: "", summary: "被除数除数变化时商的规律", keywords: ["商","变化规律","除法"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },

      // 第6单元 条形统计图
      { id: "math-4-020", name: "条形统计图的读与画", subject: "math", grade: 4, term: "上册", unit: "第6单元·条形统计图", module: "stat", difficulty: "提高", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "以一当一/以一当多，读图与制图", keywords: ["统计图","条形","数据"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },

      // 第7单元 加法模型和乘法模型（数量关系）
      { id: "math-4-021", name: "加法模型：数量关系的建立", subject: "math", grade: 4, term: "上册", unit: "第7单元·加法模型和乘法模型", module: "appl", difficulty: "提高", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "总量与部分量的加法数量关系", keywords: ["数量关系","加法模型","应用题"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-022", name: "乘法模型：总价/路程/工作总量", subject: "math", grade: 4, term: "上册", unit: "第7单元·加法模型和乘法模型", module: "appl", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-021"], status: "待制作", file: "", summary: "单价×数量=总价，速度×时间=路程", keywords: ["数量关系","乘法模型","总价","路程"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },

      // 综合实践
      { id: "math-4-023", name: "综合实践：寻找宝藏", subject: "math", grade: 4, term: "上册", unit: "综合实践·寻找宝藏", module: "appl", difficulty: "挑战", source: "syllabus", prerequisiteIds: ["math-4-013", "math-4-022"], status: "待制作", file: "", summary: "方向、位置与推理的综合运用", keywords: ["综合实践","方向","位置","推理"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },

      /* ================= 数学 · 四年级下册（2027 春启用，现按 2012 审定旧版目录待校对） ================= */

      { id: "math-4-030", name: "加减法的意义和各部分间的关系", subject: "math", grade: 4, term: "下册", unit: "第1单元·四则运算", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-3-004"], status: "待制作", file: "", summary: "加法减法互为逆运算，求未知量", keywords: ["加减法","意义","四则运算"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-031", name: "乘除法的意义和各部分间的关系", subject: "math", grade: 4, term: "下册", unit: "第1单元·四则运算", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-4-030"], status: "待制作", file: "", summary: "乘法除法互为逆运算，求因数", keywords: ["乘除法","意义","四则运算"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-032", name: "含括号的四则混合运算", subject: "math", grade: 4, term: "下册", unit: "第1单元·四则运算", module: "number", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-030", "math-4-031"], status: "待制作", file: "", summary: "先乘除后加减，有括号先算括号", keywords: ["混合运算","括号","运算顺序"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-033", name: "有关 0 的运算", subject: "math", grade: 4, term: "下册", unit: "第1单元·四则运算", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-4-030"], status: "待制作", file: "", summary: "0 作被除数、因数等特殊情况", keywords: ["0","运算"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-034", name: "加法交换律和结合律", subject: "math", grade: 4, term: "下册", unit: "第3单元·运算定律", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-4-030"], status: "待制作", file: "", summary: "交换律结合律及简便计算", keywords: ["加法","运算定律","简便计算"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-035", name: "乘法交换律、结合律和分配律", subject: "math", grade: 4, term: "下册", unit: "第3单元·运算定律", module: "number", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-034"], status: "待制作", file: "", summary: "三大乘法定律及其应用", keywords: ["乘法","分配律","运算定律"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-036", name: "简便运算（运算定律的应用）", subject: "math", grade: 4, term: "下册", unit: "第3单元·运算定律", module: "number", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-034", "math-4-035"], status: "待制作", file: "", summary: "凑整思想，灵活选择运算定律", keywords: ["简便运算","凑整","运算定律"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-037", name: "小数的意义和读写法", subject: "math", grade: 4, term: "下册", unit: "第4单元·小数的意义和性质", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-3-006"], status: "待制作", file: "", summary: "十分位百分位千分位，读写小数", keywords: ["小数","意义","读写"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-038", name: "小数的性质和大小比较", subject: "math", grade: 4, term: "下册", unit: "第4单元·小数的意义和性质", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-4-037"], status: "待制作", file: "", summary: "小数末尾添 0 大小不变", keywords: ["小数","性质","大小比较"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-039", name: "小数点移动引起小数大小的变化", subject: "math", grade: 4, term: "下册", unit: "第4单元·小数的意义和性质", module: "number", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-037"], status: "待制作", file: "", summary: "小数点右移扩大左移缩小", keywords: ["小数点","移动","扩大","缩小"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-040", name: "小数与单位换算", subject: "math", grade: 4, term: "下册", unit: "第4单元·小数的意义和性质", module: "measure", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-039", "math-3-005"], status: "待制作", file: "", summary: "名数的互化，进率与小数点", keywords: ["单位换算","名数","进率"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-041", name: "求小数的近似数", subject: "math", grade: 4, term: "下册", unit: "第4单元·小数的意义和性质", module: "number", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-005", "math-4-038"], status: "待制作", file: "", summary: "四舍五入保留到指定小数位", keywords: ["近似数","小数","保留"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-042", name: "三角形的认识与特性", subject: "math", grade: 4, term: "下册", unit: "第5单元·三角形", module: "geometry", difficulty: "基础", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "三角形稳定性，三边关系", keywords: ["三角形","稳定性","三边关系"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-043", name: "三角形的分类与内角和", subject: "math", grade: 4, term: "下册", unit: "第5单元·三角形", module: "geometry", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-042"], status: "待制作", file: "", summary: "按角按边分类，内角和 180°", keywords: ["三角形","分类","内角和"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-044", name: "小数的加法和减法", subject: "math", grade: 4, term: "下册", unit: "第6单元·小数的加法和减法", module: "number", difficulty: "提高", source: "syllabus", prerequisiteIds: ["math-4-037"], status: "待制作", file: "", summary: "小数点对齐，按整数加减法计算", keywords: ["小数","加法","减法"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-045", name: "轴对称与平移", subject: "math", grade: 4, term: "下册", unit: "第7单元·图形的运动（二）", module: "geometry", difficulty: "基础", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "对称轴、平移的特点与画法", keywords: ["轴对称","平移","图形运动"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-046", name: "平均数", subject: "math", grade: 4, term: "下册", unit: "第8单元·平均数与条形统计图", module: "stat", difficulty: "提高", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "移多补少求平均数，总数量÷总份数", keywords: ["平均数","移多补少"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-4-047", name: "数学广角：鸡兔同笼", subject: "math", grade: 4, term: "下册", unit: "第9单元·数学广角", module: "appl", difficulty: "挑战", source: "syllabus", prerequisiteIds: ["math-4-032"], status: "待制作", file: "", summary: "列表法与假设法解鸡兔同笼", keywords: ["鸡兔同笼","假设法","列表法"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },

      /* ================= 数学 · 三年级下册（衔接基础点，2026-08 已学/待补） ================= */

      { id: "math-3-001", name: "位置与方向（东南西北）", subject: "math", grade: 3, term: "下册", unit: "第1单元·位置与方向", module: "geometry", difficulty: "基础", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "辨认东南西北，描述物体位置", keywords: ["方向","位置","东南西北"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-3-002", name: "除数是一位数的除法", subject: "math", grade: 3, term: "下册", unit: "第2单元·除数是一位数的除法", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "口算与笔算除数是一位数的除法", keywords: ["除法","一位数","笔算"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-3-003", name: "两位数乘两位数", subject: "math", grade: 3, term: "下册", unit: "第4单元·两位数乘两位数", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: ["math-3-002"], status: "待制作", file: "", summary: "笔算两位数乘两位数，进位", keywords: ["乘法","两位数","笔算"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-3-004", name: "面积：面积单位与长方形正方形面积", subject: "math", grade: 3, term: "下册", unit: "第5单元·面积", module: "measure", difficulty: "基础", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "面积单位、长×宽求面积", keywords: ["面积","长方形","正方形","单位"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-3-005", name: "年、月、日与 24 时计时法", subject: "math", grade: 3, term: "下册", unit: "第6单元·年、月、日", module: "measure", difficulty: "基础", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "大月小月、平年闰年、24 时制", keywords: ["年月日","计时法","闰年"], createdAt: "2026-08-30", updatedAt: "2026-08-30" },
      { id: "math-3-006", name: "小数的初步认识", subject: "math", grade: 3, term: "下册", unit: "第7单元·小数的初步认识", module: "number", difficulty: "基础", source: "syllabus", prerequisiteIds: [], status: "待制作", file: "", summary: "认识一位小数，简单加减", keywords: ["小数","初步","十分位"], createdAt: "2026-08-30", updatedAt: "2026-08-30" }
    ]
  };

  window.KNOWLEDGE_BASE = KB;
})();
