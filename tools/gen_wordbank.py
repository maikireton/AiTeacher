#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""生成人教版新起点(一年级起点)三上~六下单词库 wordbank.js"""
import json, re, os

# ============ 单元定义 ============
UNITS = [
    # 三年级上册
    ("3a-u1", "三上 U1 Myself", "三年级上", "👋"),
    ("3a-u2", "三上 U2 My Body", "三年级上", "🧍"),
    ("3a-u3", "三上 U3 Food", "三年级上", "🍽️"),
    ("3a-u4", "三上 U4 Pets", "三年级上", "🐾"),
    ("3a-u5", "三上 U5 Clothes", "三年级上", "👕"),
    ("3a-u6", "三上 U6 Birthdays", "三年级上", "🎂"),
    # 三年级下册
    ("3b-u1", "三下 U1 School Subjects", "三年级下", "📚"),
    ("3b-u2", "三下 U2 My School", "三年级下", "🏫"),
    ("3b-u3", "三下 U3 After School Activities", "三年级下", "🎨"),
    ("3b-u4", "三下 U4 My Family", "三年级下", "👨‍👩‍👧"),
    ("3b-u5", "三下 U5 Family Activities", "三年级下", "🏠"),
    ("3b-u6", "三下 U6 My Home", "三年级下", "🛋️"),
    # 四年级上册
    ("4a-u1", "四上 U1 Sports and Games", "四年级上", "⚽"),
    ("4a-u2", "四上 U2 On the Weekend", "四年级上", "🌳"),
    ("4a-u3", "四上 U3 Transportation", "四年级上", "🚌"),
    ("4a-u4", "四上 U4 Asking for Help", "四年级上", "✋"),
    ("4a-u5", "四上 U5 Safety", "四年级上", "⚠️"),
    ("4a-u6", "四上 U6 Jobs", "四年级上", "👷"),
    # 四年级下册
    ("4b-u1", "四下 U1 My Neighbourhood", "四年级下", "🏘️"),
    ("4b-u2", "四下 U2 Cities", "四年级下", "🏙️"),
    ("4b-u3", "四下 U3 Travel Plans", "四年级下", "✈️"),
    ("4b-u4", "四下 U4 Hobbies", "四年级下", "🎯"),
    ("4b-u5", "四下 U5 Free Time", "四年级下", "🎮"),
    ("4b-u6", "四下 U6 Countries", "四年级下", "🌍"),
    # 五年级上册
    ("5a-u1", "五上 U1 My Favourite Things", "五年级上", "⭐"),
    ("5a-u2", "五上 U2 Which do you like better?", "五年级上", "🤔"),
    ("5a-u3", "五上 U3 Animal World", "五年级上", "🦁"),
    ("5a-u4", "五上 U4 Shopping", "五年级上", "🛒"),
    ("5a-u5", "五上 U5 TV Shows", "五年级上", "📺"),
    ("5a-u6", "五上 U6 Chores", "五年级上", "🧹"),
    # 五年级下册
    ("5b-u1", "五下 U1 Keeping Healthy", "五年级下", "💪"),
    ("5b-u2", "五下 U2 Special Days", "五年级下", "🎉"),
    ("5b-u3", "五下 U3 Making Contact", "五年级下", "📱"),
    ("5b-u4", "五下 U4 Last Weekend", "五年级下", "📅"),
    ("5b-u5", "五下 U5 Have a Great Trip", "五年级下", "🏖️"),
    ("5b-u6", "五下 U6 Growing Up", "五年级下", "🌱"),
    # 六年级上册
    ("6a-u1", "六上 U1 In China", "六年级上", "🇨🇳"),
    ("6a-u2", "六上 U2 Around the World", "六年级上", "🗺️"),
    ("6a-u3", "六上 U3 Animal World", "六年级上", "🐋"),
    ("6a-u4", "六上 U4 Feelings", "六年级上", "😊"),
    ("6a-u5", "六上 U5 Famous People", "六年级上", "🏆"),
    ("6a-u6", "六上 U6 Winter Vacation", "六年级上", "❄️"),
    # 六年级下册
    ("6b-u1", "六下 U1 Visiting Canada", "六年级下", "🍁"),
    ("6b-u2", "六下 U2 All Around Me", "六年级下", "🏛️"),
    ("6b-u3", "六下 U3 Daily Life", "六年级下", "☀️"),
    ("6b-u4", "六下 U4 Free Time", "六年级下", "🏒"),
    ("6b-u5", "六下 U5 Nature and Culture", "六年级下", "🦃"),
    ("6b-u6", "六下 U6 Summer Vacation", "六年级下", "🌞"),
]

# ============ 单词数据 (单元id -> [(单词, 中文), ...]) ============
WORDS = {
# === 三上 ===
"3a-u1": [("my","我的"),("your","你的"),("name","名字"),("new","新的"),("year","年"),("old","年老的"),("how old","多大"),("class","班级"),("grade","年级"),("age","年龄"),("dear","亲爱的")],
"3a-u2": [("body","身体"),("head","头"),("hair","头发"),("arm","胳膊"),("hand","手"),("leg","腿"),("foot","脚"),("face","脸"),("eye","眼睛"),("nose","鼻子"),("mouth","嘴巴"),("ear","耳朵"),("hurt","疼痛"),("help","帮助"),("bad","坏的"),("bite","咬"),("tongue","舌头"),("kick","踢"),("morning","早晨"),("afternoon","下午")],
"3a-u3": [("bread","面包"),("cake","蛋糕"),("fruit","水果"),("ice-cream","冰淇淋"),("potato","土豆"),("tomato","西红柿"),("meat","肉"),("cola","可乐"),("buy","买"),("rice","米饭"),("noodles","面条"),("vegetables","蔬菜"),("fish","鱼"),("chicken","鸡肉"),("egg","鸡蛋")],
"3a-u4": [("duck","鸭子"),("rabbit","兔子"),("pet","宠物"),("snake","蛇"),("turtle","海龟"),("small","小的"),("long","长的"),("tail","尾巴"),("dance","跳舞"),("cat","猫"),("dog","狗"),("bird","鸟"),("monkey","猴子"),("tiger","老虎"),("big","大的"),("short","短的")],
"3a-u5": [("cap","帽子"),("coat","大衣"),("shoes","鞋"),("sweater","毛衣"),("jacket","夹克衫"),("gloves","手套"),("trousers","裤子"),("should","应该"),("wear","穿"),("T-shirt","T恤"),("shorts","短裤"),("socks","短袜"),("skirt","裙子"),("dress","连衣裙"),("shirt","衬衫")],
"3a-u6": [("January","一月"),("February","二月"),("March","三月"),("April","四月"),("May","五月"),("June","六月"),("July","七月"),("August","八月"),("September","九月"),("October","十月"),("November","十一月"),("December","十二月"),("birthday","生日"),("first","第一"),("party","聚会"),("delicious","美味的")],
# === 三下 ===
"3b-u1": [("Chinese","语文"),("English","英语"),("science","科学"),("PE","体育"),("music","音乐"),("maths","数学"),("art","美术"),("computer class","计算机课"),("we","我们"),("that","那个")],
"3b-u2": [("classroom","教室"),("library","图书馆"),("toilet","洗手间"),("playground","操场"),("first","第一"),("second","第二"),("third","第三"),("floor","楼层"),("room","房间"),("our","我们的"),("they","他们")],
"3b-u3": [("play sports","做运动"),("draw pictures","画画"),("play chess","下棋"),("dance","跳舞"),("sing songs","唱歌"),("read books","读书"),("really","确实"),("tomorrow","明天"),("play football","踢足球"),("fly a kite","放风筝"),("ride a bike","骑自行车"),("swim","游泳")],
"3b-u4": [("family","家庭"),("uncle","叔叔"),("aunt","阿姨"),("cousin","堂兄弟"),("handsome","英俊的"),("beautiful","美丽的"),("grandfather","祖父"),("grandmother","祖母"),("father","父亲"),("mother","母亲"),("brother","兄弟"),("sister","姐妹")],
"3b-u5": [("cooking dinner","做饭"),("walking the dog","遛狗"),("watering the plants","浇花"),("cleaning the room","打扫房间"),("listening to music","听音乐"),("watching TV","看电视"),("feeding the fish","喂鱼"),("everyone","人人"),("children","孩子们"),("run","跑")],
"3b-u6": [("home","家"),("bedroom","卧室"),("living room","客厅"),("bathroom","浴室"),("dining room","餐厅"),("study","书房"),("kitchen","厨房"),("sofa","沙发"),("light","灯"),("bed","床"),("door","门"),("box","盒子")],
# === 四上 ===
"4a-u1": [("running","跑步"),("basketball","篮球"),("roller skating","滑旱冰"),("jumping rope","跳绳"),("ping-pong","乒乓球"),("interesting","有趣的"),("often","经常"),("be good at","擅长"),("late","晚"),("swim","游泳")],
"4a-u2": [("visit grandparents","看望祖父母"),("go to a drawing club","去绘画俱乐部"),("climb a hill","爬山"),("pick fruit","采摘水果"),("play computer games","玩电脑游戏"),("go fishing","钓鱼"),("go to the cinema","看电影"),("on the weekend","在周末"),("fun","有趣的"),("always","总是"),("evening","傍晚"),("dirty","脏的"),("Saturday","星期六")],
"4a-u3": [("usually","通常"),("by bus","乘公交车"),("by boat","乘小船"),("by ship","乘轮船"),("by car","乘小汽车"),("by taxi","乘出租车"),("by bike","骑自行车"),("on foot","步行"),("by school bus","乘校车"),("by subway","乘地铁"),("by plane","乘飞机"),("by train","乘火车"),("garden","花园"),("gate","大门"),("transportation","交通"),("film","电影")],
"4a-u4": [("pen","钢笔"),("knife","小刀"),("eraser","橡皮"),("crayon","蜡笔"),("scissors","剪刀"),("glue stick","胶棒"),("paper","纸"),("use","使用"),("please","请"),("find","找到"),("Information Centre","咨询中心"),("Excuse me","对不起"),("phone","电话"),("shop","商店")],
"4a-u5": [("climb on the window ledge","爬窗台"),("dangerous","危险的"),("play with fire","玩火"),("Be careful","当心"),("run down the stairs","跑下楼梯"),("sidewalk","人行道"),("wait for","等待"),("safe","安全"),("stop","停"),("street","街道"),("safety rule","安全规则")],
"4a-u6": [("nurse","护士"),("cook","厨师"),("doctor","医生"),("bus driver","公交司机"),("police officer","警官"),("taxi driver","出租司机"),("farmer","农民"),("worker","工人"),("in the future","将来"),("job","工作"),("sick","有病的"),("people","人们"),("teach","教"),("myself","我自己"),("sound","听起来")],
# === 四下 ===
"4b-u1": [("across from","对面"),("next to","紧邻"),("between","在...之间"),("restaurant","餐馆"),("post office","邮局"),("bank","银行"),("grocery","食品杂货店"),("turn left","向左转"),("turn right","向右转"),("go straight","直行"),("crossroads","十字路口"),("neighbourhood","街坊"),("send","发送"),("get","得到"),("money","钱"),("get to","到达"),("before","在...之前"),("leave","离开"),("toy","玩具"),("hospital","医院"),("bookshop","书店"),("supermarket","超市")],
"4b-u2": [("city","城市"),("street","街道"),("sports centre","体育中心"),("hotel","宾馆"),("square","广场"),("buy toys","买玩具"),("see a film","看电影"),("go boating","去划船"),("busy","忙碌的"),("station","车站"),("place","地方"),("stay","停留"),("star","星星"),("king","国王"),("central","中心的"),("take photos","照相"),("museum","博物馆"),("dream","梦")],
"4b-u3": [("sea","大海"),("ski","滑雪"),("eat seafood","吃海鲜"),("visit the Mogao Caves","参观莫高窟"),("West Lake","西湖"),("row a boat","划船"),("the Great Wall","长城"),("summer vacation","暑假"),("travel","旅游")],
"4b-u4": [("reading","读书"),("skateboarding","玩滑板"),("singing","唱歌"),("dancing","跳舞"),("doing jigsaw puzzles","拼拼图"),("making models","制作模型"),("collecting erasers","收集橡皮"),("different","不同的"),("hobby","爱好"),("stamp","邮票"),("catch","抓住")],
"4b-u5": [("go for a picnic","去野餐"),("play the violin","拉小提琴"),("go skating","去滑冰"),("go camping","去野营"),("do the housework","做家务"),("free","空闲的"),("never","从不"),("once a week","一周一次"),("twice a week","一周两次"),("three times a week","一周三次")],
"4b-u6": [("Canada","加拿大"),("Australia","澳大利亚"),("the UK","英国"),("the USA","美国"),("China","中国"),("koala","考拉"),("maple leaves","枫叶"),("Big Ben","大本钟"),("Disneyland","迪斯尼乐园"),("campfire","篝火"),("cute","可爱的"),("country","国家"),("pretty","漂亮的")],
# === 五上 ===
"5a-u1": [("clever","聪明的"),("careless","粗心的"),("polite","有礼貌的"),("quiet","安静的"),("cute","可爱的"),("friendly","友好的"),("helpful","有帮助的"),("active","活跃的"),("popular","受欢迎的"),("talk","说话"),("party","聚会"),("all","全部"),("but","但是"),("sometimes","有时"),("bark","叫"),("forget","忘记")],
"5a-u2": [("wear glasses","戴眼镜"),("slim","苗条的"),("curly","卷曲的"),("straight","直的"),("nice","好的"),("young","年轻的"),("teach","教"),("guess","猜"),("has","有")],
"5a-u3": [("animal","动物"),("elephant","大象"),("panda","熊猫"),("horse","马"),("cow","牛"),("pig","猪"),("sheep","绵羊"),("bee","蜜蜂"),("farm","农场"),("fast","快的"),("why","为什么"),("lovely","可爱的"),("butterfly","蝴蝶")],
"5a-u4": [("exercise book","练习本"),("pencil sharpener","铅笔刀"),("a pair of scissors","一把剪刀"),("pencil box","铅笔盒"),("a box of crayons","一盒蜡笔"),("please","请"),("only","只"),("also","也"),("saleswoman","女售货员"),("great","好极了"),("love","喜欢"),("how much","多少钱"),("a lot","很多")],
"5a-u5": [("wonderful","精彩的"),("cool","酷的"),("fantastic","极好的"),("cartoons","动画片"),("news shows","新闻节目"),("nature shows","自然节目")],
"5a-u6": [("chore","家务"),("clean the room","打扫房间"),("make the bed","整理床铺"),("take out the rubbish","倒垃圾"),("wash clothes","洗衣服"),("tidy the desk","清理书桌"),("sweep the floor","扫地"),("call","打电话")],
# === 五下 ===
"5b-u1": [("too much","太多"),("candy","糖果"),("go to bed","去睡觉"),("early","早"),("exercise","锻炼"),("tired","疲倦的"),("drink","喝"),("dirty","脏的"),("always","总是"),("stomachache","胃疼"),("headache","头疼"),("toothache","牙疼"),("a lot of","许多"),("sleepy","困的"),("subject","学科"),("mark","分数"),("advice","建议"),("more","更多的")],
"5b-u2": [("New Year's Day","新年"),("Tree Planting Day","植树节"),("Mother's Day","母亲节"),("Children's Day","儿童节"),("Father's Day","父亲节"),("Teachers' Day","教师节"),("National Day","国庆节"),("Christmas Day","圣诞节"),("birthday","生日"),("fifth","第五"),("tenth","第十"),("twelfth","第十二"),("twenty-fifth","第二十五"),("plant","种植"),("make a poster","制作海报"),("celebrate","庆祝"),("have a picnic","野餐"),("office","办公室"),("together","一起"),("special","特别的")],
"5b-u3": [("send an email","发电子邮件"),("write a letter","写信"),("make a phone call","打电话"),("send a short message","发送短消息"),("mail a present","邮寄礼物"),("make a video call","打视频电话"),("say","说"),("make a card","制作卡片"),("everywhere","到处"),("flower show","花展")],
"5b-u4": [("cleaned the window","擦窗子"),("watched TV","看电视"),("climbed a hill","爬山"),("visited grandparents","看望祖父母"),("danced","跳舞"),("jumped rope","跳绳"),("listened to music","听音乐"),("rowed a boat","划船"),("played computer games","玩电脑游戏"),("stayed at home","呆在家里"),("played the piano","弹钢琴"),("played chess","下棋"),("washed clothes","洗衣服"),("boring","乏味的"),("badminton","羽毛球"),("won","赢")],
"5b-u5": [("went to the beach","去海边"),("drank cold drinks","喝冷饮"),("swam","游泳"),("ate ice cream","吃冰淇淋"),("the Stone Forest","石林"),("bought some gifts","买礼物"),("took photos","拍照片"),("saw flowers","赏花"),("slept","睡觉"),("delicious","美味的"),("felt happy","觉得高兴"),("sad","悲伤的"),("left","离开"),("French fries","法式炸薯条"),("were","是")],
"5b-u6": [("was born","出生"),("started to speak","开始说话"),("learned to walk","学走路"),("learned to ride a bike","学骑自行车"),("went to kindergarten","上幼儿园"),("went to school","上学"),("learned to swim","学游泳"),("fifteenth","第十五"),("started to buy things","开始学买东西"),("started to study English","开始学英语"),("started to use a computer","开始使用电脑"),("all over","到处"),("out of","离开"),("into","进入"),("chopsticks","筷子"),("wet","湿的")],
# === 六上 ===
"6a-u1": [("morning tea","早茶"),("soup","汤"),("garden","花园"),("the Potala Palace","布达拉宫"),("the Summer Palace","颐和园"),("the Terracotta Army","兵马俑"),("vacation","假期"),("taste","品尝"),("map","地图"),("north","北"),("south","南"),("east","东"),("west","西"),("famous","著名的"),("temple","寺"),("around","遍及"),("the Yangtze River","长江"),("foggy","有雾的"),("spicy","辣的"),("silk","丝绸"),("forest","树林"),("stone","石头")],
"6a-u2": [("London","伦敦"),("Toronto","多伦多"),("Sydney","悉尼"),("Washington D.C.","华盛顿"),("the British Museum","大英博物馆"),("the CN Tower","加拿大国家电视塔"),("kangaroo","袋鼠"),("the Opera House","歌剧院"),("clock","时钟"),("speak","说"),("French","法语"),("Tower Bridge","塔桥"),("the London Eye","伦敦眼"),("hiking","远足"),("sunrise","日出"),("president","总统")],
"6a-u3": [("reptile","爬行动物"),("bird","鸟"),("mammal","哺乳动物"),("insect","昆虫"),("penguin","企鹅"),("shark","鲨鱼"),("whale","鲸"),("kind","种类"),("metre","米"),("spend","花费"),("trunk","象鼻"),("peanut","花生"),("fan","迷"),("tusk","长牙"),("Africa","非洲"),("Asia","亚洲"),("smart","聪明的")],
"6a-u4": [("scared","害怕的"),("worried","担心的"),("angry","生气的"),("proud","自豪的"),("sad","难过的"),("excited","兴奋的"),("happy","高兴的"),("ill","有病"),("win","获胜"),("race","赛跑"),("find","发现"),("cry","哭"),("because","因为"),("test","测验"),("competition","竞赛"),("hurt","弄伤")],
"6a-u5": [("astronaut","宇航员"),("artist","画家"),("scientist","科学家"),("poet","诗人"),("writer","作家"),("American","美国人"),("French","法国人"),("Danish","丹麦人"),("poem","诗"),("paint","画画"),("invention","发明"),("invent","发明"),("study","学习"),("story","故事"),("university","大学"),("deaf","聋的"),("blind","失明的"),("fall","落下")],
"6a-u6": [("dumpling","饺子"),("fan","迷"),("ice lantern","冰灯"),("bring","带来"),("be afraid of","害怕"),("hear","听见"),("pen pal","笔友"),("broken","破损的"),("pity","遗憾"),("prize","奖品"),("look forward to","盼望")],
# === 六下 ===
"6b-u1": [("live","居住"),("quite","有点"),("scarf","围巾"),("airport","机场"),("pupil","学生"),("arrive","到达"),("meet","迎接"),("wardrobe","衣柜")],
"6b-u2": [("show around","带领参观"),("Queen's Park","女王公园"),("art gallery","画廊"),("public library","公共图书馆"),("downtown","闹市区"),("Lake Ontario","安大略湖"),("stadium","体育场")],
"6b-u3": [("volunteer","志愿者"),("sandwich","三明治"),("top","顶部"),("habit","习惯"),("idea","想法"),("less","更少"),("at least","至少")],
"6b-u4": [("talk about","谈论"),("hockey","曲棍球"),("together","一起"),("special","特别的"),("beaver","海狸"),("raccoon","浣熊"),("moose","北美麋")],
"6b-u5": [("countryside","乡村"),("Thanksgiving","感恩节"),("roast turkey","烤火鸡"),("squirrel","松鼠"),("swan","天鹅"),("wild goose","大雁"),("frog","青蛙")],
"6b-u6": [("English-Chinese dictionary","英汉词典"),("shopping centre","购物中心"),("shopping mall","大型商业中心"),("amazing","令人惊奇的"),("hot pot","火锅")],
}

print("单元数:", len(UNITS))
total = sum(len(v) for v in WORDS.values())
print("单词总数:", total)

# ============ 读取现有词库(用node解析) ============
import subprocess, json
existing = {}
node_code = """
global.window = {};
const fs=require('fs');
eval(fs.readFileSync('assets/wordbank.js','utf8'));
const out=[];
for(const g of window.WORDBANK.groups){for(const w of g.words){out.push(w);}}
console.log(JSON.stringify(out));
"""
result = subprocess.run(["node","-e",node_code], cwd="/Users/ireton/DoubaoWork/AiTeacher", capture_output=True, text=True)
if result.returncode == 0:
    old_words = json.loads(result.stdout)
    for w in old_words:
        existing[w["w"].lower()] = w
    print("已有词库词数:", len(existing))
else:
    print("解析失败:", result.stderr)

# ============ 词性判断 ============
def guess_pos(zh, w):
    if any(zh.endswith(s) for s in ["的","地","得"]) and not any(c in zh for c in ["人","师","员","者","家","手"]):
        return "adj."
    if any(zh.endswith(s) for s in ["跑","跳","唱","看","听","说","读","写","玩","做","打","吃","喝","走","去","来","买","卖","给","拿","放","坐","站","睡","醒","哭","笑","想","知道","喜欢","帮助","学习","工作","教","画","唱","跳舞","游泳","骑","飞","爬","洗","打扫","整理","倒垃圾","浇花","遛狗","喂鱼","做饭","看电视","听音乐","读书","下棋","画画","唱歌","跳舞","游泳","骑自行车","放风筝","踢足球","堆雪人","做飞机模型","做运动","爬山","采摘水果","钓鱼","看电影","玩电脑游戏","看望祖父母","去绘画俱乐部","去野餐","去滑冰","去野营","做家务","拉小提琴","照相","划船","吃海鲜","滑雪","参观","旅游","旅行","发送","邮寄","写","打","制作","庆祝","种植","开始","学习","使用","出生","发明","画画","落下","带来","听见","居住","到达","迎接","谈论","品尝"]) or "动词" in zh:
        return "v."
    if any(zh.endswith(s) for s in ["地"]) or "副词" in zh:
        return "adv."
    if any(zh.endswith(s) for s in ["吗","呢","啊","吧"]) or "介词" in zh or "冠词" in zh or "代词" in zh or "连词" in zh or "数词" in zh or "感叹词" in zh:
        return "other"
    return "n."

# ============ 音节拆分(简单,返回数组) ============
def guess_sy(w):
    w = w.lower()
    if " " in w or "-" in w:
        return [w.replace("-", " ")]
    vowels = "aeiouy"
    parts = []
    cur = ""
    for ch in w:
        cur += ch
        if ch in vowels and len(cur) > 1:
            parts.append(cur)
            cur = ""
    if cur:
        if parts:
            parts[-1] += cur
        else:
            parts.append(cur)
    return parts if parts else [w]

# ============ 例句生成 ============
def gen_example(w, zh, pos):
    wl = w.lower()
    # 名词
    if pos == "n.":
        if any(c in zh for c in ["人","师","员","者","家","手","医生","老师","学生","司机","厨师","护士","农民","工人","警察","画家","科学家","诗人","作家","宇航员","发明家","志愿者"]):
            return [f"My {w} is very kind.", f"我的{zh}很善良。"]
        if any(c in zh for c in ["地方","城市","国家","公园","学校","医院","商店","书店","超市","餐馆","银行","邮局","图书馆","博物馆","体育场","广场","宾馆","车站","机场","花园","农场","森林","海洋","湖","河","山"]):
            return [f"I want to visit {w}.", f"我想去参观{zh}。"]
        if any(c in zh for c in ["动物","鸟","鱼","狗","猫","鸭","兔","蛇","龟","马","牛","猪","羊","蜜蜂","蝴蝶","熊猫","大象","老虎","猴子","企鹅","鲨鱼","鲸","袋鼠","考拉","松鼠","天鹅","青蛙","海狸","浣熊"]):
            return [f"The {w} is cute.", f"这只{zh}很可爱。"]
        if any(c in zh for c in ["食物","面包","蛋糕","水果","冰淇淋","土豆","西红柿","肉","可乐","米饭","面条","蔬菜","鱼","鸡肉","鸡蛋","汤","糖果","三明治","饺子","火锅","海鲜","热狗","汉堡","牛奶","果汁","水","茶","烤火鸡"]):
            return [f"I like {w}.", f"我喜欢{zh}。"]
        if any(c in zh for c in ["衣服","帽子","大衣","鞋","毛衣","夹克","手套","裤子","T恤","短裤","袜子","裙子","连衣裙","衬衫","围巾"]):
            return [f"I wear a {w}.", f"我穿着一件{zh}。"]
        return [f"I have a {w}.", f"我有一个{zh}。"]
    # 动词/动词短语
    if pos == "v.":
        if " " in wl:
            return [f"I often {w}.", f"我经常{zh}。"]
        return [f"I can {w}.", f"我会{zh}。"]
    # 形容词
    if pos == "adj.":
        return [f"It is {w}.", f"它很{zh}。"]
    # 其他
    return [f"This is {w}.", f"这是{zh}。"]

# ============ 用法讲解生成(适合小学生) ============
def gen_usage(w, zh, pos, co):
    """生成适合小学生理解的用法讲解，返回中文文本。"""
    wl = w.lower()
    # 提取非空搭配
    cos = [c[0] for c in (co or [["",""]]) if c and c[0]]
    co_str = "、".join(cos[:2]) if cos else ""

    if pos == "n.":
        # 名词
        if any(c in zh for c in ["人","师","员","者","家","手","医生","老师","学生","司机","厨师","护士","农民","工人","警察","画家","科学家","诗人","作家","宇航员","志愿者","总统"]):
            tip = f"「{w}」是名词，指一种职业或身份的人。"
            if co_str: tip += f"常见说法：{co_str}。"
            tip += f"比如可以说：He is a {w}. 他是一名{zh}。"
        elif any(c in zh for c in ["地方","城市","国家","公园","学校","医院","商店","书店","超市","餐馆","银行","邮局","图书馆","博物馆","体育场","广场","宾馆","车站","机场","花园","农场","森林","海洋","湖","河","山","乡村","闹市区"]):
            tip = f"「{w}」是名词，指一个地点或场所。"
            tip += f"表示在这个地方常用 at 或 in，比如：at the {w}（在{zh}）。"
        elif any(c in zh for c in ["动物","鸟","鱼","狗","猫","鸭","兔","蛇","龟","马","牛","猪","羊","蜜蜂","蝴蝶","熊猫","大象","老虎","猴子","企鹅","鲨鱼","鲸","袋鼠","考拉","松鼠","天鹅","青蛙","海狸","浣熊","昆虫","爬行动物","哺乳动物"]):
            tip = f"「{w}」是名词，指一种动物。"
            tip += f"表示一只用 a，多只加 s，比如：a {w}（一只{zh}）。"
        elif any(c in zh for c in ["食物","面包","蛋糕","水果","冰淇淋","土豆","西红柿","肉","可乐","米饭","面条","蔬菜","鸡肉","鸡蛋","汤","糖果","三明治","饺子","火锅","牛奶","果汁","水","茶","烤火鸡","早茶"]):
            tip = f"「{w}」是名词，指一种食物或饮料。"
            tip += f"可以说 I like {w}. 我喜欢{zh}。"
            if co_str: tip += f"常见搭配：{co_str}。"
        elif any(c in zh for c in ["衣服","帽子","大衣","鞋","毛衣","夹克","手套","裤子","T恤","短裤","袜子","裙子","连衣裙","衬衫","围巾"]):
            tip = f"「{w}」是名词，指一件衣物。"
            tip += f"表示穿着用 wear，比如：wear a {w}（穿{zh}）。"
        elif any(c in zh for c in ["月","一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]):
            tip = f"「{w}」是名词，指月份。注意月份首字母要大写！"
            tip += f"在某个月用 in，比如：in {w}（在{zh}）。"
        elif any(c in zh for c in ["学科","语文","英语","科学","体育","音乐","数学","美术"]):
            tip = f"「{w}」是名词，指一门学科。"
            tip += f"可以说 I like {w}. 我喜欢{zh}课。"
        else:
            tip = f"「{w}」是名词，表示「{zh}」。"
            tip += f"可以说 I have a {w}. 我有一个{zh}。"
            if co_str: tip += f"常见搭配：{co_str}。"
    elif pos == "v.":
        # 动词
        if " " in wl:
            tip = f"「{w}」是动词短语，意思是「{zh}」。"
            tip += f"可以说 I often {w}. 我经常{zh}。"
        else:
            tip = f"「{w}」是动词，表示「{zh}」这个动作。"
            tip += f"可以说 I can {w}. 我会{zh}。"
            if co_str: tip += f"常见搭配：{co_str}。"
    elif pos == "adj.":
        # 形容词
        tip = f"「{w}」是形容词，用来形容人或事物「{zh}」。"
        tip += f"放在 be 动词后面，比如：It is {w}. 它很{zh}。"
        if co_str: tip += f"常见说法：{co_str}。"
    elif pos == "adv.":
        tip = f"「{w}」是副词，用来修饰动作，表示「{zh}」。"
        tip += f"通常放在动词后面，比如：He gets up {w}. 他{zh}起床。"
    elif pos == "num.":
        tip = f"「{w}」是数词，表示数字「{zh}」。"
        tip += f"用来数数，比如：{w} apples. {zh}个苹果。"
    elif pos == "pron.":
        tip = f"「{w}」是代词，用来代替人或事物，表示「{zh}」。"
        tip += f"放在名词前面，比如：{w} book. {zh}书。"
    else:
        tip = f"「{w}」表示「{zh}」。"
        tip += f"在句子中根据语境使用。"

    return tip

# ============ emoji 选择 ============
EMOJI_MAP = {
    "3a-u1":"👋","3a-u2":"🧍","3a-u3":"🍽️","3a-u4":"🐾","3a-u5":"👕","3a-u6":"🎂",
    "3b-u1":"📚","3b-u2":"🏫","3b-u3":"🎨","3b-u4":"👨‍👩‍👧","3b-u5":"🏠","3b-u6":"🛋️",
    "4a-u1":"⚽","4a-u2":"🌳","4a-u3":"🚌","4a-u4":"✋","4a-u5":"⚠️","4a-u6":"👷",
    "4b-u1":"🏘️","4b-u2":"🏙️","4b-u3":"✈️","4b-u4":"🎯","4b-u5":"🎮","4b-u6":"🌍",
    "5a-u1":"⭐","5a-u2":"🤔","5a-u3":"🦁","5a-u4":"🛒","5a-u5":"📺","5a-u6":"🧹",
    "5b-u1":"💪","5b-u2":"🎉","5b-u3":"📱","5b-u4":"📅","5b-u5":"🏖️","5b-u6":"🌱",
    "6a-u1":"🇨🇳","6a-u2":"🗺️","6a-u3":"🐋","6a-u4":"😊","6a-u5":"🏆","6a-u6":"❄️",
    "6b-u1":"🍁","6b-u2":"🏛️","6b-u3":"☀️","6b-u4":"🏒","6b-u5":"🦃","6b-u6":"🌞",
}
WORD_EMOJI = {
    "cat":"🐱","dog":"🐶","duck":"🦆","rabbit":"🐰","snake":"🐍","turtle":"🐢","bird":"🐦","monkey":"🐵","tiger":"🐯","elephant":"🐘","panda":"🐼","horse":"🐴","cow":"🐮","pig":"🐷","sheep":"🐑","bee":"🐝","butterfly":"🦋","penguin":"🐧","shark":"🦈","whale":"🐋","kangaroo":"🦘","koala":"🐨","squirrel":"🐿️","swan":"🦢","frog":"🐸","beaver":"🦫","raccoon":"🦝","fish":"🐟",
    "bread":"🍞","cake":"🍰","fruit":"🍎","ice-cream":"🍦","potato":"🥔","tomato":"🍅","meat":"🥩","cola":"🥤","rice":"🍚","noodles":"🍜","vegetables":"🥬","chicken":"🍗","egg":"🥚","soup":"🍲","candy":"🍬","sandwich":"🥪","dumpling":"🥟","hot pot":"🍲","milk":"🥛","juice":"🧃","water":"💧","tea":"🍵",
    "cap":"🧢","coat":"🧥","shoes":"👟","sweater":"🧶","jacket":"🧥","gloves":"🧤","trousers":"👖","T-shirt":"👕","shorts":"🩳","socks":"🧦","skirt":"👗","dress":"👗","shirt":"👔","scarf":"🧣",
    "football":"⚽","basketball":"🏀","ping-pong":"🏓","swim":"🏊","running":"🏃","swimming":"🏊",
    "January":"📅","February":"📅","March":"📅","April":"📅","May":"📅","June":"📅","July":"📅","August":"📅","September":"📅","October":"📅","November":"📅","December":"📅","birthday":"🎂","party":"🎉",
    "school":"🏫","classroom":"🏫","library":"📚","playground":"🛝","bedroom":"🛏️","kitchen":"🍳","bathroom":"🚿","living room":"🛋️","home":"🏠",
    "doctor":"👨‍⚕️","nurse":"👩‍⚕️","teacher":"👨‍🏫","cook":"👨‍🍳","farmer":"👨‍🌾","worker":"👷","driver":"🚗","scientist":"👨‍🔬","artist":"👨‍🎨","poet":"📖","writer":"✍️","astronaut":"👨‍🚀",
    "China":"🇨🇳","Canada":"🇨🇦","Australia":"🇦🇺","the UK":"🇬🇧","the USA":"🇺🇸","London":"🇬🇧","Sydney":"🇦🇺","Africa":"🌍","Asia":"🌏",
}

def get_emoji(w, uid):
    if w.lower() in WORD_EMOJI:
        return WORD_EMOJI[w.lower()]
    return EMOJI_MAP.get(uid, "📖")

# ============ 生成词库 ============
groups = []
new_count = 0
reuse_count = 0
for uid, uname, grade, uem in UNITS:
    words = []
    for w, zh in WORDS.get(uid, []):
        wl = w.lower()
        if wl in existing:
            e = existing[wl]
            pos = e.get("pos","") or guess_pos(zh, w)
            co = e.get("co", [["",""]])
            us = gen_usage(w, zh or e.get("zh",""), pos, co)
            words.append({"w":e["w"],"p":e.get("p",""),"pos":pos,"zh":zh or e.get("zh",""),"sy":e.get("sy",[w]),"ex":e.get("ex",["",""]),"co":co,"em":e.get("em","📖"),"us":us})
            reuse_count += 1
        else:
            pos = guess_pos(zh, w)
            sy = guess_sy(w)
            ex = gen_example(w, zh, pos)
            co = [["",""]]  # 搭配留空
            em = get_emoji(w, uid)
            us = gen_usage(w, zh, pos, co)
            words.append({"w":w,"p":"","pos":pos,"zh":zh,"sy":sy,"ex":ex,"co":co,"em":em,"us":us})
            new_count += 1
    groups.append({"id":uid,"name":uname,"grade":grade,"em":uem,"words":words})

print(f"复用已有词: {reuse_count}, 新增词: {new_count}")

# ============ 输出 JS(匹配原格式) ============
def js_str(s):
    if s is None: return ""
    return str(s).replace("\\","\\\\").replace('"','\\"').replace("\n","\\n")

def js_arr(arr):
    return "[" + ",".join(f'"{js_str(x)}"' for x in arr) + "]"

def js_arr2(arr):
    return "[" + ",".join(js_arr(x) for x in arr) + "]"

lines = []
lines.append("/* ============================================================")
lines.append(" * AI 教师 · 小学英语单词库（wordbank.js）")
lines.append(" * 人教版新起点(一年级起点)三上~六下，按教材单元分组。")
lines.append(" * 字段：w单词 p音标 pos词性 zh中文 sy音节拆分 ex例句[英,中] co搭配[[英,中]] us用法讲解 em联想emoji")
lines.append(" * 供 英语/words/index.html 单词学习模块使用")
lines.append(" * ============================================================ */")
lines.append("window.WORDBANK = {")
lines.append('  title: "人教版新起点小学英语词汇",')
lines.append("  groups: [")
for g in groups:
    lines.append('    {"id":"' + g["id"] + '","name":"' + js_str(g["name"]) + '","grade":"' + g["grade"] + '","em":"' + g["em"] + '","words":[')
    for w in g["words"]:
        lines.append('      {"w":"' + js_str(w["w"]) + '","p":"' + js_str(w["p"]) + '","pos":"' + w["pos"] + '","zh":"' + js_str(w["zh"]) + '","sy":' + js_arr(w["sy"]) + ',"ex":' + js_arr(w["ex"]) + ',"co":' + js_arr2(w["co"]) + ',"us":"' + js_str(w["us"]) + '","em":"' + w["em"] + '"},')
    lines.append("    ]},")
lines.append("  ]")
lines.append("};")

out = "\n".join(lines)
out_path = "/Users/ireton/DoubaoWork/AiTeacher/assets/wordbank.js"
with open(out_path, "w", encoding="utf-8") as f:
    f.write(out)
print(f"已写入 {out_path}, 共 {sum(len(g['words']) for g in groups)} 词")
