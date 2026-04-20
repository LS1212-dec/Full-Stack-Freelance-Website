// Generating a massive reliable fallback dataset seamlessly internally
const categories = ["Development", "Design", "AI Services", "Marketing", "Writing"];
const skillsList = [
    "React, Node.js, NextJS", "Java, Spring Boot, SQL", "Python, Pandas, ML", 
    "Figma, UI/UX, Wireframing", "SEO, Analytics, Growth", "Copywriting, Editing, Blog", 
    "TensorFlow, ChatGPT API", "C++, Game Dev, Unity", "AWS, DevOps, Docker", "Illustrator, Logo, Branding"
];
const titles = [
    "I will build a stunning custom web application",
    "I will design an ultra professional modern logo",
    "I will integrate advanced AI into your business workflow",
    "I will orchestrate a viral social media campaign",
    "I will edit and proofread your technical manuscript",
    "I will build a robust enterprise Spring Boot microservice",
    "I will craft high-converting SEO optimized copy",
    "I will develop a cross-platform mobile application"
];

const categoryKeywords = {
    "Development": "coding,developer",
    "Design": "ux,design",
    "AI Services": "technology,cyber",
    "Marketing": "business,meeting",
    "Writing": "typing,journal"
};

const generateMockGigs = () => {
    const arr = [];
    for (let i = 1; i <= 45; i++) {
        const cat = categories[i % categories.length];
        const skill = skillsList[i % skillsList.length];
        const titleRoot = titles[i % titles.length];
        const isTrending = i % 4 === 0;
        const isTopRated = i % 3 === 0;
        
        const price = Math.floor(Math.random() * 80) * 10 + 50; 
        const rating = 3.5 + Math.random() * 1.5; 
        const reviews = 5 + Math.floor(Math.random() * 500);

        arr.push({
            id: `mock_${i}`,
            title: titleRoot,
            description: `This is a high quality premium service offered exclusively for clients demanding the absolute best. Delivering highly resilient frameworks, standard compliance, and priority level support within days of your order.`,
            price: price,
            category: cat,
            skills: skill,
            tags: isTrending ? "Trending, Fast" : "Reliable, Expert",
            rating: Math.round(rating * 10) / 10,
            reviewCount: reviews,
            isTopRated: isTopRated,
            image: `https://loremflickr.com/600/400/${categoryKeywords[cat] || 'business'}?lock=${i}`,
            freelancer: {
                username: `ProTalent_${i}`,
                id: (i % 10) + 1
            },
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
        });
    }
    return arr;
};

export const FALLBACK_GIGS = generateMockGigs();
