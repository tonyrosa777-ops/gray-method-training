/**
 * GRAY METHOD TRAINING — BLOG POSTS
 *
 * All blog content lives here. No CMS. No Sanity.
 * When Adam wants a new post, contact Anthony at Optimus Business Solutions.
 *
 * Brand voice rules: no "clean eating", "cheat meal", "transform", "toning",
 * "holistic", "optimize", "sustainable results", "journey".
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  category: { title: string; slug: string };
  imageSrc: string;
  body: BlogBlock[];
}

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "blockquote"; text: string }
  | { type: "ul"; items: string[] };

// ---------------------------------------------------------------------------

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Why Women Typically Have a Harder Time Losing Body Fat Than Men",
    slug: "why-women-harder-time-losing-fat",
    publishedAt: "2024-05-23T00:00:00Z",
    excerpt:
      "It has much more to do with the mindset around nutrition and exercise than biology. After nearly 10 years and close to a thousand clients, here's what I've learned.",
    category: { title: "Nutrition", slug: "nutrition" },
    imageSrc: "/images/blog/blog-women-fat-loss.jpg",
    body: [
      { type: "p", text: "This one comes up constantly. A husband and wife start the same program on the same day. Eight weeks in, he's down 14 pounds and she's down 4. She's doing everything right. He ate pizza twice and skipped a Thursday workout. It feels deeply unfair — because it is." },
      { type: "p", text: "But here's the thing I've learned after coaching close to a thousand clients: biology explains some of it. The mindset piece explains most of it." },
      { type: "h2", id: "biology", text: "The Biology Is Real — But Smaller Than You Think" },
      { type: "p", text: "Men carry more lean muscle mass on average, which means a higher resting metabolic rate. More muscle burns more calories at rest. That's real. Testosterone also makes it easier to add muscle quickly, and muscle is what drives fat loss over the long term." },
      { type: "p", text: "Women also deal with monthly hormonal fluctuations that affect water retention, hunger, energy, and sleep — all of which directly impact body composition. It's not an excuse. It's physiology. Ignoring it is like ignoring the tide." },
      { type: "p", text: "But here's what the research actually shows: when calories and protein are matched and controlled, the difference in fat loss rate between men and women is small. Meaningful, but small." },
      { type: "h2", id: "mindset", text: "The Mindset Gap Is the Bigger Problem" },
      { type: "p", text: "The clients I've worked with who struggle most aren't struggling because of hormones. They're struggling because of the way they've been taught to eat." },
      { type: "p", text: "Women are disproportionately targeted by the diet industry. Restriction. Detoxes. Programs that label entire food groups as off-limits. Years of this conditioning creates a complicated relationship with food that men — who are largely left out of that marketing — simply don't have at the same rate." },
      { type: "p", text: "I see it play out like this: a woman eats something she told herself she shouldn't. Instead of moving on, she spirals. She tells herself she already blew it. She might as well finish the week out and start again Monday. That spiral — not the food — is what kills the progress." },
      { type: "h3", id: "needle", text: "What Actually Moves the Needle" },
      { type: "p", text: "Protein. I come back to this over and over because it is the single most underutilized tool for women trying to lose body fat. Most of the women I work with start out eating 40 to 60 grams of protein a day. We build it to 100 to 130 grams. Hunger drops. Energy improves. Body composition shifts — even before any formal exercise program starts." },
      { type: "p", text: "Strength training. Not the light-weight, high-rep, cardio-adjacent approach that fitness culture pushes at women. Actual progressive resistance training that builds lean tissue over time." },
      { type: "p", text: "Consistency over intensity. I say this constantly because I mean it. Eighty percent consistent for two years beats one hundred percent for three weeks. Every time." },
      { type: "h2", id: "one-more", text: "One More Thing" },
      { type: "p", text: "If you have been doing everything right and the scale still isn't moving, look at your sleep and your stress before you cut more calories. Cortisol — elevated by poor sleep, chronic stress, and under-eating — makes fat loss physiologically harder. More restriction is often exactly the wrong answer." },
      { type: "p", text: "You are not broken. The approach may need adjusting. That's a very different problem, and it's one we can actually solve." },
    ],
  },

  {
    id: "2",
    title: "3 Major Life Lessons I Learned From My First 2 Months of Training BJJ",
    slug: "bjj-life-lessons",
    publishedAt: "2024-05-31T00:00:00Z",
    excerpt:
      "Once we reach a certain age, we rarely opt for new. Learning something way outside our comfort zone teaches you more than you expect — about the skill and about yourself.",
    category: { title: "Mindset", slug: "mindset" },
    imageSrc: "/images/blog/blog-bjj-lessons.jpg",
    body: [
      { type: "p", text: "I started training Brazilian Jiu-Jitsu at 38. I walked onto the mat knowing essentially nothing, got submitted by a 140-pound teenager in the first five minutes, and went home completely humbled." },
      { type: "p", text: "I went back the next week. And the week after that." },
      { type: "p", text: "Two months in, I've learned more about how people learn — and how I specifically need to think about coaching — than I expected. Here are the three lessons that stuck." },
      { type: "h2", id: "beginners-mind", text: "1. Beginner's Mind Is Earned, Not Assumed" },
      { type: "p", text: "I have been coaching for over a decade. I am comfortable being the person who knows things. Walking into that gym and knowing nothing was genuinely uncomfortable in a way I had almost forgotten." },
      { type: "p", text: "What surprised me was how much my ego got in the way early on. I kept trying to muscle through positions instead of learning the technique. I kept wanting to apply logic from other physical things I know instead of just listening to what I was being taught. I wasted the first few sessions fighting my own resistance to being a beginner." },
      { type: "p", text: "The moment I let that go — when I stopped trying to figure it out and just started following instructions — I learned faster in two days than I had in three weeks." },
      { type: "p", text: "I think about my clients now and the early sessions where they're still trying to fit what I'm saying into what they already believe. I have more patience for that phase than I did before." },
      { type: "h2", id: "rep", text: "2. The Rep Is the Point" },
      { type: "p", text: "BJJ is not a sport where you can think your way to competence. You have to drill. You have to roll. You have to get caught in the same bad position fifty times before your body starts making the right adjustment automatically." },
      { type: "p", text: "There's no shortcut. There's no hack. There's just volume and time." },
      { type: "p", text: "I know this about fitness. I tell clients this about fitness. Experiencing it from the other side — as the person who is frustrated by the gap between what I know intellectually and what my body actually does — reminded me why the consistency message is so important. It's not about motivation. It's about putting the repetitions in long enough for the skill to form." },
      { type: "h2", id: "tapped", text: "3. Getting Tapped Is Information, Not Failure" },
      { type: "p", text: "In BJJ, \"tapping\" means you got caught. You were put in a position where continuing would mean injury, so you tap the mat and your training partner releases the hold. It happens constantly when you're new." },
      { type: "p", text: "The first few times it happened I felt embarrassed. By week three I started treating each tap as a data point. Why did I end up there? What was the thing I missed five moves ago that put me in that position? What would I do differently?" },
      { type: "p", text: "That's the right relationship to have with a setback in any skill. Not shame. Curiosity." },
      { type: "p", text: "I got submitted by that same 140-pound teenager three weeks later. But this time I knew exactly what I did wrong to get there. Progress isn't always visible from the outside." },
      { type: "h2", id: "why", text: "Why I'm Telling You This" },
      { type: "p", text: "I coach people who are learning something hard — changing the way they eat, starting to exercise for the first time in years, rebuilding a relationship with their body after a long time of treating it poorly. The learning curve is uncomfortable. The early frustration is real." },
      { type: "p", text: "Going back to being a beginner reminded me that the discomfort isn't a sign something is wrong. It's a sign something is working. You are not supposed to be good at new things yet. That's the whole point of starting." },
    ],
  },

  {
    id: "3",
    title: "How to Get in Control of Snacking",
    slug: "control-snacking",
    publishedAt: "2024-04-10T00:00:00Z",
    excerpt:
      "Snacking isn't the enemy. Mindless snacking is. The difference between the two is a system — and here's a simple one that actually works.",
    category: { title: "Nutrition", slug: "nutrition" },
    imageSrc: "/images/blog/blog-snacking.jpg",
    body: [
      { type: "p", text: "I'm not anti-snack. I want to be clear about that up front. Snacking is not inherently the problem. The problem is the kind of snacking most people do — absent, automatic, and in response to something that isn't actually hunger." },
      { type: "p", text: "Here's how to tell the difference, and what to do about it." },
      { type: "h2", id: "ask", text: "Ask the Question Before You Open the Fridge" },
      { type: "p", text: "Before you eat anything outside of a planned meal, ask yourself one question: am I hungry, or am I something else?" },
      { type: "p", text: "The \"something else\" list is long. Bored. Stressed. Tired. Procrastinating. Lonely. Responding to a commercial. Eating because someone else in the house is eating. Eating because it's sitting there." },
      { type: "p", text: "This is not about judgment. It's about information. If you're eating because you're stressed, eating is not going to solve the stress. You'll finish the snack and the stress is still there — plus now you've added guilt on top of it." },
      { type: "p", text: "If you ask the question and the answer is genuinely \"I'm hungry,\" eat something. But make it something intentional, not whatever is closest." },
      { type: "h2", id: "environment", text: "The Environment Fix Is More Powerful Than Willpower" },
      { type: "p", text: "Willpower is a limited resource. You will not out-discipline an environment that's stacked against you. The better move is to change the environment." },
      { type: "p", text: "What's at eye level in your fridge right now? What's sitting on your kitchen counter? What do you reach for first when you open a cabinet?" },
      { type: "p", text: "If the answer to those questions is food you're trying to eat less of, you have an environment problem, not a willpower problem. Moving things — putting fruit on the counter instead of in a drawer, putting the things you want to eat less of on a higher shelf, keeping better options pre-prepped and front-facing — changes behavior without requiring you to fight yourself every time." },
      { type: "h2", id: "intentional", text: "Make Snacks Intentional, Not Accidental" },
      { type: "p", text: "There's nothing wrong with planning a snack into your day. A Greek yogurt at 3 p.m. A handful of almonds and an apple mid-morning. These are planned, they have protein and fiber, and they prevent you from arriving at dinner so hungry that you can't make a reasonable decision." },
      { type: "p", text: "The snacking that gets people in trouble isn't this kind. It's the standing-in-front-of-the-open-pantry-at-9 p.m. kind. The eating while scrolling kind. The finishing your kid's plate without thinking about it kind." },
      { type: "p", text: "Planned snacks are fine. Automatic snacks are where the calories accumulate without you noticing." },
      { type: "h2", id: "actually-hungry", text: "If You're Snacking Because You're Actually Hungry" },
      { type: "p", text: "Then your meals may not be set up right. This is the most common thing I see. Someone is trying to eat less, so they eat less at meals, and then they're hungry two hours later and raid the kitchen. You would have been better off eating a bigger, more complete meal with adequate protein and fiber in the first place." },
      { type: "p", text: "Hunger is not a moral failing. If you're hungry, your body is asking for something real. The question is whether your meals are giving it enough to work with." },
      { type: "p", text: "Protein and fiber at every meal. Not a complicated system. But it's the thing that actually regulates hunger — more than anything else I know." },
    ],
  },

  {
    id: "4",
    title: "Make the Supportive Easier and the Unsupportive Harder",
    slug: "make-supportive-easier",
    publishedAt: "2024-03-15T00:00:00Z",
    excerpt:
      "Willpower is overrated. Environment is everything. One simple principle that makes sticking to any health goal dramatically easier.",
    category: { title: "Mindset", slug: "mindset" },
    imageSrc: "/images/blog/blog-supportive-habits.jpg",
    body: [
      { type: "p", text: "I've been saying this to clients for years and I'll keep saying it: the most successful people I've worked with are not the most motivated. They're the most strategic about their environment." },
      { type: "p", text: "Motivation is unreliable. It shows up when things are new and disappears when they get hard. Environment is consistent. Your environment doesn't care how you feel that day." },
      { type: "h2", id: "principle", text: "The Principle" },
      { type: "p", text: "Make the supportive choice easier. Make the unsupportive choice harder." },
      { type: "p", text: "That's it. The whole framework is that sentence." },
      { type: "p", text: "You are not fighting yourself when you do this. You are setting up a situation where the path of least resistance leads somewhere good. Humans default to the path of least resistance. Work with that instead of against it." },
      { type: "h2", id: "practice", text: "What This Looks Like in Practice" },
      { type: "p", text: "Meal prep is the most obvious version. If you prep your lunches on Sunday, then on Wednesday when you're tired and it's noon and you haven't eaten, the path of least resistance is the thing in the fridge — not the drive-through." },
      { type: "p", text: "The gym bag packed the night before. The workout clothes already laid out. The appointment on the calendar. Each of these removes a decision point from a moment when you have less energy and more friction." },
      { type: "p", text: "On the other side: if there are foods in your house that you consistently eat in ways that don't support your goals, stop buying them. This is not restriction. This is not declaring them forbidden. It's just not having them at arm's reach at 10 p.m. when your defenses are down." },
      { type: "h2", id: "friction", text: "The Friction You Don't See" },
      { type: "p", text: "Most people only think about adding things — meal prep, gym time, tracking. They don't think about removing friction." },
      { type: "p", text: "Where in your day does the behavior you want to change happen? What is the five-second sequence right before it? That's where the environment needs to change." },
      { type: "p", text: "You eat chips while watching TV. So maybe the chips don't live in the living room anymore. That's it. That's the whole intervention. You didn't tell yourself you couldn't have chips. You just made it a six-step process instead of a reach-to-the-side-table." },
      { type: "p", text: "Six steps is enough friction to break the automatic behavior. You might still go get them. But now it's a choice, not a reflex." },
      { type: "h2", id: "everything", text: "This Works for Everything" },
      { type: "p", text: "I use this framework with clients for exercise, sleep, nutrition, and stress. It applies wherever there's a gap between what you want to do and what you're actually doing." },
      { type: "p", text: "You don't need more discipline. You need a better setup. Figure out what the easiest version of the right behavior looks like, and make that the default. Then figure out what's making the wrong behavior easy, and add a speed bump." },
      { type: "p", text: "Environment beats motivation. Every single time." },
    ],
  },

  {
    id: "5",
    title: "Just Go — Even If You Feel Like Crap Today",
    slug: "just-go",
    publishedAt: "2024-02-20T00:00:00Z",
    excerpt:
      "The best workout is the one you actually do. On the days you don't want to show up are usually the days you need to most.",
    category: { title: "Training", slug: "training" },
    imageSrc: "/images/blog/blog-just-go.jpg",
    body: [
      { type: "p", text: "I had a client tell me she almost skipped her workout last Tuesday because she was tired, stressed from work, and her back was a little sore. She went anyway. Thirty minutes in she told me it was the best she had felt all week." },
      { type: "p", text: "This is not a coincidence. This is how exercise works." },
      { type: "h2", id: "lie", text: "The Lie We Tell Ourselves" },
      { type: "p", text: "The lie is that we need to feel ready before we go. That we should wait until we have the energy, the motivation, the mental clarity, the perfect pre-workout window." },
      { type: "p", text: "That version of ready never arrives on a schedule. If you wait for it, you will skip more workouts than you do." },
      { type: "p", text: "The truth is that the energy often comes from going, not before it. The mood shift happens during the movement, not before. You don't feel good and then work out. You work out and then feel good." },
      { type: "h2", id: "show-up", text: "What \"Just Show Up\" Actually Means" },
      { type: "p", text: "It doesn't mean train through injury. If something genuinely hurts — sharp, localized pain, something that worsens with movement — that's different. Listen to that." },
      { type: "p", text: "What I mean is: go even when you're tired. Go even when you're not in the mood. Go even when the workout in your head sounds hard and you're already negotiating with yourself in the parking lot." },
      { type: "p", text: "Give yourself one rule: just start. Get your shoes on. Drive to the gym. Walk through the door. Put the weight in your hands. Start the warm-up." },
      { type: "p", text: "Once you're moving, the decision is behind you. The resistance that felt overwhelming when you were sitting on the couch disappears almost immediately once you start." },
      { type: "h2", id: "pattern", text: "The Days You Skip Set a Pattern" },
      { type: "p", text: "This is the part that matters more than any individual workout. Missing once is not the problem. Missing once and then using that as evidence that you're \"the kind of person who doesn't follow through\" — that's the problem." },
      { type: "p", text: "Every time you go when you don't want to, you build a piece of evidence that you are the kind of person who shows up. That identity compounds over time. It becomes the expectation rather than the exception." },
      { type: "p", text: "Conversely, every time you skip because you didn't feel like it, you reinforce the narrative that your mood is in charge of your behavior. That's a pattern that costs you a lot more than one workout." },
      { type: "h2", id: "bad-workout", text: "Give Yourself Permission to Have a Bad Workout" },
      { type: "p", text: "Not every session is going to be good. Some days you'll go and it'll be flat and uninspired and you'll feel like you're moving through cement. That's fine. Do it anyway." },
      { type: "p", text: "A mediocre workout you actually did is worth more than a great workout you skipped. The physical adaptation happens from cumulative load over time, not from any single session. Show up consistently. Let the consistency do its job." },
      { type: "p", text: "On the days it feels impossible: just go. You can decide it was a waste of time after you finish. In my experience, you won't." },
    ],
  },

  {
    id: "6",
    title: "Was It Your Mind or Your Body?",
    slug: "mind-or-body",
    publishedAt: "2024-01-08T00:00:00Z",
    excerpt:
      "Most people quit not because their body gave out — but because their mind checked out first. Learning to tell the difference changes everything.",
    category: { title: "Mindset", slug: "mindset" },
    imageSrc: "/images/blog/blog-mind-or-body.jpg",
    body: [
      { type: "p", text: "There's a moment in almost every hard workout where you want to stop. Your brain sends a very convincing message that you can't keep going. The question — the useful one — is whether that message is accurate." },
      { type: "p", text: "Learning to tell the difference between your body actually hitting a limit and your mind deciding it's done has been one of the most valuable things I've developed over years of training, and one of the most important things I try to teach." },
      { type: "h2", id: "signals", text: "What the Body Says vs. What the Mind Says" },
      { type: "p", text: "The body has real signals. Actual pain — sharp, localized, worsening with continued effort — is worth listening to. Structural fatigue that changes your movement pattern. Dizziness, nausea, things that fall outside the expected difficulty of the effort you're making." },
      { type: "p", text: "The mind has different signals. It tells you you're tired before you actually are. It decides things are too hard based on how far you've already gone, not based on how much you actually have left. It calculates the cost of continuing against the reward, and when the discomfort is high enough, it starts arguing for stopping." },
      { type: "p", text: "The problem is that both of these sound the same from the inside. They both feel urgent. They both feel like facts." },
      { type: "h2", id: "test", text: "The Test I Use" },
      { type: "p", text: "When I feel like stopping and I'm not sure if I should, I ask: is the thing I'm feeling getting worse with each rep, or is it staying the same?" },
      { type: "p", text: "If it's getting worse — progressing, sharpening, changing — that's usually the body asking for attention. Stop, assess, don't push through that." },
      { type: "p", text: "If it's staying at a consistent level of hard — unpleasant but not escalating — that's usually the mind negotiating. That's where you have a choice." },
      { type: "p", text: "The other test: rest for 60 seconds and reassess. If the feeling disappears or significantly reduces, it was likely mental. If it persists or worsens even at rest, it's worth investigating." },
      { type: "h2", id: "beyond-gym", text: "Why This Matters Beyond the Gym" },
      { type: "p", text: "The skill of distinguishing between real limits and manufactured ones shows up everywhere. In a hard conversation you want to exit. In a commitment you made when you were more motivated than you feel right now. In the decision to start over versus the decision to continue." },
      { type: "p", text: "Most people I work with have quit things not because they couldn't do them but because they convinced themselves they couldn't. The gap between those two is enormous. One is a physical fact. The other is a story." },
      { type: "h2", id: "respect", text: "Respect the Body, Question the Story" },
      { type: "p", text: "I am not telling you to push through pain. I am telling you to get curious about where the signal is coming from before you decide what to do with it." },
      { type: "p", text: "Real physical limits deserve respect. The mind's negotiating tactics deserve scrutiny." },
      { type: "p", text: "You are almost certainly more capable than your mind tells you you are at the moment when things get hard. Most people are. That doesn't mean ignore the signals — it means don't confuse discomfort with impossibility." },
      { type: "p", text: "The next time you want to quit something, sit with the question for a moment. Was it your mind or your body? The answer matters." },
    ],
  },

  /* ── Post 7 ─────────────────────────────────────────────────────────── */
  {
    id: "7",
    title: "How Much Protein Do Women Over 40 Actually Need?",
    slug: "protein-women-over-40",
    publishedAt: "2024-06-15T00:00:00Z",
    excerpt:
      "Most women I work with are eating less than half the protein they need. Here's the number, why it matters so much after 40, and how to actually hit it.",
    category: { title: "Nutrition", slug: "nutrition" },
    imageSrc: "/images/blog/blog-protein-women.jpg",
    body: [
      { type: "p", text: "When I do a nutrition intake with a new client, I almost always find the same thing: they're eating somewhere between 40 and 70 grams of protein per day. Sometimes less. They think they're eating fine. They're not — at least not for the goals they've told me they have." },
      { type: "p", text: "Protein is the one variable that, when we fix it, changes almost everything else." },
      { type: "h2", id: "the-number", text: "The Actual Number" },
      { type: "p", text: "For most active women over 40, the target is 0.7 to 1 gram of protein per pound of bodyweight. So a 150-pound woman should be eating between 105 and 150 grams of protein per day." },
      { type: "p", text: "That number sounds high if you're used to eating 50 grams. It is higher. That's kind of the point." },
      { type: "p", text: "The research on protein needs has shifted significantly in the last decade. Older guidelines were built around sedentary people trying not to be deficient — not active women trying to maintain or build muscle while managing body composition. The new numbers are higher, and for good reason." },
      { type: "h2", id: "why-40-changes-things", text: "Why 40 Changes Things" },
      { type: "p", text: "After 40 — and especially in the years around perimenopause — women lose estrogen. Estrogen has a protective effect on muscle tissue. When it drops, muscle loss accelerates and the body becomes less efficient at using protein to build and repair. The technical term is anabolic resistance." },
      { type: "p", text: "What this means practically: you need more protein to get the same muscle-building signal that you would have gotten in your 30s with less. The threshold is higher. If you're eating the same amount you've always eaten, you're likely falling short." },
      { type: "p", text: "This isn't about bulking. It's about keeping what you have. Muscle drives metabolism. Muscle is what makes you feel strong in daily life. Muscle is the long-term investment that makes everything else — fat loss, energy, bone density — easier." },
      { type: "h2", id: "what-it-looks-like", text: "What 120 Grams of Protein Actually Looks Like" },
      { type: "ul", items: [
        "Breakfast: 3 eggs + 1 cup Greek yogurt (30–35g)",
        "Lunch: 5 oz grilled chicken over salad (40g)",
        "Snack: cottage cheese with fruit (15–20g)",
        "Dinner: 5 oz salmon or lean beef (35g)",
      ]},
      { type: "p", text: "That's roughly 120 to 130 grams across four eating occasions. It's not extreme. It doesn't require protein shakes if you don't want them. It just requires that protein be the thing you build the meal around — not the side note." },
      { type: "h2", id: "common-pushback", text: "The Pushback I Hear" },
      { type: "p", text: "\"That's so much food.\" It's more food than you're used to, yes. But most clients find that when they're eating enough protein, they're actually less hungry throughout the day. Protein is the most satiating macronutrient. More protein usually means less grazing, less snacking, and less of the 9 p.m. kitchen spiral." },
      { type: "p", text: "\"I can't eat that much meat.\" You don't have to. Greek yogurt, cottage cheese, eggs, edamame, lentils, and protein powder all count. Mix your sources. There's no rule that says this has to be chicken and ground beef." },
      { type: "p", text: "If there is one nutritional lever I'd pull before anything else for a woman over 40 who wants to change her body composition — it's protein. Get that number up first. Everything else becomes easier once you do." },
    ],
  },

  /* ── Post 8 ─────────────────────────────────────────────────────────── */
  {
    id: "8",
    title: "Why You're Eating Healthy and Still Not Losing Weight",
    slug: "eating-healthy-not-losing-weight",
    publishedAt: "2024-07-10T00:00:00Z",
    excerpt:
      "Healthy food can still be too much food. If you've been eating well and the scale isn't moving, here are the most common reasons — and none of them mean you're broken.",
    category: { title: "Nutrition", slug: "nutrition" },
    imageSrc: "/images/blog/blog-eating-healthy-no-results.jpg",
    body: [
      { type: "p", text: "I hear this constantly. \"I eat really well. I don't know why I can't lose weight.\"" },
      { type: "p", text: "And I believe them. They're not lying. They are eating better than they used to. The problem is that \"eating healthy\" and \"eating in a way that produces fat loss\" are not automatically the same thing." },
      { type: "h2", id: "healthy-is-not-a-calorie-target", text: "Healthy Is Not a Calorie Target" },
      { type: "p", text: "Avocado is healthy. Olive oil is healthy. Nuts are healthy. A handful of almonds has 170 calories. A tablespoon of olive oil has 120. These are not bad foods. But they are calorie-dense, and if you're eating them without any awareness of quantity, they add up fast." },
      { type: "p", text: "The same thing applies to smoothies, açaí bowls, granola, nut butters, and most things marketed as health food. The label says healthy. The nutrition facts tell the real story." },
      { type: "p", text: "This isn't a case for obsessive calorie counting. It's a case for having some awareness of what you're actually eating, not just how virtuous it sounds." },
      { type: "h2", id: "portion-distortion", text: "Portion Distortion Is Real" },
      { type: "p", text: "Studies consistently show that people underestimate how much they eat — by about 30 to 40 percent on average. Not because they're dishonest. Because portion sizes have inflated over decades, and most people have never actually measured what a serving of pasta or peanut butter looks like." },
      { type: "p", text: "Two tablespoons of peanut butter is 190 calories. Most people put on three or four. That's 300 to 380 calories from a \"small\" addition to a meal. Do that at two or three meals a day with multiple foods, and the gap between what you think you're eating and what you're actually eating becomes significant." },
      { type: "h2", id: "liquid-calories", text: "Liquid Calories Don't Register" },
      { type: "p", text: "Coffee drinks, juices, protein shakes, oat milk, wine, kombucha. These are all caloric. The research on liquid calories is consistent: we don't compensate for them by eating less solid food the way we would if those calories came in food form. They're essentially invisible to our hunger regulation system." },
      { type: "p", text: "I'm not saying cut them out. I'm saying count them if you're trying to understand why the scale isn't moving." },
      { type: "h2", id: "sleep-and-stress", text: "Sleep and Stress Have More Impact Than You Think" },
      { type: "p", text: "Cortisol — the stress hormone — directly impairs fat loss, particularly around the midsection. Chronic elevated cortisol from poor sleep, work stress, or under-eating makes the body hold onto fat as a survival mechanism." },
      { type: "p", text: "If you're sleeping five or six hours and running at high stress most of the week, your body is not in a state that favors fat loss — regardless of how well you're eating. This is not a cop-out. It's physiology. The fix isn't to eat less. The fix is to address the sleep and the stress." },
      { type: "h2", id: "the-bottom-line", text: "The Bottom Line" },
      { type: "p", text: "You are probably not broken. You're probably just dealing with one or more of these variables working against you. The answer isn't to eat less of everything or cut out more food groups. It's to get honest about where the actual gaps are — and address those specifically." },
      { type: "p", text: "That's the work I do with clients. Not more restriction. Smarter adjustments." },
    ],
  },

  /* ── Post 9 ─────────────────────────────────────────────────────────── */
  {
    id: "9",
    title: "What to Eat Before and After a Workout",
    slug: "what-to-eat-before-after-workout",
    publishedAt: "2024-07-28T00:00:00Z",
    excerpt:
      "Pre- and post-workout nutrition doesn't have to be complicated. Here's what actually matters, what you can ignore, and what I personally do.",
    category: { title: "Nutrition", slug: "nutrition" },
    imageSrc: "/images/blog/blog-pre-post-workout-nutrition.jpg",
    body: [
      { type: "p", text: "The fitness industry has made pre- and post-workout nutrition into something far more complicated than it needs to be. Anabolic windows. Intra-workout carbohydrates. Fasted vs. fed training. Most of it is noise for the population I work with." },
      { type: "p", text: "Here's what actually matters." },
      { type: "h2", id: "before-a-workout", text: "Before a Workout" },
      { type: "p", text: "The goal of pre-workout nutrition is simple: don't be so hungry that your energy tanks, and don't be so full that you feel sick. That's it." },
      { type: "p", text: "For most people, eating a balanced meal 1.5 to 3 hours before training is ideal. If you're training in the morning and can't eat that far in advance, something small and easy — a banana, half a protein bar, a slice of toast with peanut butter — is better than nothing." },
      { type: "p", text: "Carbohydrates are your primary fuel source during exercise. A small amount of carbs before training helps maintain energy, especially for strength training lasting 45 to 60 minutes or more. Keep fat low right before training — it slows digestion and can cause sluggishness." },
      { type: "h3", id: "what-i-eat", text: "What I Actually Eat Before Training" },
      { type: "p", text: "If I'm training in the morning, I'll usually have a rice cake with almond butter and a cup of coffee. If it's afternoon, I've already had lunch and that meal does the work. I don't overthink it." },
      { type: "h2", id: "after-a-workout", text: "After a Workout" },
      { type: "p", text: "Post-workout is where the protein conversation matters most. When you train, you create small tears in muscle fibers. Protein provides the amino acids your body uses to repair and rebuild those fibers — which is how muscle is built and maintained." },
      { type: "p", text: "Aim for 30 to 40 grams of protein within a few hours after training. This doesn't have to be a shake five minutes after you drop the last weight. The window is wider than the industry implies. But protein within two to three hours is genuinely useful." },
      { type: "p", text: "Add carbohydrates to replenish glycogen stores — especially after longer or higher-intensity sessions. A post-workout meal of lean protein and a carbohydrate source like rice, potatoes, or fruit is ideal." },
      { type: "h2", id: "what-if-i-train-fasted", text: "What About Fasted Training?" },
      { type: "p", text: "Some people train well in a fasted state. Some people feel terrible. Both are valid. The research shows minimal difference in body composition outcomes when total daily calories and protein are matched. If you feel good training fasted, fine. If you feel flat, eat something. Listen to your body — not the influencer telling you fasted cardio burns more fat." },
      { type: "h2", id: "the-real-priority", text: "The Real Priority" },
      { type: "p", text: "All of this matters less than total daily protein intake. If you're hitting 100 to 130 grams of protein spread across the day, the specific timing becomes secondary. Get the total right first. Then fine-tune the timing if you want to." },
      { type: "p", text: "Most people don't need to fine-tune anything. They need to eat more protein and stop skipping meals. Start there." },
    ],
  },

  /* ── Post 10 ────────────────────────────────────────────────────────── */
  {
    id: "10",
    title: "How to Stop Starting Over Every Monday",
    slug: "stop-starting-over-monday",
    publishedAt: "2024-08-12T00:00:00Z",
    excerpt:
      "If Monday has become your perpetual reset button, the problem isn't your willpower. Here's why the cycle keeps happening and how to actually break it.",
    category: { title: "Mindset", slug: "mindset" },
    imageSrc: "/images/blog/blog-stop-starting-monday.jpg",
    body: [
      { type: "p", text: "I've had clients who started over every Monday for three years. Not the same program — they'd try something new each time, motivated by a new week and a new attempt. By Wednesday or Thursday, something would go sideways. A bad meal, a missed workout, a stressful day. And the plan would quietly get shelved until the following Monday." },
      { type: "p", text: "If that sounds familiar, I want you to understand something: this is not a willpower problem. It's a structure problem. The structure around Monday resets is designed to fail." },
      { type: "h2", id: "why-monday-resets-fail", text: "Why Monday Resets Fail" },
      { type: "p", text: "Monday resets feel good because they give you the psychological permission to eat badly or skip the gym through the weekend — \"I'm starting fresh Monday.\" That permission is the problem. You've built in a two-to-three-day grace period where nothing counts, and that grace period undoes a significant portion of whatever progress you made the previous week." },
      { type: "p", text: "They also create an all-or-nothing relationship with the plan. The week is a binary: you're either on the plan or you're off it. One bad meal on Wednesday doesn't just mean a bad meal — it means the whole week is lost and you might as well wait for the next Monday." },
      { type: "p", text: "That one bad meal becomes a four-day write-off. The math doesn't work." },
      { type: "h2", id: "the-fix", text: "The Fix Is Smaller Than You Think" },
      { type: "p", text: "Stop treating the week as the unit. Make the meal the unit." },
      { type: "p", text: "One off meal is just one off meal. Not a failed day. Not a failed week. Not a reason to coast until Monday. You had a pizza Tuesday night. Your next meal Wednesday morning is a fresh start. That's the only reset that matters." },
      { type: "p", text: "This sounds simple because it is. But it requires you to give up the story that the imperfect meal ruined something. Nothing was ruined. You just had pizza. Eat well tomorrow. Keep moving." },
      { type: "h2", id: "start-wednesday", text: "If You Fell Off — Start Wednesday" },
      { type: "p", text: "Here's a rule I give clients: if you fall off, restart at the next meal. Not next Monday. Not even tomorrow. The next meal." },
      { type: "p", text: "If you can't make yourself do that — if you genuinely can't restart mid-week — ask yourself why. Usually it's because the plan feels too rigid to survive a deviation. If one bad meal breaks the whole thing, the plan is too brittle. Simplify it." },
      { type: "h2", id: "identity-over-plans", text: "The Identity Piece" },
      { type: "p", text: "The deepest version of this problem is when people don't think of themselves as someone who eats well — they think of themselves as someone who's trying to eat well. The trying version has an off switch. The being version doesn't." },
      { type: "p", text: "You don't have to be perfect to be someone who takes care of themselves. You just have to keep showing up after the imperfect days. The people who succeed long-term aren't the ones who never fall off. They're the ones who fall off and start again Wednesday instead of waiting until Monday." },
    ],
  },

  /* ── Post 11 ────────────────────────────────────────────────────────── */
  {
    id: "11",
    title: "What to Do When You Feel Like You've Lost All Your Progress",
    slug: "when-you-feel-like-youve-lost-progress",
    publishedAt: "2024-08-30T00:00:00Z",
    excerpt:
      "Two weeks off doesn't erase two months of work. Here's what's actually happening in your body — and the fastest way back.",
    category: { title: "Mindset", slug: "mindset" },
    imageSrc: "/images/blog/blog-lost-progress.jpg",
    body: [
      { type: "p", text: "It's one of the most deflating experiences in fitness. You take a week or two off — vacation, illness, a brutal stretch at work. You come back and everything feels harder. Your clothes feel different. The weights feel heavy. You look in the mirror and think: I'm back at square one." },
      { type: "p", text: "You are not back at square one. I want to be very clear about that before we go further." },
      { type: "h2", id: "what-actually-happens", text: "What Actually Happens in Two Weeks Off" },
      { type: "p", text: "Muscle is not lost that quickly. In the first week or two of detraining, what you lose is primarily stored glycogen — the carbohydrate your muscles hold as energy — and water that goes with it. This can create a noticeable change in how you look and feel. Your muscles may appear flatter. The scale may go up slightly from dietary changes during a trip." },
      { type: "p", text: "Actual muscle tissue loss takes significantly longer. Most research suggests meaningful muscle loss begins after three to four weeks of complete inactivity. Even then, it's not dramatic." },
      { type: "p", text: "Fitness levels — cardiovascular capacity, strength — do decline faster than muscle mass. But they also return faster. The concept of muscle memory is real. Your nervous system and muscles have an established pathway. Getting back to where you were takes a fraction of the time it took to get there the first time." },
      { type: "h2", id: "why-it-feels-worse", text: "Why It Feels Worse Than It Is" },
      { type: "p", text: "The first week back is always the hardest. You're sore again. The weights that felt easy feel hard. Your energy is lower. This is almost entirely neurological — your neuromuscular system is re-establishing its firing patterns, not starting from scratch. Give it a week. By day seven or eight you'll feel like yourself again." },
      { type: "h2", id: "the-fastest-way-back", text: "The Fastest Way Back" },
      { type: "p", text: "Don't try to make up for lost time in the first week back. Don't do extra sessions to compensate. Don't slash your food intake to counteract vacation eating." },
      { type: "p", text: "Just go back to what was working before you took the break. Same frequency. Same intensity. Let the first week be a re-entry, not a punishment." },
      { type: "p", text: "The clients I've seen take the longest to return to form are the ones who come back with something to prove. They go too hard, get overly sore, and their sessions become miserable. By day five they're questioning whether it's worth it." },
      { type: "p", text: "The clients who bounce back the fastest come back at 80 percent and build from there. No drama. Just consistency." },
      { type: "h2", id: "reframe-the-break", text: "Reframe What the Break Was" },
      { type: "p", text: "Rest is not failure. Vacations are not setbacks. Life happening is not a derailment. Taking two weeks off because you were at your kid's graduation, dealing with a sick parent, or managing a deadline at work is not something that needs to be atoned for." },
      { type: "p", text: "The people who stay healthy for decades are the people who treat breaks as part of the process, not as proof that they're not serious. Go live your life. Then come back. The training will be there." },
    ],
  },

  /* ── Post 12 ────────────────────────────────────────────────────────── */
  {
    id: "12",
    title: "How Many Days a Week Should You Actually Work Out?",
    slug: "how-many-days-to-work-out",
    publishedAt: "2024-09-18T00:00:00Z",
    excerpt:
      "The answer depends on your life, not a program. Here's how to find the number that actually sticks — and why consistency always beats frequency.",
    category: { title: "Training", slug: "training" },
    imageSrc: "/images/blog/blog-how-many-days-workout.jpg",
    body: [
      { type: "p", text: "When someone asks me how many days they should work out, I always ask the same question back: how many days can you realistically commit to without your life falling apart?" },
      { type: "p", text: "The best training frequency is the one you'll actually do. Everything else is theory." },
      { type: "h2", id: "what-the-research-says", text: "What the Research Says" },
      { type: "p", text: "For general health and body composition, two to three resistance training sessions per week is enough to see meaningful results for most people — especially if you're coming back after a long break or starting from scratch. That's it. Not five. Not six. Two or three, done consistently, will do more than five or six done sporadically." },
      { type: "p", text: "The diminishing returns on additional training days kick in quickly. Going from two days to three produces significant benefit. Going from four days to five produces very little additional benefit for most recreational exercisers — and increases injury and fatigue risk." },
      { type: "h2", id: "the-minimum-effective-dose", text: "The Minimum Effective Dose" },
      { type: "p", text: "Two strength training sessions per week, done consistently, will maintain and build muscle. Add one to two sessions of walking, light cardio, or recreational activity and you have a comprehensive program. That's a four-to-five-hour weekly investment, and it's more than most people are currently doing." },
      { type: "p", text: "If that feels too small, consider this: the clients I've worked with who made the most consistent long-term progress almost never trained more than four days a week. They had lives. They had other things that mattered. They found a number that fit and they defended it." },
      { type: "h2", id: "building-up", text: "How to Build Up" },
      { type: "p", text: "If you're starting from zero, start with two days. Not three. Not four. Two. Do two days a week for a month and make them non-negotiable. Once two is solid, add a third. Build the habit before you build the volume." },
      { type: "p", text: "Adding too many days too fast is one of the most common reasons people quit. It's unsustainable, it's exhausting, and when life gets busy and you miss a session, the whole thing feels like it's falling apart." },
      { type: "h2", id: "rest-days-matter", text: "Rest Is Part of the Program" },
      { type: "p", text: "Muscle is built during recovery, not during the workout. The workout is the stimulus. Sleep and rest days are where adaptation happens. If you're training seven days a week with no real recovery, you're not accumulating more benefit — you're accumulating more fatigue." },
      { type: "p", text: "Rest days are not days you failed to train. They are days the training is working." },
      { type: "h2", id: "the-honest-answer", text: "The Honest Answer" },
      { type: "p", text: "Three days a week, consistently, for two years will change your body and your health more than any six-day-a-week program that falls apart after six weeks. Ask yourself not what's ideal in a perfect world, but what's realistic in your actual world. Then commit to that number like it's the only number that exists." },
    ],
  },

  /* ── Post 13 ────────────────────────────────────────────────────────── */
  {
    id: "13",
    title: "Why Cardio Alone Won't Help You Lose Weight",
    slug: "why-cardio-alone-wont-help",
    publishedAt: "2024-10-05T00:00:00Z",
    excerpt:
      "Hours on the treadmill with minimal results is one of the most frustrating experiences in fitness. Here's the biology behind why — and what actually works.",
    category: { title: "Training", slug: "training" },
    imageSrc: "/images/blog/blog-cardio-myth.jpg",
    body: [
      { type: "p", text: "I had a client who ran four days a week for eight months. She was consistent, dedicated, and completely demoralized by the results. She'd lost some weight initially, then plateaued. Her appetite was through the roof. She felt tired all the time." },
      { type: "p", text: "This is an extremely common experience. And it's not her fault — she was doing exactly what she'd been told." },
      { type: "h2", id: "the-cardio-compensation-problem", text: "The Compensation Problem" },
      { type: "p", text: "Cardio burns calories. That's true. But it also makes you hungry — more hungry, in many cases, than the calories you burned justify. The body is very good at protecting its weight. When you consistently burn extra calories through cardio, it often compensates by increasing appetite and reducing unconscious movement throughout the rest of the day." },
      { type: "p", text: "Research by Dr. Herman Pontzer and colleagues on the Hadza hunter-gatherers showed that total daily energy expenditure is surprisingly similar across activity levels — because the body downregulates background activity when structured exercise goes up. This is called the constrained energy expenditure model. It explains why many people who take up running don't lose as much weight as the calories-burned math would predict." },
      { type: "h2", id: "muscle-drives-metabolism", text: "Muscle Drives Metabolism" },
      { type: "p", text: "Cardio burns calories during the session. Muscle burns calories constantly — at rest, while you sleep, during the hours between workouts. A pound of muscle burns approximately 6 to 10 calories per day at rest. That doesn't sound like much, but across 10 to 15 pounds of lean muscle (a realistic two-to-three-year adaptation from resistance training), it adds up to 60 to 150 additional calories burned every day without any extra effort." },
      { type: "p", text: "More importantly, muscle preserves your metabolic rate as you age. Cardio does not build muscle. Cardio does not prevent the muscle loss that comes with aging and low protein intake. Only resistance training does." },
      { type: "h2", id: "what-cardio-is-actually-good-for", text: "What Cardio Is Actually Good For" },
      { type: "p", text: "I'm not anti-cardio. Cardiovascular exercise is excellent for heart health, stress reduction, mental clarity, and endurance. Walking in particular is one of the most underrated health behaviors that exists — low impact, accessible, and supported by a mountain of research on longevity and metabolic health." },
      { type: "p", text: "Cardio is a great supplement to a training program. It's a poor foundation for one." },
      { type: "h2", id: "the-combination", text: "The Combination That Works" },
      { type: "p", text: "Two to three strength training sessions per week is the foundation. Add walking — 7,000 to 10,000 steps per day is a target I use with clients — as your aerobic base. Throw in a cardio session or two if you enjoy it. This combination builds muscle, maintains cardiovascular health, manages appetite better than cardio alone, and produces results that actually stick." },
      { type: "p", text: "The woman who was running four days a week with no results? We replaced two of those runs with lifting sessions, kept two as walks, and adjusted her protein intake. She was down 14 pounds in four months. Same amount of time invested. Very different approach." },
    ],
  },

  /* ── Post 14 ────────────────────────────────────────────────────────── */
  {
    id: "14",
    title: "The Strength Training Approach That Actually Works for Women Over 40",
    slug: "strength-training-women-over-40",
    publishedAt: "2024-10-22T00:00:00Z",
    excerpt:
      "Lifting weights after 40 isn't just about how you look. It's about your bones, your metabolism, your energy, and how you feel ten years from now.",
    category: { title: "Training", slug: "training" },
    imageSrc: "/images/blog/blog-strength-training-women.jpg",
    body: [
      { type: "p", text: "The most impactful thing a woman over 40 can do for her long-term health is lift weights. Not moderate weights for high reps. Not the 3-pound pink dumbbells the fitness industry has been pointing at women for decades. Actually challenging resistance training." },
      { type: "p", text: "I say this having worked with hundreds of women in this age range. The results — physical, hormonal, psychological — are consistently significant." },
      { type: "h2", id: "why-it-matters-more-after-40", text: "Why It Matters More After 40" },
      { type: "p", text: "Three things happen to women around and after 40 that strength training directly addresses:" },
      { type: "ul", items: [
        "Muscle loss (sarcopenia) accelerates — women can lose 3 to 5 percent of muscle mass per decade after 30, faster after menopause",
        "Bone density decreases — resistance training creates the mechanical load that stimulates bone-building cells",
        "Metabolic rate slows — because it's tied directly to muscle mass",
      ]},
      { type: "p", text: "Strength training is the intervention that addresses all three simultaneously. Nothing else does." },
      { type: "h2", id: "the-fear-of-bulking", text: "The \"Bulking\" Fear" },
      { type: "p", text: "Every week someone tells me they don't want to lift heavy because they don't want to get bulky. I understand where this comes from. But I want to be clear: women do not have the hormonal profile to build the kind of muscle mass that looks bulky without extreme dietary manipulation, pharmaceutical support, or years of dedicated effort specifically aimed at hypertrophy." },
      { type: "p", text: "The women you see in bodybuilding competitions who are extremely muscular have been working toward that specific outcome for years, eating very particular amounts of food, and in many cases using performance-enhancing drugs. That does not happen by accident from going to the gym three times a week." },
      { type: "p", text: "What does happen: you look more defined, feel stronger, have more energy, and your body composition shifts in a direction that most women describe as exactly what they wanted." },
      { type: "h2", id: "what-actually-works", text: "What the Approach Looks Like" },
      { type: "p", text: "Progressive overload is the principle: gradually increasing the challenge over time. This can mean more weight, more reps, or shorter rest periods. The body adapts to the stimulus you give it. If the stimulus never changes, the body stops adapting." },
      { type: "p", text: "Compound movements — squats, deadlifts, rows, presses — work multiple muscle groups simultaneously and produce the most return for time invested. Isolation work has its place, but compound movements are the foundation." },
      { type: "p", text: "Two to three sessions per week is the minimum effective dose. Full-body sessions work well at this frequency. Three days of upper/lower splits works well at four days. You don't need a six-day program to get significant results." },
      { type: "h2", id: "the-long-game", text: "The Long Game" },
      { type: "p", text: "The women I've seen thrive in their 50s and 60s are the ones who started lifting in their 40s. Not because they look a certain way — though most of them feel great about how they look — but because they're strong, their bones are dense, their energy is high, and they're not dealing with the physical limitations that often come with the sedentary alternative." },
      { type: "p", text: "You're not lifting for next month. You're lifting for the next 30 years. Start now." },
    ],
  },

  /* ── Post 15 ────────────────────────────────────────────────────────── */
  {
    id: "15",
    title: "What to Do When You Only Have 20 Minutes",
    slug: "20-minute-workout",
    publishedAt: "2024-11-08T00:00:00Z",
    excerpt:
      "The 20-minute workout is not a compromise. Used right, it's one of the most effective tools in a consistent training practice.",
    category: { title: "Training", slug: "training" },
    imageSrc: "/images/blog/blog-20-minute-workout.jpg",
    body: [
      { type: "p", text: "I've heard every variation of \"I don't have time to work out.\" The most common is: \"I only have 20 minutes, so it's not worth it.\"" },
      { type: "p", text: "It is worth it. Significantly worth it. The 20-minute workout done consistently over a year is worth more than the 60-minute session you did three times and then abandoned because the schedule wasn't sustainable." },
      { type: "h2", id: "what-20-minutes-can-do", text: "What 20 Minutes Actually Does" },
      { type: "p", text: "Twenty minutes of resistance training is enough to create a meaningful muscle-building stimulus if the intensity is appropriate. Research on time-efficient training shows that shorter, higher-effort sessions produce similar hypertrophy outcomes to longer, lower-intensity sessions — as long as proximity to failure is reached." },
      { type: "p", text: "Translation: if you're working hard enough in 20 minutes, your muscles don't know the difference between that and an hour-long session where you spent 30 minutes resting and scrolling your phone between sets." },
      { type: "h2", id: "how-to-build-a-20-minute-session", text: "How to Build a 20-Minute Session" },
      { type: "p", text: "The key is eliminating everything that doesn't produce adaptation. That means compound movements only, minimal rest, and no warm-up ceremony." },
      { type: "p", text: "A simple template:" },
      { type: "ul", items: [
        "2 minutes: quick movement prep (leg swings, arm circles, light squat)",
        "18 minutes: 3 to 4 compound exercises, 3 sets each, 30–45 second rest",
        "Example: goblet squat, dumbbell row, push-up, hip hinge",
      ]},
      { type: "p", text: "If you have dumbbells and 20 minutes, that is a complete training session. It hits legs, back, chest, and posterior chain. It elevates your heart rate. It creates the mechanical tension needed for muscle adaptation." },
      { type: "h2", id: "the-intensity-requirement", text: "The Intensity Requirement" },
      { type: "p", text: "Short workouts only work if you're not coasting. The rest periods are short. The weights should be challenging — meaning the last 2 or 3 reps of each set are genuinely hard. If you could do 5 more reps easily, the weight is too light." },
      { type: "p", text: "Most people underload. They pick a weight that feels safe and they never increase it. This is why long workouts at low intensity don't produce results either. The length isn't the variable. The challenge is." },
      { type: "h2", id: "the-real-value", text: "The Real Value of the 20-Minute Session" },
      { type: "p", text: "The 20-minute workout keeps the habit alive on the hard weeks. When you're traveling, when work is overwhelming, when the kids are sick — you can almost always find 20 minutes. And that 20-minute session keeps your momentum intact, keeps the habit in place, keeps your body from losing what you've built." },
      { type: "p", text: "The enemy of long-term progress isn't a short workout. It's the extended break that happens when you decide short workouts don't count." },
      { type: "p", text: "Twenty minutes counts. Do the 20 minutes." },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
