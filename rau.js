document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const websiteName = document.getElementById('websiteName');
    const industryType = document.getElementById('industryType');
    const generateBtn = document.getElementById('generateBtn');
    const websitePreview = document.getElementById('websitePreview');
    const previewContainer = document.getElementById('previewContainer');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const deviceSize = document.getElementById('deviceSize');
    const deviceToggles = document.querySelectorAll('.device-toggle');
    const exportBtn = document.getElementById('exportBtn');
    const colorOptions = document.querySelectorAll('.color-option');
    const layoutOptions = document.querySelectorAll('.layout-option');
    const aiSuggestBtn = document.getElementById('aiSuggestBtn');
    const aiSuggestions = document.getElementById('aiSuggestions');
    const aiAssistant = document.getElementById('aiAssistant');
    const aiModal = document.getElementById('aiModal');
    const closeAiModal = document.getElementById('closeAiModal');
    const aiChat = document.getElementById('aiChat');
    const aiChatInput = document.getElementById('aiChatInput');
    const aiChatSend = document.getElementById('aiChatSend');

    // State Management
    let currentState = {
        websiteName: 'My Awesome Site',
        industry: 'business',
        color: 'indigo',
        layout: 'classic',
        device: 'desktop'
    };

    // Color Mapping
    const colorMap = {
        indigo: {
            primary: '#4f46e5',
            secondary: '#6366f1',
            light: '#e0e7ff',
            dark: '#4338ca'
        },
        blue: {
            primary: '#3b82f6',
            secondary: '#60a5fa',
            light: '#dbeafe',
            dark: '#2563eb'
        },
        green: {
            primary: '#10b981',
            secondary: '#34d399',
            light: '#d1fae5',
            dark: '#059669'
        },
        red: {
            primary: '#ef4444',
            secondary: '#f87171',
            light: '#fee2e2',
            dark: '#dc2626'
        },
        purple: {
            primary: '#8b5cf6',
            secondary: '#a78bfa',
            light: '#ede9fe',
            dark: '#7c3aed'
        },
        pink: {
            primary: '#ec4899',
            secondary: '#f472b6',
            light: '#fce7f3',
            dark: '#db2777'
        },
        yellow: {
            primary: '#f59e0b',
            secondary: '#fbbf24',
            light: '#fef3c7',
            dark: '#d97706'
        },
        teal: {
            primary: '#14b8a6',
            secondary: '#2dd4bf',
            light: '#ccfbf1',
            dark: '#0d9488'
        },
        gray: {
            primary: '#4b5563',
            secondary: '#6b7280',
            light: '#f3f4f6',
            dark: '#374151'
        },
        gradient: {
            primary: 'linear-gradient(to right, #4f46e5, #8b5cf6)',
            secondary: 'linear-gradient(to right, #6366f1, #a78bfa)',
            light: '#e0e7ff',
            dark: '#4338ca'
        }
    };

    // Template Database
    const templateDatabase = {
        business: {
            classic: {
                name: 'Corporate Classic',
                description: 'Professional design for businesses and corporations',
                html: (name, colors) => generateBusinessTemplate(name, colors, 'classic')
            },
            modern: {
                name: 'Business Modern',
                description: 'Sleek contemporary design for modern businesses',
                html: (name, colors) => generateBusinessTemplate(name, colors, 'modern')
            },
            minimal: {
                name: 'Minimal Business',
                description: 'Clean and minimalist business website',
                html: (name, colors) => generateBusinessTemplate(name, colors, 'minimal')
            }
        },
        portfolio: {
            classic: {
                name: 'Portfolio Classic',
                description: 'Traditional portfolio layout',
                html: (name, colors) => generatePortfolioTemplate(name, colors, 'classic')
            },
            modern: {
                name: 'Creative Portfolio',
                description: 'Modern creative portfolio',
                html: (name, colors) => generatePortfolioTemplate(name, colors, 'modern')
            },
            minimal: {
                name: 'Minimal Portfolio',
                description: 'Ultra-clean portfolio design',
                html: (name, colors) => generatePortfolioTemplate(name, colors, 'minimal')
            }
        },
        ecommerce: {
            classic: {
                name: 'E-Commerce Classic',
                description: 'Traditional online store layout',
                html: (name, colors) => generateEcommerceTemplate(name, colors, 'classic')
            },
            modern: {
                name: 'Modern Shop',
                description: 'Contemporary e-commerce design',
                html: (name, colors) => generateEcommerceTemplate(name, colors, 'modern')
            },
            minimal: {
                name: 'Minimal Store',
                description: 'Simplified e-commerce layout',
                html: (name, colors) => generateEcommerceTemplate(name, colors, 'minimal')
            }
        },
        restaurant: {
            classic: {
                name: 'Restaurant Classic',
                description: 'Traditional restaurant website',
                html: (name, colors) => generateRestaurantTemplate(name, colors, 'classic')
            },
            modern: {
                name: 'Modern Eatery',
                description: 'Contemporary restaurant design',
                html: (name, colors) => generateRestaurantTemplate(name, colors, 'modern')
            },
            minimal: {
                name: 'Minimal Menu',
                description: 'Simple restaurant website',
                html: (name, colors) => generateRestaurantTemplate(name, colors, 'minimal')
            }
        },
        blog: {
            classic: {
                name: 'Blog Classic',
                description: 'Traditional blog layout',
                html: (name, colors) => generateBlogTemplate(name, colors, 'classic')
            },
            modern: {
                name: 'Modern Blog',
                description: 'Contemporary blog design',
                html: (name, colors) => generateBlogTemplate(name, colors, 'modern')
            },
            minimal: {
                name: 'Minimal Blog',
                description: 'Simplified blog layout',
                html: (name, colors) => generateBlogTemplate(name, colors, 'minimal')
            }
        },
        saas: {
            classic: {
                name: 'SaaS Classic',
                description: 'Traditional SaaS website',
                html: (name, colors) => generateSaasTemplate(name, colors, 'classic')
            },
            modern: {
                name: 'Modern SaaS',
                description: 'Contemporary SaaS design',
                html: (name, colors) => generateSaasTemplate(name, colors, 'modern')
            },
            minimal: {
                name: 'Minimal SaaS',
                description: 'Simplified SaaS layout',
                html: (name, colors) => generateSaasTemplate(name, colors, 'minimal')
            }
        }
    };

    // Template Generators
    function generateBusinessTemplate(name, colors, style) {
        // Implementation would generate HTML for business template
        // This is a simplified version for demonstration
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${name}</title>
                <style>
                    body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; }
                    .navbar { background: ${colors.primary}; color: white; padding: 1rem; }
                    .hero { background: ${colors.light}; padding: 4rem 2rem; text-align: center; }
                    .cta-button { background: ${colors.primary}; color: white; padding: 0.75rem 1.5rem; border-radius: 0.25rem; }
                </style>
            </head>
            <body>
                <nav class="navbar">
                    <div>${name}</div>
                </nav>
                <section class="hero">
                    <h1>Welcome to ${name}</h1>
                    <p>Professional business solutions</p>
                    <button class="cta-button">Contact Us</button>
                </section>
            </body>
            </html>
        `;
    }

    function generatePortfolioTemplate(name, colors, style) {
        // Similar implementation for portfolio
        return `...`;
    }

    function generateEcommerceTemplate(name, colors, style) {
        // Similar implementation for e-commerce
        return `...`;
    }

    function generateRestaurantTemplate(name, colors, style) {
        // Similar implementation for restaurant
        return `...`;
    }

    function generateBlogTemplate(name, colors, style) {
        // Similar implementation for blog
        return `...`;
    }

    function generateSaasTemplate(name, colors, style) {
        // Similar implementation for SaaS
        return `...`;
    }

    // Update Preview
    function updatePreview() {
        loadingOverlay.classList.remove('hidden');
        
        // Simulate AI processing delay
        setTimeout(() => {
            const template = templateDatabase[currentState.industry][currentState.layout];
            const colors = colorMap[currentState.color];
            const html = template.html(currentState.websiteName, colors);
            
            const previewDoc = websitePreview.contentDocument || websitePreview.contentWindow.document;
            previewDoc.open();
            previewDoc.write(html);
            previewDoc.close();
            
            loadingOverlay.classList.add('hidden');
        }, 800);
    }

    // Event Listeners
    websiteName.addEventListener('input', function() {
        currentState.websiteName = this.value || 'My Awesome Site';
        updatePreview();
    });

    industryType.addEventListener('change', function() {
        currentState.industry = this.value;
        updateAISuggestions();
        updatePreview();
    });

    generateBtn.addEventListener('click', updatePreview);

    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            currentState.color = this.getAttribute('data-color');
            updatePreview();
        });
    });

    layoutOptions.forEach(option => {
        option.addEventListener('click', function() {
            layoutOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            currentState.layout = this.getAttribute('data-layout');
            updatePreview();
        });
    });

    deviceToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            currentState.device = size;
            deviceSize.textContent = size.charAt(0).toUpperCase() + size.slice(1);
            
            // Update preview container class
            previewContainer.className = 'relative mx-auto border-4 border-gray-800 rounded-lg overflow-hidden bg-white';
            previewContainer.classList.add(`preview-${size}`);
            
            deviceToggles.forEach(t => t.classList.remove('text-indigo-500'));
            this.classList.add('text-indigo-500');
        });
    });

    exportBtn.addEventListener('click', function() {
        alert('Export functionality would be implemented here');
    });

    aiSuggestBtn.addEventListener('click', updateAISuggestions);

    aiAssistant.addEventListener('click', function() {
        aiModal.classList.remove('hidden');
    });

    closeAiModal.addEventListener('click', function() {
        aiModal.classList.add('hidden');
    });

    aiChatSend.addEventListener('click', sendAIMessage);
    aiChatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendAIMessage();
    });

    // AI Functions
    function updateAISuggestions() {
        const industry = currentState.industry;
        const suggestions = {
            business: "For a professional business site, consider highlighting your services with clear call-to-action buttons and testimonials.",
            portfolio: "Showcase your best work prominently on the homepage with high-quality images and project details.",
            ecommerce: "Feature your best-selling products with clear pricing and 'Add to Cart' buttons for better conversions.",
            restaurant: "Display your menu with mouth-watering images and include an online reservation system.",
            blog: "Use a clean layout with readable typography and featured posts section to engage readers.",
            saas: "Highlight your product's key features with screenshots and include a free trial signup form."
        };
        
        aiSuggestions.innerHTML = `<p class="fade-in">${suggestions[industry]}</p>`;
    }

    function sendAIMessage() {
        const message = aiChatInput.value.trim();
        if (!message) return;
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'user-message p-4 rounded-lg';
        userMsg.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0 bg-indigo-100 text-indigo-500 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    <i class="fas fa-user"></i>
                </div>
                <div>
                    <p>${message}</p>
                </div>
            </div>
        `;
        aiChat.appendChild(userMsg);
        aiChatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "Based on your current design, I recommend adding more white space to improve readability.",
                "Your color scheme works well, but consider using the accent color more strategically for CTAs.",
                "For a " + currentState.industry + " website, it's effective to include a clear value proposition above the fold.",
                "I suggest optimizing your layout for mobile devices, as over 60% of traffic comes from smartphones."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            const aiMsg = document.createElement('div');
            aiMsg.className = 'ai-message bg-gray-100 p-4 rounded-lg';
            aiMsg.innerHTML = `
                <div class="flex items-start">
                    <div class="flex-shrink-0 bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div>
                        <p>${randomResponse}</p>
                    </div>
                </div>
            `;
            aiChat.appendChild(aiMsg);
            aiChat.scrollTop = aiChat.scrollHeight;
        }, 1000);
    }

    // Initialize
    colorOptions[0].classList.add('selected');
    layoutOptions[0].classList.add('selected');
    deviceToggles[0].classList.add('text-indigo-500');
    updateAISuggestions();
    updatePreview();
});