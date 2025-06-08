// Sample destination data
const destinations = [
    // Asia
    {
        id: 1,
        name: "Bali, Indonesia",
        location: "asia",
        type: "beach",
        image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800",
        description: "Paradise island with pristine beaches and rich cultural heritage",
        details: "Discover the magic of Bali, where ancient temples meet tropical paradise. Experience world-class surfing, vibrant coral reefs, and the warmth of Balinese culture."
    },
    {
        id: 2,
        name: "Kyoto, Japan",
        location: "asia",
        type: "cultural",
        image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&w=800",
        description: "Ancient temples, traditional gardens, and timeless beauty",
        details: "Step into the heart of traditional Japan in Kyoto, where centuries-old temples stand alongside pristine zen gardens. Experience the magic of cherry blossoms and authentic tea ceremonies."
    },
   
    // Europe
    {
        id: 4,
        name: "Santorini, Greece",
        location: "europe",
        type: "beach",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800",
        description: "Stunning white-washed villages perched on volcanic cliffs",
        details: "Experience the magic of Santorini's blue-domed churches, spectacular sunsets, and crystal-clear waters. Explore charming villages and beaches with unique volcanic sand."
    },
    {
        id: 5,
        name: "Venice, Italy",
        location: "europe",
        type: "city",
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800",
        description: "Romantic canal city with stunning architecture",
        details: "Navigate through the enchanting canals of Venice, discovering historic palazzos, bustling piazzas, and artistic treasures. Experience the unique charm of this floating city."
    },
    {
        id: 6,
        name: "Northern Lights, Iceland",
        location: "europe",
        type: "nature",
        image: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=800",
        description: "Spectacular aurora borealis and dramatic landscapes",
        details: "Witness the mesmerizing dance of the Northern Lights while exploring Iceland's unique landscape of glaciers, volcanoes, and hot springs."
    },

    // Americas
    {
        id: 7,
        name: "Machu Picchu, Peru",
        location: "americas",
        type: "cultural",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800",
        description: "Ancient Incan city set among dramatic mountain peaks",
        details: "Explore this mysterious 15th-century Inca citadel, perched high in the Andes Mountains. Marvel at the incredible architectural precision and stunning mountain vistas."
    },
    {
        id: 8,
        name: "New York City, USA",
        location: "americas",
        type: "city",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800",
        description: "Iconic skyline and cultural melting pot",
        details: "Explore the city that never sleeps, from Central Park to Times Square. Experience world-class museums, Broadway shows, and diverse neighborhoods."
    },
    {
        id: 9,
        name: "Rio de Janeiro, Brazil",
        location: "americas",
        type: "city",
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800",
        description: "Vibrant city between mountains and sea",
        details: "Experience the energy of Rio, from its famous Copacabana beach to the iconic Christ the Redeemer statue. Enjoy samba music, carnival festivities, and stunning coastal views."
    },

    // Africa
    {
        id: 10,
        name: "Pyramids of Giza, Egypt",
        location: "africa",
        type: "cultural",
        image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=800",
        description: "Ancient wonders of the world",
        details: "Stand in awe before these magnificent ancient structures, built over 4,500 years ago. Explore the only surviving wonder of the ancient world."
    },
    {
        id: 11,
        name: "Cape Town, South Africa",
        location: "africa",
        type: "city",
        image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800",
        description: "Stunning coastal city beneath Table Mountain",
        details: "Explore this beautiful city where mountains meet the ocean. Visit world-class wineries, beautiful beaches, and historic Robben Island."
    },
   
    // Oceania
    {
        id: 13,
        name: "Great Barrier Reef, Australia",
        location: "oceania",
        type: "nature",
        image: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=800",
        description: "World's largest coral reef system",
        details: "Dive or snorkel in the world's largest coral reef system, home to countless marine species. Experience the underwater wonder of this natural masterpiece."
    },
    {
        id: 14,
        name: "Sydney, Australia",
        location: "oceania",
        type: "city",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800",
        description: "Iconic harbor city with famous opera house",
        details: "Explore the stunning harbor, iconic Opera House, and beautiful beaches. Experience the perfect blend of urban sophistication and natural beauty."
    },
   
];

// DOM Elements
const destinationsGrid = document.getElementById('destinationsGrid');
const locationFilter = document.getElementById('locationFilter');
const typeFilter = document.getElementById('typeFilter');
const modal = document.getElementById('destinationModal');
const modalContent = document.getElementById('modalContent');
const closeButton = document.querySelector('.close-button');

// Function to create destination cards with animation
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    card.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}" loading="lazy">
        <div class="destination-info">
            <h2>${destination.name}</h2>
            <p>${destination.description}</p>
        </div>
    `;
    
    // Fade in animation
    setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 50);
    
    // Add click event to show details
    card.addEventListener('click', () => showDestinationDetails(destination));
    
    return card;
}

// Function to filter destinations with debounce
const filterDestinations = debounce(() => {
    const selectedLocation = locationFilter.value;
    const selectedType = typeFilter.value;
    
    const filteredDestinations = destinations.filter(dest => {
        const locationMatch = !selectedLocation || dest.location === selectedLocation;
        const typeMatch = !selectedType || dest.type === selectedType;
        return locationMatch && typeMatch;
    });
    
    displayDestinations(filteredDestinations);
}, 300);

// Function to display destinations
function displayDestinations(destinationsToShow) {
    destinationsGrid.innerHTML = '';
    destinationsToShow.forEach((destination, index) => {
        setTimeout(() => {
            destinationsGrid.appendChild(createDestinationCard(destination));
        }, index * 100);
    });
}

// Function to show destination details in modal
function showDestinationDetails(destination) {
    modalContent.innerHTML = `
        <h2>${destination.name}</h2>
        <img src="${destination.image}" alt="${destination.name}" style="width: 100%; max-height: 400px; object-fit: cover; margin: 1.5rem 0; border-radius: 12px;">
        <p style="font-size: 1.1rem; line-height: 1.8; color: #333;">${destination.details}</p>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Fade in animation for modal content
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease';
        modalContent.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    }, 50);
}

// Debounce function to limit how often a function can fire
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event Listeners
locationFilter.addEventListener('change', filterDestinations);
typeFilter.addEventListener('change', filterDestinations);

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Handle escape key for modal
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Initial display
displayDestinations(destinations); 