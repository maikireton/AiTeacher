/* ============================================================
 * AI 教师 · 小学英语单词库（wordbank.js）
 * 按主题分组。字段：
 *   w 单词 | p 音标 | pos 词性 | zh 中文释义 | sy 音节拆分
 *   ex 例句 [英文, 中文] | co 搭配 [[英文, 中文], ...] | em 联想emoji
 * 供 英语/words/index.html 单词学习模块使用
 * ============================================================ */
window.WORDBANK = {
  "title": "小学英语词汇库",
  "groups": [
    {
      "id": "num",
      "name": "数字 Numbers",
      "grade": "三~四年级",
      "em": "🔢",
      "words": [
        {"w":"one","p":"/wʌn/","pos":"num.","zh":"一","sy":["one"],"ex":["I have one pen.","我有一支钢笔。"],"co":[["one apple","一个苹果"]],"em":"1️⃣"},
        {"w":"two","p":"/tuː/","pos":"num.","zh":"二","sy":["two"],"ex":["I have two eyes.","我有两只眼睛。"],"co":[["two books","两本书"]],"em":"2️⃣"},
        {"w":"three","p":"/θriː/","pos":"num.","zh":"三","sy":["three"],"ex":["There are three cats.","有三只猫。"],"co":[["three birds","三只鸟"]],"em":"3️⃣"},
        {"w":"four","p":"/fɔːr/","pos":"num.","zh":"四","sy":["four"],"ex":["I am four years old.","我四岁了。"],"co":[["four legs","四条腿"]],"em":"4️⃣"},
        {"w":"five","p":"/faɪv/","pos":"num.","zh":"五","sy":["five"],"ex":["Give me five fingers.","给我五根手指。"],"co":[["five stars","五颗星"]],"em":"5️⃣"},
        {"w":"six","p":"/sɪks/","pos":"num.","zh":"六","sy":["six"],"ex":["I have six books.","我有六本书。"],"co":[["six desks","六张课桌"]],"em":"6️⃣"},
        {"w":"seven","p":"/ˈsev.ən/","pos":"num.","zh":"七","sy":["sev","en"],"ex":["There are seven days in a week.","一周有七天。"],"co":[["seven days","七天"]],"em":"7️⃣"},
        {"w":"eight","p":"/eɪt/","pos":"num.","zh":"八","sy":["eight"],"ex":["I am eight years old.","我八岁了。"],"co":[["eight o'clock","八点钟"]],"em":"8️⃣"},
        {"w":"nine","p":"/naɪn/","pos":"num.","zh":"九","sy":["nine"],"ex":["I have nine crayons.","我有九支蜡笔。"],"co":[["nine pens","九支钢笔"]],"em":"9️⃣"},
        {"w":"ten","p":"/ten/","pos":"num.","zh":"十","sy":["ten"],"ex":["I can count to ten.","我能数到十。"],"co":[["ten fingers","十根手指"]],"em":"🔟"},
        {"w":"eleven","p":"/ɪˈlev.ən/","pos":"num.","zh":"十一","sy":["e","lev","en"],"ex":["I have eleven balls.","我有十一个球。"],"co":[["eleven students","十一个学生"]],"em":"🏀"},
        {"w":"twelve","p":"/twelv/","pos":"num.","zh":"十二","sy":["twelve"],"ex":["There are twelve months.","一年有十二个月。"],"co":[["twelve months","十二个月"]],"em":"📅"},
        {"w":"twenty","p":"/ˈtwen.ti/","pos":"num.","zh":"二十","sy":["twen","ty"],"ex":["There are twenty pupils.","有二十个学生。"],"co":[["twenty yuan","二十元"]],"em":"💰"},
        {"w":"hundred","p":"/ˈhʌn.drəd/","pos":"num.","zh":"一百","sy":["hun","dred"],"ex":["One hundred and one.","一百零一。"],"co":[["one hundred","一百"]],"em":"💯"}
      ]
    },
    {
      "id": "color",
      "name": "颜色 Colours",
      "grade": "三~四年级",
      "em": "🎨",
      "words": [
        {"w":"red","p":"/red/","pos":"adj.","zh":"红色的","sy":["red"],"ex":["The apple is red.","这个苹果是红色的。"],"co":[["a red apple","一个红苹果"]],"em":"🔴"},
        {"w":"yellow","p":"/ˈjel.əʊ/","pos":"adj.","zh":"黄色的","sy":["yel","low"],"ex":["The sun is yellow.","太阳是黄色的。"],"co":[["a yellow banana","一根黄香蕉"]],"em":"🟡"},
        {"w":"blue","p":"/bluː/","pos":"adj.","zh":"蓝色的","sy":["blue"],"ex":["The sky is blue.","天空是蓝色的。"],"co":[["a blue pen","一支蓝钢笔"]],"em":"🔵"},
        {"w":"green","p":"/ɡriːn/","pos":"adj.","zh":"绿色的","sy":["green"],"ex":["The grass is green.","草是绿色的。"],"co":[["green trees","绿树"]],"em":"🟢"},
        {"w":"black","p":"/blæk/","pos":"adj.","zh":"黑色的","sy":["black"],"ex":["I have a black cat.","我有一只黑猫。"],"co":[["black hair","黑头发"]],"em":"⚫"},
        {"w":"white","p":"/waɪt/","pos":"adj.","zh":"白色的","sy":["white"],"ex":["The snow is white.","雪是白色的。"],"co":[["a white shirt","一件白衬衫"]],"em":"⚪"},
        {"w":"orange","p":"/ˈɒr.ɪndʒ/","pos":"adj./n.","zh":"橙色的；橙子","sy":["or","ange"],"ex":["The orange is orange.","这个橙子是橙色的。"],"co":[["orange juice","橙汁"]],"em":"🍊"},
        {"w":"purple","p":"/ˈpɜː.pəl/","pos":"adj.","zh":"紫色的","sy":["pur","ple"],"ex":["I like the purple flower.","我喜欢这朵紫色的花。"],"co":[["a purple bag","一个紫色书包"]],"em":"🟣"},
        {"w":"pink","p":"/pɪŋk/","pos":"adj.","zh":"粉红色的","sy":["pink"],"ex":["Her dress is pink.","她的连衣裙是粉色的。"],"co":[["a pink pencil","一支粉色铅笔"]],"em":"🌸"},
        {"w":"brown","p":"/braʊn/","pos":"adj.","zh":"棕色的","sy":["brown"],"ex":["The bear is brown.","这只熊是棕色的。"],"co":[["brown bread","黑面包"]],"em":"🟤"},
        {"w":"grey","p":"/ɡreɪ/","pos":"adj.","zh":"灰色的","sy":["grey"],"ex":["The mouse is grey.","这只老鼠是灰色的。"],"co":[["grey clouds","灰色的云"]],"em":"🌫️"},
        {"w":"colour","p":"/ˈkʌl.ər/","pos":"n.","zh":"颜色","sy":["col","our"],"ex":["What colour is it?","它是什么颜色？"],"co":[["favourite colour","最喜欢的颜色"]],"em":"🌈"}
      ]
    },
    {
      "id": "body",
      "name": "身体 Body",
      "grade": "三~四年级",
      "em": "🧍",
      "words": [
        {"w":"head","p":"/hed/","pos":"n.","zh":"头","sy":["head"],"ex":["Put your hands on your head.","把手放在头上。"],"co":[["head teacher","校长"]],"em":"👤"},
        {"w":"hair","p":"/heər/","pos":"n.","zh":"头发","sy":["hair"],"ex":["She has long hair.","她有长长的头发。"],"co":[["black hair","黑头发"]],"em":"💇"},
        {"w":"face","p":"/feɪs/","pos":"n.","zh":"脸","sy":["face"],"ex":["Wash your face.","洗洗你的脸。"],"co":[["a happy face","一张笑脸"]],"em":"😊"},
        {"w":"eye","p":"/aɪ/","pos":"n.","zh":"眼睛","sy":["eye"],"ex":["I have two eyes.","我有两只眼睛。"],"co":[["big eyes","大眼睛"]],"em":"👀"},
        {"w":"ear","p":"/ɪər/","pos":"n.","zh":"耳朵","sy":["ear"],"ex":["I hear with my ears.","我用耳朵听。"],"co":[["long ears","长耳朵"]],"em":"👂"},
        {"w":"nose","p":"/nəʊz/","pos":"n.","zh":"鼻子","sy":["nose"],"ex":["The elephant has a long nose.","大象有长鼻子。"],"co":[["a small nose","小鼻子"]],"em":"👃"},
        {"w":"mouth","p":"/maʊθ/","pos":"n.","zh":"嘴巴","sy":["mouth"],"ex":["Open your mouth.","张开你的嘴。"],"co":[["open one's mouth","张嘴"]],"em":"👄"},
        {"w":"tooth","p":"/tuːθ/","pos":"n.","zh":"牙齿（复 teeth）","sy":["tooth"],"ex":["Brush your teeth.","刷刷牙。"],"co":[["brush teeth","刷牙"]],"em":"🦷"},
        {"w":"arm","p":"/ɑːm/","pos":"n.","zh":"手臂","sy":["arm"],"ex":["Raise your arm.","举起你的手臂。"],"co":[["long arms","长手臂"]],"em":"💪"},
        {"w":"hand","p":"/hænd/","pos":"n.","zh":"手","sy":["hand"],"ex":["Wash your hands.","洗洗你的手。"],"co":[["left hand","左手"]],"em":"✋"},
        {"w":"finger","p":"/ˈfɪŋ.ɡər/","pos":"n.","zh":"手指","sy":["fin","ger"],"ex":["I have ten fingers.","我有十根手指。"],"co":[["little finger","小指"]],"em":"🖐️"},
        {"w":"leg","p":"/leɡ/","pos":"n.","zh":"腿","sy":["leg"],"ex":["The dog has four legs.","狗有四条腿。"],"co":[["long legs","长腿"]],"em":"🦵"},
        {"w":"foot","p":"/fʊt/","pos":"n.","zh":"脚（复 feet）","sy":["foot"],"ex":["I go to school on foot.","我走路去上学。"],"co":[["on foot","步行"]],"em":"🦶"},
        {"w":"body","p":"/ˈbɒd.i/","pos":"n.","zh":"身体","sy":["bod","y"],"ex":["My body is strong.","我的身体很强壮。"],"co":[["body parts","身体部位"]],"em":"🧍"}
      ]
    },
    {
      "id": "family",
      "name": "家庭 Family",
      "grade": "三~四年级",
      "em": "👨‍👩‍👧",
      "words": [
        {"w":"family","p":"/ˈfæm.əl.i/","pos":"n.","zh":"家庭","sy":["fam","i","ly"],"ex":["I love my family.","我爱我的家。"],"co":[["family photo","全家福"]],"em":"👨‍👩‍👧"},
        {"w":"father","p":"/ˈfɑː.ðər/","pos":"n.","zh":"父亲；爸爸","sy":["fa","ther"],"ex":["My father is tall.","我爸爸很高。"],"co":[["father and mother","爸爸和妈妈"]],"em":"👨"},
        {"w":"mother","p":"/ˈmʌð.ər/","pos":"n.","zh":"母亲；妈妈","sy":["moth","er"],"ex":["My mother is kind.","我妈妈很温柔。"],"co":[["mother's day","母亲节"]],"em":"👩"},
        {"w":"brother","p":"/ˈbrʌð.ər/","pos":"n.","zh":"兄弟","sy":["broth","er"],"ex":["I have a brother.","我有一个哥哥（弟弟）。"],"co":[["little brother","弟弟"]],"em":"👦"},
        {"w":"sister","p":"/ˈsɪs.tər/","pos":"n.","zh":"姐妹","sy":["sis","ter"],"ex":["She is my sister.","她是我姐姐（妹妹）。"],"co":[["older sister","姐姐"]],"em":"👧"},
        {"w":"grandfather","p":"/ˈɡrændˌfɑː.ðər/","pos":"n.","zh":"祖父；外公","sy":["grand","fa","ther"],"ex":["My grandfather likes tea.","我爷爷爱喝茶。"],"co":[["grandpa","爷爷（口语）"]],"em":"👴"},
        {"w":"grandmother","p":"/ˈɡrændˌmʌð.ər/","pos":"n.","zh":"祖母；外婆","sy":["grand","moth","er"],"ex":["My grandmother cooks well.","我奶奶做饭很好吃。"],"co":[["grandma","奶奶（口语）"]],"em":"👵"},
        {"w":"parent","p":"/ˈpeə.rənt/","pos":"n.","zh":"父（母）亲","sy":["par","ent"],"ex":["My parents love me.","我的父母爱我。"],"co":[["parents","父母（复数）"]],"em":"🧑‍🤝‍🧑"},
        {"w":"aunt","p":"/ɑːnt/","pos":"n.","zh":"姑母；姨母","sy":["aunt"],"ex":["My aunt is a nurse.","我阿姨是护士。"],"co":[["Aunt Lucy","露西阿姨"]],"em":"👩‍🦰"},
        {"w":"uncle","p":"/ˈʌŋ.kəl/","pos":"n.","zh":"叔父；舅舅","sy":["un","cle"],"ex":["My uncle drives a car.","我叔叔开汽车。"],"co":[["Uncle Tom","汤姆叔叔"]],"em":"👨‍🦱"},
        {"w":"cousin","p":"/ˈkʌz.ən/","pos":"n.","zh":"堂（表）兄弟姐妹","sy":["cou","sin"],"ex":["My cousin is ten.","我表弟十岁。"],"co":[["my cousin","我的表兄弟"]],"em":"🧒"},
        {"w":"baby","p":"/ˈbeɪ.bi/","pos":"n.","zh":"婴儿","sy":["ba","by"],"ex":["The baby is sleeping.","宝宝在睡觉。"],"co":[["baby brother","婴儿弟弟"]],"em":"👶"}
      ]
    },
    {
      "id": "school",
      "name": "学校 School",
      "grade": "三~五年级",
      "em": "🏫",
      "words": [
        {"w":"school","p":"/skuːl/","pos":"n.","zh":"学校","sy":["school"],"ex":["I go to school every day.","我每天去上学。"],"co":[["go to school","去上学"]],"em":"🏫"},
        {"w":"class","p":"/klɑːs/","pos":"n.","zh":"班级；课","sy":["class"],"ex":["We are in Class One.","我们在一年级一班。"],"co":[["English class","英语课"]],"em":"📚"},
        {"w":"classroom","p":"/ˈklɑːs.ruːm/","pos":"n.","zh":"教室","sy":["class","room"],"ex":["Our classroom is big.","我们的教室很大。"],"co":[["clean the classroom","打扫教室"]],"em":"🏠"},
        {"w":"teacher","p":"/ˈtiː.tʃər/","pos":"n.","zh":"老师","sy":["teach","er"],"ex":["My teacher is nice.","我的老师很好。"],"co":[["English teacher","英语老师"]],"em":"👩‍🏫"},
        {"w":"student","p":"/ˈstjuː.dənt/","pos":"n.","zh":"学生","sy":["stu","dent"],"ex":["She is a good student.","她是个好学生。"],"co":[["a primary student","一个小学生"]],"em":"🧑‍🎓"},
        {"w":"lesson","p":"/ˈles.ən/","pos":"n.","zh":"课","sy":["les","son"],"ex":["We have a maths lesson.","我们有一节数学课。"],"co":[["have a lesson","上课"]],"em":"📖"},
        {"w":"homework","p":"/ˈhəʊm.wɜːk/","pos":"n.","zh":"家庭作业","sy":["home","work"],"ex":["Do your homework.","做你的家庭作业。"],"co":[["do homework","做作业"]],"em":"✏️"},
        {"w":"book","p":"/bʊk/","pos":"n.","zh":"书","sy":["book"],"ex":["This is my book.","这是我的书。"],"co":[["read a book","读书"]],"em":"📕"},
        {"w":"desk","p":"/desk/","pos":"n.","zh":"课桌","sy":["desk"],"ex":["My book is on the desk.","我的书在课桌上。"],"co":[["on the desk","在课桌上"]],"em":"🪑"},
        {"w":"chair","p":"/tʃeər/","pos":"n.","zh":"椅子","sy":["chair"],"ex":["Sit on the chair.","坐在椅子上。"],"co":[["a red chair","一把红椅子"]],"em":"🪑"},
        {"w":"blackboard","p":"/ˈblæk.bɔːd/","pos":"n.","zh":"黑板","sy":["black","board"],"ex":["Look at the blackboard.","看黑板。"],"co":[["on the blackboard","在黑板上"]],"em":"⬛"},
        {"w":"playground","p":"/ˈpleɪ.ɡraʊnd/","pos":"n.","zh":"操场","sy":["play","ground"],"ex":["We play on the playground.","我们在操场上玩。"],"co":[["school playground","学校操场"]],"em":"🛝"}
      ]
    },
    {
      "id": "stationery",
      "name": "文具 Stationery",
      "grade": "三~四年级",
      "em": "✏️",
      "words": [
        {"w":"pen","p":"/pen/","pos":"n.","zh":"钢笔","sy":["pen"],"ex":["I write with a pen.","我用钢笔写字。"],"co":[["a blue pen","一支蓝钢笔"]],"em":"🖊️"},
        {"w":"pencil","p":"/ˈpen.səl/","pos":"n.","zh":"铅笔","sy":["pen","cil"],"ex":["My pencil is short.","我的铅笔很短。"],"co":[["pencil case","文具盒"]],"em":"✏️"},
        {"w":"ruler","p":"/ˈruː.lər/","pos":"n.","zh":"尺子","sy":["rul","er"],"ex":["The ruler is long.","这把尺子很长。"],"co":[["a long ruler","一把长尺子"]],"em":"📏"},
        {"w":"eraser","p":"/ɪˈreɪ.zər/","pos":"n.","zh":"橡皮","sy":["e","ras","er"],"ex":["May I use your eraser?","我可以用你的橡皮吗？"],"co":[["a white eraser","一块白橡皮"]],"em":"🧽"},
        {"w":"crayon","p":"/ˈkreɪ.ɒn/","pos":"n.","zh":"蜡笔","sy":["cray","on"],"ex":["I colour with crayons.","我用蜡笔涂色。"],"co":[["a box of crayons","一盒蜡笔"]],"em":"🖍️"},
        {"w":"bag","p":"/bæɡ/","pos":"n.","zh":"书包；袋子","sy":["bag"],"ex":["My bag is heavy.","我的书包很重。"],"co":[["school bag","书包"]],"em":"🎒"},
        {"w":"pencil-box","p":"/ˈpen.səl.bɒks/","pos":"n.","zh":"文具盒","sy":["pen","cil","box"],"ex":["Put your pens in the pencil-box.","把钢笔放进文具盒。"],"co":[["a new pencil-box","一个新文具盒"]],"em":"🧰"},
        {"w":"notebook","p":"/ˈnəʊt.bʊk/","pos":"n.","zh":"笔记本","sy":["note","book"],"ex":["Write it in your notebook.","把它写在笔记本上。"],"co":[["take notes","记笔记"]],"em":"📓"},
        {"w":"glue","p":"/ɡluː/","pos":"n.","zh":"胶水","sy":["glue"],"ex":["Use the glue to stick it.","用胶水粘住它。"],"co":[["a bottle of glue","一瓶胶水"]],"em":"🧴"},
        {"w":"scissors","p":"/ˈsɪz.əz/","pos":"n.","zh":"剪刀","sy":["scis","sors"],"ex":["Cut the paper with scissors.","用剪刀剪纸。"],"co":[["a pair of scissors","一把剪刀"]],"em":"✂️"}
      ]
    },
    {
      "id": "food",
      "name": "食物 Food",
      "grade": "三~五年级",
      "em": "🍽️",
      "words": [
        {"w":"rice","p":"/raɪs/","pos":"n.","zh":"米饭；大米","sy":["rice"],"ex":["I eat rice for lunch.","我午饭吃米饭。"],"co":[["a bowl of rice","一碗米饭"]],"em":"🍚"},
        {"w":"bread","p":"/bred/","pos":"n.","zh":"面包","sy":["bread"],"ex":["I like bread for breakfast.","我早餐喜欢吃面包。"],"co":[["a piece of bread","一片面包"]],"em":"🍞"},
        {"w":"milk","p":"/mɪlk/","pos":"n.","zh":"牛奶","sy":["milk"],"ex":["Drink some milk.","喝点牛奶。"],"co":[["a glass of milk","一杯牛奶"]],"em":"🥛"},
        {"w":"egg","p":"/eɡ/","pos":"n.","zh":"鸡蛋","sy":["egg"],"ex":["I have an egg every day.","我每天吃一个鸡蛋。"],"co":[["boiled egg","水煮蛋"]],"em":"🥚"},
        {"w":"fish","p":"/fɪʃ/","pos":"n.","zh":"鱼；鱼肉","sy":["fish"],"ex":["I like fish and rice.","我喜欢吃鱼和米饭。"],"co":[["a little fish","一条小鱼"]],"em":"🐟"},
        {"w":"meat","p":"/miːt/","pos":"n.","zh":"肉","sy":["meat"],"ex":["We eat meat at dinner.","我们晚饭吃肉。"],"co":[["beef and meat","牛肉和肉"]],"em":"🥩"},
        {"w":"chicken","p":"/ˈtʃɪk.ɪn/","pos":"n.","zh":"鸡肉；鸡","sy":["chick","en"],"ex":["The chicken is delicious.","鸡肉很美味。"],"co":[["fried chicken","炸鸡"]],"em":"🍗"},
        {"w":"cake","p":"/keɪk/","pos":"n.","zh":"蛋糕","sy":["cake"],"ex":["Happy birthday! Here is a cake.","生日快乐！这是蛋糕。"],"co":[["a birthday cake","生日蛋糕"]],"em":"🎂"},
        {"w":"hamburger","p":"/ˈhæm.bɜː.ɡər/","pos":"n.","zh":"汉堡包","sy":["ham","bur","ger"],"ex":["I want a hamburger.","我想要一个汉堡包。"],"co":[["a big hamburger","一个大汉堡"]],"em":"🍔"},
        {"w":"noodles","p":"/ˈnuː.dəlz/","pos":"n.","zh":"面条","sy":["noo","dles"],"ex":["I eat noodles on my birthday.","我生日吃面条。"],"co":[["a bowl of noodles","一碗面条"]],"em":"🍜"},
        {"w":"dumpling","p":"/ˈdʌm.plɪŋ/","pos":"n.","zh":"饺子","sy":["dum","pling"],"ex":["We eat dumplings in winter.","我们冬天吃饺子。"],"co":[["make dumplings","包饺子"]],"em":"🥟"},
        {"w":"soup","p":"/suːp/","pos":"n.","zh":"汤","sy":["soup"],"ex":["The soup is hot.","汤很烫。"],"co":[["tomato soup","番茄汤"]],"em":"🍲"},
        {"w":"sandwich","p":"/ˈsæn.wɪdʒ/","pos":"n.","zh":"三明治","sy":["sand","wich"],"ex":["I have a sandwich for lunch.","我午饭吃三明治。"],"co":[["a cheese sandwich","芝士三明治"]],"em":"🥪"},
        {"w":"vegetable","p":"/ˈvedʒ.tə.bəl/","pos":"n.","zh":"蔬菜","sy":["veg","e","ta","ble"],"ex":["Eat more vegetables.","多吃蔬菜。"],"co":[["fresh vegetables","新鲜蔬菜"]],"em":"🥦"}
      ]
    },
    {
      "id": "fruit",
      "name": "水果 Fruit",
      "grade": "三~四年级",
      "em": "🍎",
      "words": [
        {"w":"apple","p":"/ˈæp.əl/","pos":"n.","zh":"苹果","sy":["ap","ple"],"ex":["An apple a day is good.","一天一个苹果对身体好。"],"co":[["apple juice","苹果汁"]],"em":"🍎"},
        {"w":"banana","p":"/bəˈnɑː.nə/","pos":"n.","zh":"香蕉","sy":["ba","na","na"],"ex":["The monkey likes bananas.","猴子喜欢香蕉。"],"co":[["a yellow banana","一根黄香蕉"]],"em":"🍌"},
        {"w":"pear","p":"/peər/","pos":"n.","zh":"梨","sy":["pear"],"ex":["This pear is sweet.","这个梨很甜。"],"co":[["a green pear","一个绿梨"]],"em":"🍐"},
        {"w":"grape","p":"/ɡreɪp/","pos":"n.","zh":"葡萄","sy":["grape"],"ex":["Grapes are small and purple.","葡萄又小又紫。"],"co":[["a bunch of grapes","一串葡萄"]],"em":"🍇"},
        {"w":"watermelon","p":"/ˈwɔː.təˌmel.ən/","pos":"n.","zh":"西瓜","sy":["wa","ter","mel","on"],"ex":["The watermelon is big and red.","西瓜又大又红。"],"co":[["a piece of watermelon","一块西瓜"]],"em":"🍉"},
        {"w":"peach","p":"/piːtʃ/","pos":"n.","zh":"桃子","sy":["peach"],"ex":["The peach is soft.","桃子很软。"],"co":[["a juicy peach","一个多汁的桃子"]],"em":"🍑"},
        {"w":"strawberry","p":"/ˈstrɔː.bər.i/","pos":"n.","zh":"草莓","sy":["straw","ber","ry"],"ex":["I like strawberries.","我喜欢草莓。"],"co":[["strawberry ice cream","草莓冰淇淋"]],"em":"🍓"},
        {"w":"mango","p":"/ˈmæŋ.ɡəʊ/","pos":"n.","zh":"芒果","sy":["man","go"],"ex":["The mango is sweet.","芒果很甜。"],"co":[["mango juice","芒果汁"]],"em":"🥭"},
        {"w":"lemon","p":"/ˈlem.ən/","pos":"n.","zh":"柠檬","sy":["lem","on"],"ex":["The lemon is sour.","柠檬是酸的。"],"co":[["lemon tea","柠檬茶"]],"em":"🍋"},
        {"w":"cherry","p":"/ˈtʃer.i/","pos":"n.","zh":"樱桃","sy":["cher","ry"],"ex":["The cherries are red.","樱桃是红色的。"],"co":[["cherry pie","樱桃派"]],"em":"🍒"}
      ]
    },
    {
      "id": "animal",
      "name": "动物 Animals",
      "grade": "三~五年级",
      "em": "🐾",
      "words": [
        {"w":"cat","p":"/kæt/","pos":"n.","zh":"猫","sy":["cat"],"ex":["The cat can catch mice.","猫会抓老鼠。"],"co":[["a black cat","一只黑猫"]],"em":"🐱"},
        {"w":"dog","p":"/dɒɡ/","pos":"n.","zh":"狗","sy":["dog"],"ex":["The dog runs fast.","狗跑得很快。"],"co":[["walk the dog","遛狗"]],"em":"🐶"},
        {"w":"rabbit","p":"/ˈræb.ɪt/","pos":"n.","zh":"兔子","sy":["rab","bit"],"ex":["The rabbit likes carrots.","兔子喜欢胡萝卜。"],"co":[["a white rabbit","一只白兔"]],"em":"🐰"},
        {"w":"panda","p":"/ˈpæn.də/","pos":"n.","zh":"熊猫","sy":["pan","da"],"ex":["The panda eats bamboo.","熊猫吃竹子。"],"co":[["a lovely panda","一只可爱的熊猫"]],"em":"🐼"},
        {"w":"monkey","p":"/ˈmʌŋ.ki/","pos":"n.","zh":"猴子","sy":["mon","key"],"ex":["The monkey can climb trees.","猴子会爬树。"],"co":[["a funny monkey","一只滑稽的猴子"]],"em":"🐵"},
        {"w":"tiger","p":"/ˈtaɪ.ɡər/","pos":"n.","zh":"老虎","sy":["ti","ger"],"ex":["The tiger is strong.","老虎很强壮。"],"co":[["a big tiger","一只大老虎"]],"em":"🐯"},
        {"w":"lion","p":"/ˈlaɪ.ən/","pos":"n.","zh":"狮子","sy":["li","on"],"ex":["The lion is the king of animals.","狮子是百兽之王。"],"co":[["a brave lion","一只勇敢的狮子"]],"em":"🦁"},
        {"w":"elephant","p":"/ˈel.ɪ.fənt/","pos":"n.","zh":"大象","sy":["el","e","phant"],"ex":["The elephant has a long nose.","大象有长鼻子。"],"co":[["a big elephant","一头大象"]],"em":"🐘"},
        {"w":"bear","p":"/beər/","pos":"n.","zh":"熊","sy":["bear"],"ex":["The bear likes honey.","熊喜欢蜂蜜。"],"co":[["a brown bear","一只棕熊"]],"em":"🐻"},
        {"w":"horse","p":"/hɔːs/","pos":"n.","zh":"马","sy":["horse"],"ex":["The horse can run fast.","马跑得很快。"],"co":[["ride a horse","骑马"]],"em":"🐴"},
        {"w":"cow","p":"/kaʊ/","pos":"n.","zh":"奶牛","sy":["cow"],"ex":["The cow gives us milk.","奶牛给我们牛奶。"],"co":[["a black and white cow","一头黑白奶牛"]],"em":"🐮"},
        {"w":"sheep","p":"/ʃiːp/","pos":"n.","zh":"绵羊","sy":["sheep"],"ex":["The sheep is white.","绵羊是白色的。"],"co":[["a little sheep","一只小绵羊"]],"em":"🐑"},
        {"w":"duck","p":"/dʌk/","pos":"n.","zh":"鸭子","sy":["duck"],"ex":["The duck can swim.","鸭子会游泳。"],"co":[["a yellow duck","一只小黄鸭"]],"em":"🦆"},
        {"w":"mouse","p":"/maʊs/","pos":"n.","zh":"老鼠","sy":["mouse"],"ex":["The mouse is small.","老鼠很小。"],"co":[["a little mouse","一只小老鼠"]],"em":"🐭"},
        {"w":"frog","p":"/frɒɡ/","pos":"n.","zh":"青蛙","sy":["frog"],"ex":["The frog can jump high.","青蛙跳得很高。"],"co":[["a green frog","一只绿青蛙"]],"em":"🐸"},
        {"w":"bird","p":"/bɜːd/","pos":"n.","zh":"鸟","sy":["bird"],"ex":["The bird can sing.","鸟会唱歌。"],"co":[["a little bird","一只小鸟"]],"em":"🐦"}
      ]
    },
    {
      "id": "clothes",
      "name": "衣服 Clothes",
      "grade": "三~五年级",
      "em": "👕",
      "words": [
        {"w":"shirt","p":"/ʃɜːt/","pos":"n.","zh":"衬衫","sy":["shirt"],"ex":["My shirt is white.","我的衬衫是白色的。"],"co":[["a blue shirt","一件蓝衬衫"]],"em":"👔"},
        {"w":"T-shirt","p":"/ˈtiː.ʃɜːt/","pos":"n.","zh":"T恤衫","sy":["T","shirt"],"ex":["I wear a T-shirt in summer.","夏天我穿T恤。"],"co":[["a red T-shirt","一件红T恤"]],"em":"👕"},
        {"w":"skirt","p":"/skɜːt/","pos":"n.","zh":"短裙","sy":["skirt"],"ex":["She wears a pink skirt.","她穿着粉色短裙。"],"co":[["a nice skirt","一条漂亮的短裙"]],"em":"👗"},
        {"w":"dress","p":"/dres/","pos":"n.","zh":"连衣裙","sy":["dress"],"ex":["Her dress is beautiful.","她的连衣裙很漂亮。"],"co":[["a new dress","一条新连衣裙"]],"em":"👗"},
        {"w":"coat","p":"/kəʊt/","pos":"n.","zh":"外套","sy":["coat"],"ex":["Put on your coat.","穿上你的外套。"],"co":[["a warm coat","一件暖和的外套"]],"em":"🧥"},
        {"w":"jacket","p":"/ˈdʒæk.ɪt/","pos":"n.","zh":"夹克","sy":["jack","et"],"ex":["My jacket is blue.","我的夹克是蓝色的。"],"co":[["put on a jacket","穿上夹克"]],"em":"🧥"},
        {"w":"sweater","p":"/ˈswet.ər/","pos":"n.","zh":"毛衣","sy":["sweat","er"],"ex":["This sweater is soft.","这件毛衣很柔软。"],"co":[["a wool sweater","一件羊毛衫"]],"em":"🧶"},
        {"w":"trousers","p":"/ˈtraʊ.zəz/","pos":"n.","zh":"长裤","sy":["trou","sers"],"ex":["His trousers are black.","他的裤子是黑色的。"],"co":[["a pair of trousers","一条长裤"]],"em":"👖"},
        {"w":"shorts","p":"/ʃɔːts/","pos":"n.","zh":"短裤","sy":["shorts"],"ex":["He wears shorts in summer.","他夏天穿短裤。"],"co":[["a pair of shorts","一条短裤"]],"em":"🩳"},
        {"w":"shoes","p":"/ʃuːz/","pos":"n.","zh":"鞋（复）","sy":["shoes"],"ex":["My shoes are new.","我的鞋是新的。"],"co":[["a pair of shoes","一双鞋"]],"em":"👟"},
        {"w":"socks","p":"/sɒks/","pos":"n.","zh":"袜子（复）","sy":["socks"],"ex":["I wear white socks.","我穿白袜子。"],"co":[["a pair of socks","一双袜子"]],"em":"🧦"},
        {"w":"cap","p":"/kæp/","pos":"n.","zh":"棒球帽","sy":["cap"],"ex":["He has a red cap.","他有一顶红帽子。"],"co":[["a baseball cap","棒球帽"]],"em":"🧢"},
        {"w":"hat","p":"/hæt/","pos":"n.","zh":"帽子","sy":["hat"],"ex":["Put on your hat.","戴上你的帽子。"],"co":[["a straw hat","草帽"]],"em":"🎩"},
        {"w":"scarf","p":"/skɑːf/","pos":"n.","zh":"围巾","sy":["scarf"],"ex":["I wear a scarf in winter.","冬天我戴围巾。"],"co":[["a red scarf","一条红围巾"]],"em":"🧣"},
        {"w":"gloves","p":"/ɡlʌvz/","pos":"n.","zh":"手套（复）","sy":["gloves"],"ex":["Wear your gloves. It is cold.","戴上手套，天冷。"],"co":[["a pair of gloves","一副手套"]],"em":"🧤"}
      ]
    },
    {
      "id": "weather",
      "name": "天气 Weather",
      "grade": "四~五年级",
      "em": "🌦️",
      "words": [
        {"w":"sunny","p":"/ˈsʌn.i/","pos":"adj.","zh":"晴朗的","sy":["sun","ny"],"ex":["It is sunny today.","今天阳光明媚。"],"co":[["a sunny day","晴天"]],"em":"☀️"},
        {"w":"rainy","p":"/ˈreɪ.ni/","pos":"adj.","zh":"下雨的","sy":["rain","y"],"ex":["It is rainy outside.","外面在下雨。"],"co":[["a rainy day","雨天"]],"em":"🌧️"},
        {"w":"windy","p":"/ˈwɪn.di/","pos":"adj.","zh":"有风的","sy":["wind","y"],"ex":["It is windy and cool.","风很大又凉爽。"],"co":[["a windy day","刮风天"]],"em":"💨"},
        {"w":"cloudy","p":"/ˈklaʊ.di/","pos":"adj.","zh":"多云的","sy":["cloud","y"],"ex":["It is cloudy, not sunny.","是多云天，不是晴天。"],"co":[["a cloudy sky","多云的天空"]],"em":"☁️"},
        {"w":"snowy","p":"/ˈsnəʊ.i/","pos":"adj.","zh":"下雪的","sy":["snow","y"],"ex":["It is snowy in winter.","冬天会下雪。"],"co":[["a snowy day","雪天"]],"em":"❄️"},
        {"w":"hot","p":"/hɒt/","pos":"adj.","zh":"热的","sy":["hot"],"ex":["It is hot in summer.","夏天很热。"],"co":[["hot weather","炎热的天气"]],"em":"🔥"},
        {"w":"cold","p":"/kəʊld/","pos":"adj.","zh":"冷的","sy":["cold"],"ex":["It is cold today.","今天很冷。"],"co":[["cold water","冷水"]],"em":"🥶"},
        {"w":"warm","p":"/wɔːm/","pos":"adj.","zh":"温暖的","sy":["warm"],"ex":["Spring is warm.","春天很温暖。"],"co":[["a warm coat","暖和的衣服"]],"em":"🌤️"},
        {"w":"cool","p":"/kuːl/","pos":"adj.","zh":"凉爽的","sy":["cool"],"ex":["It is cool in autumn.","秋天很凉爽。"],"co":[["cool wind","凉风"]],"em":"🍂"},
        {"w":"weather","p":"/ˈweð.ər/","pos":"n.","zh":"天气","sy":["weath","er"],"ex":["How is the weather today?","今天天气怎么样？"],"co":[["weather report","天气预报"]],"em":"🌤️"},
        {"w":"rain","p":"/reɪn/","pos":"n./v.","zh":"雨；下雨","sy":["rain"],"ex":["It will rain tomorrow.","明天会下雨。"],"co":[["heavy rain","大雨"]],"em":"🌧️"},
        {"w":"snow","p":"/snəʊ/","pos":"n./v.","zh":"雪；下雪","sy":["snow"],"ex":["Look at the snow.","看这雪。"],"co":[["white snow","白雪"]],"em":"☃️"},
        {"w":"sun","p":"/sʌn/","pos":"n.","zh":"太阳","sy":["sun"],"ex":["The sun is high in the sky.","太阳高高挂在天空。"],"co":[["in the sun","在阳光下"]],"em":"☀️"},
        {"w":"cloud","p":"/klaʊd/","pos":"n.","zh":"云","sy":["cloud"],"ex":["The cloud is white.","云是白色的。"],"co":[["in the clouds","在云里"]],"em":"☁️"},
        {"w":"wind","p":"/wɪnd/","pos":"n.","zh":"风","sy":["wind"],"ex":["The wind is blowing.","风在吹。"],"co":[["a strong wind","大风"]],"em":"🌬️"}
      ]
    },
    {
      "id": "time",
      "name": "时间与星期 Time & Days",
      "grade": "四~五年级",
      "em": "⏰",
      "words": [
        {"w":"morning","p":"/ˈmɔː.nɪŋ/","pos":"n.","zh":"早上；上午","sy":["morn","ing"],"ex":["Good morning, class!","早上好，同学们！"],"co":[["in the morning","在早上"]],"em":"🌅"},
        {"w":"afternoon","p":"/ˌɑːf.təˈnuːn/","pos":"n.","zh":"下午","sy":["af","ter","noon"],"ex":["See you this afternoon.","下午见。"],"co":[["in the afternoon","在下午"]],"em":"🌇"},
        {"w":"evening","p":"/ˈiːv.nɪŋ/","pos":"n.","zh":"晚上","sy":["eve","ning"],"ex":["I watch TV in the evening.","我晚上看电视。"],"co":[["in the evening","在晚上"]],"em":"🌆"},
        {"w":"night","p":"/naɪt/","pos":"n.","zh":"夜晚","sy":["night"],"ex":["Good night!","晚安！"],"co":[["at night","在夜里"]],"em":"🌙"},
        {"w":"today","p":"/təˈdeɪ/","pos":"adv.","zh":"今天","sy":["to","day"],"ex":["It is Monday today.","今天是星期一。"],"co":[["today's lesson","今天的课"]],"em":"📅"},
        {"w":"tomorrow","p":"/təˈmɒr.əʊ/","pos":"adv.","zh":"明天","sy":["to","mor","row"],"ex":["See you tomorrow.","明天见。"],"co":[["tomorrow morning","明天早上"]],"em":"⏭️"},
        {"w":"yesterday","p":"/ˈjes.tə.deɪ/","pos":"adv.","zh":"昨天","sy":["yes","ter","day"],"ex":["I was at home yesterday.","我昨天在家。"],"co":[["yesterday evening","昨天晚上"]],"em":"⏮️"},
        {"w":"week","p":"/wiːk/","pos":"n.","zh":"星期；周","sy":["week"],"ex":["There are seven days in a week.","一周有七天。"],"co":[["this week","这周"]],"em":"📆"},
        {"w":"Monday","p":"/ˈmʌn.deɪ/","pos":"n.","zh":"星期一","sy":["Mon","day"],"ex":["We go to school on Monday.","我们星期一去上学。"],"co":[["on Monday morning","周一早上"]],"em":"1️⃣"},
        {"w":"Tuesday","p":"/ˈtjuːz.deɪ/","pos":"n.","zh":"星期二","sy":["Tues","day"],"ex":["Tuesday comes after Monday.","星期一之后是星期二。"],"co":[["on Tuesday","在星期二"]],"em":"2️⃣"},
        {"w":"Wednesday","p":"/ˈwenz.deɪ/","pos":"n.","zh":"星期三","sy":["Wednes","day"],"ex":["We have art on Wednesday.","我们星期三上美术课。"],"co":[["this Wednesday","本周三"]],"em":"3️⃣"},
        {"w":"Thursday","p":"/ˈθɜːz.deɪ/","pos":"n.","zh":"星期四","sy":["Thurs","day"],"ex":["Thursday is a busy day.","星期四是忙碌的一天。"],"co":[["on Thursday","在星期四"]],"em":"4️⃣"},
        {"w":"Friday","p":"/ˈfraɪ.deɪ/","pos":"n.","zh":"星期五","sy":["Fri","day"],"ex":["I like Friday very much.","我很喜欢星期五。"],"co":[["next Friday","下周五"]],"em":"5️⃣"},
        {"w":"Saturday","p":"/ˈsæt.ə.deɪ/","pos":"n.","zh":"星期六","sy":["Satur","day"],"ex":["We play on Saturday.","我们星期六玩。"],"co":[["on Saturday morning","周六早上"]],"em":"6️⃣"},
        {"w":"Sunday","p":"/ˈsʌn.deɪ/","pos":"n.","zh":"星期日","sy":["Sun","day"],"ex":["Sunday is a holiday.","星期日是休息日。"],"co":[["last Sunday","上周日"]],"em":"7️⃣"},
        {"w":"month","p":"/mʌnθ/","pos":"n.","zh":"月份","sy":["month"],"ex":["There are twelve months in a year.","一年有十二个月。"],"co":[["next month","下个月"]],"em":"📅"},
        {"w":"January","p":"/ˈdʒæn.ju.ər.i/","pos":"n.","zh":"一月","sy":["Jan","u","ar","y"],"ex":["January is the first month.","一月是第一个月。"],"co":[["in January","在一月"]],"em":"🎉"},
        {"w":"May","p":"/meɪ/","pos":"n.","zh":"五月","sy":["May"],"ex":["My birthday is in May.","我的生日在五月。"],"co":[["May Day","五一劳动节"]],"em":"🌹"}
      ]
    },
    {
      "id": "place",
      "name": "地点 Places",
      "grade": "四~六年级",
      "em": "📍",
      "words": [
        {"w":"home","p":"/həʊm/","pos":"n.","zh":"家","sy":["home"],"ex":["I go home at five.","我五点回家。"],"co":[["at home","在家"]],"em":"🏠"},
        {"w":"room","p":"/ruːm/","pos":"n.","zh":"房间","sy":["room"],"ex":["My room is clean.","我的房间很干净。"],"co":[["in the room","在房间里"]],"em":"🚪"},
        {"w":"kitchen","p":"/ˈkɪtʃ.ən/","pos":"n.","zh":"厨房","sy":["kit","chen"],"ex":["Mum is in the kitchen.","妈妈在厨房。"],"co":[["in the kitchen","在厨房"]],"em":"🍳"},
        {"w":"bedroom","p":"/ˈbed.ruːm/","pos":"n.","zh":"卧室","sy":["bed","room"],"ex":["I sleep in my bedroom.","我在卧室睡觉。"],"co":[["my bedroom","我的卧室"]],"em":"🛏️"},
        {"w":"bathroom","p":"/ˈbɑːθ.ruːm/","pos":"n.","zh":"浴室；卫生间","sy":["bath","room"],"ex":["Wash your hands in the bathroom.","在卫生间洗手。"],"co":[["in the bathroom","在卫生间"]],"em":"🛁"},
        {"w":"garden","p":"/ˈɡɑː.dən/","pos":"n.","zh":"花园","sy":["gar","den"],"ex":["There are flowers in the garden.","花园里有花。"],"co":[["a beautiful garden","美丽的花园"]],"em":"🌷"},
        {"w":"park","p":"/pɑːk/","pos":"n.","zh":"公园","sy":["park"],"ex":["We fly kites in the park.","我们在公园放风筝。"],"co":[["in the park","在公园里"]],"em":"🏞️"},
        {"w":"zoo","p":"/zuː/","pos":"n.","zh":"动物园","sy":["zoo"],"ex":["There are many animals in the zoo.","动物园里有很多动物。"],"co":[["go to the zoo","去动物园"]],"em":"🦁"},
        {"w":"library","p":"/ˈlaɪ.brər.i/","pos":"n.","zh":"图书馆","sy":["li","brar","y"],"ex":["I read books in the library.","我在图书馆读书。"],"co":[["school library","学校图书馆"]],"em":"📚"},
        {"w":"shop","p":"/ʃɒp/","pos":"n.","zh":"商店","sy":["shop"],"ex":["The shop sells toys.","这家商店卖玩具。"],"co":[["book shop","书店"]],"em":"🏪"},
        {"w":"supermarket","p":"/ˈsuː.pəˌmɑː.kɪt/","pos":"n.","zh":"超市","sy":["su","per","mar","ket"],"ex":["Mum goes to the supermarket.","妈妈去超市。"],"co":[["in the supermarket","在超市里"]],"em":"🛒"},
        {"w":"hospital","p":"/ˈhɒs.pɪ.təl/","pos":"n.","zh":"医院","sy":["hos","pi","tal"],"ex":["The doctor works in the hospital.","医生在医院工作。"],"co":[["in hospital","住院"]],"em":"🏥"},
        {"w":"cinema","p":"/ˈsɪn.ə.mə/","pos":"n.","zh":"电影院","sy":["cin","e","ma"],"ex":["We watch films at the cinema.","我们在电影院看电影。"],"co":[["go to the cinema","去看电影"]],"em":"🎬"},
        {"w":"farm","p":"/fɑːm/","pos":"n.","zh":"农场","sy":["farm"],"ex":["There are cows on the farm.","农场里有奶牛。"],"co":[["on a farm","在农场"]],"em":"🚜"},
        {"w":"street","p":"/striːt/","pos":"n.","zh":"街道","sy":["street"],"ex":["Don't run in the street.","不要在街上跑。"],"co":[["cross the street","过马路"]],"em":"🛣️"},
        {"w":"city","p":"/ˈsɪt.i/","pos":"n.","zh":"城市","sy":["cit","y"],"ex":["Ningbo is a big city.","宁波是个大城市。"],"co":[["in the city","在城市里"]],"em":"🏙️"},
        {"w":"village","p":"/ˈvɪl.ɪdʒ/","pos":"n.","zh":"村庄","sy":["vil","lage"],"ex":["My grandma lives in a village.","我奶奶住在村里。"],"co":[["a small village","一个小村庄"]],"em":"🏡"},
        {"w":"museum","p":"/mjuːˈziː.əm/","pos":"n.","zh":"博物馆","sy":["mu","se","um"],"ex":["We visit the science museum.","我们参观科学博物馆。"],"co":[["science museum","科技馆"]],"em":"🏛️"}
      ]
    },
    {
      "id": "job",
      "name": "职业 Jobs",
      "grade": "四~六年级",
      "em": "👷",
      "words": [
        {"w":"doctor","p":"/ˈdɒk.tər/","pos":"n.","zh":"医生","sy":["doc","tor"],"ex":["The doctor helps sick people.","医生帮助病人。"],"co":[["see a doctor","看医生"]],"em":"🧑‍⚕️"},
        {"w":"nurse","p":"/nɜːs/","pos":"n.","zh":"护士","sy":["nurse"],"ex":["The nurse is kind.","护士很和蔼。"],"co":[["a good nurse","一个好护士"]],"em":"👩‍⚕️"},
        {"w":"driver","p":"/ˈdraɪ.vər/","pos":"n.","zh":"司机","sy":["driv","er"],"ex":["My uncle is a bus driver.","我叔叔是公交车司机。"],"co":[["a taxi driver","出租车司机"]],"em":"🚗"},
        {"w":"farmer","p":"/ˈfɑː.mər/","pos":"n.","zh":"农民","sy":["farm","er"],"ex":["The farmer grows rice.","农民种水稻。"],"co":[["a hard-working farmer","勤劳的农民"]],"em":"👨‍🌾"},
        {"w":"worker","p":"/ˈwɜː.kər/","pos":"n.","zh":"工人","sy":["work","er"],"ex":["The worker builds houses.","工人盖房子。"],"co":[["factory worker","工厂工人"]],"em":"👷"},
        {"w":"police","p":"/pəˈliːs/","pos":"n.","zh":"警察","sy":["po","lice"],"ex":["The police help people.","警察帮助人们。"],"co":[["police officer","警官"]],"em":"👮"},
        {"w":"cook","p":"/kʊk/","pos":"n./v.","zh":"厨师；做饭","sy":["cook"],"ex":["The cook makes nice food.","厨师做美味的食物。"],"co":[["a good cook","好厨师"]],"em":"👨‍🍳"},
        {"w":"waiter","p":"/ˈweɪ.tər/","pos":"n.","zh":"服务员","sy":["wait","er"],"ex":["The waiter brings the soup.","服务员端来汤。"],"co":[["a polite waiter","有礼貌的服务员"]],"em":"🤵"},
        {"w":"postman","p":"/ˈpəʊst.mən/","pos":"n.","zh":"邮递员","sy":["post","man"],"ex":["The postman brings letters.","邮递员送信。"],"co":[["a postman in green","穿绿衣的邮递员"]],"em":"📮"},
        {"w":"dentist","p":"/ˈden.tɪst/","pos":"n.","zh":"牙医","sy":["den","tist"],"ex":["The dentist checks my teeth.","牙医检查我的牙齿。"],"co":[["go to the dentist","看牙医"]],"em":"🦷"},
        {"w":"pilot","p":"/ˈpaɪ.lət/","pos":"n.","zh":"飞行员","sy":["pi","lot"],"ex":["The pilot flies a plane.","飞行员开飞机。"],"co":[["a brave pilot","勇敢的飞行员"]],"em":"👨‍✈️"},
        {"w":"singer","p":"/ˈsɪŋ.ər/","pos":"n.","zh":"歌手","sy":["sing","er"],"ex":["The singer has a nice voice.","歌手的声音很好听。"],"co":[["a famous singer","著名歌手"]],"em":"🎤"},
        {"w":"dancer","p":"/ˈdɑːn.sər/","pos":"n.","zh":"舞蹈家","sy":["danc","er"],"ex":["The dancer moves beautifully.","舞者舞姿优美。"],"co":[["a ballet dancer","芭蕾舞者"]],"em":"💃"},
        {"w":"firefighter","p":"/ˈfaɪəˌfaɪ.tər/","pos":"n.","zh":"消防员","sy":["fire","fight","er"],"ex":["The firefighter is very brave.","消防员非常勇敢。"],"co":[["a brave firefighter","勇敢的消防员"]],"em":"🧑‍🚒"}
      ]
    },
    {
      "id": "transport",
      "name": "交通 Transport",
      "grade": "四~五年级",
      "em": "🚌",
      "words": [
        {"w":"bus","p":"/bʌs/","pos":"n.","zh":"公共汽车","sy":["bus"],"ex":["I go to school by bus.","我坐公交车上学。"],"co":[["school bus","校车"]],"em":"🚌"},
        {"w":"car","p":"/kɑːr/","pos":"n.","zh":"小汽车","sy":["car"],"ex":["My father drives a car.","我爸爸开汽车。"],"co":[["by car","坐汽车"]],"em":"🚗"},
        {"w":"bike","p":"/baɪk/","pos":"n.","zh":"自行车","sy":["bike"],"ex":["I ride a bike to the park.","我骑自行车去公园。"],"co":[["ride a bike","骑自行车"]],"em":"🚲"},
        {"w":"train","p":"/treɪn/","pos":"n.","zh":"火车","sy":["train"],"ex":["The train is very long.","火车很长。"],"co":[["by train","坐火车"]],"em":"🚆"},
        {"w":"plane","p":"/pleɪn/","pos":"n.","zh":"飞机","sy":["plane"],"ex":["The plane flies in the sky.","飞机在天上飞。"],"co":[["by plane","坐飞机"]],"em":"✈️"},
        {"w":"ship","p":"/ʃɪp/","pos":"n.","zh":"轮船","sy":["ship"],"ex":["The ship sails on the sea.","轮船在海上航行。"],"co":[["by ship","坐轮船"]],"em":"🚢"},
        {"w":"boat","p":"/bəʊt/","pos":"n.","zh":"小船","sy":["boat"],"ex":["We row the boat on the lake.","我们在湖上划船。"],"co":[["a little boat","小船"]],"em":"⛵"},
        {"w":"taxi","p":"/ˈtæk.si/","pos":"n.","zh":"出租车","sy":["tax","i"],"ex":["Let's take a taxi.","我们打车吧。"],"co":[["call a taxi","叫出租车"]],"em":"🚕"},
        {"w":"subway","p":"/ˈsʌb.weɪ/","pos":"n.","zh":"地铁","sy":["sub","way"],"ex":["The subway is fast.","地铁很快。"],"co":[["by subway","坐地铁"]],"em":"🚇"},
        {"w":"walk","p":"/wɔːk/","pos":"v.","zh":"步行；走","sy":["walk"],"ex":["I walk to school.","我走路去学校。"],"co":[["walk to school","走去学校"]],"em":"🚶"},
        {"w":"ride","p":"/raɪd/","pos":"v.","zh":"骑；乘","sy":["ride"],"ex":["I can ride a horse.","我会骑马。"],"co":[["ride a bike","骑自行车"]],"em":"🐎"}
      ]
    },
    {
      "id": "action",
      "name": "动作动词 Actions",
      "grade": "三~五年级",
      "em": "🏃",
      "words": [
        {"w":"run","p":"/rʌn/","pos":"v.","zh":"跑","sy":["run"],"ex":["I can run fast.","我能跑得很快。"],"co":[["run after","追赶"]],"em":"🏃"},
        {"w":"jump","p":"/dʒʌmp/","pos":"v.","zh":"跳","sy":["jump"],"ex":["The rabbit can jump high.","兔子跳得很高。"],"co":[["jump rope","跳绳"]],"em":"🤸"},
        {"w":"swim","p":"/swɪm/","pos":"v.","zh":"游泳","sy":["swim"],"ex":["Fish can swim.","鱼会游泳。"],"co":[["go swimming","去游泳"]],"em":"🏊"},
        {"w":"sing","p":"/sɪŋ/","pos":"v.","zh":"唱歌","sy":["sing"],"ex":["I like to sing songs.","我喜欢唱歌。"],"co":[["sing a song","唱一首歌"]],"em":"🎤"},
        {"w":"read","p":"/riːd/","pos":"v.","zh":"读；阅读","sy":["read"],"ex":["I read books every night.","我每晚读书。"],"co":[["read a story","读故事"]],"em":"📖"},
        {"w":"write","p":"/raɪt/","pos":"v.","zh":"写","sy":["write"],"ex":["Please write your name.","请写下你的名字。"],"co":[["write a letter","写信"]],"em":"✍️"},
        {"w":"draw","p":"/drɔː/","pos":"v.","zh":"画","sy":["draw"],"ex":["I draw a picture of my cat.","我画我的猫。"],"co":[["draw a picture","画画"]],"em":"🎨"},
        {"w":"play","p":"/pleɪ/","pos":"v.","zh":"玩；打（球）","sy":["play"],"ex":["Let's play football.","我们踢足球吧。"],"co":[["play games","玩游戏"]],"em":"⚽"},
        {"w":"eat","p":"/iːt/","pos":"v.","zh":"吃","sy":["eat"],"ex":["We eat lunch at noon.","我们中午吃午饭。"],"co":[["eat breakfast","吃早饭"]],"em":"🍽️"},
        {"w":"drink","p":"/drɪŋk/","pos":"v.","zh":"喝","sy":["drink"],"ex":["Drink some water.","喝点水。"],"co":[["drink tea","喝茶"]],"em":"🥤"},
        {"w":"sleep","p":"/sliːp/","pos":"v.","zh":"睡觉","sy":["sleep"],"ex":["The baby is sleeping.","宝宝在睡觉。"],"co":[["go to sleep","去睡觉"]],"em":"😴"},
        {"w":"sit","p":"/sɪt/","pos":"v.","zh":"坐","sy":["sit"],"ex":["Please sit down.","请坐下。"],"co":[["sit down","坐下"]],"em":"🪑"},
        {"w":"stand","p":"/stænd/","pos":"v.","zh":"站","sy":["stand"],"ex":["Stand up, please.","请起立。"],"co":[["stand up","起立"]],"em":"🧍"},
        {"w":"come","p":"/kʌm/","pos":"v.","zh":"来","sy":["come"],"ex":["Come here, please.","请过来。"],"co":[["come back","回来"]],"em":"🚶"},
        {"w":"go","p":"/ɡəʊ/","pos":"v.","zh":"去","sy":["go"],"ex":["Let's go to school.","我们去学校吧。"],"co":[["go home","回家"]],"em":"🏃‍♂️"},
        {"w":"look","p":"/lʊk/","pos":"v.","zh":"看","sy":["look"],"ex":["Look at the blackboard.","看黑板。"],"co":[["look for","寻找"]],"em":"👀"},
        {"w":"listen","p":"/ˈlɪs.ən/","pos":"v.","zh":"听","sy":["lis","ten"],"ex":["Listen to the teacher.","听老师讲。"],"co":[["listen to music","听音乐"]],"em":"👂"},
        {"w":"help","p":"/help/","pos":"v.","zh":"帮助","sy":["help"],"ex":["Can you help me?","你能帮帮我吗？"],"co":[["help others","帮助别人"]],"em":"🤝"},
        {"w":"clean","p":"/kliːn/","pos":"v./adj.","zh":"打扫；干净的","sy":["clean"],"ex":["Let's clean the room.","我们打扫房间吧。"],"co":[["clean the desk","擦课桌"]],"em":"🧹"},
        {"w":"make","p":"/meɪk/","pos":"v.","zh":"做；制作","sy":["make"],"ex":["I can make a paper plane.","我会做纸飞机。"],"co":[["make a cake","做蛋糕"]],"em":"🛠️"}
      ]
    },
    {
      "id": "adj",
      "name": "常用形容词 Adjectives",
      "grade": "三~六年级",
      "em": "✨",
      "words": [
        {"w":"big","p":"/bɪɡ/","pos":"adj.","zh":"大的","sy":["big"],"ex":["The elephant is big.","大象很大。"],"co":[["a big tree","一棵大树"]],"em":"🐘"},
        {"w":"small","p":"/smɔːl/","pos":"adj.","zh":"小的","sy":["small"],"ex":["The mouse is small.","老鼠很小。"],"co":[["a small box","一个小盒子"]],"em":"🐭"},
        {"w":"tall","p":"/tɔːl/","pos":"adj.","zh":"高的","sy":["tall"],"ex":["My father is tall.","我爸爸很高。"],"co":[["a tall building","高楼"]],"em":"🗼"},
        {"w":"short","p":"/ʃɔːt/","pos":"adj.","zh":"矮的；短的","sy":["short"],"ex":["The pencil is short.","铅笔很短。"],"co":[["short hair","短发"]],"em":"📏"},
        {"w":"long","p":"/lɒŋ/","pos":"adj.","zh":"长的","sy":["long"],"ex":["The snake is long.","蛇很长。"],"co":[["long hair","长发"]],"em":"🐍"},
        {"w":"fat","p":"/fæt/","pos":"adj.","zh":"胖的","sy":["fat"],"ex":["The cat is fat.","这只猫很胖。"],"co":[["a fat pig","一只肥猪"]],"em":"🐷"},
        {"w":"thin","p":"/θɪn/","pos":"adj.","zh":"瘦的","sy":["thin"],"ex":["The pencil is thin.","铅笔很细。"],"co":[["a thin boy","瘦男孩"]],"em":"🪶"},
        {"w":"new","p":"/njuː/","pos":"adj.","zh":"新的","sy":["new"],"ex":["I have a new bag.","我有一个新书包。"],"co":[["a new friend","新朋友"]],"em":"✨"},
        {"w":"old","p":"/əʊld/","pos":"adj.","zh":"旧的；年老的","sy":["old"],"ex":["My shoes are old.","我的鞋旧了。"],"co":[["an old house","老房子"]],"em":"🏚️"},
        {"w":"good","p":"/ɡʊd/","pos":"adj.","zh":"好的","sy":["good"],"ex":["She is a good student.","她是个好学生。"],"co":[["good morning","早上好"]],"em":"👍"},
        {"w":"bad","p":"/bæd/","pos":"adj.","zh":"坏的；不好的","sy":["bad"],"ex":["The weather is bad today.","今天天气不好。"],"co":[["a bad habit","坏习惯"]],"em":"👎"},
        {"w":"happy","p":"/ˈhæp.i/","pos":"adj.","zh":"快乐的","sy":["hap","py"],"ex":["I am happy today.","我今天很开心。"],"co":[["Happy birthday!","生日快乐！"]],"em":"😄"},
        {"w":"sad","p":"/sæd/","pos":"adj.","zh":"难过的","sy":["sad"],"ex":["Don't be sad.","别难过。"],"co":[["a sad story","悲伤的故事"]],"em":"😢"},
        {"w":"fast","p":"/fɑːst/","pos":"adj.","zh":"快的","sy":["fast"],"ex":["The train is fast.","火车很快。"],"co":[["run fast","跑得快"]],"em":"⚡"},
        {"w":"slow","p":"/sləʊ/","pos":"adj.","zh":"慢的","sy":["slow"],"ex":["The snail is slow.","蜗牛爬得慢。"],"co":[["a slow turtle","慢乌龟"]],"em":"🐌"},
        {"w":"easy","p":"/ˈiː.zi/","pos":"adj.","zh":"容易的","sy":["ea","sy"],"ex":["This question is easy.","这道题很简单。"],"co":[["easy to do","容易做"]],"em":"😊"},
        {"w":"difficult","p":"/ˈdɪf.ɪ.kəlt/","pos":"adj.","zh":"困难的","sy":["dif","fi","cult"],"ex":["This word is difficult.","这个单词很难。"],"co":[["a difficult question","难题"]],"em":"😣"},
        {"w":"beautiful","p":"/ˈbjuː.tɪ.fəl/","pos":"adj.","zh":"美丽的","sy":["beau","ti","ful"],"ex":["What a beautiful flower!","多美的花呀！"],"co":[["a beautiful girl","美丽的女孩"]],"em":"🌺"},
        {"w":"lovely","p":"/ˈlʌv.li/","pos":"adj.","zh":"可爱的","sy":["love","ly"],"ex":["The baby is lovely.","宝宝很可爱。"],"co":[["a lovely dog","可爱的狗"]],"em":"🥰"},
        {"w":"funny","p":"/ˈfʌn.i/","pos":"adj.","zh":"有趣的；滑稽的","sy":["fun","ny"],"ex":["The clown is funny.","小丑很滑稽。"],"co":[["a funny story","有趣的故事"]],"em":"🤡"},
        {"w":"kind","p":"/kaɪnd/","pos":"adj.","zh":"善良的；友好的","sy":["kind"],"ex":["She is kind to me.","她对我很好。"],"co":[["a kind teacher","和蔼的老师"]],"em":"💗"},
        {"w":"busy","p":"/ˈbɪz.i/","pos":"adj.","zh":"忙碌的","sy":["bus","y"],"ex":["My mum is busy today.","我妈妈今天很忙。"],"co":[["be busy with","忙于"]],"em":"📌"}
      ]
    },
    {
      "id": "feeling",
      "name": "情绪感受 Feelings",
      "grade": "四~六年级",
      "em": "🎭",
      "words": [
        {"w":"hungry","p":"/ˈhʌŋ.ɡri/","pos":"adj.","zh":"饿的","sy":["hun","gry"],"ex":["I am hungry now.","我现在饿了。"],"co":[["feel hungry","觉得饿"]],"em":"🍽️"},
        {"w":"thirsty","p":"/ˈθɜː.sti/","pos":"adj.","zh":"渴的","sy":["thirs","ty"],"ex":["I am thirsty. I want water.","我渴了，想喝水。"],"co":[["feel thirsty","觉得渴"]],"em":"🥤"},
        {"w":"tired","p":"/taɪəd/","pos":"adj.","zh":"累的","sy":["tir","ed"],"ex":["I am tired after school.","放学后我很累。"],"co":[["feel tired","觉得累"]],"em":"😪"},
        {"w":"angry","p":"/ˈæŋ.ɡri/","pos":"adj.","zh":"生气的","sy":["an","gry"],"ex":["Don't be angry.","别生气。"],"co":[["get angry","生气"]],"em":"😠"},
        {"w":"afraid","p":"/əˈfreɪd/","pos":"adj.","zh":"害怕的","sy":["a","fraid"],"ex":["I am afraid of the dark.","我怕黑。"],"co":[["be afraid of","害怕"]],"em":"😨"},
        {"w":"excited","p":"/ɪkˈsaɪ.tɪd/","pos":"adj.","zh":"兴奋的","sy":["ex","cit","ed"],"ex":["We are excited about the trip.","我们对旅行很兴奋。"],"co":[["get excited","变得兴奋"]],"em":"🤩"},
        {"w":"worried","p":"/ˈwʌr.id/","pos":"adj.","zh":"担心的","sy":["wor","ried"],"ex":["Mum is worried about me.","妈妈担心我。"],"co":[["be worried about","担心"]],"em":"😟"},
        {"w":"surprised","p":"/səˈpraɪzd/","pos":"adj.","zh":"惊讶的","sy":["sur","prised"],"ex":["I am surprised to see you.","见到你我很惊讶。"],"co":[["feel surprised","感到惊讶"]],"em":"😲"},
        {"w":"bored","p":"/bɔːd/","pos":"adj.","zh":"无聊的","sy":["bored"],"ex":["I am bored at home.","我在家很无聊。"],"co":[["feel bored","觉得无聊"]],"em":"😑"},
        {"w":"proud","p":"/praʊd/","pos":"adj.","zh":"自豪的","sy":["proud"],"ex":["I am proud of my class.","我为班级感到自豪。"],"co":[["be proud of","为…自豪"]],"em":"😌"}
      ]
    },
    {
      "id": "sport",
      "name": "运动 Sports",
      "grade": "四~六年级",
      "em": "⚽",
      "words": [
        {"w":"football","p":"/ˈfʊt.bɔːl/","pos":"n.","zh":"足球","sy":["foot","ball"],"ex":["We play football after class.","课后我们踢足球。"],"co":[["play football","踢足球"]],"em":"⚽"},
        {"w":"basketball","p":"/ˈbɑː.skɪt.bɔːl/","pos":"n.","zh":"篮球","sy":["bas","ket","ball"],"ex":["He can play basketball.","他会打篮球。"],"co":[["play basketball","打篮球"]],"em":"🏀"},
        {"w":"volleyball","p":"/ˈvɒl.i.bɔːl/","pos":"n.","zh":"排球","sy":["vol","ley","ball"],"ex":["They play volleyball on the beach.","他们在沙滩上打排球。"],"co":[["play volleyball","打排球"]],"em":"🏐"},
        {"w":"badminton","p":"/ˈbæd.mɪn.tən/","pos":"n.","zh":"羽毛球","sy":["bad","min","ton"],"ex":["I play badminton with Dad.","我和爸爸打羽毛球。"],"co":[["play badminton","打羽毛球"]],"em":"🏸"},
        {"w":"ping-pong","p":"/ˈpɪŋ.pɒŋ/","pos":"n.","zh":"乒乓球","sy":["ping","pong"],"ex":["Ping-pong is popular in China.","乒乓球在中国很流行。"],"co":[["play ping-pong","打乒乓球"]],"em":"🏓"},
        {"w":"running","p":"/ˈrʌn.ɪŋ/","pos":"n.","zh":"跑步","sy":["run","ning"],"ex":["I like running in the morning.","我喜欢早上跑步。"],"co":[["go running","去跑步"]],"em":"🏃"},
        {"w":"skating","p":"/ˈskeɪ.tɪŋ/","pos":"n.","zh":"滑冰","sy":["skat","ing"],"ex":["We go skating in winter.","我们冬天去滑冰。"],"co":[["go skating","去滑冰"]],"em":"⛸️"},
        {"w":"skipping","p":"/ˈskɪp.ɪŋ/","pos":"n.","zh":"跳绳","sy":["skip","ping"],"ex":["Skipping is fun.","跳绳很有趣。"],"co":[["skip a rope","跳绳"]],"em":"🪢"},
        {"w":"tennis","p":"/ˈten.ɪs/","pos":"n.","zh":"网球","sy":["ten","nis"],"ex":["She plays tennis on weekends.","她周末打网球。"],"co":[["play tennis","打网球"]],"em":"🎾"},
        {"w":"swimming","p":"/ˈswɪm.ɪŋ/","pos":"n.","zh":"游泳","sy":["swim","ming"],"ex":["Swimming is my favourite sport.","游泳是我最喜欢的运动。"],"co":[["go swimming","去游泳"]],"em":"🏊"}
      ]
    },
    {
      "id": "nature",
      "name": "自然 Nature",
      "grade": "四~六年级",
      "em": "🌳",
      "words": [
        {"w":"tree","p":"/triː/","pos":"n.","zh":"树","sy":["tree"],"ex":["The birds are in the tree.","鸟在树上。"],"co":[["plant a tree","种树"]],"em":"🌳"},
        {"w":"flower","p":"/ˈflaʊ.ər/","pos":"n.","zh":"花","sy":["flow","er"],"ex":["The flowers are beautiful.","这些花很漂亮。"],"co":[["a bunch of flowers","一束花"]],"em":"🌸"},
        {"w":"grass","p":"/ɡrɑːs/","pos":"n.","zh":"草","sy":["grass"],"ex":["Don't walk on the grass.","不要踩草坪。"],"co":[["green grass","绿草"]],"em":"🌿"},
        {"w":"river","p":"/ˈrɪv.ər/","pos":"n.","zh":"河流","sy":["riv","er"],"ex":["The river is long and clean.","河水又长又清。"],"co":[["in the river","在河里"]],"em":"🏞️"},
        {"w":"lake","p":"/leɪk/","pos":"n.","zh":"湖","sy":["lake"],"ex":["We swim in the lake in summer.","夏天我们在湖里游泳。"],"co":[["by the lake","湖边"]],"em":"🏞️"},
        {"w":"sea","p":"/siː/","pos":"n.","zh":"海","sy":["sea"],"ex":["The sea is blue.","大海是蓝色的。"],"co":[["in the sea","在海里"]],"em":"🌊"},
        {"w":"mountain","p":"/ˈmaʊn.tɪn/","pos":"n.","zh":"山","sy":["moun","tain"],"ex":["We climb the mountain.","我们爬山。"],"co":[["climb a mountain","爬山"]],"em":"⛰️"},
        {"w":"hill","p":"/hɪl/","pos":"n.","zh":"小山","sy":["hill"],"ex":["The house is on the hill.","房子在小山上。"],"co":[["up the hill","上山"]],"em":"🌄"},
        {"w":"moon","p":"/muːn/","pos":"n.","zh":"月亮","sy":["moon"],"ex":["The moon is bright tonight.","今晚月亮很亮。"],"co":[["full moon","满月"]],"em":"🌕"},
        {"w":"star","p":"/stɑːr/","pos":"n.","zh":"星星","sy":["star"],"ex":["The stars twinkle at night.","夜晚星星闪烁。"],"co":[["shooting star","流星"]],"em":"⭐"},
        {"w":"sky","p":"/skaɪ/","pos":"n.","zh":"天空","sy":["sky"],"ex":["The sky is blue.","天空是蓝色的。"],"co":[["in the sky","在天空中"]],"em":"🌤️"},
        {"w":"water","p":"/ˈwɔː.tər/","pos":"n.","zh":"水","sy":["wa","ter"],"ex":["Drink more water.","多喝水。"],"co":[["a glass of water","一杯水"]],"em":"💧"},
        {"w":"fire","p":"/faɪər/","pos":"n.","zh":"火","sy":["fire"],"ex":["Don't play with fire.","不要玩火。"],"co":[["make a fire","生火"]],"em":"🔥"},
        {"w":"stone","p":"/stəʊn/","pos":"n.","zh":"石头","sy":["stone"],"ex":["There is a stone on the road.","路上有块石头。"],"co":[["a big stone","大石头"]],"em":"🪨"},
        {"w":"sand","p":"/sænd/","pos":"n.","zh":"沙子","sy":["sand"],"ex":["Children play in the sand.","孩子们在沙子里玩。"],"co":[["on the sand","在沙滩上"]],"em":"🏖️"}
      ]
    },
    {
      "id": "position",
      "name": "方位与位置 Position",
      "grade": "三~五年级",
      "em": "🧭",
      "words": [
        {"w":"in","p":"/ɪn/","pos":"prep.","zh":"在…里面","sy":["in"],"ex":["The pen is in the box.","钢笔在盒子里。"],"co":[["in the bag","在包里"]],"em":"📦"},
        {"w":"on","p":"/ɒn/","pos":"prep.","zh":"在…上面","sy":["on"],"ex":["The book is on the desk.","书在桌上。"],"co":[["on the wall","在墙上"]],"em":"🖼️"},
        {"w":"under","p":"/ˈʌn.dər/","pos":"prep.","zh":"在…下面","sy":["un","der"],"ex":["The cat is under the chair.","猫在椅子下面。"],"co":[["under the bed","床下"]],"em":"⬇️"},
        {"w":"behind","p":"/bɪˈhaɪnd/","pos":"prep.","zh":"在…后面","sy":["be","hind"],"ex":["The tree is behind the house.","树在房子后面。"],"co":[["behind the door","门后"]],"em":"🚪"},
        {"w":"in front of","p":"/ɪn frʌnt əv/","pos":"prep.","zh":"在…前面","sy":["in front of"],"ex":["The teacher stands in front of the class.","老师站在全班前面。"],"co":[["in front of the school","学校前面"]],"em":"➡️"},
        {"w":"next to","p":"/nekst tuː/","pos":"prep.","zh":"紧挨着","sy":["next to"],"ex":["I sit next to Tom.","我坐在汤姆旁边。"],"co":[["next to the window","窗边"]],"em":"↔️"},
        {"w":"between","p":"/bɪˈtwiːn/","pos":"prep.","zh":"在…之间","sy":["be","tween"],"ex":["The ball is between the two chairs.","球在两把椅子之间。"],"co":[["between you and me","在你我之间"]],"em":"🔀"},
        {"w":"near","p":"/nɪər/","pos":"prep.","zh":"在…附近","sy":["near"],"ex":["The park is near my home.","公园在我家附近。"],"co":[["near the river","河边"]],"em":"📍"},
        {"w":"left","p":"/left/","pos":"adj./n.","zh":"左边的；左边","sy":["left"],"ex":["Turn left at the corner.","在拐角向左转。"],"co":[["on the left","在左边"]],"em":"⬅️"},
        {"w":"right","p":"/raɪt/","pos":"adj./n.","zh":"右边的；右边","sy":["right"],"ex":["Raise your right hand.","举起你的右手。"],"co":[["on the right","在右边"]],"em":"➡️"},
        {"w":"up","p":"/ʌp/","pos":"adv.","zh":"向上","sy":["up"],"ex":["Stand up, please.","请站起来。"],"co":[["go up the stairs","上楼"]],"em":"⬆️"},
        {"w":"down","p":"/daʊn/","pos":"adv.","zh":"向下","sy":["down"],"ex":["Sit down, please.","请坐下。"],"co":[["come down","下来"]],"em":"⬇️"},
        {"w":"here","p":"/hɪər/","pos":"adv.","zh":"这里","sy":["here"],"ex":["Come here, please.","请到这里来。"],"co":[["here and there","到处"]],"em":"📍"},
        {"w":"there","p":"/ðeər/","pos":"adv.","zh":"那里","sy":["there"],"ex":["The book is over there.","书在那边。"],"co":[["over there","在那边"]],"em":"👉"}
      ]
    },
    {
      "id": "function",
      "name": "代词与常用词 Pronouns & More",
      "grade": "三~六年级",
      "em": "🔤",
      "words": [
        {"w":"I","p":"/aɪ/","pos":"pron.","zh":"我","sy":["I"],"ex":["I am a pupil.","我是一名小学生。"],"co":[["I am","我是"]],"em":"🙋"},
        {"w":"you","p":"/juː/","pos":"pron.","zh":"你；你们","sy":["you"],"ex":["You are my friend.","你是我的朋友。"],"co":[["thank you","谢谢你"]],"em":"👉"},
        {"w":"he","p":"/hiː/","pos":"pron.","zh":"他","sy":["he"],"ex":["He is my brother.","他是我哥哥。"],"co":[["he is","他是"]],"em":"👦"},
        {"w":"she","p":"/ʃiː/","pos":"pron.","zh":"她","sy":["she"],"ex":["She is my sister.","她是我妹妹。"],"co":[["she is","她是"]],"em":"👧"},
        {"w":"it","p":"/ɪt/","pos":"pron.","zh":"它","sy":["it"],"ex":["It is a dog.","它是一只狗。"],"co":[["it is","它是"]],"em":"🐶"},
        {"w":"we","p":"/wiː/","pos":"pron.","zh":"我们","sy":["we"],"ex":["We are good friends.","我们是好朋友。"],"co":[["we are","我们是"]],"em":"👫"},
        {"w":"they","p":"/ðeɪ/","pos":"pron.","zh":"他们","sy":["they"],"ex":["They are my classmates.","他们是我的同学。"],"co":[["they are","他们是"]],"em":"👨‍👩‍👧"},
        {"w":"my","p":"/maɪ/","pos":"pron.","zh":"我的","sy":["my"],"ex":["This is my book.","这是我的书。"],"co":[["my name","我的名字"]],"em":"🙋"},
        {"w":"your","p":"/jɔːr/","pos":"pron.","zh":"你的；你们的","sy":["your"],"ex":["What is your name?","你叫什么名字？"],"co":[["your bag","你的包"]],"em":"📛"},
        {"w":"his","p":"/hɪz/","pos":"pron.","zh":"他的","sy":["his"],"ex":["His bike is new.","他的自行车是新的。"],"co":[["his pen","他的钢笔"]],"em":"👦"},
        {"w":"her","p":"/hɜːr/","pos":"pron.","zh":"她的","sy":["her"],"ex":["Her dress is pink.","她的连衣裙是粉色的。"],"co":[["her name","她的名字"]],"em":"👧"},
        {"w":"our","p":"/aʊər/","pos":"pron.","zh":"我们的","sy":["our"],"ex":["Our classroom is big.","我们的教室很大。"],"co":[["our school","我们的学校"]],"em":"👨‍👩‍👧"},
        {"w":"this","p":"/ðɪs/","pos":"pron.","zh":"这个","sy":["this"],"ex":["This is a cat.","这是一只猫。"],"co":[["this morning","今天早上"]],"em":"☝️"},
        {"w":"that","p":"/ðæt/","pos":"pron.","zh":"那个","sy":["that"],"ex":["That is a bird.","那是一只鸟。"],"co":[["that boy","那个男孩"]],"em":"👇"},
        {"w":"what","p":"/wɒt/","pos":"pron.","zh":"什么","sy":["what"],"ex":["What is this?","这是什么？"],"co":[["what colour","什么颜色"]],"em":"❓"},
        {"w":"who","p":"/huː/","pos":"pron.","zh":"谁","sy":["who"],"ex":["Who is that girl?","那个女孩是谁？"],"co":[["who is","谁是"]],"em":"❓"},
        {"w":"where","p":"/weər/","pos":"adv.","zh":"哪里","sy":["where"],"ex":["Where is my pen?","我的钢笔在哪里？"],"co":[["where is","…在哪里"]],"em":"📍"},
        {"w":"how","p":"/haʊ/","pos":"adv.","zh":"怎样；多少","sy":["how"],"ex":["How old are you?","你几岁了？"],"co":[["how many","多少"]],"em":"🤔"},
        {"w":"why","p":"/waɪ/","pos":"adv.","zh":"为什么","sy":["why"],"ex":["Why are you late?","你为什么迟到？"],"co":[["why not","为什么不"]],"em":"❓"},
        {"w":"and","p":"/ænd/","pos":"conj.","zh":"和；并且","sy":["and"],"ex":["I like apples and bananas.","我喜欢苹果和香蕉。"],"co":[["you and me","你和我"]],"em":"➕"},
        {"w":"with","p":"/wɪð/","pos":"prep.","zh":"和…一起；带有","sy":["with"],"ex":["I play with my friends.","我和朋友们一起玩。"],"co":[["with me","和我一起"]],"em":"🤝"},
        {"w":"from","p":"/frɒm/","pos":"prep.","zh":"来自；从","sy":["from"],"ex":["I am from China.","我来自中国。"],"co":[["from morning to night","从早到晚"]],"em":"➡️"}
      ]
    },
    {
      "id": "country",
      "name": "国家与节日 Countries & Festivals",
      "grade": "五~六年级",
      "em": "🌍",
      "words": [
        {"w":"China","p":"/ˈtʃaɪ.nə/","pos":"n.","zh":"中国","sy":["Chi","na"],"ex":["China is a big country.","中国是一个大国。"],"co":[["in China","在中国"]],"em":"🇨🇳"},
        {"w":"America","p":"/əˈmer.ɪ.kə/","pos":"n.","zh":"美国","sy":["A","mer","i","ca"],"ex":["New York is in America.","纽约在美国。"],"co":[["in America","在美国"]],"em":"🇺🇸"},
        {"w":"England","p":"/ˈɪŋ.ɡlənd/","pos":"n.","zh":"英国（英格兰）","sy":["Eng","land"],"ex":["London is in England.","伦敦在英格兰。"],"co":[["from England","来自英国"]],"em":"🇬🇧"},
        {"w":"Canada","p":"/ˈkæn.ə.də/","pos":"n.","zh":"加拿大","sy":["Can","a","da"],"ex":["Canada is cold in winter.","加拿大冬天很冷。"],"co":[["in Canada","在加拿大"]],"em":"🇨🇦"},
        {"w":"Australia","p":"/ɒˈstreɪ.li.ə/","pos":"n.","zh":"澳大利亚","sy":["Aus","tra","li","a"],"ex":["Kangaroos live in Australia.","袋鼠生活在澳大利亚。"],"co":[["from Australia","来自澳大利亚"]],"em":"🇦🇺"},
        {"w":"Japan","p":"/dʒəˈpæn/","pos":"n.","zh":"日本","sy":["Ja","pan"],"ex":["Tokyo is the capital of Japan.","东京是日本的首都。"],"co":[["in Japan","在日本"]],"em":"🇯🇵"},
        {"w":"Chinese","p":"/ˌtʃaɪˈniːz/","pos":"n./adj.","zh":"中文；中国人（的）","sy":["Chi","nese"],"ex":["I speak Chinese at home.","我在家说中文。"],"co":[["Chinese food","中餐"]],"em":"🀄"},
        {"w":"English","p":"/ˈɪŋ.ɡlɪʃ/","pos":"n./adj.","zh":"英语；英国人（的）","sy":["Eng","lish"],"ex":["We learn English at school.","我们在学校学英语。"],"co":[["English book","英语书"]],"em":"🇬🇧"},
        {"w":"Spring Festival","p":"/sprɪŋ ˈfes.tɪ.vəl/","pos":"n.","zh":"春节","sy":["Spring Fes","ti","val"],"ex":["We eat dumplings at the Spring Festival.","春节我们吃饺子。"],"co":[["during the Spring Festival","春节期间"]],"em":"🧧"},
        {"w":"Christmas","p":"/ˈkrɪs.məs/","pos":"n.","zh":"圣诞节","sy":["Christ","mas"],"ex":["We get presents at Christmas.","圣诞节我们会收到礼物。"],"co":[["Merry Christmas!","圣诞快乐！"]],"em":"🎄"},
        {"w":"National Day","p":"/ˈnæʃ.ən.əl deɪ/","pos":"n.","zh":"国庆节","sy":["Na","tion","al Day"],"ex":["October 1st is our National Day.","十月一日是我们的国庆节。"],"co":[["on National Day","在国庆节"]],"em":"🎉"}
      ]
    }
  ]
};





