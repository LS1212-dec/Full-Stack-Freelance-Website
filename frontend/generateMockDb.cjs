const fs = require('fs');

const categories = ["Development", "Design", "AI Services", "Marketing", "Writing"];
const skillsList = [
    "React, Node.js", "Java, Spring Boot", "Python, Pandas", 
    "Figma, UI/UX", "SEO, Analytics", "Copywriting, Editing", 
    "TensorFlow, ML", "C++, Game Dev", "AWS, DevOps", "Illustrator, Logo Design"
];

// Generate 10 Freelancers
const users = [];
for (let i = 1; i <= 10; i++) {
    users.push({
        id: i,
        username: `freelancer${i}`,
        email: `freelancer${i}@test.com`,
        password: "password123",
        role: "ROLE_FREELANCER"
    });
}

// Generate 10 Clients
for (let i = 11; i <= 20; i++) {
    users.push({
        id: i,
        username: `client${i}`,
        email: `client${i}@test.com`,
        password: "password123",
        role: "ROLE_CLIENT"
    });
}

// Generate 55 Gigs
const gigs = [];
for (let i = 1; i <= 55; i++) {
    const cat = categories[i % categories.length];
    const skill = skillsList[i % skillsList.length];
    const price = Math.floor(Math.random() * 500) + 50;
    const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
    const reviews = Math.floor(Math.random() * 300) + 5;
    
    gigs.push({
        id: i,
        title: `Professional ${cat} Service Level ${i}`,
        description: `I will provide exceptional ${cat} services for your business using high-end workflows and standard compliant techniques. Delivery within 3 days. Includes source files and comprehensive communication.`,
        price: price,
        category: cat,
        skills: skill,
        tags: "pro, fast, expert",
        rating: parseFloat(rating),
        reviewCount: reviews,
        freelancerId: (i % 10) + 1, // IDs 1 to 10
        image: `https://picsum.photos/seed/${i}/400/250`,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    });
}

// Generate 20 Orders
const orders = [];
for(let i = 1; i <= 20; i++){
    orders.push({
        id: i,
        gigId: (i % 50) + 1,
        clientId: (i % 10) + 11, // IDs 11 to 20
        status: i % 3 === 0 ? "COMPLETED" : "IN_PROGRESS",
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
        amount: Math.floor(Math.random() * 500) + 50
    })
}

const db = { users, gigs, orders };

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log("Successfully generated massive db.json!");
