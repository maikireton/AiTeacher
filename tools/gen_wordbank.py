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
# ============ 常见词词性+例句硬编码映射(覆盖规则判断的不足) ============
# format: word_lower -> (pos, example_en, example_zh)
POS_EX_OVERRIDE = {
    # 副词
    "also": ("adv.", "I also like apples.", "我也喜欢苹果。"),
    "too": ("adv.", "Me too!", "我也是！"),
    "very": ("adv.", "She is very happy.", "她非常高兴。"),
    "really": ("adv.", "I really like it.", "我真的很喜欢它。"),
    "so": ("adv.", "It is so cute.", "它太可爱了。"),
    "quite": ("adv.", "It is quite cold today.", "今天相当冷。"),
    "more": ("adv.", "I want more.", "我想要更多。"),
    "less": ("adv.", "Eat less candy.", "少吃点糖。"),
    "always": ("adv.", "He always gets up early.", "他总是早起。"),
    "usually": ("adv.", "I usually go to school by bus.", "我通常乘公交车上学。"),
    "often": ("adv.", "She often reads books.", "她经常读书。"),
    "sometimes": ("adv.", "Sometimes I play football.", "有时我踢足球。"),
    "never": ("adv.", "I never eat carrots.", "我从不吃胡萝卜。"),
    "always": ("adv.", "He always gets up early.", "他总是早起。"),
    "early": ("adv.", "I go to bed early.", "我睡得早。"),
    "late": ("adv.", "Don't be late for school.", "上学别迟到。"),
    "fast": ("adv.", "He runs fast.", "他跑得很快。"),
    "together": ("adv.", "Let's play together.", "我们一起玩吧。"),
    "again": ("adv.", "Please say it again.", "请再说一遍。"),
    "still": ("adv.", "He is still sleeping.", "他还在睡觉。"),
    "just": ("adv.", "I just got home.", "我刚到家。"),
    "only": ("adv.", "I only have one.", "我只有一个。"),
    "already": ("adv.", "I have already eaten.", "我已经吃过了。"),
    "almost": ("adv.", "We are almost there.", "我们快到了。"),
    "maybe": ("adv.", "Maybe it will rain.", "也许会下雨。"),
    "perhaps": ("adv.", "Perhaps you are right.", "也许你是对的。"),
    "here": ("adv.", "Come here!", "过来！"),
    "there": ("adv.", "The book is over there.", "书在那边。"),
    "now": ("adv.", "Let's go now.", "我们现在走吧。"),
    "then": ("adv.", "Then we went home.", "然后我们回家了。"),
    "today": ("adv.", "Today is Monday.", "今天是星期一。"),
    "tomorrow": ("adv.", "See you tomorrow.", "明天见。"),
    "yesterday": ("adv.", "I saw him yesterday.", "我昨天见过他。"),
    "soon": ("adv.", "See you soon.", "回头见。"),
    "later": ("adv.", "See you later.", "回头见。"),
    "before": ("adv./prep.", "Wash your hands before dinner.", "饭前洗手。"),
    "after": ("adv./prep.", "Let's play after school.", "放学后我们玩吧。"),
    "once": ("adv.", "I have been there once.", "我去过那里一次。"),
    "twice": ("adv.", "I exercise twice a week.", "我一周锻炼两次。"),
    # 介词/介词短语
    "across from": ("prep.", "The bank is across from the park.", "银行在公园对面。"),
    "next to": ("prep.", "The shop is next to the school.", "商店在学校旁边。"),
    "between": ("prep.", "The cat is between the dogs.", "猫在两只狗中间。"),
    "by bus": ("prep.", "I go to school by bus.", "我乘公交车上学。"),
    "by car": ("prep.", "He goes to work by car.", "他开车上班。"),
    "by bike": ("prep.", "She goes home by bike.", "她骑自行车回家。"),
    "by taxi": ("prep.", "Let's go by taxi.", "我们坐出租车去吧。"),
    "by subway": ("prep.", "I go to the zoo by subway.", "我乘地铁去动物园。"),
    "by plane": ("prep.", "We travel by plane.", "我们乘飞机旅行。"),
    "by train": ("prep.", "He goes to Beijing by train.", "他乘火车去北京。"),
    "by boat": ("prep.", "We cross the river by boat.", "我们乘船过河。"),
    "by ship": ("prep.", "They go to Japan by ship.", "他们乘船去日本。"),
    "on foot": ("prep.", "I go to school on foot.", "我步行上学。"),
    "on the weekend": ("prep.", "I often play on the weekend.", "我周末经常玩。"),
    "at least": ("prep.", "Eat at least one apple.", "至少吃一个苹果。"),
    "out of": ("prep.", "He ran out of the room.", "他跑出了房间。"),
    "into": ("prep.", "Come into the room.", "进房间来。"),
    "around": ("prep./adv.", "We walk around the park.", "我们在公园周围散步。"),
    "all over": ("prep.", "People all over the world love it.", "全世界的人都喜欢它。"),
    # 连词
    "because": ("conj.", "I like it because it is fun.", "我喜欢它因为它有趣。"),
    "and": ("conj.", "You and I are friends.", "你和我是朋友。"),
    "but": ("conj.", "I like cats but not dogs.", "我喜欢猫但不喜欢狗。"),
    "or": ("conj.", "Tea or coffee?", "喝茶还是咖啡？"),
    "if": ("conj.", "If it rains, stay home.", "如果下雨就待在家里。"),
    "so": ("conj.", "I was tired, so I slept.", "我累了，所以睡了。"),
    "than": ("conj.", "He is taller than me.", "他比我高。"),
    "as": ("conj.", "Do as I say.", "照我说的做。"),
    # 代词
    "my": ("pron.", "This is my book.", "这是我的书。"),
    "your": ("pron.", "Is this your pen?", "这是你的钢笔吗？"),
    "our": ("pron.", "This is our classroom.", "这是我们的教室。"),
    "their": ("pron.", "Their house is big.", "他们的房子很大。"),
    "his": ("pron.", "His name is Tom.", "他的名字叫汤姆。"),
    "her": ("pron.", "Her dress is red.", "她的裙子是红色的。"),
    "this": ("pron.", "This is a cat.", "这是一只猫。"),
    "that": ("pron.", "That is a dog.", "那是一只狗。"),
    "these": ("pron.", "These are my books.", "这些是我的书。"),
    "those": ("pron.", "Those are birds.", "那些是鸟。"),
    "we": ("pron.", "We are students.", "我们是学生。"),
    "they": ("pron.", "They are happy.", "他们很高兴。"),
    "everyone": ("pron.", "Everyone is here.", "大家都在。"),
    "everything": ("pron.", "Everything is ready.", "一切都准备好了。"),
    "myself": ("pron.", "I can do it myself.", "我自己能做。"),
    # 疑问词
    "how": ("adv.", "How are you?", "你好吗？"),
    "what": ("pron.", "What is this?", "这是什么？"),
    "where": ("adv.", "Where is my bag?", "我的包在哪里？"),
    "when": ("adv.", "When is your birthday?", "你的生日是什么时候？"),
    "why": ("adv.", "Why are you crying?", "你为什么哭？"),
    "which": ("pron.", "Which one do you like?", "你喜欢哪一个？"),
    "who": ("pron.", "Who is he?", "他是谁？"),
    "how old": ("adv.", "How old are you?", "你几岁了？"),
    "how much": ("adv.", "How much is it?", "这个多少钱？"),
    # 数词
    "first": ("num.", "January is the first month.", "一月是第一个月。"),
    "second": ("num.", "February is the second month.", "二月是第二个月。"),
    "third": ("num.", "March is the third month.", "三月是第三个月。"),
    "fifth": ("num.", "May is the fifth month.", "五月是第五个月。"),
    "tenth": ("num.", "October is the tenth month.", "十月是第十个月。"),
    "twelfth": ("num.", "December is the twelfth month.", "十二月是第十二个月。"),
    "fifteenth": ("num.", "Today is the fifteenth.", "今天是十五号。"),
    "twenty-fifth": ("num.", "Christmas is on the twenty-fifth.", "圣诞节在二十五号。"),
    # 其他常见词
    "please": ("adv.", "Please sit down.", "请坐。"),
    "sorry": ("adj.", "I am sorry.", "对不起。"),
    "excuse me": ("interj.", "Excuse me, where is the toilet?", "请问洗手间在哪里？"),
    "be careful": ("interj.", "Be careful! The car is coming.", "当心！车来了。"),
    "no": ("adv.", "No, I don't.", "不，我不。"),
    "yes": ("adv.", "Yes, I do.", "是的，我是。"),
    "ok": ("adv.", "OK, let's go.", "好的，我们走吧。"),
    "great": ("adj.", "That's great!", "太棒了！"),
    "wonderful": ("adj.", "It's a wonderful day.", "美好的一天。"),
    "fantastic": ("adj.", "You did a fantastic job!", "你做得太棒了！"),
    "cool": ("adj.", "That's cool!", "太酷了！"),
    "amazing": ("adj.", "What an amazing view!", "多么令人惊奇的景色！"),
    "boring": ("adj.", "The movie is boring.", "这部电影很无聊。"),
    "delicious": ("adj.", "The cake is delicious.", "蛋糕很好吃。"),
    "famous": ("adj.", "He is a famous singer.", "他是一位著名的歌手。"),
    "special": ("adj.", "Today is a special day.", "今天是特别的一天。"),
    "different": ("adj.", "We have different hobbies.", "我们有不同的爱好。"),
    "popular": ("adj.", "This song is popular.", "这首歌很流行。"),
    "active": ("adj.", "She is an active girl.", "她是个活泼的女孩。"),
    "clever": ("adj.", "The monkey is clever.", "猴子很聪明。"),
    "smart": ("adj.", "Dolphins are smart.", "海豚很聪明。"),
    "cute": ("adj.", "The panda is cute.", "熊猫很可爱。"),
    "friendly": ("adj.", "She is friendly to everyone.", "她对每个人都很友好。"),
    "helpful": ("adj.", "He is helpful at home.", "他在家很能干。"),
    "polite": ("adj.", "Be polite to others.", "对人要有礼貌。"),
    "quiet": ("adj.", "Please be quiet.", "请安静。"),
    "careless": ("adj.", "Don't be careless.", "别粗心。"),
    "slim": ("adj.", "She is slim and tall.", "她又瘦又高。"),
    "curly": ("adj.", "She has curly hair.", "她有卷发。"),
    "straight": ("adj.", "He has straight hair.", "他有直发。"),
    "young": ("adj.", "She is young.", "她很年轻。"),
    "handsome": ("adj.", "He is handsome.", "他很英俊。"),
    "beautiful": ("adj.", "The flower is beautiful.", "花很漂亮。"),
    "pretty": ("adj.", "She is pretty.", "她很漂亮。"),
    "lovely": ("adj.", "What a lovely dog!", "多可爱的狗啊！"),
    "dangerous": ("adj.", "It is dangerous to play with fire.", "玩火很危险。"),
    "safe": ("adj.", "It is safe here.", "这里很安全。"),
    "busy": ("adj.", "He is busy today.", "他今天很忙。"),
    "free": ("adj.", "Are you free tonight?", "你今晚有空吗？"),
    "dirty": ("adj.", "Your hands are dirty.", "你的手脏了。"),
    "wet": ("adj.", "The floor is wet.", "地板是湿的。"),
    "broken": ("adj.", "The cup is broken.", "杯子碎了。"),
    "foggy": ("adj.", "It is foggy today.", "今天有雾。"),
    "spicy": ("adj.", "The food is spicy.", "这食物很辣。"),
    "ill": ("adj.", "She is ill today.", "她今天病了。"),
    "sick": ("adj.", "He is sick.", "他生病了。"),
    "tired": ("adj.", "I am tired.", "我累了。"),
    "sleepy": ("adj.", "I feel sleepy.", "我困了。"),
    "sad": ("adj.", "She is sad.", "她很难过。"),
    "happy": ("adj.", "I am happy today.", "我今天很高兴。"),
    "angry": ("adj.", "He is angry.", "他生气了。"),
    "scared": ("adj.", "I am scared of dogs.", "我怕狗。"),
    "worried": ("adj.", "Don't be worried.", "别担心。"),
    "proud": ("adj.", "I am proud of you.", "我为你骄傲。"),
    "excited": ("adj.", "I am excited about the trip.", "我对旅行感到兴奋。"),
    "pity": ("n.", "What a pity!", "真遗憾！"),
    "prize": ("n.", "She won a prize.", "她赢了一个奖。"),
    "habit": ("n.", "Reading is a good habit.", "阅读是个好习惯。"),
    "idea": ("n.", "I have a good idea.", "我有个好主意。"),
    "advice": ("n.", "Can you give me some advice?", "你能给我一些建议吗？"),
    "story": ("n.", "Tell me a story.", "给我讲个故事。"),
    "poem": ("n.", "He wrote a poem.", "他写了一首诗。"),
    "invention": ("n.", "The phone is a great invention.", "电话是一项伟大的发明。"),
    "university": ("n.", "He goes to university.", "他上大学。"),
    "competition": ("n.", "She won the competition.", "她赢了比赛。"),
    "test": ("n.", "We have a math test today.", "我们今天有数学测验。"),
    "race": ("n.", "He won the race.", "他赢了比赛。"),
    "mark": ("n.", "He got a good mark.", "他得了好分数。"),
    "subject": ("n.", "English is my favorite subject.", "英语是我最喜欢的学科。"),
    "transportation": ("n.", "I like public transportation.", "我喜欢公共交通。"),
    "neighbourhood": ("n.", "I like my neighbourhood.", "我喜欢我的社区。"),
    "information": ("n.", "I need more information.", "我需要更多信息。"),
    "safety": ("n.", "Safety first!", "安全第一！"),
    "future": ("n.", "What do you want in the future?", "你将来想做什么？"),
    "vacation": ("n.", "I love summer vacation.", "我喜欢暑假。"),
    "hobby": ("n.", "My hobby is reading.", "我的爱好是读书。"),
    "country": ("n.", "China is a big country.", "中国是个大国。"),
    "president": ("n.", "He is the president.", "他是总统。"),
    "kind": ("n.", "What kind of animal is it?", "它是哪种动物？"),
    "metre": ("n.", "He is two metres tall.", "他两米高。"),
    "fan": ("n.", "I am a football fan.", "我是个足球迷。"),
    "top": ("n.", "The top of the mountain.", "山顶。"),
    "downtown": ("n.", "Let's go downtown.", "我们去市中心吧。"),
    "countryside": ("n.", "I live in the countryside.", "我住在乡下。"),
    "wardrobe": ("n.", "My clothes are in the wardrobe.", "我的衣服在衣柜里。"),
    "airport": ("n.", "I will meet you at the airport.", "我在机场接你。"),
    "pupil": ("n.", "He is a pupil.", "他是个小学生。"),
    "volunteer": ("n.", "She is a volunteer.", "她是个志愿者。"),
    "sandwich": ("n.", "I eat a sandwich for lunch.", "我午饭吃三明治。"),
    "hockey": ("n.", "They play hockey in winter.", "他们冬天打曲棍球。"),
    "beaver": ("n.", "The beaver is Canada's animal.", "海狸是加拿大的代表动物。"),
    "raccoon": ("n.", "The raccoon is cute.", "浣熊很可爱。"),
    "moose": ("n.", "The moose is big.", "北美麋很大。"),
    "squirrel": ("n.", "The squirrel eats nuts.", "松鼠吃坚果。"),
    "swan": ("n.", "The swan is white.", "天鹅是白色的。"),
    "frog": ("n.", "The frog can jump.", "青蛙会跳。"),
    "turkey": ("n.", "We eat turkey on Thanksgiving.", "我们感恩节吃火鸡。"),
    "dumpling": ("n.", "I like dumplings.", "我喜欢饺子。"),
    "hot pot": ("n.", "Let's eat hot pot.", "我们吃火锅吧。"),
    "name": ("n.", "My name is Tom.", "我叫汤姆。"),
    "year": ("n.", "I am eight years old.", "我八岁了。"),
    "class": ("n.", "I am in Class One.", "我在一班。"),
    "grade": ("n.", "I am in Grade Three.", "我在三年级。"),
    "age": ("n.", "What's your age?", "你几岁了？"),
    "buy": ("v.", "I want to buy a book.", "我想买一本书。"),
    "dear": ("adj.", "Dear friend,", "亲爱的朋友，"),
    "old": ("adj.", "How old are you?", "你几岁了？"),
    "new": ("adj.", "I have a new bag.", "我有一个新书包。"),
    "bad": ("adj.", "The weather is bad today.", "今天天气不好。"),
    "small": ("adj.", "The mouse is small.", "老鼠很小。"),
    "big": ("adj.", "The elephant is big.", "大象很大。"),
    "long": ("adj.", "The snake is long.", "蛇很长。"),
    "short": ("adj.", "My hair is short.", "我的头发短。"),
    "body": ("n.", "Take care of your body.", "照顾好你的身体。"),
    "head": ("n.", "My head hurts.", "我头疼。"),
    "hair": ("n.", "She has long hair.", "她有长头发。"),
    "arm": ("n.", "I hurt my arm.", "我胳膊受伤了。"),
    "hand": ("n.", "Wash your hands.", "洗手。"),
    "leg": ("n.", "My leg hurts.", "我腿疼。"),
    "foot": ("n.", "My foot hurts.", "我脚疼。"),
    "face": ("n.", "Wash your face.", "洗脸。"),
    "eye": ("n.", "I have two eyes.", "我有两只眼睛。"),
    "nose": ("n.", "I have a nose.", "我有一个鼻子。"),
    "mouth": ("n.", "Open your mouth.", "张开嘴。"),
    "ear": ("n.", "I have two ears.", "我有两只耳朵。"),
    "morning": ("n.", "Good morning!", "早上好！"),
    "afternoon": ("n.", "Good afternoon!", "下午好！"),
    "bread": ("n.", "I eat bread for breakfast.", "我早餐吃面包。"),
    "cake": ("n.", "I like birthday cake.", "我喜欢生日蛋糕。"),
    "fruit": ("n.", "I eat fruit every day.", "我每天吃水果。"),
    "ice-cream": ("n.", "I love ice cream.", "我喜欢冰淇淋。"),
    "potato": ("n.", "I like potatoes.", "我喜欢土豆。"),
    "tomato": ("n.", "The tomato is red.", "西红柿是红色的。"),
    "meat": ("n.", "I eat meat every day.", "我每天吃肉。"),
    "cola": ("n.", "Don't drink too much cola.", "别喝太多可乐。"),
    "rice": ("n.", "I eat rice every day.", "我每天吃米饭。"),
    "noodles": ("n.", "I like noodles.", "我喜欢面条。"),
    "vegetables": ("n.", "Eat more vegetables.", "多吃蔬菜。"),
    "fish": ("n.", "I like fish.", "我喜欢鱼。"),
    "chicken": ("n.", "I like chicken.", "我喜欢鸡肉。"),
    "egg": ("n.", "I eat an egg every day.", "我每天吃一个鸡蛋。"),
    "duck": ("n.", "The duck can swim.", "鸭子会游泳。"),
    "rabbit": ("n.", "The rabbit is white.", "兔子是白色的。"),
    "pet": ("n.", "I have a pet dog.", "我有一只宠物狗。"),
    "snake": ("n.", "The snake is long.", "蛇很长。"),
    "turtle": ("n.", "The turtle is slow.", "乌龟很慢。"),
    "tail": ("n.", "The dog has a tail.", "狗有尾巴。"),
    "cap": ("n.", "I wear a cap.", "我戴帽子。"),
    "coat": ("n.", "I wear a coat in winter.", "我冬天穿大衣。"),
    "shoes": ("n.", "I wear new shoes.", "我穿新鞋。"),
    "sweater": ("n.", "I wear a sweater.", "我穿毛衣。"),
    "jacket": ("n.", "This is my jacket.", "这是我的夹克。"),
    "gloves": ("n.", "I wear gloves in winter.", "我冬天戴手套。"),
    "trousers": ("n.", "I wear blue trousers.", "我穿蓝裤子。"),
    "T-shirt": ("n.", "I wear a T-shirt.", "我穿T恤。"),
    "shorts": ("n.", "I wear shorts in summer.", "我夏天穿短裤。"),
    "socks": ("n.", "I wear white socks.", "我穿白袜子。"),
    "skirt": ("n.", "She wears a skirt.", "她穿裙子。"),
    "dress": ("n.", "She wears a red dress.", "她穿红裙子。"),
    "shirt": ("n.", "He wears a white shirt.", "他穿白衬衫。"),
    "birthday": ("n.", "Happy birthday!", "生日快乐！"),
    "party": ("n.", "We have a birthday party.", "我们开生日派对。"),
    "school": ("n.", "I go to school every day.", "我每天上学。"),
    "classroom": ("n.", "Our classroom is big.", "我们的教室很大。"),
    "library": ("n.", "I read books in the library.", "我在图书馆读书。"),
    "toilet": ("n.", "Where is the toilet?", "洗手间在哪里？"),
    "playground": ("n.", "We play on the playground.", "我们在操场玩。"),
    "floor": ("n.", "The floor is clean.", "地板很干净。"),
    "room": ("n.", "This is my room.", "这是我的房间。"),
    "family": ("n.", "I love my family.", "我爱我的家人。"),
    "uncle": ("n.", "My uncle is tall.", "我叔叔很高。"),
    "aunt": ("n.", "My aunt is kind.", "我阿姨很善良。"),
    "cousin": ("n.", "My cousin is my age.", "我表弟和我同岁。"),
    "grandfather": ("n.", "My grandfather is old.", "我爷爷年纪大了。"),
    "grandmother": ("n.", "My grandmother is kind.", "我奶奶很善良。"),
    "father": ("n.", "My father is a doctor.", "我爸爸是医生。"),
    "mother": ("n.", "My mother is a teacher.", "我妈妈是老师。"),
    "brother": ("n.", "I have a brother.", "我有一个哥哥。"),
    "sister": ("n.", "I have a sister.", "我有一个姐姐。"),
    "home": ("n.", "I go home at 5.", "我五点回家。"),
    "bedroom": ("n.", "This is my bedroom.", "这是我的卧室。"),
    "living room": ("n.", "We watch TV in the living room.", "我们在客厅看电视。"),
    "bathroom": ("n.", "I wash in the bathroom.", "我在浴室洗漱。"),
    "dining room": ("n.", "We eat in the dining room.", "我们在餐厅吃饭。"),
    "study": ("n.", "I read in the study.", "我在书房读书。"),
    "kitchen": ("n.", "Mom cooks in the kitchen.", "妈妈在厨房做饭。"),
    "sofa": ("n.", "I sit on the sofa.", "我坐在沙发上。"),
    "light": ("n.", "Turn on the light.", "开灯。"),
    "bed": ("n.", "I sleep in the bed.", "我在床上睡觉。"),
    "door": ("n.", "Close the door.", "关门。"),
    "box": ("n.", "The box is big.", "盒子很大。"),
    "running": ("n.", "I like running.", "我喜欢跑步。"),
    "basketball": ("n.", "I play basketball.", "我打篮球。"),
    "interesting": ("adj.", "The book is interesting.", "这本书很有趣。"),
    "garden": ("n.", "We play in the garden.", "我们在花园玩。"),
    "gate": ("n.", "Wait at the gate.", "在门口等。"),
    "film": ("n.", "Let's watch a film.", "我们看电影吧。"),
    "pen": ("n.", "I have a pen.", "我有一支钢笔。"),
    "knife": ("n.", "Use a knife carefully.", "小心用刀。"),
    "eraser": ("n.", "I need an eraser.", "我需要一块橡皮。"),
    "crayon": ("n.", "I draw with crayons.", "我用蜡笔画画。"),
    "scissors": ("n.", "Use scissors carefully.", "小心用剪刀。"),
    "paper": ("n.", "I write on paper.", "我在纸上写字。"),
    "use": ("v.", "Can I use your pen?", "我能用你的钢笔吗？"),
    "phone": ("n.", "I have a phone.", "我有一个电话。"),
    "shop": ("n.", "I go to the shop.", "我去商店。"),
    "nurse": ("n.", "She is a nurse.", "她是护士。"),
    "cook": ("n.", "He is a cook.", "他是厨师。"),
    "doctor": ("n.", "He is a doctor.", "他是医生。"),
    "farmer": ("n.", "He is a farmer.", "他是农民。"),
    "worker": ("n.", "He is a worker.", "他是工人。"),
    "sound": ("v.", "That sounds good.", "那听起来不错。"),
    "job": ("n.", "What's your job?", "你做什么工作？"),
    "people": ("n.", "There are many people.", "有很多人。"),
    "sick": ("adj.", "He is sick.", "他生病了。"),
    "restaurant": ("n.", "We eat at a restaurant.", "我们在餐馆吃饭。"),
    "post office": ("n.", "The post office is near.", "邮局在附近。"),
    "bank": ("n.", "The bank is open.", "银行开门了。"),
    "grocery": ("n.", "I shop at the grocery.", "我在杂货店购物。"),
    "crossroads": ("n.", "Turn left at the crossroads.", "在十字路口左转。"),
    "neighbourhood": ("n.", "I like my neighbourhood.", "我喜欢我的社区。"),
    "send": ("v.", "I send an email.", "我发电子邮件。"),
    "get": ("v.", "I get up at 7.", "我七点起床。"),
    "money": ("n.", "I have some money.", "我有一些钱。"),
    "leave": ("v.", "I leave home at 8.", "我八点出门。"),
    "toy": ("n.", "I have many toys.", "我有很多玩具。"),
    "hospital": ("n.", "The hospital is big.", "医院很大。"),
    "bookshop": ("n.", "I buy books at the bookshop.", "我在书店买书。"),
    "supermarket": ("n.", "I shop at the supermarket.", "我在超市购物。"),
    "city": ("n.", "Beijing is a big city.", "北京是个大城市。"),
    "street": ("n.", "The street is busy.", "街道很热闹。"),
    "hotel": ("n.", "We stay at a hotel.", "我们住酒店。"),
    "square": ("n.", "We play in the square.", "我们在广场玩。"),
    "station": ("n.", "The train station is near.", "火车站在附近。"),
    "place": ("n.", "This is a good place.", "这是个好地方。"),
    "stay": ("v.", "I stay at home.", "我待在家里。"),
    "star": ("n.", "I see many stars.", "我看到很多星星。"),
    "king": ("n.", "The king is kind.", "国王很善良。"),
    "museum": ("n.", "We visit the museum.", "我们参观博物馆。"),
    "dream": ("n.", "I have a dream.", "我有一个梦想。"),
    "sea": ("n.", "The sea is blue.", "大海是蓝色的。"),
    "travel": ("v.", "I love to travel.", "我喜欢旅行。"),
    "reading": ("n.", "Reading is fun.", "读书很有趣。"),
    "singing": ("n.", "Singing makes me happy.", "唱歌让我开心。"),
    "dancing": ("n.", "She loves dancing.", "她喜欢跳舞。"),
    "stamp": ("n.", "I collect stamps.", "我集邮。"),
    "catch": ("v.", "Catch the ball!", "接住球！"),
    "talk": ("v.", "Don't talk in class.", "上课别说话。"),
    "all": ("pron.", "All are here.", "大家都在。"),
    "bark": ("v.", "The dog barks.", "狗叫。"),
    "forget": ("v.", "Don't forget your homework.", "别忘了作业。"),
    "guess": ("v.", "Can you guess?", "你能猜到吗？"),
    "has": ("v.", "She has a cat.", "她有一只猫。"),
    "farm": ("n.", "We visit the farm.", "我们参观农场。"),
    "exercise book": ("n.", "I need a new exercise book.", "我需要一本新练习本。"),
    "pencil sharpener": ("n.", "Where is my pencil sharpener?", "我的卷笔刀在哪里？"),
    "pencil box": ("n.", "My pens are in the pencil box.", "我的笔在铅笔盒里。"),
    "saleswoman": ("n.", "The saleswoman is helpful.", "女售货员很热心。"),
    "love": ("v.", "I love my mom.", "我爱妈妈。"),
    "chore": ("n.", "I do chores at home.", "我在家做家务。"),
    "call": ("v.", "I'll call you later.", "我稍后给你打电话。"),
    "candy": ("n.", "Don't eat too much candy.", "别吃太多糖。"),
    "drink": ("v.", "Drink more water.", "多喝水。"),
    "exercise": ("v.", "Exercise every day.", "每天锻炼。"),
    "stomachache": ("n.", "I have a stomachache.", "我胃疼。"),
    "headache": ("n.", "I have a headache.", "我头疼。"),
    "toothache": ("n.", "I have a toothache.", "我牙疼。"),
    "subject": ("n.", "English is my favorite subject.", "英语是我最喜欢的学科。"),
    "mark": ("n.", "He got a good mark.", "他得了好分数。"),
    "advice": ("n.", "Can you give me some advice?", "你能给我一些建议吗？"),
    "plant": ("v.", "We plant trees in spring.", "我们春天种树。"),
    "celebrate": ("v.", "We celebrate birthdays.", "我们庆祝生日。"),
    "office": ("n.", "My dad works in an office.", "我爸爸在办公室工作。"),
    "say": ("v.", "What did you say?", "你说什么？"),
    "win": ("v.", "Our team won!", "我们队赢了！"),
    "won": ("v.", "He won the game.", "他赢了比赛。"),
    "were": ("v.", "We were happy.", "我们很高兴。"),
    "central": ("adj.", "The central park is big.", "中央公园很大。"),
    "a lot": ("adv.", "Thanks a lot.", "非常感谢。"),
    "bite": ("v.", "Don't bite others.", "别咬人。"),
    "kick": ("v.", "Don't kick the door.", "别踢门。"),
    "tongue": ("n.", "Stick out your tongue.", "伸出舌头。"),
    "delicious": ("adj.", "The cake is delicious.", "蛋糕很好吃。"),
    "silk": ("n.", "This dress is made of silk.", "这条裙子是丝绸做的。"),
    "forest": ("n.", "There are many trees in the forest.", "森林里有很多树。"),
    "stone": ("n.", "The house is made of stone.", "房子是石头建的。"),
    "temple": ("n.", "We visited the temple.", "我们参观了寺庙。"),
    "map": ("n.", "I need a map.", "我需要一张地图。"),
    "clock": ("n.", "The clock is on the wall.", "钟在墙上。"),
    "sunrise": ("n.", "We watched the sunrise.", "我们看了日出。"),
    "hiking": ("n.", "I like hiking.", "我喜欢远足。"),
    "reptile": ("n.", "A snake is a reptile.", "蛇是爬行动物。"),
    "mammal": ("n.", "A whale is a mammal.", "鲸是哺乳动物。"),
    "insect": ("n.", "A bee is an insect.", "蜜蜂是昆虫。"),
    "trunk": ("n.", "The elephant has a long trunk.", "大象有长鼻子。"),
    "tusk": ("n.", "The elephant has tusks.", "大象有长牙。"),
    "peanut": ("n.", "The elephant eats peanuts.", "大象吃花生。"),
    "astronaut": ("n.", "He wants to be an astronaut.", "他想当宇航员。"),
    "artist": ("n.", "She is an artist.", "她是个画家。"),
    "scientist": ("n.", "He is a scientist.", "他是个科学家。"),
    "poet": ("n.", "Li Bai is a famous poet.", "李白是著名诗人。"),
    "writer": ("n.", "She is a writer.", "她是个作家。"),
    "deaf": ("adj.", "He is deaf.", "他耳聋。"),
    "blind": ("adj.", "She is blind.", "她失明。"),
    "fall": ("v.", "Leaves fall in autumn.", "秋天树叶落下。"),
    "paint": ("v.", "She likes to paint.", "她喜欢画画。"),
    "invent": ("v.", "Edison invented the light bulb.", "爱迪生发明了灯泡。"),
    "study": ("v.", "I study English every day.", "我每天学英语。"),
    "win": ("v.", "Our team won the game.", "我们队赢了比赛。"),
    "cry": ("v.", "Don't cry.", "别哭。"),
    "find": ("v.", "I can't find my keys.", "我找不到钥匙。"),
    "hurt": ("v.", "My leg hurts.", "我腿疼。"),
    "bring": ("v.", "Please bring your book.", "请带上你的书。"),
    "hear": ("v.", "I can hear you.", "我能听见你。"),
    "live": ("v.", "I live in Ningbo.", "我住在宁波。"),
    "arrive": ("v.", "We arrived at school.", "我们到学校了。"),
    "meet": ("v.", "Nice to meet you.", "很高兴见到你。"),
    "show around": ("v.", "Let me show you around.", "我带你参观吧。"),
    "talk about": ("v.", "Let's talk about it.", "我们谈谈吧。"),
    "look forward to": ("v.", "I look forward to seeing you.", "我期待见到你。"),
    "be afraid of": ("v.", "Don't be afraid of dogs.", "别怕狗。"),
    "spend": ("v.", "I spend time with my family.", "我和家人共度时光。"),
    "taste": ("v.", "Taste this soup.", "尝尝这汤。"),
    "speak": ("v.", "She speaks English well.", "她英语说得好。"),
    "french": ("n.", "He speaks French.", "他说法语。"),
    "american": ("n.", "He is an American.", "他是美国人。"),
    "danish": ("n.", "She is Danish.", "她是丹麦人。"),
    "africa": ("n.", "Lions live in Africa.", "狮子生活在非洲。"),
    "asia": ("n.", "China is in Asia.", "中国在亚洲。"),
    "london": ("n.", "London is the capital of the UK.", "伦敦是英国首都。"),
    "toronto": ("n.", "Toronto is in Canada.", "多伦多在加拿大。"),
    "sydney": ("n.", "Sydney is in Australia.", "悉尼在澳大利亚。"),
    "canada": ("n.", "Canada is a big country.", "加拿大是个大国。"),
    "australia": ("n.", "Koalas live in Australia.", "考拉生活在澳大利亚。"),
    "the uk": ("n.", "The UK is in Europe.", "英国在欧洲。"),
    "the usa": ("n.", "The USA is in North America.", "美国在北美洲。"),
    "china": ("n.", "I love China.", "我爱中国。"),
    "north": ("n.", "Beijing is in the north.", "北京在北方。"),
    "south": ("n.", "Guangzhou is in the south.", "广州在南方。"),
    "east": ("n.", "The sun rises in the east.", "太阳从东方升起。"),
    "west": ("n.", "The sun sets in the west.", "太阳从西方落下。"),
    "wild goose": ("n.", "Wild geese fly south in winter.", "大雁冬天飞往南方。"),
    "thanksgiving": ("n.", "Thanksgiving is in November.", "感恩节在十一月。"),
    "roast turkey": ("n.", "We eat roast turkey on Thanksgiving.", "我们感恩节吃烤火鸡。"),
    "english-chinese dictionary": ("n.", "I use an English-Chinese dictionary.", "我用英汉词典。"),
    "shopping centre": ("n.", "Let's go to the shopping centre.", "我们去购物中心吧。"),
    "shopping mall": ("n.", "The shopping mall is big.", "这个大型购物中心很大。"),
    "ice lantern": ("n.", "We saw ice lanterns in Harbin.", "我们在哈尔滨看了冰灯。"),
    "pen pal": ("n.", "I have a pen pal in Canada.", "我有一个加拿大笔友。"),
    "morning tea": ("n.", "We had morning tea in Guangzhou.", "我们在广州喝了早茶。"),
    "flower show": ("n.", "We went to a flower show.", "我们去看花展了。"),
    "public library": ("n.", "The public library is open.", "公共图书馆开放了。"),
    "art gallery": ("n.", "We visited the art gallery.", "我们参观了画廊。"),
    "stadium": ("n.", "The stadium is full.", "体育场满了。"),
    "lake ontario": ("n.", "Lake Ontario is beautiful.", "安大略湖很美。"),
    "queen's park": ("n.", "Queen's Park is in Toronto.", "女王公园在多伦多。"),
    "information centre": ("n.", "Let's ask at the information centre.", "我们去咨询中心问问吧。"),
    "computer class": ("n.", "I like computer class.", "我喜欢计算机课。"),
    "safety rule": ("n.", "Follow the safety rules.", "遵守安全规则。"),
    "family activities": ("n.", "We do family activities on weekends.", "我们周末做家庭活动。"),
    "after school activities": ("n.", "I have after school activities.", "我有课外活动。"),
    "school subjects": ("n.", "We have many school subjects.", "我们有很多学科。"),
    "sports centre": ("n.", "I play basketball at the sports centre.", "我在体育中心打篮球。"),
    "nature shows": ("n.", "I like nature shows.", "我喜欢自然节目。"),
    "news shows": ("n.", "My dad watches news shows.", "我爸爸看新闻节目。"),
    "cartoons": ("n.", "I like watching cartoons.", "我喜欢看动画片。"),
    "exercise book": ("n.", "I need a new exercise book.", "我需要一本新练习本。"),
    "pencil sharpener": ("n.", "Where is my pencil sharpener?", "我的卷笔刀在哪里？"),
    "pencil box": ("n.", "My pens are in the pencil box.", "我的笔在铅笔盒里。"),
    "a pair of scissors": ("n.", "I need a pair of scissors.", "我需要一把剪刀。"),
    "a box of crayons": ("n.", "She has a box of crayons.", "她有一盒蜡笔。"),
    "glue stick": ("n.", "Use a glue stick.", "用胶棒。"),
    "saleswoman": ("n.", "The saleswoman is helpful.", "女售货员很热心。"),
    "roller skating": ("n.", "I like roller skating.", "我喜欢滑旱冰。"),
    "jumping rope": ("n.", "Jumping rope is fun.", "跳绳很有趣。"),
    "ping-pong": ("n.", "I play ping-pong well.", "我乒乓球打得好。"),
    "badminton": ("n.", "She plays badminton.", "她打羽毛球。"),
    "skateboarding": ("n.", "Skateboarding is cool.", "玩滑板很酷。"),
    "doing jigsaw puzzles": ("n.", "I like doing jigsaw puzzles.", "我喜欢拼拼图。"),
    "making models": ("n.", "He likes making models.", "他喜欢制作模型。"),
    "collecting erasers": ("n.", "She likes collecting erasers.", "她喜欢收集橡皮。"),
    "go for a picnic": ("v.", "Let's go for a picnic.", "我们去野餐吧。"),
    "play the violin": ("v.", "She plays the violin.", "她拉小提琴。"),
    "go skating": ("v.", "We go skating in winter.", "我们冬天去滑冰。"),
    "go camping": ("v.", "I love go camping.", "我喜欢野营。"),
    "do the housework": ("v.", "I help do the housework.", "我帮忙做家务。"),
    "once a week": ("adv.", "I exercise once a week.", "我一周锻炼一次。"),
    "twice a week": ("adv.", "She dances twice a week.", "她一周跳两次舞。"),
    "three times a week": ("adv.", "He runs three times a week.", "他一周跑三次。"),
    "maple leaves": ("n.", "Maple leaves are red in autumn.", "枫叶秋天变红。"),
    "big ben": ("n.", "Big Ben is in London.", "大本钟在伦敦。"),
    "disneyland": ("n.", "I want to go to Disneyland.", "我想去迪斯尼乐园。"),
    "campfire": ("n.", "We sat around the campfire.", "我们围坐在篝火旁。"),
    "koala": ("n.", "The koala is cute.", "考拉很可爱。"),
    "kangaroo": ("n.", "Kangaroos live in Australia.", "袋鼠生活在澳大利亚。"),
    "the opera house": ("n.", "The Opera House is in Sydney.", "歌剧院在悉尼。"),
    "tower bridge": ("n.", "Tower Bridge is famous.", "塔桥很有名。"),
    "the london eye": ("n.", "The London Eye is big.", "伦敦眼很大。"),
    "the british museum": ("n.", "We visited the British Museum.", "我们参观了大英博物馆。"),
    "the cn tower": ("n.", "The CN Tower is tall.", "加拿大国家电视塔很高。"),
    "washington d.c.": ("n.", "Washington D.C. is the capital.", "华盛顿是首都。"),
    "the potala palace": ("n.", "The Potala Palace is in Tibet.", "布达拉宫在西藏。"),
    "the summer palace": ("n.", "The Summer Palace is beautiful.", "颐和园很美。"),
    "the terracotta army": ("n.", "The Terracotta Army is amazing.", "兵马俑令人惊叹。"),
    "the yangtze river": ("n.", "The Yangtze River is long.", "长江很长。"),
    "the stone forest": ("n.", "The Stone Forest is in Yunnan.", "石林在云南。"),
    "west lake": ("n.", "West Lake is in Hangzhou.", "西湖在杭州。"),
    "the great wall": ("n.", "The Great Wall is famous.", "长城很有名。"),
    "mogao caves": ("n.", "The Mogao Caves are in Dunhuang.", "莫高窟在敦煌。"),
    "new year's day": ("n.", "New Year's Day is in January.", "元旦在一月。"),
    "tree planting day": ("n.", "Tree Planting Day is in March.", "植树节在三月。"),
    "mother's day": ("n.", "Mother's Day is in May.", "母亲节在五月。"),
    "children's day": ("n.", "Children's Day is in June.", "儿童节在六月。"),
    "father's day": ("n.", "Father's Day is in June.", "父亲节在六月。"),
    "teachers' day": ("n.", "Teachers' Day is in September.", "教师节在九月。"),
    "national day": ("n.", "National Day is in October.", "国庆节在十月。"),
    "christmas day": ("n.", "Christmas Day is in December.", "圣诞节在十二月。"),
    "make a poster": ("v.", "Let's make a poster.", "我们做张海报吧。"),
    "have a picnic": ("v.", "We have a picnic in the park.", "我们在公园野餐。"),
    "send an email": ("v.", "I send an email to my friend.", "我给朋友发电子邮件。"),
    "write a letter": ("v.", "She writes a letter to her grandma.", "她给奶奶写信。"),
    "make a phone call": ("v.", "I make a phone call every day.", "我每天打电话。"),
    "send a short message": ("v.", "Send me a short message.", "给我发条短信。"),
    "mail a present": ("v.", "I mail a present to my friend.", "我给朋友寄礼物。"),
    "make a video call": ("v.", "We make a video call on weekends.", "我们周末打视频电话。"),
    "make a card": ("v.", "I make a card for Mom.", "我给妈妈做卡片。"),
    "cleaned the window": ("v.", "I cleaned the window.", "我擦了窗子。"),
    "watched tv": ("v.", "I watched TV last night.", "我昨晚看了电视。"),
    "climbed a hill": ("v.", "We climbed a hill.", "我们爬了山。"),
    "visited grandparents": ("v.", "I visited my grandparents.", "我看望了祖父母。"),
    "danced": ("v.", "She danced at the party.", "她在聚会上跳舞了。"),
    "jumped rope": ("v.", "The girls jumped rope.", "女孩们跳绳了。"),
    "listened to music": ("v.", "I listened to music.", "我听了音乐。"),
    "rowed a boat": ("v.", "We rowed a boat on the lake.", "我们在湖上划船了。"),
    "played computer games": ("v.", "He played computer games.", "他玩了电脑游戏。"),
    "stayed at home": ("v.", "I stayed at home.", "我待在家里。"),
    "played the piano": ("v.", "She played the piano.", "她弹了钢琴。"),
    "played chess": ("v.", "They played chess.", "他们下棋了。"),
    "washed clothes": ("v.", "Mom washed clothes.", "妈妈洗了衣服。"),
    "went to the beach": ("v.", "We went to the beach.", "我们去了海边。"),
    "drank cold drinks": ("v.", "We drank cold drinks.", "我们喝了冷饮。"),
    "swam": ("v.", "I swam in the pool.", "我在游泳池游泳了。"),
    "ate ice cream": ("v.", "The kids ate ice cream.", "孩子们吃了冰淇淋。"),
    "bought some gifts": ("v.", "I bought some gifts.", "我买了些礼物。"),
    "took photos": ("v.", "We took photos.", "我们拍了照片。"),
    "saw flowers": ("v.", "We saw flowers in the park.", "我们在公园看了花。"),
    "slept": ("v.", "The baby slept.", "宝宝睡了。"),
    "felt happy": ("v.", "I felt happy.", "我觉得高兴。"),
    "left": ("v.", "We left at 8 o'clock.", "我们八点出发了。"),
    "french fries": ("n.", "I like French fries.", "我喜欢薯条。"),
    "was born": ("v.", "I was born in Ningbo.", "我出生在宁波。"),
    "started to speak": ("v.", "She started to speak early.", "她很早就开始说话了。"),
    "learned to walk": ("v.", "The baby learned to walk.", "宝宝学走路了。"),
    "learned to ride a bike": ("v.", "I learned to ride a bike.", "我学骑自行车了。"),
    "went to kindergarten": ("v.", "He went to kindergarten.", "他上幼儿园了。"),
    "went to school": ("v.", "I went to school.", "我上学了。"),
    "learned to swim": ("v.", "She learned to swim.", "她学游泳了。"),
    "started to buy things": ("v.", "He started to buy things himself.", "他开始自己买东西了。"),
    "started to study english": ("v.", "I started to study English.", "我开始学英语了。"),
    "started to use a computer": ("v.", "She started to use a computer.", "她开始用电脑了。"),
    "chopsticks": ("n.", "I use chopsticks to eat.", "我用筷子吃饭。"),
    "play sports": ("v.", "I play sports every day.", "我每天做运动。"),
    "draw pictures": ("v.", "She likes to draw pictures.", "她喜欢画画。"),
    "play chess": ("v.", "They play chess after school.", "他们放学后下棋。"),
    "sing songs": ("v.", "We sing songs in music class.", "我们在音乐课唱歌。"),
    "read books": ("v.", "I read books every night.", "我每晚读书。"),
    "play football": ("v.", "He plays football well.", "他足球踢得好。"),
    "fly a kite": ("v.", "Let's fly a kite.", "我们放风筝吧。"),
    "ride a bike": ("v.", "I ride a bike to school.", "我骑自行车上学。"),
    "visit grandparents": ("v.", "I visit grandparents on weekends.", "我周末看望祖父母。"),
    "go to a drawing club": ("v.", "She goes to a drawing club.", "她去绘画俱乐部。"),
    "climb a hill": ("v.", "We climb a hill on Sundays.", "我们周日爬山。"),
    "pick fruit": ("v.", "We pick fruit in autumn.", "我们秋天摘水果。"),
    "play computer games": ("v.", "Don't play computer games too much.", "别玩太多电脑游戏。"),
    "go fishing": ("v.", "My dad likes to go fishing.", "我爸爸喜欢钓鱼。"),
    "go to the cinema": ("v.", "Let's go to the cinema.", "我们去看电影吧。"),
    "cooking dinner": ("v.", "Mom is cooking dinner.", "妈妈在做晚饭。"),
    "walking the dog": ("v.", "He is walking the dog.", "他在遛狗。"),
    "watering the plants": ("v.", "She is watering the plants.", "她在浇花。"),
    "cleaning the room": ("v.", "I am cleaning the room.", "我在打扫房间。"),
    "listening to music": ("v.", "She is listening to music.", "她在听音乐。"),
    "watching tv": ("v.", "He is watching TV.", "他在看电视。"),
    "feeding the fish": ("v.", "The boy is feeding the fish.", "男孩在喂鱼。"),
    "turn left": ("v.", "Turn left at the corner.", "在拐角处左转。"),
    "turn right": ("v.", "Turn right at the bank.", "在银行右转。"),
    "go straight": ("v.", "Go straight and you'll see it.", "直走你就会看到。"),
    "get to": ("v.", "How do I get to the park?", "我怎么去公园？"),
    "take photos": ("v.", "We take photos at the park.", "我们在公园拍照。"),
    "see a film": ("v.", "Let's see a film.", "我们看电影吧。"),
    "go boating": ("v.", "We go boating on the lake.", "我们在湖上划船。"),
    "buy toys": ("v.", "I buy toys at the shop.", "我在商店买玩具。"),
    "eat seafood": ("v.", "We eat seafood by the sea.", "我们在海边吃海鲜。"),
    "visit the mogao caves": ("v.", "We visit the Mogao Caves.", "我们参观莫高窟。"),
    "row a boat": ("v.", "Let's row a boat.", "我们划船吧。"),
    "go skiing": ("v.", "We go skiing in winter.", "我们冬天去滑雪。"),
    "climb on the window ledge": ("v.", "Don't climb on the window ledge.", "别爬窗台。"),
    "play with fire": ("v.", "Don't play with fire.", "别玩火。"),
    "run down the stairs": ("v.", "Don't run down the stairs.", "别跑下楼梯。"),
    "wait for": ("v.", "Please wait for me.", "请等我。"),
    "be good at": ("v.", "She is good at English.", "她擅长英语。"),
    "in the future": ("n.", "I want to be a doctor in the future.", "我将来想当医生。"),
    "wear glasses": ("v.", "He wears glasses.", "他戴眼镜。"),
    "clean the room": ("v.", "I clean the room every day.", "我每天打扫房间。"),
    "make the bed": ("v.", "I make the bed every morning.", "我每天早上整理床铺。"),
    "take out the rubbish": ("v.", "Please take out the rubbish.", "请把垃圾拿出去。"),
    "wash clothes": ("v.", "Mom washes clothes on Sundays.", "妈妈周日洗衣服。"),
    "tidy the desk": ("v.", "Please tidy the desk.", "请清理书桌。"),
    "sweep the floor": ("v.", "He sweeps the floor.", "他扫地。"),
    "too much": ("adv.", "Don't eat too much candy.", "别吃太多糖。"),
    "a lot of": ("adj.", "I have a lot of books.", "我有很多书。"),
    "go to bed": ("v.", "I go to bed at 9.", "我九点睡觉。"),
    "stomachache": ("n.", "I have a stomachache.", "我胃疼。"),
    "headache": ("n.", "I have a headache.", "我头疼。"),
    "toothache": ("n.", "I have a toothache.", "我牙疼。"),
    "candy": ("n.", "Don't eat too much candy.", "别吃太多糖。"),
    "drink": ("v.", "Drink more water.", "多喝水。"),
    "exercise": ("v.", "Exercise every day.", "每天锻炼。"),
    "plant": ("v.", "We plant trees in spring.", "我们春天种树。"),
    "celebrate": ("v.", "We celebrate birthdays.", "我们庆祝生日。"),
    "office": ("n.", "My dad works in an office.", "我爸爸在办公室工作。"),
    "say": ("v.", "What did you say?", "你说什么？"),
    "win": ("v.", "Our team won!", "我们队赢了！"),
    "won": ("v.", "He won the game.", "他赢了比赛。"),
    "boring": ("adj.", "The class is boring.", "这节课很无聊。"),
    "delicious": ("adj.", "The food is delicious.", "食物很美味。"),
    "sad": ("adj.", "She looks sad.", "她看起来难过。"),
    "were": ("v.", "We were happy.", "我们很高兴。"),
    "sound": ("v.", "That sounds good.", "那听起来不错。"),
    "job": ("n.", "What's your job?", "你做什么工作？"),
    "people": ("n.", "There are many people.", "有很多人。"),
    "teach": ("v.", "She teaches English.", "她教英语。"),
    "sick": ("adj.", "He is sick today.", "他今天病了。"),
    "place": ("n.", "This is a good place.", "这是个好地方。"),
    "stay": ("v.", "Stay here.", "待在这里。"),
    "star": ("n.", "There are many stars.", "有很多星星。"),
    "king": ("n.", "The king is kind.", "国王很善良。"),
    "central": ("adj.", "The central park is big.", "中央公园很大。"),
    "dream": ("n.", "I have a dream.", "我有一个梦想。"),
    "sea": ("n.", "The sea is blue.", "大海是蓝色的。"),
    "ski": ("v.", "I can ski.", "我会滑雪。"),
    "travel": ("v.", "I love to travel.", "我喜欢旅行。"),
    "reading": ("n.", "Reading is fun.", "读书很有趣。"),
    "singing": ("n.", "Singing makes me happy.", "唱歌让我开心。"),
    "dancing": ("n.", "She loves dancing.", "她喜欢跳舞。"),
    "stamp": ("n.", "I collect stamps.", "我集邮。"),
    "catch": ("v.", "Catch the ball!", "接住球！"),
    "talk": ("v.", "Don't talk in class.", "上课别说话。"),
    "all": ("pron.", "All are here.", "大家都在。"),
    "but": ("conj.", "I like cats but not dogs.", "我喜欢猫但不喜欢狗。"),
    "sometimes": ("adv.", "Sometimes I walk to school.", "有时我步行上学。"),
    "bark": ("v.", "The dog barks.", "狗叫。"),
    "forget": ("v.", "Don't forget your homework.", "别忘了作业。"),
    "guess": ("v.", "Can you guess?", "你能猜到吗？"),
    "has": ("v.", "She has a cat.", "她有一只猫。"),
    "farm": ("n.", "We visit the farm.", "我们参观农场。"),
    "fast": ("adj.", "The car is fast.", "车很快。"),
    "why": ("adv.", "Why are you late?", "你为什么迟到？"),
    "only": ("adv.", "I only have one.", "我只有一个。"),
    "also": ("adv.", "I also like it.", "我也喜欢。"),
    "great": ("adj.", "That's great!", "太棒了！"),
    "love": ("v.", "I love my mom.", "我爱妈妈。"),
    "how much": ("adv.", "How much is this?", "这个多少钱？"),
    "a lot": ("adv.", "Thanks a lot.", "非常感谢。"),
    "wonderful": ("adj.", "It's a wonderful day.", "美好的一天。"),
    "cool": ("adj.", "That's cool!", "太酷了！"),
    "fantastic": ("adj.", "Fantastic job!", "做得太棒了！"),
    "cartoons": ("n.", "I watch cartoons.", "我看动画片。"),
    "news shows": ("n.", "He watches news shows.", "他看新闻节目。"),
    "nature shows": ("n.", "I like nature shows.", "我喜欢自然节目。"),
    "chore": ("n.", "I do chores at home.", "我在家做家务。"),
    "call": ("v.", "I'll call you later.", "我稍后给你打电话。"),
    "scared": ("adj.", "I'm scared of spiders.", "我怕蜘蛛。"),
    "worried": ("adj.", "Don't be worried.", "别担心。"),
    "angry": ("adj.", "He is angry.", "他生气了。"),
    "proud": ("adj.", "I'm proud of you.", "我为你骄傲。"),
    "excited": ("adj.", "I'm excited!", "我很兴奋！"),
    "happy": ("adj.", "I'm happy today.", "我今天高兴。"),
    "ill": ("adj.", "She's ill.", "她病了。"),
    "race": ("n.", "He won the race.", "他赢了比赛。"),
    "find": ("v.", "I can't find it.", "我找不到。"),
    "cry": ("v.", "Don't cry.", "别哭。"),
    "because": ("conj.", "I like it because it's fun.", "我喜欢它因为有趣。"),
    "test": ("n.", "We have a test today.", "我们今天测验。"),
    "competition": ("n.", "She won the competition.", "她赢了比赛。"),
    "hurt": ("v.", "My arm hurts.", "我胳膊疼。"),
    "invention": ("n.", "It's a great invention.", "这是伟大的发明。"),
    "invent": ("v.", "He invented the phone.", "他发明了电话。"),
    "study": ("v.", "I study hard.", "我努力学习。"),
    "story": ("n.", "Tell me a story.", "给我讲个故事。"),
    "university": ("n.", "He goes to university.", "他上大学。"),
    "deaf": ("adj.", "He is deaf.", "他耳聋。"),
    "blind": ("adj.", "She is blind.", "她失明。"),
    "fall": ("v.", "Leaves fall in autumn.", "秋天落叶。"),
    "dumpling": ("n.", "I eat dumplings.", "我吃饺子。"),
    "fan": ("n.", "I'm a football fan.", "我是足球迷。"),
    "ice lantern": ("n.", "We saw ice lanterns.", "我们看了冰灯。"),
    "bring": ("v.", "Bring your book.", "带上你的书。"),
    "be afraid of": ("v.", "Don't be afraid of dogs.", "别怕狗。"),
    "hear": ("v.", "I can hear you.", "我能听见你。"),
    "pen pal": ("n.", "I have a pen pal.", "我有个笔友。"),
    "broken": ("adj.", "The cup is broken.", "杯子碎了。"),
    "pity": ("n.", "What a pity!", "真遗憾！"),
    "prize": ("n.", "She won a prize.", "她赢了奖。"),
    "look forward to": ("v.", "I look forward to it.", "我期待它。"),
    "live": ("v.", "I live in Ningbo.", "我住在宁波。"),
    "quite": ("adv.", "It's quite cold.", "相当冷。"),
    "scarf": ("n.", "I wear a scarf.", "我戴围巾。"),
    "airport": ("n.", "I'm at the airport.", "我在机场。"),
    "pupil": ("n.", "He is a pupil.", "他是小学生。"),
    "arrive": ("v.", "We arrived late.", "我们到晚了。"),
    "meet": ("v.", "Nice to meet you.", "很高兴见到你。"),
    "wardrobe": ("n.", "The wardrobe is big.", "衣柜很大。"),
    "show around": ("v.", "Let me show you around.", "我带你参观。"),
    "volunteer": ("n.", "She is a volunteer.", "她是志愿者。"),
    "sandwich": ("n.", "I eat a sandwich.", "我吃三明治。"),
    "top": ("n.", "The top of the hill.", "山顶。"),
    "habit": ("n.", "It's a good habit.", "这是个好习惯。"),
    "idea": ("n.", "Good idea!", "好主意！"),
    "less": ("adv.", "Eat less sugar.", "少吃糖。"),
    "at least": ("adv.", "At least try.", "至少试试。"),
    "talk about": ("v.", "Let's talk about it.", "我们谈谈。"),
    "hockey": ("n.", "They play hockey.", "他们打曲棍球。"),
    "together": ("adv.", "Let's work together.", "我们一起做。"),
    "special": ("adj.", "It's a special day.", "特别的一天。"),
    "beaver": ("n.", "The beaver is cute.", "海狸很可爱。"),
    "raccoon": ("n.", "The raccoon is smart.", "浣熊很聪明。"),
    "moose": ("n.", "The moose is big.", "北美麋很大。"),
    "countryside": ("n.", "I live in the countryside.", "我住在乡下。"),
    "thanksgiving": ("n.", "Happy Thanksgiving!", "感恩节快乐！"),
    "roast turkey": ("n.", "We eat roast turkey.", "我们吃烤火鸡。"),
    "squirrel": ("n.", "The squirrel is fast.", "松鼠很快。"),
    "swan": ("n.", "The swan is beautiful.", "天鹅很美。"),
    "wild goose": ("n.", "Wild geese fly south.", "大雁南飞。"),
    "frog": ("n.", "The frog jumps.", "青蛙跳。"),
    "english-chinese dictionary": ("n.", "I use a dictionary.", "我用词典。"),
    "shopping centre": ("n.", "Let's go shopping.", "我们去购物吧。"),
    "shopping mall": ("n.", "The mall is big.", "商场很大。"),
    "amazing": ("adj.", "It's amazing!", "太神奇了！"),
    "hot pot": ("n.", "I love hot pot.", "我喜欢火锅。"),
}

def guess_pos(zh, w):
    wl = w.lower()
    if wl in POS_EX_OVERRIDE:
        return POS_EX_OVERRIDE[wl][0]
    # 以"地"结尾 → 副词
    if zh.endswith("地") and not any(c in zh for c in ["土地","草地","场地","地方"]):
        return "adv."
    # 以"的"结尾且不是人物 → 形容词
    if zh.endswith("的") and not any(c in zh for c in ["人","师","员","者","家","手"]):
        return "adj."
    # 动词判断
    verb_ends = ["跑","跳","唱","看","听","说","读","写","玩","做","打","吃","喝","走","去","来","买","卖","给","拿","放","坐","站","睡","醒","哭","笑","想","知道","喜欢","帮助","学习","工作","教","画","游泳","骑","飞","爬","洗","打扫","整理","庆祝","种植","开始","使用","出生","发明","落下","带来","听见","居住","到达","迎接","谈论","品尝","花费","说","讲","问","回答","告诉","叫","让","请","能","会","可以","应该","必须","需要","想要","希望","觉得","认为","发现","找到","得到","失去","保持","改变","变成","成为","叫做","意味着","看起来","听起来","闻起来","尝起来","感觉"]
    if any(zh.endswith(s) for s in verb_ends) or "动词" in zh:
        return "v."
    # 数词
    if any(c in zh for c in ["第一","第二","第三","第五","第十","第十二","第十五","第二十","零","一","二","三","四","五","六","七","八","九","十","百","千","万","亿"]) and (zh.endswith("") and len(zh) <= 4):
        if any(zh.startswith(s) for s in ["第","初"]) or zh in ["一","二","三","四","五","六","七","八","九","十","百","千","零"]:
            return "num."
    # 介词/连词/代词/冠词/感叹词
    if any(k in zh for k in ["介词","连词","代词","冠词","感叹词","助词"]):
        return "other"
    # 短语判断
    if " " in wl:
        # by + 交通工具 → 介词短语
        if wl.startswith("by ") or wl.startswith("on ") or wl.startswith("in ") or wl.startswith("at "):
            return "prep."
        # 动词开头的短语 → 动词短语
        first = wl.split()[0]
        if first in ["play","go","do","make","take","have","watch","read","write","sing","dance","draw","paint","climb","pick","fly","ride","swim","run","jump","walk","wash","clean","tidy","sweep","cook","feed","water","listen","visit","buy","sell","eat","drink","wear","use","learn","study","teach","help","show","call","send","mail","turn","get","wait","be","look","see","hear","feel","spend","taste","speak","paint","invent","fall","bring","meet","arrive","live","leave","sleep","row","dance","sing","start","was","were","went","ate","drank","swam","slept","took","saw","bought","felt","cleaned","watched","climbed","visited","jumped","listened","rowed","played","stayed","washed","danced"]:
            return "v."
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
    # 硬编码优先
    if wl in POS_EX_OVERRIDE:
        ov = POS_EX_OVERRIDE[wl]
        if len(ov) >= 3 and ov[1] and ov[2]:
            return [ov[1], ov[2]]
    # 名词
    if pos == "n.":
        if any(c in zh for c in ["人","师","员","者","家","手","医生","老师","学生","司机","厨师","护士","农民","工人","警察","画家","科学家","诗人","作家","宇航员","发明家","志愿者","总统"]):
            return [f"He is a {w}.", f"他是一名{zh}。"]
        if any(c in zh for c in ["地方","城市","国家","公园","学校","医院","商店","书店","超市","餐馆","银行","邮局","图书馆","博物馆","体育场","广场","宾馆","车站","机场","花园","农场","森林","海洋","湖","河","山","乡村","市中心"]):
            return [f"Let's go to the {w}.", f"我们去{zh}吧。"]
        if any(c in zh for c in ["动物","鸟","鱼","狗","猫","鸭","兔","蛇","龟","马","牛","猪","羊","蜜蜂","蝴蝶","熊猫","大象","老虎","猴子","企鹅","鲨鱼","鲸","袋鼠","考拉","松鼠","天鹅","青蛙","海狸","浣熊","昆虫","爬行动物","哺乳动物"]):
            return [f"The {w} is interesting.", f"{zh}很有趣。"]
        if any(c in zh for c in ["食物","面包","蛋糕","水果","冰淇淋","土豆","西红柿","肉","可乐","米饭","面条","蔬菜","鱼","鸡肉","鸡蛋","汤","糖果","三明治","饺子","火锅","牛奶","果汁","水","茶"]):
            return [f"I like {w}.", f"我喜欢{zh}。"]
        if any(c in zh for c in ["衣服","帽子","大衣","鞋","毛衣","夹克","手套","裤子","T恤","短裤","袜子","裙子","连衣裙","衬衫","围巾"]):
            return [f"I have a new {w}.", f"我有一件新{zh}。"]
        if any(c in zh for c in ["月","一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]):
            return [f"My birthday is in {w}.", f"我的生日在{zh}。"]
        if any(c in zh for c in ["学科","语文","英语","科学","体育","音乐","数学","美术"]):
            return [f"My favorite subject is {w}.", f"我最喜欢的学科是{zh}。"]
        return [f"I have a {w}.", f"我有一个{zh}。"]
    # 动词/动词短语
    if pos == "v.":
        if " " in wl:
            return [f"I often {w}.", f"我经常{zh}。"]
        return [f"I can {w}.", f"我会{zh}。"]
    # 形容词
    if pos == "adj.":
        return [f"She is {w}.", f"她很{zh}。"]
    # 副词
    if pos == "adv.":
        return [f"He {w} gets up early.", f"他{zh}早起。"] if wl not in ["very","really","so","quite","too","more","less","fast","late","early","together","again","still","just","only","already","almost","maybe","perhaps","here","there","now","then","today","tomorrow","yesterday","soon","later"] else [f"It is {w} good.", f"它{zh}好。"]
    # 介词
    if pos == "prep.":
        return [f"The book is {w} the desk.", f"书在桌子{zh}。"]
    # 连词
    if pos == "conj.":
        return [f"I like it {w} it is fun.", f"我喜欢它{zh}它有趣。"]
    # 代词
    if pos == "pron.":
        return [f"{w.capitalize()} is my friend.", f"{zh}是我的朋友。"]
    # 数词
    if pos == "num.":
        return [f"I have {w} apples.", f"我有{zh}个苹果。"]
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
        # 硬编码优先
        if wl in POS_EX_OVERRIDE:
            ov = POS_EX_OVERRIDE[wl]
            pos = ov[0]
            ex = [ov[1], ov[2]] if len(ov) >= 3 else gen_example(w, zh, pos)
        elif wl in existing:
            e = existing[wl]
            pos = e.get("pos","") or guess_pos(zh, w)
            ex = e.get("ex", gen_example(w, zh, pos))
        else:
            pos = guess_pos(zh, w)
            ex = gen_example(w, zh, pos)
        sy = guess_sy(w)
        co = [["",""]]
        em = get_emoji(w, uid)
        us = gen_usage(w, zh, pos, co)
        words.append({"w":w,"p":"","pos":pos,"zh":zh,"sy":sy,"ex":ex,"co":co,"em":em,"us":us})
        if wl in existing or wl in POS_EX_OVERRIDE:
            reuse_count += 1
        else:
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
