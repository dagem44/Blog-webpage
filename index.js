import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.set("views", (__dirname + "/views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});
  
const upload = multer({ storage: storage });

function getRelativeTime(timestamp) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) {
        return "Just now";
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
}

app.get("/", (req, res) => {
    res.render("home", { posts: posts, getRelativeTime: getRelativeTime });
});

app.get("/new-post", (req, res) => {
    res.render("new-post");
});
const posts=[];
let postIdCounter = 5; // Counter for unique post IDs (0-4 reserved for hardcoded posts)

app.post("/new-post", upload.single("image"), (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const image = req.file ? req.file.filename : null;
    const timestamp = new Date();

    const newPost ={
        id: postIdCounter++,
        title: title,
        content: content,
        image: image || null,
        timestamp: timestamp
    };
    posts.unshift(newPost);
    res.redirect("/");
  });

// New route for individual blog posts
app.get("/post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    
    // Handle hardcoded posts (IDs 0-4)
    if (postId >= 0 && postId <= 4) {
        const hardcodedPosts = [
            {
                id: 0,
                title: "Kickboxing robot shows off its moves at AI conference",
                content: "This kickboxing robot showed off its best moves at the seventh Beijing Academy of Artificial Intelligence conference on 6 June. Wang Xingxing, CEO of UniTree, which created the robot, told the conference it is a step towards creating humanoid robots that can perform full-body movements to help with tasks in homes or factories. He also said that he believes robot fighting will become a popular sport.",
                image: "/images/boxer.webp",
                timestamp: new Date("2024-06-23T10:00:00")
            },
            {
                id: 1,
                title: "Can we stop big tech from controlling the internet with AI agents?",
                content: "What does the future of the internet look like? If AI firms get their way, the once-open web could be fractured into digital silos dominated by commercial AI models, leaving hobbyists and small businesses behind. To prevent this, a team of grassroots researchers is planning to fight back and ensure an open approach to AI. At the heart of this battle is the concept of an AI 'agent', a piece of software that browses the web and interacts with websites according to the instructions of a human user – for example, planning and booking a holiday. Many people see agents as the next evolution of services like ChatGPT, but getting them to work is proving tricky. That is because the web was built for human use, and developers are realising that AI agents need specialised protocols to better interact with online data, services and each other.",
                image: "/images/control.webp",
                timestamp: new Date("2024-06-23T09:30:00")
            },
            {
                id: 2,
                title: "Disney and Universal lawsuit may be killing blow in AI copyright wars",
                content: "Disney and Universal have filed a lawsuit against AI image generator Midjourney alleging mass copyright infringement that enables users to create images that 'blatantly incorporate and copy Disney's and Universal's famous characters'. The action could be a major turning point in the legal battles over AI copyright infringement being negotiated by book publishers, news agencies and other content creators.\n\nMidjourney's tool, which creates images from text prompts, has 20 million users on its Discord server, where users type their inputs. In the lawsuit, the two movie-making giants share examples in which Midjourney is able to create images that uncannily resemble characters each company owns the rights to, such as the Minions, controlled by Universal, or the Lion King, owned by Disney.\n\nThe companies allege those outputs could only be the result of Midjourney training its AI on their copyrighted material. They also say Midjourney 'ignored' their attempts to remediate the issue prior to taking legal action. In the complaint, the companies say 'Midjourney is the quintessential copyright free-rider and a bottomless pit of plagiarism.'\n\nThis lawsuit has been welcomed by creators and legal experts who see it as a potential turning point in the ongoing battle over AI copyright infringement. The involvement of two major entertainment companies could set important precedents for how AI companies operate and how creators protect their work.",
                image: "/images/disney.webp",
                timestamp: new Date("2024-06-23T09:00:00")
            },
            {
                id: 3,
                title: "Sci-fi debut is a quietly brilliant look at a disturbing future",
                content: "A new science fiction novel has captured the attention of readers and critics alike with its subtle yet powerful exploration of a dystopian future. The author's debut work stands out for its understated approach to complex themes, avoiding the typical tropes of the genre while delivering a thought-provoking narrative. The story examines the intersection of technology, society, and human nature in a way that feels both familiar and unsettlingly plausible. Critics have praised the novel's ability to make readers question their assumptions about progress and the direction of modern civilization. The book's success suggests a growing appetite for science fiction that prioritizes character development and social commentary over spectacle.",
                image: "/images/scifi.webp",
                timestamp: new Date("2024-06-23T08:30:00")
            },
            {
                id: 4,
                title: "Is superintelligent AI just around the corner, or just a sci-fi dream?",
                content: "If you take the leaders of artificial intelligence companies at their word, their products mean that the coming decade will be quite unlike any in human history: a golden era of 'radical abundance', where high-energy physics is 'solved' and we see the beginning of space colonisation. But researchers working with today's most powerful AI systems are finding a different reality, in which even the best models are failing to solve basic puzzles that most humans find trivial, while the promise of AI that can 'reason' seems to be overblown. So, whom should you believe?",
                image: "/images/super.webp",
                timestamp: new Date("2024-06-23T08:00:00")
            }
        ];
        
        const post = hardcodedPosts[postId];
        if (post) {
            return res.render("post", { post: post, getRelativeTime: getRelativeTime });
        }
    }
    
    // Handle dynamic posts (IDs 5+)
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        return res.status(404).send("Post not found");
    }
    
    res.render("post", { post: post, getRelativeTime: getRelativeTime });
});

app.get("/about", (req, res)=>{
    res.render("about");
  });
  
app.get("/contact", (req, res)=>{
    res.render("contact");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  