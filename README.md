# Portfolio - Alban NYANTUDRE

A personal portfolio website built with Jekyll, combining Academic Pages and a custom blog. Hosted on GitHub Pages.

**Live site:** [anyantudre.github.io](https://anyantudre.github.io)

---

## Quick Start

### Prerequisites

- [Ruby](https://www.ruby-lang.org/en/downloads/) (3.0+)
- [Bundler](https://bundler.io/) (`gem install bundler`)
- [Git](https://git-scm.com/)

### Local Development

```bash
# Clone the repository
git clone https://github.com/anyantudre/anyantudre.github.io.git
cd anyantudre.github.io

# Install dependencies
bundle install

# Start local server
bundle exec jekyll serve

# Open http://localhost:4000 in your browser
```

---

## Project Structure

```
├── _pages/           # Main pages (about, blog, projects, etc.)
├── _posts/           # Blog posts
├── _portfolio/       # Project entries
├── _talks/           # Talks & presentations
├── _teaching/        # Teaching experiences
├── _certifications/  # Certifications
├── _awards/          # Awards & honors
├── _data/            # Navigation, UI text, etc.
├── _includes/        # Reusable HTML components
├── _layouts/         # Page templates
├── _sass/            # SCSS stylesheets
├── assets/           # CSS, JS, fonts
├── images/           # All images
├── files/            # PDFs and downloadable files
└── _config.yml       # Site configuration
```

---

## How to Modify Content

### Update Personal Info

Edit `_config.yml`:
```yaml
title: "Your Name"
name: "Your Name"
description: "Your tagline"
url: "https://yourusername.github.io"
```

Edit `_pages/about.md` to update your bio, experience, skills, and education.

### Add a Blog Post

Create a new file in `_posts/` with format `YYYY-MM-DD-title.md`:

```markdown
---
title: "My New Post"
date: 2025-01-31
image:
  path: /images/blog/my-image.png
  alt: "Image description"
excerpt: "Brief description of the post."
tags: [AI, Machine Learning]
---

Your content here...
```

### Add a Project

Create a new file in `_portfolio/`:

```markdown
---
title: "Project Name"
excerpt: "Short description.<br/><br/>**Technologies:** Python, PyTorch"
collection: portfolio
date: 2025-01-01
image: "portfolio/project-image.png"
github_url: "https://github.com/username/repo"
github_stars: 10
tags: [Machine Learning, Python]
---

Full project description...
```

### Add an Award

Create a new file in `_awards/`:

```markdown
---
title: "Award Name"
collection: awards
date: 2025-01-01
award_type: "Competition"
category: "competition"  # academic, competition, or scholarship
issuer: "Organization Name"
image: "awards/award-image.png"
link: "https://link-to-award"
excerpt: "Brief description."
---

Full description...
```

### Add a Talk

Create a new file in `_talks/`:

```markdown
---
title: "Talk Title"
collection: talks
talk_type: "Conference Talk"
venue: "Event Name"
date: 2025-01-01
location: "City, Country"
excerpt: "Brief description."
image: "talks/talk-image.png"
pdf: "/files/talks/presentation.pdf"
---

Talk description...
```

### Add a Certification

Create a new file in `_certifications/`:

```markdown
---
title: "Certification Name"
collection: certifications
type: "Professional Certification"
issuer: "Organization"
date: 2025-01-01
credential_id: "ABC123"
image: "certifications/cert-image.png"
excerpt: "Brief description."
---

Full description...
```

### Update Navigation

Edit `_data/navigation.yml`:

```yaml
main:
  - title: "Blog"
    url: /blog/
  - title: "Projects"
    url: /projects/
  # Add more items...
```

---

## Setup Guides

### GitHub Pages Deployment

1. Push your code to a repository named `yourusername.github.io`
2. Go to **Settings > Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose `main` branch and `/ (root)` folder
5. Click **Save**
6. Wait a few minutes, your site will be live at `https://yourusername.github.io`

### Giscus Comments Setup

1. Enable **Discussions** in your GitHub repository settings
2. Install [Giscus App](https://github.com/apps/giscus) on your repository
3. Go to [giscus.app](https://giscus.app/) and configure:
   - Repository: `yourusername/yourusername.github.io`
   - Category: `Announcements` (or create a new one)
4. Copy the generated values and update `_config.yml`:

```yaml
comments:
  provider: "giscus"
  giscus:
    repo: "yourusername/yourusername.github.io"
    repo_id: "YOUR_REPO_ID"
    category: "Announcements"
    category_id: "YOUR_CATEGORY_ID"
    mapping: "pathname"
    reactions_enabled: "1"
    emit_metadata: "0"
    theme: "light"
```

5. Update `_includes/giscus.html` with the same values

### ClustrMaps Visitor Tracking

1. Go to [clustrmaps.com](https://clustrmaps.com/)
2. Click "Get your map widget"
3. Enter your website URL
4. Choose a map style
5. Copy the JavaScript code
6. Replace the script in `_pages/about.md` under the "Visitors" section:

```html
<div class="visitors-map">
  <script type="text/javascript" id="mapmyvisitors" src="YOUR_SCRIPT_URL"></script>
</div>
```

### Custom Domain (Optional)

1. Buy a domain (e.g., from Namecheap, Google Domains)
2. Create a `CNAME` file in root with your domain:
   ```
   www.yourdomain.com
   ```
3. Configure DNS at your domain provider:
   - Add CNAME record: `www` → `yourusername.github.io`
   - Or A records pointing to GitHub's IPs
4. In GitHub Pages settings, add your custom domain

---

## Adding Images

Place images in the appropriate folder:

- `images/blog/` - Blog post images
- `images/portfolio/` - Project images
- `images/talks/` - Talk thumbnails
- `images/certifications/` - Certificate screenshots
- `images/awards/` - Award images
- `files/talks/` - PDF presentations

---

## Customization

### Colors & Theme

Edit `_sass/_themes.scss` or create CSS variables in `_sass/layout/` files.

### Favicon

Replace `images/profile.png` with your photo. The favicon is automatically generated from this image.

---

## Troubleshooting

### Common Issues

**Jekyll serve error on Windows:**
```bash
# Add to Gemfile if not present:
gem 'wdm', '>= 0.1.0'
gem 'tzinfo'
gem 'tzinfo-data'
```

**Pagination warning:**
This is normal if pagination is disabled. Ignore or enable `jekyll-paginate-v2`.

**YAML syntax error:**
Check for special characters in YAML files. Escape `&` as `&amp;` in HTML, or use quotes in YAML.

---

## License

This project is based on [Academic Pages](https://github.com/academicpages/academicpages.github.io) (MIT License).

---

## Contact

- **Email:** nyantudrealban@gmail.com
- **LinkedIn:** [anyantudre](https://linkedin.com/in/anyantudre)
- **GitHub:** [anyantudre](https://github.com/anyantudre)
