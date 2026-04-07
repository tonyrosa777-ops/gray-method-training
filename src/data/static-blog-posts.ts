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
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
