<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PromptTester - Test AI Prompts with DeepSeek</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --secondary: #10b981;
            --accent: #8b5cf6;
            --dark: #1f2937;
            --light: #f9fafb;
            --gray: #9ca3af;
            --border: #e5e7eb;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: var(--light);
            color: var(--dark);
            line-height: 1.6;
        }
        
        header {
            background-color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            padding: 1rem 2rem;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--primary);
            display: flex;
            align-items: center;
        }
        
        .logo i {
            margin-right: 10px;
        }
        
        nav ul {
            display: flex;
            list-style: none;
        }
        
        nav li {
            margin-left: 2rem;
        }
        
        nav a {
            text-decoration: none;
            color: var(--dark);
            font-weight: 500;
            transition: color 0.3s;
        }
        
        nav a:hover {
            color: var(--primary);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .hero {
            text-align: center;
            padding: 4rem 1rem;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            color: var(--dark);
            background: linear-gradient(90deg, var(--primary), var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .hero p {
            font-size: 1.3rem;
            color: var(--gray);
            max-width: 800px;
            margin: 0 auto 2.5rem;
        }
        
        .highlight {
            color: var(--primary);
            font-weight: 600;
        }
        
        .cta-button {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.2rem;
            font-weight: 600;
            transition: background-color 0.3s, transform 0.2s;
            box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
        }
        
        .cta-button:hover {
            background-color: var(--primary-dark);
            transform: translateY(-2px);
        }
        
        .tester-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
            padding: 2.5rem;
            margin-bottom: 3rem;
        }
        
        .input-group {
            margin-bottom: 2rem;
        }
        
        .input-group label {
            display: block;
            margin-bottom: 0.8rem;
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        textarea {
            width: 100%;
            min-height: 180px;
            padding: 1.2rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 1rem;
            resize: vertical;
            transition: border-color 0.3s;
        }
        
        textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }
        
        .btn-group {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        
        .btn {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: background-color 0.3s;
            display: flex;
            align-items: center;
        }
        
        .btn i {
            margin-right: 8px;
        }
        
        .btn:hover {
            background-color: var(--primary-dark);
        }
        
        .btn-secondary {
            background-color: white;
            color: var(--dark);
            border: 1px solid var(--border);
        }
        
        .btn-secondary:hover {
            background-color: var(--light);
        }
        
        .deepseek-badge {
            background-color: rgba(99, 102, 241, 0.1);
            color: var(--primary);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            margin-left: 1rem;
        }
        
        .deepseek-badge i {
            margin-right: 5px;
        }
        
        .model-selector {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }
        
        .model-btn {
            padding: 0.6rem 1.2rem;
            background: white;
            border: 1px solid var(--border);
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s;
        }
        
        .model-btn.active {
            background-color: var(--primary);
            color: white;
            border-color: var(--primary);
        }
        
        .model-btn:hover {
            border-color: var(--primary);
        }
        
        .results {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 2rem;
        }
        
        @media (min-width: 768px) {
            .results {
                grid-template-columns: 1fr 1fr;
            }
        }
        
        .result-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            padding: 1.8rem;
            border-top: 4px solid var(--primary);
            transition: transform 0.3s;
        }
        
        .result-card:hover {
            transform: translateY(-5px);
        }
        
        .result-card h3 {
            margin-bottom: 1.2rem;
            color: var(--dark);
            display: flex;
            align-items: center;
        }
        
        .result-card h3 i {
            margin-right: 10px;
            color: var(--primary);
        }
        
        .result-content {
            min-height: 200px;
            padding: 1.2rem;
            background: var(--light);
            border-radius: 8px;
            white-space: pre-wrap;
            line-height: 1.8;
        }
        
        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 200px;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(79, 70, 229, 0.1);
            border-radius: 50%;
            border-top-color: var(--primary);
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .features {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
            margin: 5rem 0;
        }
        
        @media (min-width: 768px) {
            .features {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        .feature-card {
            padding: 2rem;
            text-align: center;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
        }
        
        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            color: var(--primary);
            background: rgba(79, 70, 229, 0.1);
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin: 0 auto 1.5rem;
        }
        
        .feature-card h3 {
            margin-bottom: 1rem;
            color: var(--dark);
        }
        
        .feature-card p {
            color: var(--gray);
        }
        
        .pricing {
            background: white;
            padding: 4rem 2rem;
            border-radius: 12px;
            text-align: center;
            margin: 3rem 0;
        }
        
        .pricing h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--dark);
        }
        
        .price-tag {
            font-size: 3.5rem;
            font-weight: 800;
            color: var(--primary);
            margin: 2rem 0;
        }
        
        .price-features {
            list-style: none;
            max-width: 500px;
            margin: 0 auto 2rem;
        }
        
        .price-features li {
            padding: 0.8rem 0;
            border-bottom: 1px solid var(--border);
        }
        
        .price-features li:last-child {
            border-bottom: none;
        }
        
        .faq {
            margin: 5rem 0;
        }
        
        .faq h2 {
            text-align: center;
            margin-bottom: 3rem;
            font-size: 2.5rem;
            color: var(--dark);
        }
        
        .faq-item {
            margin-bottom: 1.5rem;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .faq-question {
            padding: 1.5rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .faq-answer {
            padding: 0 1.5rem 1.5rem;
            color: var(--gray);
        }
        
        footer {
            background: var(--dark);
            color: white;
            padding: 3rem 2rem;
            margin-top: 5rem;
        }
        
        .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        @media (min-width: 768px) {
            .footer-container {
                grid-template-columns: 2fr 1fr 1fr;
            }
        }
        
        .footer-logo {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
        }
        
        .footer-logo i {
            margin-right: 10px;
        }
        
        .footer-links h3 {
            margin-bottom: 1.5rem;
            font-size: 1.2rem;
        }
        
        .footer-links ul {
            list-style: none;
        }
        
        .footer-links li {
            margin-bottom: 0.8rem;
        }
        
        .footer-links a {
            color: var(--gray);
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .footer-links a:hover {
            color: white;
        }
        
        .copyright {
            text-align: center;
            padding-top: 2rem;
            margin-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--gray);
        }
    </style>
</head>
<body>
    <header>
        <div class="header-container">
            <div class="logo">
                <i class="fas fa-brain"></i> PromptTester
            </div>
            <nav>
                <ul>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#faq">FAQ</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main class="container">
        <section class="hero">
            <h1>Test Your AI Prompts with DeepSeek</h1>
            <p>Quickly evaluate and compare how different AI models respond to your prompts. <span class="highlight">Focus on DeepSeek</span> - the powerful and free alternative to GPT models.</p>
            <button class="cta-button" id="start-testing">
                <i class="fas fa-bolt"></i> Start Testing Now
            </button>
        </section>
        
        <section class="tester-container">
            <h2>Prompt Tester <span class="deepseek-badge"><i class="fas fa-star"></i> DeepSeek Recommended</span></h2>
            
            <div class="model-selector">
                <div class="model-btn active" data-model="deepseek">DeepSeek</div>
                <div class="model-btn" data-model="gpt">GPT-3.5</div>
                <div class="model-btn" data-model="claude">Claude</div>
                <div class="model-btn" data-model="gemini">Gemini</div>
            </div>
            
            <div class="input-group">
                <label for="prompt-input">Enter your prompt:</label>
                <textarea id="prompt-input" placeholder="Type your AI prompt here... For example: 'Write a persuasive email to potential customers about our new product.'"></textarea>
            </div>
            
            <div class="btn-group">
                <button id="test-btn" class="btn">
                    <i class="fas fa-play"></i> Test Prompt
                </button>
                <button id="clear-btn" class="btn btn-secondary">
                    <i class="fas fa-trash"></i> Clear
                </button>
                <button id="example-btn" class="btn btn-secondary">
                    <i class="fas fa-lightbulb"></i> Load Example
                </button>
            </div>
            
            <div class="results">
                <div class="result-card">
                    <h3><i class="fas fa-robot"></i> AI Response</h3>
                    <div id="ai-response" class="result-content">Response will appear here...</div>
                </div>
                
                <div class="result-card">
                    <h3><i class="fas fa-chart-line"></i> Analysis</h3>
                    <div id="analysis" class="result-content">Analysis will appear here...</div>
                </div>
            </div>
        </section>
        
        <section id="features" class="features">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-bolt"></i>
                </div>
                <h3>Fast Testing</h3>
                <p>Get immediate feedback on your prompts without waiting. Our optimized system delivers responses in seconds.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-wallet"></i>
                </div>
                <h3>Cost Effective</h3>
                <p>Test your prompts without spending on multiple API calls. DeepSeek integration provides free access to powerful AI.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-chart-bar"></i>
                </div>
                <h3>Detailed Analysis</h3>
                <p>Receive comprehensive feedback on your prompt's effectiveness, clarity, and potential improvements.</p>
            </div>
        </section>
        
        <section id="pricing" class="pricing">
            <h2>Simple, Transparent Pricing</h2>
            <p>We believe in providing value without breaking the bank</p>
            
            <div class="price-tag">FREE</div>
            
            <ul class="price-features">
                <li><i class="fas fa-check"></i> Unlimited Prompt Tests with DeepSeek</li>
                <li><i class="fas fa-check"></i> Basic Response Analysis</li>
                <li><i class="fas fa-check"></i> 5 Tests per day with other AI models</li>
                <li><i class="fas fa-check"></i> Email Support</li>
            </ul>
            
            <button class="cta-button">Get Started For Free</button>
        </section>
        
        <section id="faq" class="faq">
            <h2>Frequently Asked Questions</h2>
            
            <div class="faq-item">
                <div class="faq-question">
                    Why focus on DeepSeek? <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>DeepSeek provides excellent performance comparable to GPT models while being completely free to use. It offers strong capabilities for understanding context and generating high-quality responses, making it an ideal choice for prompt testing.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question">
                    How accurate are the test results? <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>Our testing system provides a realistic simulation of how AI models would respond to your prompts. While we can't guarantee identical results to production environments, our tests give you a reliable indication of prompt effectiveness.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question">
                    Can I test prompts for different purposes? <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>Absolutely! Our platform works well for various use cases including content creation, coding assistance, marketing copy, conversational AI, and more. The DeepSeek model is particularly strong across diverse domains.</p>
                </div>
            </div>
        </section>
    </main>
    
    <footer>
        <div class="footer-container">
            <div class="footer-about">
                <div class="footer-logo">
                    <i class="fas fa-brain"></i> PromptTester
                </div>
                <p>Test and optimize your AI prompts with our easy-to-use platform. Focused on delivering value with DeepSeek integration.</p>
            </div>
            
            <div class="footer-links">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#faq">FAQ</a></li>
                </ul>
            </div>
            
            <div class="footer-links">
                <h3>Legal</h3>
                <ul>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Data Protection</a></li>
                </ul>
            </div>
        </div>
        
        <div class="copyright">
            <p>&copy; 2023 PromptTester. All rights reserved.</p>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const testBtn = document.getElementById('test-btn');
            const clearBtn = document.getElementById('clear-btn');
            const exampleBtn = document.getElementById('example-btn');
            const startTestingBtn = document.getElementById('start-testing');
            const promptInput = document.getElementById('prompt-input');
            const aiResponse = document.getElementById('ai-response');
            const analysis = document.getElementById('analysis');
            const modelButtons = document.querySelectorAll('.model-btn');
            
            let currentModel = 'deepseek';
            
            // Model selection
            modelButtons.forEach(button => {
                button.addEventListener('click', function() {
                    modelButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    currentModel = this.getAttribute('data-model');
                });
            });
            
            // Test prompt
            testBtn.addEventListener('click', function() {
                const prompt = promptInput.value.trim();
                
                if (!prompt) {
                    alert('Please enter a prompt first!');
                    return;
                }
                
                // Show loading states
                aiResponse.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
                analysis.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
                
                // Simulate API calls with timeout
                setTimeout(() => {
                    // These are simulated responses
                    aiResponse.textContent = generateAIResponse(prompt, currentModel);
                    analysis.textContent = generateAnalysis(prompt, currentModel);
                }, 2000);
            });
            
            // Clear input
            clearBtn.addEventListener('click', function() {
                promptInput.value = '';
                aiResponse.textContent = 'Response will appear here...';
                analysis.textContent = 'Analysis will appear here...';
            });
            
            // Load example
            exampleBtn.addEventListener('click', function() {
                promptInput.value = "Write a persuasive email to potential customers about our new project management software. Highlight key features like task tracking, team collaboration, and time management. Keep it concise and engaging.";
            });
            
            // Scroll to tester
            startTestingBtn.addEventListener('click', function() {
                document.querySelector('.tester-container').scrollIntoView({
                    behavior: 'smooth'
                });
            });
            
            // FAQ toggle
            document.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', function() {
                    const answer = this.nextElementSibling;
                    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                    const icon = this.querySelector('i');
                    icon.className = icon.className === 'fas fa-chevron-down' ? 
                        'fas fa-chevron-up' : 'fas fa-chevron-down';
                });
            });
            
            // Simulated AI response generator
            function generateAIResponse(prompt, model) {
                const responses = {
                    deepseek: [
                        "Based on your prompt requesting a persuasive email about project management software, I would structure it with a compelling subject line, a friendly opening that addresses pain points, a clear highlighting of key features with benefits, and a strong call to action. I'd focus on how the software saves time and improves team coordination.",
                        "For your project management software email, I suggest starting with a relatable scenario about project chaos, then introducing your solution. Highlight 3-4 key features with tangible benefits, include social proof if available, and end with a low-friction call to action for a demo or trial. Keep the tone professional yet conversational.",
                        "I'd approach this by creating an email that first identifies common project management challenges, then positions your software as the solution. I'd include specific features like real-time collaboration, intuitive task tracking, and automated reporting, explaining how each addresses specific pain points. The email would end with an inviting call to action."
                    ],
                    gpt: [
                        "I'll create a persuasive email for your project management software. The email will have an engaging opening, bullet points of key features, and a compelling call to action. I'll focus on benefits rather than just features, highlighting how your software makes project management easier and more efficient.",
                        "For your project management tool, I'd write an email that starts with a question about project challenges, introduces your software as a solution, lists key benefits in an easy-to-read format, and includes a clear call to action. I'd use a friendly yet professional tone throughout.",
                        "Your email should capture attention immediately by addressing common project management pains. I'd then introduce your software's unique value proposition, highlight 3-4 most compelling features with brief explanations of benefits, and include social proof if available before ending with a strong CTA."
                    ],
                    claude: [
                        "I'll craft a persuasive email for your project management software that focuses on the outcomes rather than just features. I'll highlight how it simplifies complex projects, enhances team transparency, and ultimately delivers projects on time and under budget. The tone will be professional yet approachable.",
                        "For this project management email, I'd structure it to first establish credibility, then present the solution to common project challenges, followed by specific features presented as benefits, and a clear call to action. I'd keep paragraphs short and scannable for busy professionals.",
                        "I recommend an email that tells a mini-story about project success with your software. Start with the before (chaos, missed deadlines), transition to the after (organization, clarity), highlight key features that enable this transformation, and end with an invitation to experience the difference."
                    ],
                    gemini: [
                        "I'll create a concise yet persuasive email for your project management software. I'll focus on how it streamlines workflows, improves team collaboration, and provides visibility into project progress. The email will have a clear structure with a compelling subject line, engaging introduction, key benefits, and a call to action.",
                        "For your project management tool email, I'd emphasize how it brings all project components together in one place. I'd highlight features like task assignment, progress tracking, and resource management, explaining how each contributes to project success. The tone will be professional with a focus on value.",
                        "I suggest an email that addresses the emotional aspect of project management—reduce stress, increase confidence, achieve better results. Then position your software as the tool that enables these outcomes. Include specific features but always tie them back to user benefits rather than just technical specifications."
                    ]
                };
                
                return responses[model][Math.floor(Math.random() * responses[model].length)];
            }
            
            // Simulated analysis generator
            function generateAnalysis(prompt, model) {
                return `Analysis of your prompt for ${model.toUpperCase()}:
                
- Clarity: Good overall structure with clear objectives
- Specificity: Could benefit from more detail about target audience
- Length: Appropriate for the requested output
- Tone: Well-suited for persuasive business communication

Recommendations:
1. Consider specifying the audience (e.g., tech teams, marketing agencies)
2. Add more concrete differentiators from competitors
3. Include any special offers or trial information
4. Specify desired word count for more precise results

Overall score: 7.5/10 - Solid prompt with room for refinement.`;
            }
        });
    </script>
</body>
</html>